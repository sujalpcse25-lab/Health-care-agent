/**
 * AyuCase Clinical Suite — Page 4: Nearby Referral Clinics & Medical Centers
 */

export function renderNearbyClinics(clinics = [], activeFilter = 'All', searchQuery = '') {
  // Filter clinics
  const filteredClinics = clinics.filter(c => {
    const matchesFilter = activeFilter === 'All' || c.specialty.toLowerCase().includes(activeFilter.toLowerCase()) || c.specialties.some(s => s.toLowerCase().includes(activeFilter.toLowerCase()));
    const matchesSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.address.toLowerCase().includes(searchQuery.toLowerCase()) || c.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filterButtons = ['All', 'Internal Medicine', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'];
  const filterChipsHTML = filterButtons.map(f => `
    <button class="px-3 py-1.5 rounded-full text-xs font-semibold transition filter-clinic-chip ${activeFilter === f ? 'bg-teal-600 text-white shadow-sm' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-teal-500'}" data-filter="${f}">
      ${f}
    </button>
  `).join('');

  const clinicCardsHTML = filteredClinics.map(c => `
    <div class="clinical-card p-4 sm:p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition">
      <div>
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 uppercase tracking-wider">
              ${c.specialty}
            </span>
            <h3 class="font-bold text-sm sm:text-base text-slate-900 dark:text-white mt-1.5">${c.name}</h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-slate-400">location_on</span>
              <span>${c.address}</span>
            </p>
          </div>
          <div class="text-right shrink-0">
            <span class="inline-flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-800">
              ⭐ ${c.rating}
            </span>
            <span class="text-[10px] text-slate-400 block mt-0.5">${c.reviewsCount} reviews</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] text-teal-600 dark:text-teal-400">near_me</span>
            <span><strong>${c.distance}</strong></span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[16px] ${c.isOpen ? 'text-emerald-500' : 'text-slate-400'}">schedule</span>
            <span class="${c.isOpen ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-slate-400'}">${c.hours}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <a href="tel:${c.phone}" class="text-xs text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">call</span>
          <span>${c.phone}</span>
        </a>
        <button class="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition shadow-sm btn-open-clinic-modal" data-id="${c.id}">
          View Details
        </button>
      </div>
    </div>
  `).join('');

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Nearby Referral Clinics</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Directory of trusted secondary care centers, diagnostics facilities, and specialist referral clinics.</p>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="clinical-card p-4 space-y-3">
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <div class="flex-1 w-full flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">search</span>
            <input type="text" id="clinic-search-input" value="${escapeHTML(searchQuery)}" placeholder="Search clinic name, medical specialty, or location..." class="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none">
          </div>
          <div class="w-full sm:w-auto flex items-center gap-2 text-xs">
            <span class="text-slate-400 whitespace-nowrap">Location:</span>
            <select class="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium">
              <option>Mumbai (Within 10 km)</option>
              <option>Bengaluru</option>
              <option>Delhi NCR</option>
              <option>Pune</option>
            </select>
          </div>
        </div>

        <!-- Specialty Chips -->
        <div class="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
          ${filterChipsHTML}
        </div>
      </div>

      <!-- Main Layout: Clinic Cards Grid + Map Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Clinic Cards Grid (2 Cols) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Showing ${filteredClinics.length} clinical centers</span>
            <span>Sorted by Distance</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${clinicCardsHTML}
          </div>
        </div>

        <!-- Right: Map Placeholder Widget (1 Col) -->
        <div class="clinical-card p-4 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">map</span>
                Geographic Referral Map
              </h3>
              <span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono">Interactive</span>
            </div>

            <!-- Stylized Map Placeholder Visual -->
            <div class="relative w-full h-72 rounded-xl bg-gradient-to-br from-slate-200 via-teal-100 to-slate-300 dark:from-slate-800 dark:via-teal-950 dark:to-slate-900 border border-slate-300 dark:border-slate-700 overflow-hidden flex items-center justify-center">
              
              <!-- Map Grid Lines -->
              <div class="absolute inset-0 opacity-20 dark:opacity-30 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              <!-- Center Pulse Marker (Your Clinic) -->
              <div class="relative flex flex-col items-center z-10">
                <div class="w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg ring-4 ring-teal-400/40 animate-pulse">
                  <span class="material-symbols-outlined text-[14px]">local_hospital</span>
                </div>
                <span class="px-2 py-0.5 rounded bg-slate-900/90 text-white text-[10px] font-bold mt-1 shadow">AyuCare (You)</span>
              </div>

              <!-- Surrounding Clinic Pins -->
              <div class="absolute top-10 left-10 flex flex-col items-center">
                <div class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow">
                  <span class="material-symbols-outlined text-[12px]">medical_services</span>
                </div>
                <span class="text-[9px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Metro Neuro</span>
              </div>

              <div class="absolute bottom-12 right-12 flex flex-col items-center">
                <div class="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow">
                  <span class="material-symbols-outlined text-[12px]">health_and_safety</span>
                </div>
                <span class="text-[9px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Apex Ortho</span>
              </div>

              <div class="absolute top-16 right-16 flex flex-col items-center">
                <div class="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shadow">
                  <span class="material-symbols-outlined text-[12px]">child_care</span>
                </div>
                <span class="text-[9px] font-semibold text-slate-800 dark:text-slate-200 mt-0.5">Beacon Peds</span>
              </div>

            </div>
          </div>

          <div class="p-3 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-900 dark:text-teal-200 space-y-1">
            <p class="font-bold flex items-center gap-1">
              <span class="material-symbols-outlined text-[16px] text-teal-600 dark:text-teal-400">share_location</span>
              Direct Referral Dispatch
            </p>
            <p class="text-[11px] text-slate-600 dark:text-slate-300">Clicking any clinic enables direct digital referral letter generation with patient context attached.</p>
          </div>
        </div>

      </div>

    </div>

    <!-- Clinic Details Modal -->
    <div id="modal-clinic-details" class="ayucase-modal-overlay hidden">
      <div class="ayucase-modal-content max-w-xl" id="clinic-modal-body">
        <!-- Dynamically rendered via JS -->
      </div>
    </div>
  `;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[tag] || tag));
}
