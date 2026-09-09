/**
 * AyuCase Clinical Suite — Deep Teal Medical Sidebar Component
 */

export function renderSidebar(currentRoute = 'dashboard') {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid_view' },
    { id: 'chat', label: 'Chat / Case Taking', icon: 'forum', badge: 'AI' },
    { id: 'history', label: 'Medical History', icon: 'history_edu' },
    { id: 'clinics', label: 'Nearby Clinics', icon: 'local_hospital' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
    { id: 'help', label: 'Help & Guidelines', icon: 'help_outline' }
  ];

  const navLinksHTML = navItems.map(item => {
    const isActive = currentRoute === item.id;
    return `
      <a href="#${item.id}" class="sidebar-nav-item ${isActive ? 'active' : ''}" data-nav="${item.id}">
        <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
        <span class="flex-1">${item.label}</span>
        ${item.badge ? `<span class="px-1.5 py-0.5 text-[10px] font-bold rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">${item.badge}</span>` : ''}
      </a>
    `;
  }).join('');

  return `
    <aside class="ayucase-sidebar w-64 h-full flex flex-col justify-between p-4 border-r border-teal-950/80 z-30 shrink-0 select-none">
      
      <!-- Brand & Top -->
      <div class="space-y-6">
        <!-- Logo & Title -->
        <div class="flex items-center gap-3 px-2 py-1">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-teal-900/40">
            <span class="material-symbols-outlined text-[24px]">vital_signs</span>
          </div>
          <div>
            <h1 class="font-bold text-base tracking-tight text-white flex items-center gap-1.5">
              Ayu<span class="text-teal-400">Case</span>
            </h1>
            <p class="text-[11px] text-teal-200/70 font-medium tracking-wide">Digital Patient Case-Taking</p>
          </div>
        </div>

        <!-- New Consultation Button -->
        <div class="px-1">
          <button id="btn-sidebar-new-consult" class="btn-new-consultation">
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>New Consultation</span>
          </button>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-1 pt-2">
          <div class="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-teal-400/60">Clinical Navigation</div>
          ${navLinksHTML}
        </nav>
      </div>

      <!-- Bottom Doctor Profile Card -->
      <div class="pt-4 border-t border-teal-900/80">
        <div class="p-3 rounded-xl bg-teal-950/60 border border-teal-800/40 flex items-center gap-3">
          <div class="relative w-10 h-10 rounded-full bg-teal-800/70 text-teal-200 flex items-center justify-center border border-teal-500/40 shrink-0">
            <span class="material-symbols-outlined text-[22px]">person</span>
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-teal-950" title="Online & On-Duty"></span>
          </div>
          <div class="flex-1 min-w-0">
            <h4 class="font-bold text-xs text-white truncate">DOCTOR</h4>
            <p class="text-[11px] text-teal-300/80 truncate">Internal Medicine</p>
            <p class="text-[10px] text-slate-400">AyuCare Center</p>
          </div>
          <a href="#settings" class="text-teal-400/70 hover:text-teal-300 p-1" title="Account Settings">
            <span class="material-symbols-outlined text-[18px]">more_vert</span>
          </a>
        </div>
      </div>

    </aside>
  `;
}
