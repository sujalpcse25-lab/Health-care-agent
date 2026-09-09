/**
 * AyuCase Clinical Suite — Top Navigation Bar Component
 */

export function renderTopBar(title = "Clinical Dashboard", subtitle = "Overview of your consultations and patient activity.", unreadNotifsCount = 2) {
  return `
    <header class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between z-20 shrink-0 select-none">
      
      <!-- Left: Mobile Toggle & Page Title -->
      <div class="flex items-center gap-3">
        <button id="btn-mobile-sidebar-toggle" class="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
          <span class="material-symbols-outlined text-[24px]">menu</span>
        </button>
        <div>
          <h2 class="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">${title}</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">${subtitle}</p>
        </div>
      </div>

      <!-- Right: Global Search, Quick Consult, Notifs, Theme, Profile -->
      <div class="flex items-center gap-2 sm:gap-3">
        
        <!-- Global Search Bar Button -->
        <div id="topbar-search-trigger" class="relative cursor-pointer hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-xs text-slate-500 dark:text-slate-400 hover:border-teal-500/50 transition w-56 lg:w-64">
          <span class="material-symbols-outlined text-[16px] text-teal-600 dark:text-teal-400">search</span>
          <span class="flex-1 truncate">Search patients, cases, clinics...</span>
          <kbd class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono text-slate-600 dark:text-slate-300">⌘K</kbd>
        </div>

        <!-- Quick New Consultation on Topbar -->
        <button id="btn-topbar-new-consult" class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-xs font-semibold transition">
          <span class="material-symbols-outlined text-[16px]">add</span>
          <span>New Case</span>
        </button>

        <!-- Theme Toggle (Dark / Light) -->
        <button id="btn-theme-toggle" class="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition" title="Toggle Light / Dark Mode">
          <span class="material-symbols-outlined text-[20px] dark:hidden text-amber-500">dark_mode</span>
          <span class="material-symbols-outlined text-[20px] hidden dark:inline text-teal-400">light_mode</span>
        </button>

        <!-- Notifications Bell Button -->
        <div class="relative">
          <button id="btn-notifications-toggle" class="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition" title="Clinical Notifications">
            <span class="material-symbols-outlined text-[20px]">notifications</span>
            ${unreadNotifsCount > 0 ? `
              <span id="notif-badge" class="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
            ` : ''}
          </button>
        </div>

        <!-- Doctor Avatar Menu -->
        <div class="flex items-center gap-2 pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-800">
          <a href="#settings" class="flex items-center gap-2 group" title="DOCTOR Settings">
            <span class="w-8 h-8 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-800 group-hover:ring-2 group-hover:ring-teal-500/50 transition">
              <span class="material-symbols-outlined text-[18px]">person</span>
            </span>
            <span class="hidden xl:inline text-xs font-semibold text-slate-700 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-400">DOCTOR</span>
          </a>
        </div>

      </div>

    </header>
  `;
}
