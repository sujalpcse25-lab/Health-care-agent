/**
 * AyuCase Clinical Suite — Active Differentials & Clinical Decision Support Rules
 */

export const initialClinicalContext = {
  patientId: "AYU-2026-081",
  patientName: "Ramesh Patel",
  age: 48,
  gender: "Male",
  vitals: {
    bp: "132/84",
    hr: "78",
    temp: "98.6°F",
    spo2: "98%"
  },
  activeDifferentials: [
    {
      id: "diff_1",
      condition: "Migraine without Aura",
      probability: 72,
      level: "High",
      color: "#0d9488",
      rationale: "Unilateral throbbing headache, photophobia, nausea, duration 48h, aggravated by activity."
    },
    {
      id: "diff_2",
      condition: "Tension-Type Headache",
      probability: 48,
      level: "Moderate",
      color: "#0284c7",
      rationale: "Bilateral tightness component, prolonged screen exposure reported by patient."
    },
    {
      id: "diff_3",
      condition: "Acute Sinusitis",
      probability: 15,
      level: "Low",
      color: "#64748b",
      rationale: "No purulent rhinorrhea or facial pressure over maxillary sinuses."
    }
  ],
  suggestedNextSteps: [
    { id: "step_1", text: "Evaluate for focal neurological deficits & cranial nerve exam", completed: true },
    { id: "step_2", text: "Screen for secondary headache red flags (SNOOP criteria)", completed: true },
    { id: "step_3", text: "Assess medication overuse history (analgesic rebound)", completed: false },
    { id: "step_4", text: "Consider acute abortive therapy (Triptan / NSAID) if not contraindicated", completed: false },
    { id: "step_5", text: "Schedule 7-day headache diary & symptom follow-up", completed: false }
  ],
  quickActions: [
    { label: "Check Red Flags", prompt: "Dr. Bot, screen this patient for headache red flags using the SNOOP criteria." },
    { label: "Ask About Duration", prompt: "How long has this headache lasted, and is it continuous or episodic?" },
    { label: "Ask About Severity", prompt: "On a scale of 1 to 10, how severe is the pain at its peak?" },
    { label: "Ask About Medications", prompt: "What acute medications or pain relievers have you taken for this episode?" },
    { label: "Ask About Allergies", prompt: "Let's double-check all documented drug allergies before prescribing." },
    { label: "Ask About Medical History", prompt: "Have you experienced similar severe episodes in the past?" }
  ]
};

export const simulatedAiResponses = {
  "red flags": `### 🛡️ SNOOP Clinical Red Flag Assessment
Evaluating patient **Ramesh Patel (48M)** against standardized criteria:

- **S (Systemic Symptoms/Fever)**: None reported (Temp: 98.6°F). No weight loss or chills.
- **N (Neurological Signs/Deficits)**: Patient is alert and oriented x3; speech fluent, no motor weakness or facial asymmetry.
- **O (Onset / Thunderclap)**: Gradual crescendo onset over 48 hours; NOT an explosive "worst headache of life" (<1 min peak).
- **O (Older Age / New Onset)**: Patient has mild episodic headache history, but this episode is more intense.
- **P (Pattern Change / Progression)**: Worsened by bright light and movement, classic for primary headache.

**Decision Support Assessment**: Low suspicion for acute intracranial emergency. Primary headache disorder (Migraine) remains the leading differential.`,

  "duration": `### ⏱️ Symptom Chronology & Progression Analysis
- **Current Episode Duration**: 48 hours (Acute).
- **Clinical Implication**: Fits within standard diagnostic criteria for acute migraine attack (4 to 72 hours untreated).
- **Status Migrainosus Risk**: If duration exceeds 72 hours with severe disability, parenteral abortive therapy or neurological review may be required.
- **Recommended Action**: Inquire if patient has had symptom-free intervals in the preceding 14 days.`,

  "severity": `### 📊 Pain Intensity & Impact Stratification
- **Assessed Severity**: **7/10** (Severe / Impairing).
- **Functional Impact**: Unable to concentrate on routine work; confined to dark, quiet room.
- **Triage Level**: **Acuity Level 2 (Urgent Care / Same-Day Clinical Attention)**.
- **Clinical Recommendation**: Rapid abortive intervention recommended to prevent central sensitization.`,

  "medications": `### 💊 Medication Review & Contraindication Screen
Checking proposed acute therapies against active patient profile:
- **Active Prescriptions**: Telmisartan 40mg (Hypertension), Atorvastatin 10mg.
- **Documented Allergies**: Penicillin, Sulfa Drugs.
- **Cautionary Notes**: Patient has Stage 1 Hypertension. Use caution with vasoconstrictive ergot alkaloids or high-dose triptans if blood pressure is uncontrolled.
- **Suggested Therapeutic Consideration**: Sumatriptan 50mg or oral Naproxen Sodium 500mg with gastroprotective agent.`,

  "allergies": `### ⚠️ Documented Patient Allergy Alert
- **Allergies on Record**: **Penicillin** (Anaphylaxis risk), **Sulfa Drugs** (Cutaneous rash).
- **Cross-Reactivity Check**: No contraindications against standard primary headache medications (Triptans, Acetaminophen, NSAIDs).
- **Recommendation**: Document verification timestamp in the electronic case sheet.`,

  "default": `### 📋 Clinical Decision Support Evaluation
Based on the case details provided for **Ramesh Patel (48M)**:

1. **Symptom Correlation**: The constellation of unilateral pulsating discomfort, photophobia, and nausea strongly favors **Migraine without Aura** (ICD-10 G43.0).
2. **Exclusionary Notes**: Absence of fever or meningismus lowers the pre-test probability of infectious etiology.
3. **Suggested Next Steps**:
   - Confirm absence of visual aura (scintillating scotoma).
   - Evaluate hydration status due to nausea.
   - Consider initiating a 7-day clinical headache diary.

*Notice: Decision support suggestion only. Requires clinical verification by the attending physician.*`
};
