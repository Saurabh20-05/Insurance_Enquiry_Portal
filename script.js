document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enquiryForm');
    const steps = document.querySelectorAll('.form-step');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressBar = document.getElementById('progressBar');
    const currentStepText = document.getElementById('currentStepText');
    const captchaLabel = document.getElementById('captchaLabel');
    const toast = document.getElementById('toast');

    let currentStep = 1;
    let captchaAnswer = 0;

    // --- NAVIGATION ---
    const updateUI = () => {
        steps.forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) === currentStep);
        });

        // Update Stepper Dots
        document.querySelectorAll('.step-item').forEach(item => {
            const stepNum = parseInt(item.id.replace('s', ''));
            item.classList.toggle('active', stepNum <= currentStep);
        });

        prevBtn.disabled = currentStep === 1;
        
        if (currentStep === 4) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'block';
            renderReview();
            generateCaptcha();
        } else {
            nextBtn.style.display = 'block';
            submitBtn.style.display = 'none';
        }

        if(progressBar) progressBar.style.width = `${(currentStep / 4) * 100}%`;
        if(currentStepText) currentStepText.textContent = currentStep;
    };

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
            currentStep++;
            updateUI();
        }
    });

    prevBtn.addEventListener('click', () => {
        currentStep--;
        updateUI();
    });

    // --- VALIDATION ---
    const validateStep = (step) => {
        const currentStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
        let isValid = true;

        if (step === 1) {
            const inputs = currentStepEl.querySelectorAll('input');
            inputs.forEach(input => {
                const errorSpan = input.nextElementSibling;
                if (!input.checkValidity()) {
                    isValid = false;
                    if(errorSpan) errorSpan.textContent = "Please fill this correctly";
                    input.style.borderColor = "var(--danger)";
                } else {
                    if(errorSpan) errorSpan.textContent = "";
                    input.style.borderColor = "#e2e8f0";
                }
            });
        }

        if (step === 2) {
            const radioChecked = document.querySelector('input[name="insType"]:checked');
            const radioError = document.getElementById('radioError');
            if (!radioChecked) {
                isValid = false;
                radioError.textContent = "Please select one plan to continue.";
            } else {
                radioError.textContent = "";
            }
        }

        if (step === 3) {
            const msg = document.getElementById('message');
            if (msg.value.trim().length < 5) {
                isValid = false;
                msg.nextElementSibling.textContent = "Please provide more details.";
                msg.style.borderColor = "var(--danger)";
            } else {
                msg.nextElementSibling.textContent = "";
                msg.style.borderColor = "#e2e8f0";
            }
        }

        return isValid;
    };

    // --- CAPTCHA ---
    const generateCaptcha = () => {
        const n1 = Math.floor(Math.random() * 10);
        const n2 = Math.floor(Math.random() * 10);
        captchaAnswer = n1 + n2;
        captchaLabel.textContent = `Security: What is ${n1} + ${n2}?`;
        document.getElementById('captchaInput').value = "";
    };

    // --- DATA ---
    const renderReview = () => {
        const reviewBox = document.getElementById('reviewContent');
        const plan = document.querySelector('input[name="insType"]:checked').value;
        
        const summary = {
            "Full Name": document.getElementById('fullName').value,
            "Email": document.getElementById('email').value,
            "Plan Selected": plan,
            "Requirements": document.getElementById('message').value
        };

        reviewBox.innerHTML = '';
        for (const [key, val] of Object.entries(summary)) {
            reviewBox.innerHTML += `
                <div class="review-item">
                    <strong>${key}</strong>
                    <span>${val}</span>
                </div>`;
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const userVal = parseInt(document.getElementById('captchaInput').value);

        if (userVal !== captchaAnswer) {
            document.getElementById('captchaError').textContent = "Incorrect answer!";
            return;
        }

        submitBtn.disabled = true;
        showToast("Submitting your enquiry...");

        setTimeout(() => {
            const id = 'INS' + Math.floor(10000 + Math.random() * 90000);
            
            // Save to LocalStorage
            const data = JSON.parse(localStorage.getItem('enquiries') || '[]');
            data.push({
                id: id,
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                type: document.querySelector('input[name="insType"]:checked').value,
                message: document.getElementById('message').value,
                status: 'Pending',
                date: new Date().toLocaleDateString()
            });
            localStorage.setItem('enquiries', JSON.stringify(data));

            form.style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('displayId').textContent = id;
        }, 1500);
    });

    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
});