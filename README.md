# 🏥 AyuCase Clinical Suite — Digital Patient Case-Taking

A modern, professional, clinical web application for physician case-taking, AI-assisted symptom analysis, active differential diagnostics, and longitudinal medical history tracking.

---

## 🌟 Visual Identity & Design System

AyuCase Clinical Suite maintains an enterprise medical aesthetic:
- **Color Palette**: Deep Medical Teal (`#003838`, `#004d40`, `#0f766e`, `#0d9488`, `#14b8a6`), soft daylight surface backgrounds (`#f8fafc`, `#f1f5f9`), and dark teal nocturnal theme.
- **Typography**: **Inter** hierarchy throughout.
- **Doctor Profile**: **DOCTOR** (Cardiologist & Internal Medicine).
- **AI Decision Support**: **Dr. Bot (AI Assistant)** powered by the **AyuCase Diagnostics Engine v2.4**.

---

## 📑 Application Pages & Features

1. **📊 Dashboard (`#dashboard`)**:
   - Clinical KPI metrics: Today's Consultations (14, +12%), Active Cases (8), Follow-ups Due (5), Patients Seen (142).
   - Recent Consultations table with status badges (`Active`, `Review Required`, `Completed`, `Follow-up`), complaint summaries, and direct case links.
   - Clinical shortcuts & recent activity feed.

2. **🩺 Chat / Symptom Checker (`#chat`)**:
   - Live clinical dialogue with **Dr. Bot (AI Assistant)**.
   - Interactive **Quick-Action Prompts** ("Check Red Flags", "Ask About Duration", "Ask About Severity", "Ask About Medications", "Ask About Allergies", "Ask About Medical History").
   - Functional **File Attachment Picker** supporting PDF, JPG, PNG, DOCX with preview & removal.
   - Functional **Reset Session** with modal confirmation.
   - **Clinical Context Panel** (right sidebar):
     - *Patient Snapshot*: Real-time vitals (BP 132/84, HR 78, Temp 98.6°F, SpO2 98%).
     - *Active Differentials*: Probability bars & clinical rationale (Migraine without Aura 72%, Tension-Type 48%, Sinusitis 15%).
     - *Suggested Next Steps*: Interactive protocol checklist.

3. **📜 Medical History (`#history`)**:
   - Patient search by name and Patient ID (`AYU-2026-081`).
   - Longitudinal clinical timelines (2026-08-20 Consultation, 2026-08-05 Follow-up, etc.).
   - Tabbed records: *Clinical Timeline*, *Vitals & Labs*, *Prescriptions*, *Allergies & Notes*.

4. **🏥 Nearby Clinics (`#clinics`)**:
   - Searchable directory of referral hospitals and specialist clinics.
   - Filter by specialty (Internal Medicine, Neurology, Orthopedics, Pediatrics, Dermatology) and distance.
   - Interactive Map placeholder with clinic markers.
   - **Clinic Details Modal** with operating hours, doctor roster, and contact button.

5. **⚙️ Settings (`#settings`)**:
   - Physician profile editing for Dr. Ananya Sharma.
   - Instant **Light Mode / Dark Mode** theme switcher with LocalStorage persistence.
   - Notification preference toggles.
   - AI Assistant parameters (detail level & differential sensitivity).
   - Data governance and privacy compliance notices.

6. **❓ Help & Documentation (`#help`)**:
   - Searchable FAQ accordions covering case-taking, differentials, and data workflows.
   - Clinical safety guidelines and support contact information.

7. **⚡ Global Capabilities**:
   - **Global Search (`Cmd+K` / `Ctrl+K`)**: Live search across patients, active consultations, and clinics.
   - **Notifications Center**: Alert drawer for reviews, follow-ups, and lab uploads.
   - **New Consultation Modal**: Start a new patient case from anywhere and jump directly into the chat intake.

---

## 🚀 How to Run the Application

### Option A: Windows Double-Click (Easiest)
Double-click `run.bat` inside the `ayucase-clinical-suite` folder.

### Option B: Terminal Command
```bash
python run.py
```
*The server will start at **`http://localhost:3000`** and automatically open the web browser.*

---

## 📁 Directory Structure

```
ayucase-clinical-suite/
├── index.html                 # Main single-page application entry
├── css/
│   └── styles.css             # AyuCase clinical design system & dark mode
├── js/
│   ├── app.js                 # App root, client-side router, state & events
│   ├── data/
│   │   ├── patients.js        # Realistic patient profiles, vitals & histories
│   │   ├── consultations.js   # Recent consultation records & statuses
│   │   ├── differentials.js   # Active differentials data & AI responses
│   │   ├── clinics.js         # Nearby clinic directory & doctor roster
│   │   └── notifications.js   # Clinical alerts & task notifications
│   ├── components/
│   │   ├── Sidebar.js         # Deep teal medical sidebar & navigation
│   │   ├── TopBar.js          # Search bar, notifications, theme toggle & profile
│   │   ├── NewConsultModal.js # New patient intake modal dialog
│   │   ├── NotificationPanel.js # Notification center dropdown
│   │   └── SearchModal.js     # Global medical search modal (Cmd+K)
│   └── pages/
│       ├── Dashboard.js       # KPI metrics & recent consultations table
│       ├── Chat.js            # Chat stream, AI assistant & quick action pills
│       ├── ClinicalContext.js # Patient snapshot, differentials & next steps
│       ├── MedicalHistory.js  # Patient selector & longitudinal timeline
│       ├── NearbyClinics.js   # Clinic cards, map placeholder & details modal
│       ├── Settings.js        # Account, appearance, alerts & AI config
│       └── Help.js            # Searchable FAQ accordions & guidelines
├── run.py                     # Python server launcher (port 3000)
├── run.bat                    # One-click Windows launch script
└── README.md                  # Complete documentation
```
