/**
 * AyuCase Clinical Suite — Page 3: Medical History & Clinical Timeline
 */

export function renderMedicalHistory(patients = [], selectedPatientId = 'AYU-2026-081', activeTab = 'timeline') {
  const patient = patients.find(p => p.id === selectedPatientId) || patients[0] || {};

  // Patient List Sidebar HTML
  const patientListHTML = patients.map(p => {
    const isSelected = p.id === patient.id;
    return `
      <div class="p-3 rounded-xl border transition cursor-pointer patient-select-item ${isSelected ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-500/60 shadow-sm' : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 hover:border-slate-300'}" data-id="${p.id}">
        <div class="flex items-center justify-between">
          <h4 class="font-bold text-xs text-slate-900 dark:text-white">${p.name}</h4>
          <span class="text-[10px] font-mono font-semibold text-slate-400">${p.id}</span>
        </div>
        <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">${p.primaryCondition}</p>
        <div class="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100 dark:border-slate-700/50 text-[10px] text-slate-400">
          <span>Last Visit: ${p.lastVisit}</span>
          <span class="font-semibold text-teal-600 dark:text-teal-400">${p.status}</span>
        </div>
      </div>
    `;
  }).join('');

  // 1. Timeline Tab HTML
  const timelineHTML = (patient.timeline || []).map(t => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-1">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-bold text-xs text-slate-900 dark:text-white">${t.type}</span>
            <span class="text-[10px] px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">${t.status}</span>
          </div>
          <span class="text-[11px] font-mono text-slate-500 dark:text-slate-400">${t.date}</span>
        </div>
        <p class="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">${t.summary}</p>
        <p class="text-[10px] text-slate-400 font-medium pt-1">Attending: ${t.doctor}</p>
      </div>
    </div>
  `).join('');

  // 2. Vitals & Labs Tab HTML
  const vitals = patient.vitals || {};
  const vitalsHTML = `
    <div class="space-y-4">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-400 block text-[10px] font-semibold uppercase">Blood Pressure</span>
          <h4 class="text-base font-bold font-mono text-slate-900 dark:text-white mt-1">${vitals.bp || '120/80'}</h4>
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Normotensive Range</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-400 block text-[10px] font-semibold uppercase">Heart Rate</span>
          <h4 class="text-base font-bold font-mono text-slate-900 dark:text-white mt-1">${vitals.hr || '72 bpm'}</h4>
          <span class="text-[10px] text-teal-600 dark:text-teal-400 font-medium">Regular Sinus</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-400 block text-[10px] font-semibold uppercase">Temperature</span>
          <h4 class="text-base font-bold font-mono text-slate-900 dark:text-white mt-1">${vitals.temp || '98.6 °F'}</h4>
          <span class="text-[10px] text-slate-500 font-medium">Afebrile</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <span class="text-slate-400 block text-[10px] font-semibold uppercase">SpO2 Oxygen</span>
          <h4 class="text-base font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">${vitals.spo2 || '99%'}</h4>
          <span class="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Optimal Saturation</span>
        </div>
      </div>

      <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
        <h4 class="font-bold text-xs text-slate-900 dark:text-white mb-2">Anthropometrics & Index</h4>
        <div class="grid grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
          <div><span class="text-slate-400 block text-[10px]">Weight:</span> <strong>${vitals.weight || '70 kg'}</strong></div>
          <div><span class="text-slate-400 block text-[10px]">Height:</span> <strong>${vitals.height || '170 cm'}</strong></div>
          <div><span class="text-slate-400 block text-[10px]">Body Mass Index:</span> <strong class="text-teal-600 dark:text-teal-400">${vitals.bmi || '24.2'}</strong></div>
        </div>
      </div>
    </div>
  `;

  // 3. Medications Tab HTML
  const medicationsHTML = (patient.medications || []).map(m => `
    <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
      <div>
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px] text-teal-600 dark:text-teal-400">pill</span>
          <strong class="text-slate-900 dark:text-white text-sm">${m.name}</strong>
          <span class="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono font-semibold">${m.dosage}</span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-[11px] mt-1 pl-6">${m.freq}</p>
      </div>
      <div class="text-right text-[11px] text-slate-400">
        <span>Prescribed: ${m.startDate}</span>
      </div>
    </div>
  `).join('');

  // 4. Allergies & Notes Tab HTML
  const allergiesHTML = (patient.allergies || []).map(a => `
    <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
      <span class="material-symbols-outlined text-[16px]">warning</span>
      ${a}
    </span>
  `).join('');

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto overflow-y-auto">
      
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Patient Medical History</h1>
          <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Comprehensive clinical records, longitudinal timelines, prescriptions, and lab history.</p>
        </div>
        <button id="btn-history-open-chat" class="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition">
          <span class="material-symbols-outlined text-[18px]">forum</span>
          <span>Open Case in Chat</span>
        </button>
      </div>

      <!-- Main Layout: 2 Columns (Patient Selector + Detailed Case Sheet) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left Column: Patient Directory & Search -->
        <div class="clinical-card p-4 space-y-3">
          <div class="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span class="material-symbols-outlined text-[18px] text-slate-400">search</span>
            <input type="text" id="patient-search-filter" placeholder="Search by name or ID..." class="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none">
          </div>
          <div class="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">Registered Patients (${patients.length})</div>
          <div class="space-y-2 max-h-[600px] overflow-y-auto" id="patient-list-container">
            ${patientListHTML}
          </div>
        </div>

        <!-- Right Column: Patient Profile & Tabbed Records -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Patient Summary Banner -->
          <div class="clinical-card p-5 bg-gradient-to-r from-teal-900/10 via-slate-50 to-white dark:from-teal-950/40 dark:via-slate-900 dark:to-slate-900 border-teal-500/20">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl bg-teal-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                  ${patient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <h2 class="text-lg font-bold text-slate-900 dark:text-white">${patient.name}</h2>
                    <span class="px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-300 font-mono text-[11px] font-bold">${patient.id}</span>
                  </div>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${patient.age} years old • ${patient.gender} • Blood Group: <strong class="text-slate-700 dark:text-slate-300">${patient.bloodGroup}</strong></p>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">📞 ${patient.phone} • 📍 ${patient.address}</p>
                </div>
              </div>
              <div class="flex sm:flex-col items-end gap-1">
                <span class="badge-status badge-active text-xs">${patient.status}</span>
                <span class="text-[11px] text-slate-400">Last Seen: ${patient.lastVisit}</span>
              </div>
            </div>
          </div>

          <!-- Tab Navigation -->
          <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold select-none">
            <button class="px-4 py-2.5 border-b-2 font-semibold transition history-tab-btn ${activeTab === 'timeline' ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}" data-tab="timeline">
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[18px]">timeline</span>Clinical Timeline</span>
            </button>
            <button class="px-4 py-2.5 border-b-2 font-semibold transition history-tab-btn ${activeTab === 'vitals' ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}" data-tab="vitals">
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[18px]">vital_signs</span>Vitals & Labs</span>
            </button>
            <button class="px-4 py-2.5 border-b-2 font-semibold transition history-tab-btn ${activeTab === 'meds' ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}" data-tab="meds">
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[18px]">medication</span>Prescriptions</span>
            </button>
            <button class="px-4 py-2.5 border-b-2 font-semibold transition history-tab-btn ${activeTab === 'notes' ? 'border-teal-500 text-teal-600 dark:text-teal-400' : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400'}" data-tab="notes">
              <span class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[18px]">note_alt</span>Allergies & Notes</span>
            </button>
          </div>

          <!-- Tab Content Area -->
          <div class="clinical-card p-5">
            ${activeTab === 'timeline' ? `
              <div>
                <h3 class="font-bold text-sm text-slate-900 dark:text-white mb-4">Longitudinal Consultation History</h3>
                <div class="space-y-2">${timelineHTML}</div>
              </div>
            ` : ''}

            ${activeTab === 'vitals' ? vitalsHTML : ''}

            ${activeTab === 'meds' ? `
              <div class="space-y-4">
                <h3 class="font-bold text-sm text-slate-900 dark:text-white">Active Pharmacotherapy</h3>
                <div class="space-y-2.5">${medicationsHTML}</div>
              </div>
            ` : ''}

            ${activeTab === 'notes' ? `
              <div class="space-y-4 text-xs">
                <div>
                  <h4 class="font-bold text-slate-900 dark:text-white mb-2">Documented Drug & Environmental Allergies</h4>
                  <div class="flex flex-wrap gap-2">${allergiesHTML}</div>
                </div>
                <div class="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <h4 class="font-bold text-slate-900 dark:text-white mb-1.5">Attending Physician Notes</h4>
                  <div class="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-relaxed">
                    ${patient.notes}
                  </div>
                </div>
              </div>
            ` : ''}
          </div>

        </div>

      </div>

    </div>
  `;
}
