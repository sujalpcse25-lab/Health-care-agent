/**
 * AyuCase Clinical Suite — Right-Side Clinical Context Panel Component
 */

export function renderClinicalContext(contextData) {
  const { patientName, patientId, age, gender, vitals, activeDifferentials, suggestedNextSteps } = contextData;

  // Active Differentials HTML
  const differentialsHTML = (activeDifferentials || []).map(d => `
    <div class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1.5">
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold text-slate-900 dark:text-white">${d.condition}</span>
        <span class="font-bold text-[11px] font-mono text-teal-600 dark:text-teal-400">${d.probability}%</span>
      </div>
      <div class="differential-bar-bg">
        <div class="differential-bar-fill" style="width: ${d.probability}%; background: ${d.color};"></div>
      </div>
      <p class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight pt-0.5">${d.rationale}</p>
    </div>
  `).join('');

  // Suggested Next Steps HTML (interactive checkboxes)
  const stepsHTML = (suggestedNextSteps || []).map(step => `
    <label class="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer select-none text-xs transition">
      <input type="checkbox" class="mt-0.5 rounded text-teal-600 focus:ring-teal-500 border-slate-300 dark:border-slate-600 dark:bg-slate-800 checkbox-next-step" data-id="${step.id}" ${step.completed ? 'checked' : ''}>
      <span class="text-slate-700 dark:text-slate-300 leading-snug ${step.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}">${step.text}</span>
    </label>
  `).join('');

  return `
    <aside id="clinical-context-panel" class="w-80 lg:w-88 h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 overflow-y-auto select-none p-4 space-y-5">
      
      <div class="space-y-5">
        <!-- Panel Header -->
        <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">patient_list</span>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">Clinical Context</h3>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 font-mono">
            ${patientId}
          </span>
        </div>

        <!-- 1. Patient Snapshot Card -->
        <div class="clinical-card p-3.5 space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-xs text-slate-900 dark:text-white">${patientName}</h4>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">${age} yrs, ${gender} • OPD Intake</p>
            </div>
            <a href="#history" class="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-0.5">
              <span>History</span>
              <span class="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>

          <!-- Vitals Grid -->
          <div class="grid grid-cols-2 gap-2 pt-1 text-[11px]">
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Blood Pressure</span>
              <strong class="text-slate-800 dark:text-slate-200 font-mono">${vitals.bp}</strong>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Heart Rate</span>
              <strong class="text-slate-800 dark:text-slate-200 font-mono">${vitals.hr} bpm</strong>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">Temp</span>
              <strong class="text-slate-800 dark:text-slate-200 font-mono">${vitals.temp}</strong>
            </div>
            <div class="p-2 rounded bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
              <span class="text-slate-400 block text-[10px] uppercase font-semibold">SpO2</span>
              <strong class="text-emerald-600 dark:text-emerald-400 font-mono">${vitals.spo2}</strong>
            </div>
          </div>
        </div>

        <!-- 2. Active Differentials Card -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-teal-600 dark:text-teal-400">tune</span>
              Active Differentials
            </span>
            <span class="text-[10px] text-slate-400">AyuCase Engine</span>
          </div>
          <div class="space-y-2">
            ${differentialsHTML}
          </div>
        </div>

        <!-- 3. Suggested Next Steps Checklist -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-teal-600 dark:text-teal-400">fact_check</span>
              Suggested Next Steps
            </span>
            <span class="text-[10px] text-slate-400">Clinical Protocol</span>
          </div>
          <div class="clinical-card p-2 divide-y divide-slate-100 dark:divide-slate-800">
            ${stepsHTML}
          </div>
        </div>

      </div>

      <!-- Bottom Clinical Safety Disclaimer -->
      <div class="pt-3 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
        <div class="flex items-start gap-1.5">
          <span class="material-symbols-outlined text-[14px] text-amber-500 shrink-0 mt-0.5">verified_user</span>
          <p><strong>Decision Support Disclaimer</strong>: AI-generated guidance is for informational support only and does not replace professional clinical diagnosis.</p>
        </div>
      </div>

    </aside>
  `;
}
