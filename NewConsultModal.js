/**
 * AyuCase Clinical Suite — New Consultation Setup Modal Component
 */

export function renderNewConsultModal(patientsList = []) {
  const patientOptions = patientsList.map(p => `
    <option value="${p.id}">${p.name} (${p.id} - Age: ${p.age}, ${p.gender})</option>
  `).join('');

  return `
    <div id="modal-new-consult" class="ayucase-modal-overlay hidden">
      <div class="ayucase-modal-content max-w-lg">
        
        <!-- Header -->
        <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20">
              <span class="material-symbols-outlined text-[20px]">clinical_notes</span>
            </div>
            <div>
              <h3 class="font-bold text-sm text-slate-900 dark:text-white">Start New Clinical Consultation</h3>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Initialize digital case sheet & AI symptom tracker</p>
            </div>
          </div>
          <button id="btn-close-new-consult" class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Form Body -->
        <form id="form-new-consult" class="p-5 space-y-4 text-xs">
          
          <!-- Existing vs New Patient Toggle -->
          <div class="space-y-1.5">
            <label class="block font-semibold text-slate-700 dark:text-slate-300">Select Existing Patient or Register New</label>
            <select id="consult-patient-select" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-medium">
              <option value="new">+ Register New Patient Case</option>
              ${patientOptions}
            </select>
          </div>

          <!-- Dynamic Patient Details Section -->
          <div id="new-patient-fields" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Patient Full Name *</label>
                <input type="text" id="consult-patient-name" required placeholder="e.g. Ramesh Patel" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
              </div>
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Age & Gender *</label>
                <div class="flex gap-2">
                  <input type="number" id="consult-patient-age" required placeholder="Age" min="1" max="120" value="48" class="w-20 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
                  <select id="consult-patient-gender" class="flex-1 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Blood Pressure (e.g. 130/80)</label>
                <input type="text" id="consult-patient-bp" placeholder="132/84" value="132/84" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
              </div>
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Heart Rate (bpm)</label>
                <input type="text" id="consult-patient-hr" placeholder="78" value="78" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
              </div>
            </div>
          </div>

          <!-- Chief Complaint -->
          <div>
            <label class="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Chief Complaint / Presenting Symptoms *</label>
            <textarea id="consult-chief-complaint" required rows="2" placeholder="e.g. Severe throbbing unilateral headache with nausea and photophobia for 2 days" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500 resize-none"></textarea>
          </div>

          <!-- Relevant History / Allergies -->
          <div>
            <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Relevant Medical History & Documented Allergies</label>
            <input type="text" id="consult-history" placeholder="e.g. Penicillin allergy, Stage 1 Hypertension" value="Penicillin, Sulfa Drugs; Stage 1 HTN" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
          </div>

          <!-- Actions -->
          <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <button type="button" id="btn-cancel-new-consult" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1.5 shadow-sm transition">
              <span class="material-symbols-outlined text-[16px]">start</span>
              <span>Open Case in Chat</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}
