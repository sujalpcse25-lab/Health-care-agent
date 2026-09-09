/**
 * AyuCase Clinical Suite — Page 1: Clinical Dashboard
 */

export function renderDashboard(consultations = [], patients = []) {
  // Calculate Stats
  const activeCount = consultations.filter(c => c.status === 'Active').length;
  const reviewCount = consultations.filter(c => c.status === 'Review Required').length;
  const followupCount = consultations.filter(c => c.status === 'Follow-up').length;

  const consultationRowsHTML = consultations.map(c => {
    let statusClass = "badge-active";
    if (c.status === 'Review Required') statusClass = "badge-review";
    if (c.status === 'Completed') statusClass = "badge-completed";
    if (c.status === 'Follow-up') statusClass = "badge-followup";

    return `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition border-b border-slate-100 dark:border-slate-800/60 text-xs">
        <td class="px-4 py-3.5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 font-bold flex items-center justify-center text-xs shrink-0">
              ${c.patientName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <span class="font-bold text-slate-900 dark:text-white block">${c.patientName}</span>
              <span class="text-[10px] text-slate-400 font-mono">${c.patientId}</span>
            </div>
          </div>
        </td>
        <td class="px-4 py-3.5 text-slate-600 dark:text-slate-300">${c.age} yrs, ${c.gender}</td>
        <td class="px-4 py-3.5 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate" title="${c.primaryComplaint}">
          ${c.primaryComplaint}
        </td>
        <td class="px-4 py-3.5">
          <span class="badge-status ${statusClass}">
            <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
            ${c.status}
          </span>
        </td>
        <td class="px-4 py-3.5 text-slate-500 dark:text-slate-400">${c.lastUpdated}</td>
        <td class="px-4 py-3.5 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button class="px-2.5 py-1 rounded bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 hover:bg-teal-100 font-semibold btn-open-chat-case" data-patient="${c.patientId}">
              Open Case
            </button>
            <button class="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 btn-view-history" data-patient="${c.patientId}" title="View Medical History">
              <span class="material-symbols-outlined text-[18px]">history</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      
      <!-- Top Overview Header & Quick Actions -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Clinical Dashboard</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Real-time overview of active consultations, patient intake & decision support.</p>
        </div>
        <div class="flex items-center gap-2">
          <button id="btn-dash-new-consult" class="btn-new-consultation sm:w-auto">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Consultation</span>
          </button>
          <a href="#history" class="px-3.5 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 transition">
            <span class="material-symbols-outlined text-[18px]">folder_shared</span>
            <span class="hidden md:inline">Patient Records</span>
          </a>
        </div>
      </div>

      <!-- 4 Key Clinical Statistics Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Stat 1: Today's Consultations -->
        <div class="clinical-card p-4 sm:p-5">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200/60 dark:border-teal-800/40">
              <span class="material-symbols-outlined text-[22px]">stethoscope</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 flex items-center gap-0.5">
              <span class="material-symbols-outlined text-[14px]">trending_up</span> +12%
            </span>
          </div>
          <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">14</h3>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Today's Consultations</p>
          </div>
        </div>

        <!-- Stat 2: Active Cases -->
        <div class="clinical-card p-4 sm:p-5">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200/60 dark:border-amber-800/40">
              <span class="material-symbols-outlined text-[22px]">pending_actions</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60">
              ${reviewCount} Needs Review
            </span>
          </div>
          <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">${activeCount + reviewCount}</h3>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Active Cases In Progress</p>
          </div>
        </div>

        <!-- Stat 3: Follow-ups Due -->
        <div class="clinical-card p-4 sm:p-5">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200/60 dark:border-purple-800/40">
              <span class="material-symbols-outlined text-[22px]">event_repeat</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border border-purple-200/60">
              Scheduled
            </span>
          </div>
          <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">${followupCount}</h3>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Follow-ups Due Today</p>
          </div>
        </div>

        <!-- Stat 4: Patients Seen This Month -->
        <div class="clinical-card p-4 sm:p-5">
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-800/40">
              <span class="material-symbols-outlined text-[22px]">group</span>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/60">
              August 2026
            </span>
          </div>
          <div class="mt-4">
            <h3 class="text-2xl font-bold text-slate-900 dark:text-white">142</h3>
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Patients Seen (Month)</p>
          </div>
        </div>

      </div>

      <!-- Main Section: Recent Consultations Table & Activity Stream -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left 2 Cols: Consultations Table -->
        <div class="lg:col-span-2 clinical-card overflow-hidden">
          <div class="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div>
              <h3 class="font-bold text-sm text-slate-900 dark:text-white">Recent Clinical Consultations</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400">Cases documented under DOCTOR</p>
            </div>
            <a href="#chat" class="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1">
              <span>Go to Chat</span>
              <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-slate-50/80 dark:bg-slate-800/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th class="px-4 py-3">Patient</th>
                  <th class="px-4 py-3">Demographics</th>
                  <th class="px-4 py-3">Chief Complaint</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Updated</th>
                  <th class="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                ${consultationRowsHTML}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Right 1 Col: Quick Tools & Clinical Activity Feed -->
        <div class="space-y-6">
          
          <!-- Quick Shortcuts Card -->
          <div class="clinical-card p-4 sm:p-5">
            <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-3">Clinical Shortcuts</h3>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <a href="#chat" class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-teal-500/50 hover:bg-teal-50/30 transition flex flex-col items-center text-center gap-1.5">
                <span class="material-symbols-outlined text-[22px] text-teal-600 dark:text-teal-400">smart_toy</span>
                <span class="font-semibold">AI Symptom Intake</span>
              </a>
              <a href="#history" class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-teal-500/50 hover:bg-teal-50/30 transition flex flex-col items-center text-center gap-1.5">
                <span class="material-symbols-outlined text-[22px] text-blue-600 dark:text-blue-400">history_edu</span>
                <span class="font-semibold">Patient History</span>
              </a>
              <a href="#clinics" class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-teal-500/50 hover:bg-teal-50/30 transition flex flex-col items-center text-center gap-1.5">
                <span class="material-symbols-outlined text-[22px] text-emerald-600 dark:text-emerald-400">local_hospital</span>
                <span class="font-semibold">Referral Clinics</span>
              </a>
              <a href="#help" class="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:border-teal-500/50 hover:bg-teal-50/30 transition flex flex-col items-center text-center gap-1.5">
                <span class="material-symbols-outlined text-[22px] text-purple-600 dark:text-purple-400">menu_book</span>
                <span class="font-semibold">Clinical Guide</span>
              </a>
            </div>
          </div>

          <!-- Activity Stream -->
          <div class="clinical-card p-4 sm:p-5">
            <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-3">Recent Clinical Activity</h3>
            <div class="space-y-3.5 text-xs">
              <div class="flex items-start gap-2.5">
                <span class="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0"></span>
                <div>
                  <p class="text-slate-800 dark:text-slate-200 font-medium">Dr. Bot generated 3 differentials for Ramesh Patel</p>
                  <span class="text-[10px] text-slate-400">10 mins ago • Case AYU-2026-081</span>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <div>
                  <p class="text-slate-800 dark:text-slate-200 font-medium">Physical therapy referral flagged for Sunita Verma</p>
                  <span class="text-[10px] text-slate-400">45 mins ago • Case AYU-2026-082</span>
                </div>
              </div>
              <div class="flex items-start gap-2.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                <div>
                  <p class="text-slate-800 dark:text-slate-200 font-medium">Consultation completed for Priya Sharma</p>
                  <span class="text-[10px] text-slate-400">2 days ago • Case AYU-2026-084</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  `;
}
