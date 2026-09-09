/**
 * AyuCase Clinical Suite — Patient Records Mock Database
 */

export const patientsData = [
  {
    id: "AYU-2026-081",
    name: "Ramesh Patel",
    age: 48,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98201 44521",
    email: "ramesh.patel@example.com",
    address: "B-402, Shanti Heights, Andheri West, Mumbai",
    lastVisit: "2026-08-20",
    primaryCondition: "Severe Throbbing Headache & Nausea",
    status: "Active",
    vitals: {
      bp: "132/84 mmHg",
      hr: "78 bpm",
      temp: "98.6 °F",
      spo2: "98%",
      weight: "74 kg",
      height: "172 cm",
      bmi: "25.0"
    },
    allergies: ["Penicillin", "Sulfa Drugs"],
    chronicConditions: ["Hypertension (Stage 1)", "Mild Dyslipidemia"],
    medications: [
      { name: "Telmisartan", dosage: "40mg", freq: "Once daily (Morning)", startDate: "2024-03-12" },
      { name: "Atorvastatin", dosage: "10mg", freq: "Once daily (Night)", startDate: "2025-01-10" }
    ],
    notes: "Patient reports worsening headache episodes after prolonged screen time. No prior history of visual aura, but reports photophobia during current attack.",
    timeline: [
      {
        date: "2026-08-20",
        type: "Consultation",
        summary: "Acute throbbing unilateral headache with nausea lasting 48 hours. Pain scale 7/10.",
        doctor: "DOCTOR",
        status: "Active"
      },
      {
        date: "2026-08-05",
        type: "Follow-up",
        summary: "Routine hypertension follow-up. BP controlled at 128/82. Advised continuing Telmisartan 40mg.",
        doctor: "DOCTOR",
        status: "Completed"
      },
      {
        date: "2026-05-14",
        type: "Lab Review",
        summary: "Lipid Profile & HbA1c review. Fasting Glucose 94 mg/dL, HbA1c 5.4%, LDL 112 mg/dL.",
        doctor: "Dr. Rajesh Gupta",
        status: "Completed"
      }
    ]
  },
  {
    id: "AYU-2026-082",
    name: "Sunita Verma",
    age: 36,
    gender: "Female",
    bloodGroup: "O+",
    phone: "+91 98450 12890",
    email: "sunita.v@example.com",
    address: "12/A, Green Glen Layout, Bellandur, Bengaluru",
    lastVisit: "2026-08-24",
    primaryCondition: "Persistent Lower Back Pain",
    status: "Review Required",
    vitals: {
      bp: "118/76 mmHg",
      hr: "72 bpm",
      temp: "98.4 °F",
      spo2: "99%",
      weight: "62 kg",
      height: "160 cm",
      bmi: "24.2"
    },
    allergies: ["NSAIDs (Aspirin sensitivity)"],
    chronicConditions: ["Lumbar Spondylosis (L4-L5)"],
    medications: [
      { name: "Paracetamol", dosage: "650mg", freq: "As needed for pain", startDate: "2026-08-20" },
      { name: "Pregabalin", dosage: "75mg", freq: "Once daily (Bedtime)", startDate: "2026-08-15" }
    ],
    notes: "Pain radiates down left posterior thigh. Straight leg raise positive on left at 45 degrees. MRI lumbar spine advised.",
    timeline: [
      {
        date: "2026-08-24",
        type: "Consultation",
        summary: "Review of radicular lower back pain. Physical therapy referral initiated.",
        doctor: "DOCTOR",
        status: "Review Required"
      },
      {
        date: "2026-07-22",
        type: "Initial Visit",
        summary: "Acute onset lower back spasm after lifting heavy box.",
        doctor: "Dr. Vikram Malhotra",
        status: "Completed"
      }
    ]
  },
  {
    id: "AYU-2026-083",
    name: "Rajesh Kumar",
    age: 54,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 97110 33499",
    email: "rajesh.k54@example.com",
    address: "Plot 88, Sector 15, Rohini, New Delhi",
    lastVisit: "2026-08-26",
    primaryCondition: "Type 2 Diabetes Mellitus & Fatigue",
    status: "Follow-up",
    vitals: {
      bp: "138/88 mmHg",
      hr: "82 bpm",
      temp: "98.8 °F",
      spo2: "97%",
      weight: "82 kg",
      height: "175 cm",
      bmi: "26.8"
    },
    allergies: ["None documented"],
    chronicConditions: ["Type 2 Diabetes (7 years)", "Hypertension"],
    medications: [
      { name: "Metformin ER", dosage: "1000mg", freq: "Twice daily after meals", startDate: "2019-06-10" },
      { name: "Glimepiride", dosage: "2mg", freq: "Once daily (Breakfast)", startDate: "2022-11-04" },
      { name: "Amlodipine", dosage: "5mg", freq: "Once daily (Morning)", startDate: "2023-04-18" }
    ],
    notes: "Fasting blood sugar fluctuates between 140-165 mg/dL. Complains of mild tingling sensation in feet. Advised podiatry screening and HbA1c repeat.",
    timeline: [
      {
        date: "2026-08-26",
        type: "Follow-up",
        summary: "Glycemic control evaluation. Fasting glucose 152 mg/dL. Glimepiride dose optimized.",
        doctor: "DOCTOR",
        status: "Follow-up"
      },
      {
        date: "2026-06-18",
        type: "Lab Review",
        summary: "HbA1c 7.8%, Microalbuminuria negative. Eye examination normal.",
        doctor: "DOCTOR",
        status: "Completed"
      }
    ]
  },
  {
    id: "AYU-2026-084",
    name: "Priya Sharma",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+91 99234 88712",
    email: "priya.sharma29@example.com",
    address: "Flat 301, Silver Oak Apt, Kothrud, Pune",
    lastVisit: "2026-08-25",
    primaryCondition: "Seasonal Allergic Rhinitis & Dry Cough",
    status: "Completed",
    vitals: {
      bp: "112/74 mmHg",
      hr: "70 bpm",
      temp: "98.2 °F",
      spo2: "99%",
      weight: "54 kg",
      height: "163 cm",
      bmi: "20.3"
    },
    allergies: ["Dust Mites", "Pollen"],
    chronicConditions: ["Allergic Rhinitis"],
    medications: [
      { name: "Bilastine", dosage: "20mg", freq: "Once daily before bedtime", startDate: "2026-08-25" },
      { name: "Fluticasone Nasal Spray", dosage: "50mcg", freq: "2 sprays each nostril daily", startDate: "2026-08-25" }
    ],
    notes: "Sneezing paroxysms, watery eyes, and clear nasal discharge. Chest clear on auscultation. Symptoms well controlled on second-generation antihistamines.",
    timeline: [
      {
        date: "2026-08-25",
        type: "Consultation",
        summary: "Acute allergic rhinitis flare-up triggered by construction dust. Prescribed Bilastine & Fluticasone.",
        doctor: "DOCTOR",
        status: "Completed"
      }
    ]
  },
  {
    id: "AYU-2026-085",
    name: "Vikram Malhotra",
    age: 42,
    gender: "Male",
    bloodGroup: "O-",
    phone: "+91 98765 43210",
    email: "v.malhotra@example.com",
    address: "Tower 4, 1802, DLF Phase 5, Gurugram",
    lastVisit: "2026-08-27",
    primaryCondition: "Epigastric Discomfort & Reflux",
    status: "Active",
    vitals: {
      bp: "126/80 mmHg",
      hr: "76 bpm",
      temp: "98.6 °F",
      spo2: "98%",
      weight: "79 kg",
      height: "178 cm",
      bmi: "24.9"
    },
    allergies: ["None"],
    chronicConditions: ["GERD", "Mild Hiatal Hernia"],
    medications: [
      { name: "Pantoprazole", dosage: "40mg", freq: "Once daily 30 mins before breakfast", startDate: "2026-08-27" }
    ],
    notes: "Burning retrosternal chest pain occurring 45 mins post-prandial. Worse on lying flat. Cardiac evaluation rules out ACS.",
    timeline: [
      {
        date: "2026-08-27",
        type: "Consultation",
        summary: "Case intake for retrosternal burning discomfort. ECG normal. Prescribed PPI therapy and lifestyle modifications.",
        doctor: "DOCTOR",
        status: "Active"
      }
    ]
  }
];
