/**
 * AyuCase Clinical Suite — Page 5: Clinical Settings & System Configuration
 */

export function renderSettings(settings = {}) {
  const currentTheme = settings.theme || 'light';
  const notifs = settings.notifications || {
    consultAlerts: true,
    followupReminders: true,
    systemUpdates: false,
    emailDigests: true
  };
  const aiConfig = settings.ai || {
    detailLevel: 'Balanced',
    showSuggestions: true,
    differentialSensitivity: 'High'
  };

  return `
    <div class="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto overflow-y-auto">
      
      <!-- Header -->
      <div class="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">System Settings & Preferences</h1>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">Manage physician profile, appearance, notification alerts, and AI decision-support parameters.</p>
      </div>

      <form id="form-settings" class="space-y-6">
        
        <!-- 1. Physician Profile Section -->
        <div class="clinical-card p-5 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">person</span>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">Physician & Hospital Profile</h3>
          </div>

          <div class="flex flex-col sm:flex-row items-start gap-4 pt-1">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 w-full text-xs">
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Full Name</label>
                <input type="text" id="setting-name" value="DOCTOR" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500 font-semibold">
              </div>
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Primary Specialty & Role</label>
                <input type="text" id="setting-specialty" value="Cardiologist & Internal Medicine" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
              </div>
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Hospital / Clinic Affiliation</label>
                <input type="text" id="setting-hospital" value="AyuCare Multispecialty Medical Center" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
              </div>
              <div>
                <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Medical Registration / License ID</label>
                <input type="text" id="setting-license" value="MCI-2012-98442" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:border-teal-500">
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Appearance & Theme Selection -->
        <div class="clinical-card p-5 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">palette</span>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">Appearance & Theme</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label class="p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${currentTheme === 'light' ? 'border-teal-600 bg-teal-50/40 dark:bg-teal-950/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
              <div class="flex items-center gap-3">
                <input type="radio" name="theme-radio" value="light" ${currentTheme === 'light' ? 'checked' : ''} class="text-teal-600 focus:ring-teal-500">
                <div>
                  <strong class="text-slate-900 dark:text-white block text-sm">Clinical Light Mode</strong>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">High-contrast daylight theme for clinic rooms</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-[24px] text-amber-500">light_mode</span>
            </label>

            <label class="p-4 rounded-xl border-2 transition cursor-pointer flex items-center justify-between ${currentTheme === 'dark' ? 'border-teal-600 bg-teal-50/40 dark:bg-teal-950/20' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'}">
              <div class="flex items-center gap-3">
                <input type="radio" name="theme-radio" value="dark" ${currentTheme === 'dark' ? 'checked' : ''} class="text-teal-600 focus:ring-teal-500">
                <div>
                  <strong class="text-slate-900 dark:text-white block text-sm">Deep Teal Dark Mode</strong>
                  <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Calm low-light theme reducing eye strain</p>
                </div>
              </div>
              <span class="material-symbols-outlined text-[24px] text-teal-400">dark_mode</span>
            </label>
          </div>
        </div>

        <!-- 3. Notification Toggles -->
        <div class="clinical-card p-5 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">notifications</span>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">Notification Alert Preferences</h3>
          </div>

          <div class="space-y-3 text-xs">
            <label class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <div>
                <strong class="text-slate-900 dark:text-white block">Consultation Review Alerts</strong>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Notify when new physical therapy or radiology reports are uploaded</p>
              </div>
              <input type="checkbox" id="notif-consult" ${notifs.consultAlerts ? 'checked' : ''} class="rounded text-teal-600 focus:ring-teal-500 h-4 w-4">
            </label>

            <label class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <div>
                <strong class="text-slate-900 dark:text-white block">Scheduled Follow-up Reminders</strong>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Daily morning reminder of patients due for chronic condition reviews</p>
              </div>
              <input type="checkbox" id="notif-followup" ${notifs.followupReminders ? 'checked' : ''} class="rounded text-teal-600 focus:ring-teal-500 h-4 w-4">
            </label>

            <label class="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
              <div>
                <strong class="text-slate-900 dark:text-white block">Weekly Clinical Digest Emails</strong>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">Summarized metrics of consultations completed and active cases</p>
              </div>
              <input type="checkbox" id="notif-digest" ${notifs.emailDigests ? 'checked' : ''} class="rounded text-teal-600 focus:ring-teal-500 h-4 w-4">
            </label>
          </div>
        </div>

        <!-- 4. AI Decision-Support Parameters -->
        <div class="clinical-card p-5 space-y-4">
          <div class="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400">psychology</span>
            <h3 class="font-bold text-sm text-slate-900 dark:text-white">AyuCase Diagnostics Engine AI Settings</h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">AI Output Detail Level</label>
              <select id="setting-ai-detail" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
                <option value="Concise" ${aiConfig.detailLevel === 'Concise' ? 'selected' : ''}>Concise (Key clinical points only)</option>
                <option value="Balanced" ${aiConfig.detailLevel === 'Balanced' ? 'selected' : ''}>Balanced (Standard decision support)</option>
                <option value="Detailed" ${aiConfig.detailLevel === 'Detailed' ? 'selected' : ''}>Comprehensive (Full differential breakdown)</option>
              </select>
            </div>

            <div>
              <label class="block font-medium text-slate-600 dark:text-slate-400 mb-1">Differential Calculation Sensitivity</label>
              <select id="setting-ai-sensitivity" class="w-full px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-500">
                <option value="High" ${aiConfig.differentialSensitivity === 'High' ? 'selected' : ''}>High (Includes rare secondary conditions)</option>
                <option value="Standard" ${aiConfig.differentialSensitivity === 'Standard' ? 'selected' : ''}>Standard (Leading primary differentials)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 5. Privacy & Governance Notice -->
        <div class="p-4 rounded-xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/80 dark:border-teal-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
          <span class="material-symbols-outlined text-[20px] text-teal-600 dark:text-teal-400 shrink-0">security</span>
          <div>
            <strong class="text-slate-900 dark:text-white">Clinical Data Governance & Local Persistence</strong>
            <p class="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
              All consultation drafts, patient notes, and customized parameters are securely persisted in local browser storage (LocalStorage). No sensitive clinical health data is transmitted to unauthorized third-party endpoints.
            </p>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end">
          <button type="submit" class="px-6 py-2.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition">
            <span class="material-symbols-outlined text-[18px]">save</span>
            <span>Save Settings</span>
          </button>
        </div>

      </form>

    </div>
  `;
}
