/**
 * AyuCase Clinical Suite — Page 6: Help, FAQ & Clinical Guidelines
 */

export function renderHelp() {
  const faqs = [
    {
      q: "How do I start a new patient consultation?",
      a: "Click the **'New Consultation'** button located in the sidebar or top bar from anywhere in the suite. You can select an existing registered patient or enter intake details for a new patient. Once submitted, AyuCase initializes the case and directs you to the Chat interface with the Patient Snapshot loaded."
    },
    {
      q: "How does the Dr. Bot AI Symptom Checker calculate differentials?",
      a: "The AyuCase Diagnostics Engine analyzes reported symptoms, onset duration, severity ratings, patient vitals, and medical history against clinical decision trees. It outputs probability-ranked active differentials (e.g. Migraine without Aura 72%) to aid physician evaluation. All outputs are strictly decision-support suggestions."
    },
    {
      q: "How do I review a patient's historical visit timeline?",
      a: "Navigate to **'Medical History'** from the sidebar. You can filter registered patients by name or ID. Selecting a patient displays their longitudinal clinical timeline, vital trends, active prescriptions, and documented allergies."
    },
    {
      q: "How do I reset a consultation session?",
      a: "In the **Chat / Case Taking** screen, click the **'Reset Session'** button in the top right. A confirmation modal will appear. Confirming clears the conversation history while preserving baseline patient vital records."
    },
    {
      q: "How does the referral network in Nearby Clinics function?",
      a: "The **'Nearby Clinics'** tab indexes verified secondary care facilities and specialized departments. You can filter by medical specialty (e.g., Neurology, Orthopedics) or distance, inspect clinic operating hours, and generate direct digital referral notes."
    },
    {
      q: "Is patient data stored safely in this application?",
      a: "AyuCase persists session data, consultations, and preferences using browser LocalStorage. Data remains local to your device session and is not sent to external advertising trackers."
    }
  ];

  const faqsHTML = faqs.map((faq, idx) => `
    <div class="clinical-card p-4 faq-accordion-item cursor-pointer select-none" data-idx="${idx}">
      <div class="flex items-center justify-between">
        <h4 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <span class="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 text-xs font-bold flex items-center justify-center border border-teal-200 dark:border-teal-800">
            ${idx + 1}
          </span>
          ${faq.q}
        </h4>
        <span class="material-symbols-outlined text-[20px] text-slate-400 faq-icon transition-transform">expand_more</span>
      </div>
      <div class="faq-content hidden mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        ${formatFaqText(faq.a)}
      </div>
    </div>
  `).join('');

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto overflow-y-auto">
      
      <!-- Header -->
      <div class="text-center max-w-xl mx-auto space-y-2 py-4">
        <div class="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto border border-teal-200 dark:border-teal-800 shadow-sm">
          <span class="material-symbols-outlined text-[28px]">help_center</span>
        </div>
        <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Clinical Help & Documentation</h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Everything you need to know about AyuCase case-taking, decision support, and patient record workflows.</p>
      </div>

      <!-- Search Input -->
      <div class="max-w-xl mx-auto">
        <div class="flex items-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
          <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">search</span>
          <input type="text" id="faq-search-input" placeholder="Search clinical questions, workflows, or diagnostics..." class="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none">
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="space-y-4 pt-2">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">quiz</span>
            Frequently Asked Questions
          </h3>
          <span class="text-xs text-slate-400">6 Articles</span>
        </div>

        <div class="space-y-3" id="faq-list-container">
          ${faqsHTML}
        </div>
      </div>

      <!-- Clinical Governance & Support Contact Card -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
        
        <div class="clinical-card p-5 space-y-2">
          <div class="flex items-center gap-2 text-teal-700 dark:text-teal-400">
            <span class="material-symbols-outlined text-[20px]">verified</span>
            <h4 class="font-bold text-xs sm:text-sm">Clinical Safety Policy</h4>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            AyuCase Clinical Suite is designed to augment clinical workflow. It does not replace independent medical evaluation, physical examination, or licensed clinical judgment.
          </p>
        </div>

        <div class="clinical-card p-5 space-y-2">
          <div class="flex items-center gap-2 text-teal-700 dark:text-teal-400">
            <span class="material-symbols-outlined text-[20px]">support_agent</span>
            <h4 class="font-bold text-xs sm:text-sm">Technical & Clinical Support</h4>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Need custom EHR integration or report an issue? Contact our clinical informatics team at <strong>support@ayucase.health</strong> or ext <strong>4402</strong>.
          </p>
        </div>

      </div>

    </div>
  `;
}

function formatFaqText(text = '') {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 dark:text-white">$1</strong>');
}
