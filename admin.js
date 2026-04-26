document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    
    loginBtn.addEventListener('click', () => {
        const u = document.getElementById('user').value;
        const p = document.getElementById('pass').value;

        if(u === 'admin' && p === '1234') {
            document.getElementById('adminLogin').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            renderAdminData();
        } else {
            alert('Access Denied');
        }
    });

    function renderAdminData() {
        const data = JSON.parse(localStorage.getItem('enquiries') || '[]');
        const table = document.getElementById('adminTable');
        const search = document.getElementById('adminSearch').value.toLowerCase();
        const filter = document.getElementById('filterType').value;

        table.innerHTML = '';
        
        // Update Stats
        document.getElementById('statTotal').textContent = data.length;
        document.getElementById('statPending').textContent = data.filter(x => x.status === 'Pending').length;
        const approvedCount = data.filter(x => x.status === 'Approved').length;
        document.getElementById('statRate').textContent = data.length > 0 ? Math.round((approvedCount/data.length)*100) + '%' : '0%';

        const filtered = data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(search) || item.id.toLowerCase().includes(search);
            const matchesFilter = filter === 'All' || item.type === filter;
            return matchesSearch && matchesFilter;
        });

        filtered.forEach(item => {
            const row = document.createElement('tr');
            row.style.borderBottom = "1px solid #e2e8f0";
            row.innerHTML = `
                <td style="padding: 1rem; font-family: monospace;">${item.id}</td>
                <td style="padding: 1rem;">
                    <strong>${item.name}</strong><br>
                    <small style="color: gray;">${item.email}</small>
                </td>
                <td style="padding: 1rem;">${item.type}</td>
                <td style="padding: 1rem;"><span class="badge bg-${item.status.toLowerCase()}">${item.status}</span></td>
                <td style="padding: 1rem;">
                    <button onclick="changeStatus('${item.id}', 'Approved')" class="btn-solid" style="padding: 5px 10px; font-size: 0.7rem; background: #16a34a; border:none; color:white; border-radius:5px; cursor:pointer;">Approve</button>
                    <button onclick="changeStatus('${item.id}', 'Rejected')" class="btn-solid" style="padding: 5px 10px; font-size: 0.7rem; background: #dc2626; border:none; color:white; border-radius:5px; cursor:pointer;">Reject</button>
                </td>
            `;
            table.appendChild(row);
        });
    }

    window.changeStatus = (id, status) => {
        let data = JSON.parse(localStorage.getItem('enquiries'));
        data = data.map(i => i.id === id ? {...i, status} : i);
        localStorage.setItem('enquiries', JSON.stringify(data));
        renderAdminData();
    };

    document.getElementById('adminSearch').addEventListener('input', renderAdminData);
    document.getElementById('filterType').addEventListener('change', renderAdminData);




    // Add this to your admin.js
window.logoutAdmin = () => {
    // 1. Hide the Dashboard
    document.getElementById('adminDashboard').style.display = 'none';
    
    // 2. Show the Login Card
    const loginCard = document.getElementById('adminLogin');
    loginCard.style.display = 'block';
    
    // 3. Clear the password field for security
    document.getElementById('pass').value = '';
    document.getElementById('user').value = '';
    
    // 4. Optional: Show a toast or alert
    alert("You have been logged out safely.");
    
    // 5. If you want a full fresh start, you can still reload
    // location.reload(); 
};


});