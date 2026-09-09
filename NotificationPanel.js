/**
 * AyuCase Clinical Suite — Notification Center Dropdown Component
 */

export function renderNotificationPanel(notifications = []) {
  const notifsListHTML = notifications.length === 0 ? `
    <div class="p-8 text-center text-slate-400 text-xs">
      <span class="material-symbols-outlined text-[32px] text-slate-300 dark:text-slate-600 block mb-1">notifications_off</span>
      No new clinical notifications
    </div>
  ` : notifications.map(n => {
    let icon = "info";
    let iconColor = "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60";
    if (n.type === 'review') {
      icon = "assignment_late";
      iconColor = "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60";
    } else if (n.type === 'followup') {
      icon = "event_upcoming";
      iconColor = "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60";
    } else if (n.type === 'lab') {
      icon = "biotech";
      iconColor = "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60";
    }

    return `
      <div class="p-3.5 border-b border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition cursor-pointer notif-item ${n.unread ? 'bg-teal-50/40 dark:bg-teal-950/20' : ''}" data-id="${n.id}" data-patient="${n.targetPatientId || ''}">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-lg ${iconColor} flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[18px]">${icon}</span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h5 class="font-semibold text-xs text-slate-900 dark:text-white truncate">${n.title}</h5>
              <span class="text-[10px] text-slate-400">${n.time}</span>
            </div>
            <p class="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">${n.message}</p>
            ${n.unread ? `<span class="inline-block mt-1 w-1.5 h-1.5 rounded-full bg-teal-500"></span>` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div id="panel-notifications" class="absolute right-4 top-16 w-80 sm:w-96 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl z-40 hidden overflow-hidden animate-scaleUp">
      <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-teal-600 dark:text-teal-400">notifications_active</span>
          <span class="font-bold text-xs text-slate-900 dark:text-white">Clinical Alerts & Tasks</span>
        </div>
        <button id="btn-mark-notifs-read" class="text-[11px] text-teal-600 dark:text-teal-400 hover:underline font-semibold">Mark all read</button>
      </div>
      <div class="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800" id="notifs-container">
        ${notifsListHTML}
      </div>
    </div>
  `;
}
