# InsuCare Pro 🛡️
A modern multi-step insurance enquiry portal with a secure admin dashboard and real-time status management.

---

## 📌 About
**InsuCare Pro** is a college project — a front-end web application that lets customers submit insurance enquiries through a clean, guided 4-step form. Admins can log in to a secure dashboard to review submissions and update their status. Data is persisted via localStorage with no backend required.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📋 Multi-Step Form | 4-step guided enquiry flow with animated transitions |
| ✅ Live Validation | Inline field validation with error messages per step |
| 🃏 Plan Cards | Clickable insurance type cards — Life, Health, Vehicle, Travel |
| 🔐 Math CAPTCHA | Simple arithmetic CAPTCHA to prevent spam submissions |
| 🆔 Reference ID | Auto-generated unique ID (e.g. `INS73421`) on submission |
| 📊 Admin Dashboard | Stats panel, search, filter, and status management |
| 🏷️ Status Badges | Color-coded Pending / Approved / Rejected labels |
| 💾 Persistent State | All enquiry data saved and read via localStorage |
| 📱 Responsive Design | Works on desktop, tablet, and mobile |


insucare-pro/
│
├── index.html        # Customer-facing multi-step enquiry form
├── admin.html        # Password-protected admin dashboard
├── styles.css        # Shared stylesheet for both pages
├── script.js         # Customer form logic, validation, localStorage write
└── admin.js          # Admin dashboard logic, filters, status updates


---

## 🛡️ Insurance Plans Supported

| Plan | Coverage Focus |
|---|---|
| 🧬 Life | Term plans, coverage amounts, nominee details |
| 🏥 Health | Individual, family floater, critical illness |
| 🚗 Vehicle | Two-wheeler, four-wheeler, third-party, comprehensive |
| ✈️ Travel | Domestic, international, trip cancellation |

---

## 🚀 Getting Started

**No installation or build tools needed — pure front-end.**

```bash
# Clone the repository
git clone https://github.com/Saurabh20-05/Insurance_Enquiry_Portal.git

Or use VS Code's **Live Server** extension → right-click `index.html` → *Open with Live Server*

```

**Admin Access:**

URL      → admin.html
Username → admin
Password → 1234

---

## 🎮 How It Works

**Customer Flow:**
1. Fill in personal details (Name, Email, Phone)
2. Select an insurance plan type
3. Describe your coverage requirements
4. Review your details, solve the CAPTCHA → Submit

**Admin Flow:**
1. Log in at `admin.html`
2. View live stats — total enquiries, pending count, conversion rate
3. Search / filter enquiries by name, Ref ID, or plan type
4. Approve or Reject any submission with one click

Each submission earns a unique **Ref ID** and is saved to localStorage instantly.

---

## 📋 Validation Rules

| Step | Field | Rule |
|---|---|---|
| Step 1 | Full Name | Required, non-empty |
| Step 1 | Email | Valid email format |
| Step 1 | Phone | Required, non-empty |
| Step 2 | Insurance Type | Must select one plan |
| Step 3 | Requirements | Minimum 5 characters |
| Step 4 | CAPTCHA | Must match the random arithmetic sum |

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Page structure for both customer and admin pages |
| CSS3 | Glassmorphism design, CSS variables, Grid, Flexbox, animations |
| Vanilla JavaScript | Form logic, DOM manipulation, localStorage read/write |
| Google Fonts (Inter) | Clean, modern sans-serif typography |
| localStorage API | Persistent enquiry data storage in the browser |

**No frameworks. No build tools. No dependencies.**

---

## 📁 CSS Architecture

| File | Responsibility |
|---|---|
| `styles.css` | All styles — layout, components, admin dashboard, animations |
| `:root` variables | Design tokens — accent color, glass effect, danger, success |
| Glassmorphism | `backdrop-filter: blur(12px)` + translucent white cards |
| Responsive grid | CSS Grid for stat cards, plan cards, and review layout |

---

## 📁 JS Architecture

| File | Responsibility |
|---|---|
| `script.js` | Step navigation, validation, CAPTCHA, review render, localStorage write |
| `admin.js` | Login gate, stats calculation, table render, search/filter, status update |

---

## 📸 Pages

- **Home (`index.html`)** — 4-step animated form with progress bar and stepper dots
- **Review Step** — Read-only summary grid before final submission
- **Success Screen** — Confirmation with unique Reference ID and submit-another option
- **Admin Login (`admin.html`)** — Secure login gate with credential check
- **Admin Dashboard** — Stats panel, filterable enquiry table, approve/reject actions

---

## ⚠️ Limitations

- Data stored in **localStorage only** — not shared across devices or browsers
- Admin credentials are **hardcoded in JS** — not production-safe
- No real backend — data resets if browser storage is cleared

---

## 🔮 Future Scope

- [ ] Node.js + MongoDB backend for real data persistence
- [ ] JWT-based secure admin authentication
- [ ] Email notifications on submission via EmailJS
- [ ] Google reCAPTCHA v3 integration
- [ ] Export enquiries to CSV / PDF
- [ ] Pagination and sorting in the admin table
- [ ] Phone number OTP verification

---

## 👨‍💻 Author

Made with 💜 as a Front-End Web Development college project.
---

## 🗂️ Project Structure
