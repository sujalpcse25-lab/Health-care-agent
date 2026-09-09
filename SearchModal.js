/**
 * AyuCase Clinical Suite — Global Search Modal Component
 */

export function renderSearchModal() {
  return `
    <div id="modal-global-search" class="ayucase-modal-overlay hidden">
      <div class="ayucase-modal-content max-w-xl">
        
        <!-- Search Input Bar -->
        <div class="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-800/60">
          <span class="material-symbols-outlined text-[22px] text-teal-600 dark:text-teal-400">search</span>
          <input 
            type="text" 
            id="global-search-input" 
            placeholder="Search patients by name, ID, conditions, clinics..." 
            class="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none font-medium"
            autocomplete="off"
          >
          <kbd class="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono text-slate-500 dark:text-slate-400">ESC</kbd>
        </div>

        <!-- Search Results List -->
        <div id="global-search-results" class="max-h-96 overflow-y-auto p-2 space-y-1 text-xs divide-y divide-slate-100 dark:divide-slate-800">
          <div class="p-6 text-center text-slate-400">
            <span class="material-symbols-outlined text-[28px] block mb-1 text-slate-300 dark:text-slate-600">manage_search</span>
            Type patient name, medical complaint, or clinic to search
          </div>
        </div>

        <!-- Footer -->
        <div class="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
          <span>Search spans Patients, Active Consultations & Clinics</span>
          <span class="flex items-center gap-1">
            <kbd class="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[9px]">↑↓</kbd> to navigate
          </span>
        </div>

      </div>
    </div>
  `;
}
