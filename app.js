/**
 * AyuCase Clinical Suite — Main Application Controller & Router
 */

import { patientsData } from './patients.js';
import { consultationsData } from './consultations.js';
import { initialClinicalContext, simulatedAiResponses } from './differentials.js';
import { clinicsData } from './clinics.js';
import { initialNotifications } from './notifications.js';

import { renderSidebar } from './Sidebar.js';
import { renderTopBar } from './TopBar.js';
import { renderNewConsultModal } from './NewConsultModal.js';
import { renderNotificationPanel } from './NotificationPanel.js';
import { renderSearchModal } from './SearchModal.js';

import { renderDashboard } from './Dashboard.js';
import { renderChat } from './Chat.js';
import { renderMedicalHistory } from './MedicalHistory.js';
import { renderNearbyClinics } from './NearbyClinics.js';
import { renderSettings } from './Settings.js';
import { renderHelp } from './Help.js';

// Global State
class AppState {
  constructor() {
    this.load();
  }

  load() {
    this.currentRoute = (window.location.hash.replace('#', '') || 'dashboard');
    this.theme = localStorage.getItem('ayucase_theme') || 'light';
    this.patients = JSON.parse(localStorage.getItem('ayucase_patients')) || patientsData;
    this.consultations = JSON.parse(localStorage.getItem('ayucase_consultations')) || consultationsData;
    this.clinicalContext = JSON.parse(localStorage.getItem('ayucase_context')) || initialClinicalContext;
    this.notifications = JSON.parse(localStorage.getItem('ayucase_notifs')) || initialNotifications;
    this.settings = JSON.parse(localStorage.getItem('ayucase_settings')) || {
      theme: this.theme,
      doctorName: "DOCTOR",
      specialty: "Cardiologist & Internal Medicine",
      hospital: "AyuCare Multispecialty Medical Center",
      license: "MCI-2012-98442",
      notifications: { consultAlerts: true, followupReminders: true, systemUpdates: false, emailDigests: true },
      ai: { detailLevel: 'Balanced', showSuggestions: true, differentialSensitivity: 'High' }
    };

    // Chat conversation state
    this.chatMessages = JSON.parse(localStorage.getItem('ayucase_chat')) || [
      {
        role: 'doctor',
        content: 'Patient reports severe throbbing unilateral headache with nausea lasting for 48 hours. Pain scale 7/10. Aggravated by bright light.',
        timestamp: '10:45 AM'
      },
      {
        role: 'ai',
        content: `### 📋 Initial Clinical Case Evaluation
Based on the symptom presentation for **${this.clinicalContext.patientName} (${this.clinicalContext.age}M)**:

1. **Primary Clinical Consideration**: The unilateral throbbing character, photophobia, and accompanying nausea strongly favor **Migraine without Aura** (ICD-10 G43.0).
2. **Secondary Consideration**: Tension-Type Headache with vascular component.
3. **Safety Checklist**: Recommend screening against SNOOP criteria to definitively rule out acute secondary headache etiologies.

*Decision support suggestion. Attending physician judgment required.*`,
        timestamp: '10:46 AM'
      }
    ];

    // Page-specific ephemeral state
    this.selectedHistoryPatientId = this.clinicalContext.patientId || 'AYU-2026-081';
    this.activeHistoryTab = 'timeline';
    this.activeClinicFilter = 'All';
    this.clinicSearchQuery = '';
    this.activeAttachedFile = null;
    this.notifsOpen = false;
  }

  save() {
    localStorage.setItem('ayucase_theme', this.theme);
    localStorage.setItem('ayucase_patients', JSON.stringify(this.patients));
    localStorage.setItem('ayucase_consultations', JSON.stringify(this.consultations));
    localStorage.setItem('ayucase_context', JSON.stringify(this.clinicalContext));
    localStorage.setItem('ayucase_chat', JSON.stringify(this.chatMessages));
    localStorage.setItem('ayucase_notifs', JSON.stringify(this.notifications));
    localStorage.setItem('ayucase_settings', JSON.stringify(this.settings));
  }
}

const state = new AppState();

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  renderApp();
  setupGlobalEvents();
  window.addEventListener('hashchange', handleRouteChange);
});

// Apply Theme to Document
function applyTheme(theme) {
  state.theme = theme;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }
  state.save();
}

// Master Render Function
function renderApp() {
  const sidebarContainer = document.getElementById('sidebar-container');
  const topbarContainer = document.getElementById('topbar-container');
  const mainViewport = document.getElementById('main-viewport');
  const modalsContainer = document.getElementById('modals-container');

  // Render Sidebar
  sidebarContainer.innerHTML = renderSidebar(state.currentRoute);

  // Calculate Page Title
  let title = "Clinical Dashboard";
  let subtitle = "Overview of your consultations and patient activity.";
  if (state.currentRoute === 'chat') {
    title = `Case Taking: ${state.clinicalContext.patientName}`;
    subtitle = `Patient ID: ${state.clinicalContext.patientId} • AyuCase Diagnostics Engine Active`;
  } else if (state.currentRoute === 'history') {
    title = "Patient Medical History";
    subtitle = "Longitudinal consultation records, vitals, prescriptions & lab reports";
  } else if (state.currentRoute === 'clinics') {
    title = "Nearby Referral Clinics";
    subtitle = "Secondary medical centers and specialist referral directory";
  } else if (state.currentRoute === 'settings') {
    title = "Clinical Settings & Preferences";
    subtitle = "Configure physician credentials, appearance, and AI parameters";
  } else if (state.currentRoute === 'help') {
    title = "Help & Documentation";
    subtitle = "Clinical guidelines, FAQs, and EHR decision support protocols";
  }

  // Count unread notifications
  const unreadCount = state.notifications.filter(n => n.unread).length;

  // Render TopBar
  topbarContainer.innerHTML = renderTopBar(title, subtitle, unreadCount);

  // Render Modals Container
  modalsContainer.innerHTML = `
    ${renderNewConsultModal(state.patients)}
    ${renderSearchModal()}
    ${renderNotificationPanel(state.notifications)}
  `;

  // Render Page Content into Viewport
  renderCurrentPage(mainViewport);

  // Attach Page Event Listeners
  attachPageEvents();
}

// Render Page by Route
function renderCurrentPage(container) {
  switch (state.currentRoute) {
    case 'dashboard':
      container.innerHTML = renderDashboard(state.consultations, state.patients);
      break;
    case 'chat':
      container.innerHTML = renderChat(state.chatMessages, state.clinicalContext, state.clinicalContext.quickActions || []);
      // Scroll chat to bottom
      setTimeout(() => {
        const chatScroll = document.getElementById('chat-messages-container');
        if (chatScroll) chatScroll.scrollTop = chatScroll.scrollHeight;
      }, 50);
      break;
    case 'history':
      container.innerHTML = renderMedicalHistory(state.patients, state.selectedHistoryPatientId, state.activeHistoryTab);
      break;
    case 'clinics':
      container.innerHTML = renderNearbyClinics(clinicsData, state.activeClinicFilter, state.clinicSearchQuery);
      break;
    case 'settings':
      container.innerHTML = renderSettings(state.settings);
      break;
    case 'help':
      container.innerHTML = renderHelp();
      break;
    default:
      container.innerHTML = renderDashboard(state.consultations, state.patients);
  }
}

// Handle Hash Route Changes
function handleRouteChange() {
  state.currentRoute = window.location.hash.replace('#', '') || 'dashboard';
  renderApp();
}

// Global Event Listeners
function setupGlobalEvents() {
  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K for search)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      openModal('modal-global-search');
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) searchInput.focus();
    }
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Delegate TopBar Actions
  document.addEventListener('click', (e) => {
    // Theme Toggle
    if (e.target.closest('#btn-theme-toggle')) {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      renderApp();
      return;
    }

    // Search Trigger
    if (e.target.closest('#topbar-search-trigger')) {
      openModal('modal-global-search');
      const searchInput = document.getElementById('global-search-input');
      if (searchInput) searchInput.focus();
      return;
    }

    // New Consult Triggers (Sidebar, Topbar, Dashboard)
    if (e.target.closest('#btn-sidebar-new-consult') || e.target.closest('#btn-topbar-new-consult') || e.target.closest('#btn-dash-new-consult')) {
      openModal('modal-new-consult');
      return;
    }

    // Notifications Toggle
    if (e.target.closest('#btn-notifications-toggle')) {
      const panel = document.getElementById('panel-notifications');
      if (panel) {
        panel.classList.toggle('hidden');
      }
      return;
    }

    // Close notifications if clicked outside
    if (!e.target.closest('#btn-notifications-toggle') && !e.target.closest('#panel-notifications')) {
      const panel = document.getElementById('panel-notifications');
      if (panel && !panel.classList.contains('hidden')) {
        panel.classList.add('hidden');
      }
    }

    // Mark All Notifications as Read
    if (e.target.closest('#btn-mark-notifs-read')) {
      state.notifications.forEach(n => n.unread = false);
      state.save();
      renderApp();
      return;
    }

    // Mobile Sidebar Toggle
    if (e.target.closest('#btn-mobile-sidebar-toggle')) {
      const sidebar = document.querySelector('.ayucase-sidebar');
      if (sidebar) {
        sidebar.classList.toggle('hidden');
      }
    }

    // Modal Close buttons
    if (e.target.closest('#btn-close-new-consult') || e.target.closest('#btn-cancel-new-consult')) {
      closeModal('modal-new-consult');
    }
  });
}

// Page-Specific Event Attachments
function attachPageEvents() {
  // 1. DASHBOARD EVENTS
  document.querySelectorAll('.btn-open-chat-case').forEach(btn => {
    btn.addEventListener('click', () => {
      const patientId = btn.getAttribute('data-patient');
      const p = state.patients.find(pt => pt.id === patientId);
      if (p) switchActivePatientContext(p);
      window.location.hash = '#chat';
    });
  });

  document.querySelectorAll('.btn-view-history').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedHistoryPatientId = btn.getAttribute('data-patient');
      window.location.hash = '#history';
    });
  });

  // 2. CHAT & SYMPTOM CHECKER EVENTS
  const chatForm = document.getElementById('form-chat-input');
  const chatTextarea = document.getElementById('chat-textarea');
  const attachBtn = document.getElementById('btn-attach-file');
  const fileInput = document.getElementById('file-attachment-input');
  const removeAttachBtn = document.getElementById('btn-remove-attachment');
  const resetBtn = document.getElementById('btn-reset-chat');
  const cancelResetBtn = document.getElementById('btn-cancel-reset');
  const confirmResetBtn = document.getElementById('btn-confirm-reset');

  if (chatForm && chatTextarea) {
    // Textarea enter key submit
    chatTextarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        submitChatMessage();
      }
    });

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      submitChatMessage();
    });

    // Quick Action Pills
    document.querySelectorAll('.btn-quick-action').forEach(btn => {
      btn.addEventListener('click', () => {
        const prompt = btn.getAttribute('data-prompt');
        chatTextarea.value = prompt;
        submitChatMessage();
      });
    });

    // Attachment Handlers
    if (attachBtn && fileInput) {
      attachBtn.addEventListener('click', () => fileInput.click());
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          state.activeAttachedFile = {
            name: file.name,
            size: formatFileSize(file.size),
            type: file.type
          };
          const previewBar = document.getElementById('attachment-preview-bar');
          const nameSpan = document.getElementById('attached-filename');
          const sizeSpan = document.getElementById('attached-filesize');
          if (previewBar && nameSpan && sizeSpan) {
            nameSpan.textContent = state.activeAttachedFile.name;
            sizeSpan.textContent = `(${state.activeAttachedFile.size})`;
            previewBar.classList.remove('hidden');
          }
        }
      });
    }

    if (removeAttachBtn) {
      removeAttachBtn.addEventListener('click', () => {
        state.activeAttachedFile = null;
        if (fileInput) fileInput.value = '';
        const previewBar = document.getElementById('attachment-preview-bar');
        if (previewBar) previewBar.classList.add('hidden');
      });
    }

    // Reset Session Modal
    if (resetBtn) {
      resetBtn.addEventListener('click', () => openModal('modal-confirm-reset'));
    }
    if (cancelResetBtn) {
      cancelResetBtn.addEventListener('click', () => closeModal('modal-confirm-reset'));
    }
    if (confirmResetBtn) {
      confirmResetBtn.addEventListener('click', () => {
        state.chatMessages = [
          {
            role: 'ai',
            content: `### 🩺 Consultation Session Initialized
Ready to take clinical case history for **${state.clinicalContext.patientName} (${state.clinicalContext.patientId})**.
Please enter presenting symptoms or click any quick prompt below to begin intake.`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ];
        state.save();
        closeModal('modal-confirm-reset');
        renderApp();
      });
    }

    // Next Step Checkboxes in Clinical Context
    document.querySelectorAll('.checkbox-next-step').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const stepId = cb.getAttribute('data-id');
        const step = (state.clinicalContext.suggestedNextSteps || []).find(s => s.id === stepId);
        if (step) {
          step.completed = cb.checked;
          state.save();
          renderApp();
        }
      });
    });
  }

  // 3. MEDICAL HISTORY EVENTS
  document.querySelectorAll('.patient-select-item').forEach(item => {
    item.addEventListener('click', () => {
      state.selectedHistoryPatientId = item.getAttribute('data-id');
      renderApp();
    });
  });

  document.querySelectorAll('.history-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeHistoryTab = btn.getAttribute('data-tab');
      renderApp();
    });
  });

  const historyPatientFilter = document.getElementById('patient-search-filter');
  if (historyPatientFilter) {
    historyPatientFilter.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.patient-select-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }

  const btnHistoryOpenChat = document.getElementById('btn-history-open-chat');
  if (btnHistoryOpenChat) {
    btnHistoryOpenChat.addEventListener('click', () => {
      const p = state.patients.find(pt => pt.id === state.selectedHistoryPatientId);
      if (p) switchActivePatientContext(p);
      window.location.hash = '#chat';
    });
  }

  // 4. NEARBY CLINICS EVENTS
  document.querySelectorAll('.filter-clinic-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeClinicFilter = btn.getAttribute('data-filter');
      renderApp();
    });
  });

  const clinicSearchInput = document.getElementById('clinic-search-input');
  if (clinicSearchInput) {
    clinicSearchInput.addEventListener('input', (e) => {
      state.clinicSearchQuery = e.target.value;
      renderApp();
    });
  }

  document.querySelectorAll('.btn-open-clinic-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const clinicId = btn.getAttribute('data-id');
      const clinic = clinicsData.find(c => c.id === clinicId);
      if (clinic) openClinicDetailsModal(clinic);
    });
  });

  // 5. SETTINGS EVENTS
  const settingsForm = document.getElementById('form-settings');
  if (settingsForm) {
    settingsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const themeRadio = document.querySelector('input[name="theme-radio"]:checked');
      if (themeRadio) applyTheme(themeRadio.value);

      state.settings = {
        theme: state.theme,
        doctorName: document.getElementById('setting-name').value.trim(),
        specialty: document.getElementById('setting-specialty').value.trim(),
        hospital: document.getElementById('setting-hospital').value.trim(),
        license: document.getElementById('setting-license').value.trim(),
        notifications: {
          consultAlerts: document.getElementById('notif-consult').checked,
          followupReminders: document.getElementById('notif-followup').checked,
          emailDigests: document.getElementById('notif-digest').checked
        },
        ai: {
          detailLevel: document.getElementById('setting-ai-detail').value,
          differentialSensitivity: document.getElementById('setting-ai-sensitivity').value
        }
      };

      state.save();
      renderApp();
      alert("Settings and physician profile saved successfully!");
    });
  }

  // 6. HELP & FAQ EVENTS
  document.querySelectorAll('.faq-accordion-item').forEach(item => {
    item.addEventListener('click', () => {
      const content = item.querySelector('.faq-content');
      const icon = item.querySelector('.faq-icon');
      if (content) {
        const isHidden = content.classList.contains('hidden');
        content.classList.toggle('hidden');
        if (icon) icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  const faqSearchInput = document.getElementById('faq-search-input');
  if (faqSearchInput) {
    faqSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.faq-accordion-item').forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'block' : 'none';
      });
    });
  }

  // 7. NEW CONSULTATION MODAL FORM
  const consultForm = document.getElementById('form-new-consult');
  const consultSelect = document.getElementById('consult-patient-select');
  if (consultSelect) {
    consultSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val !== 'new') {
        const selected = state.patients.find(p => p.id === val);
        if (selected) {
          document.getElementById('consult-patient-name').value = selected.name;
          document.getElementById('consult-patient-age').value = selected.age;
          document.getElementById('consult-patient-gender').value = selected.gender;
          document.getElementById('consult-patient-bp').value = selected.vitals.bp;
          document.getElementById('consult-patient-hr').value = selected.vitals.hr;
          document.getElementById('consult-chief-complaint').value = selected.primaryCondition;
          document.getElementById('consult-history').value = selected.chronicConditions.join(', ') + ' (Allergies: ' + selected.allergies.join(', ') + ')';
        }
      } else {
        document.getElementById('consult-patient-name').value = '';
        document.getElementById('consult-chief-complaint').value = '';
      }
    });
  }

  if (consultForm) {
    consultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pName = document.getElementById('consult-patient-name').value.trim();
      const pAge = parseInt(document.getElementById('consult-patient-age').value) || 45;
      const pGender = document.getElementById('consult-patient-gender').value;
      const pBp = document.getElementById('consult-patient-bp').value || '120/80';
      const pHr = document.getElementById('consult-patient-hr').value || '72';
      const pComplaint = document.getElementById('consult-chief-complaint').value.trim();
      const pId = `AYU-2026-${Math.floor(100 + Math.random() * 900)}`;

      // Create new patient record
      const newPatient = {
        id: pId,
        name: pName,
        age: pAge,
        gender: pGender,
        bloodGroup: 'B+',
        phone: '+91 98000 00000',
        email: `${pName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        address: 'Mumbai, India',
        lastVisit: 'Today',
        primaryCondition: pComplaint,
        status: 'Active',
        vitals: { bp: pBp, hr: pHr, temp: '98.6 °F', spo2: '99%', weight: '70 kg', height: '170 cm', bmi: '24.2' },
        allergies: ['None documented'],
        chronicConditions: ['Pending evaluation'],
        medications: [],
        notes: `Initial intake: ${pComplaint}`,
        timeline: [{ date: 'Today', type: 'Consultation', summary: pComplaint, doctor: state.settings.doctorName, status: 'Active' }]
      };

      state.patients.unshift(newPatient);

      // Create consultation log
      const newConsult = {
        id: `CNS-2026-${Math.floor(200 + Math.random() * 800)}`,
        patientId: pId,
        patientName: pName,
        age: pAge,
        gender: pGender,
        primaryComplaint: pComplaint,
        severity: '6/10',
        status: 'Active',
        acuity: 'Urgent',
        lastUpdated: 'Just now',
        date: 'Today',
        doctor: state.settings.doctorName,
        differentialSummary: 'Evaluating clinical differentials'
      };

      state.consultations.unshift(newConsult);

      // Switch context & start chat
      switchActivePatientContext(newPatient);

      state.chatMessages = [
        {
          role: 'doctor',
          content: `Initiating new case intake for ${pName} (${pId}, ${pAge}y ${pGender}). Chief Complaint: ${pComplaint}`,
          timestamp: 'Just now'
        },
        {
          role: 'ai',
          content: `### 📋 New Case Registered: ${pName} (${pId})
Chief Complaint recorded: **${pComplaint}** (BP: ${pBp}, HR: ${pHr} bpm).

**Initial Recommendations**:
1. Inquire about symptom onset duration and progression rate.
2. Screen for associated neurological or systemic red flags.
3. Review any previous medication trials.`,
          timestamp: 'Just now'
        }
      ];

      state.save();
      closeModal('modal-new-consult');
      window.location.hash = '#chat';
    });
  }

  // 8. GLOBAL SEARCH INPUT FILTER
  const globalSearchInput = document.getElementById('global-search-input');
  if (globalSearchInput) {
    globalSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const resultsContainer = document.getElementById('global-search-results');
      if (!q) {
        resultsContainer.innerHTML = '<div class="p-6 text-center text-slate-400">Type patient name, medical complaint, or clinic to search</div>';
        return;
      }

      const matchedPatients = state.patients.filter(p => p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.primaryCondition.toLowerCase().includes(q));
      const matchedClinics = clinicsData.filter(c => c.name.toLowerCase().includes(q) || c.specialty.toLowerCase().includes(q));

      let html = '';
      if (matchedPatients.length > 0) {
        html += `<div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Patients & Consultations</div>`;
        matchedPatients.forEach(p => {
          html += `
            <div class="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between global-search-patient-item" data-id="${p.id}">
              <div>
                <strong class="text-slate-900 dark:text-white text-xs">${p.name}</strong>
                <span class="text-[10px] text-slate-400 font-mono ml-1">(${p.id})</span>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">${p.primaryCondition}</p>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">${p.status}</span>
            </div>
          `;
        });
      }

      if (matchedClinics.length > 0) {
        html += `<div class="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mt-2">Referral Clinics</div>`;
        matchedClinics.forEach(c => {
          html += `
            <div class="p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between global-search-clinic-item" data-id="${c.id}">
              <div>
                <strong class="text-slate-900 dark:text-white text-xs">${c.name}</strong>
                <p class="text-[11px] text-slate-500 dark:text-slate-400">${c.specialty} • ${c.distance}</p>
              </div>
              <span class="text-[10px] text-amber-500 font-bold">⭐ ${c.rating}</span>
            </div>
          `;
        });
      }

      if (!html) {
        html = `<div class="p-6 text-center text-slate-400 text-xs">No matching patients or clinics found for "${escapeHTML(q)}"</div>`;
      }

      resultsContainer.innerHTML = html;

      // Attach click events to search results
      document.querySelectorAll('.global-search-patient-item').forEach(el => {
        el.addEventListener('click', () => {
          const pid = el.getAttribute('data-id');
          const p = state.patients.find(pt => pt.id === pid);
          if (p) switchActivePatientContext(p);
          closeModal('modal-global-search');
          window.location.hash = '#chat';
        });
      });

      document.querySelectorAll('.global-search-clinic-item').forEach(el => {
        el.addEventListener('click', () => {
          const cid = el.getAttribute('data-id');
          closeModal('modal-global-search');
          window.location.hash = '#clinics';
        });
      });
    });
  }
}

// Switch Active Patient Context
function switchActivePatientContext(patient) {
  state.clinicalContext.patientId = patient.id;
  state.clinicalContext.patientName = patient.name;
  state.clinicalContext.age = patient.age;
  state.clinicalContext.gender = patient.gender;
  state.clinicalContext.vitals = patient.vitals;
  state.selectedHistoryPatientId = patient.id;
  state.save();
}

// Submit Doctor Chat Message & Generate AI Response
function submitChatMessage() {
  const textarea = document.getElementById('chat-textarea');
  if (!textarea) return;
  const text = textarea.value.trim();
  if (!text) return;

  const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Add doctor message
  const userMsg = {
    role: 'doctor',
    content: text,
    timestamp: nowTime
  };

  if (state.activeAttachedFile) {
    userMsg.attachment = { ...state.activeAttachedFile };
    state.activeAttachedFile = null;
    const previewBar = document.getElementById('attachment-preview-bar');
    if (previewBar) previewBar.classList.add('hidden');
  }

  state.chatMessages.push(userMsg);
  textarea.value = '';
  textarea.style.height = 'auto';

  state.save();
  renderApp();

  // Show typing indicator
  const typingIndicator = document.getElementById('chat-typing-indicator');
  if (typingIndicator) typingIndicator.classList.remove('hidden');

  // Generate simulated AI clinical decision-support response
  setTimeout(() => {
    if (typingIndicator) typingIndicator.classList.add('hidden');

    const lowerText = text.toLowerCase();
    let aiResponse = simulatedAiResponses["default"];

    if (lowerText.includes("red flag") || lowerText.includes("snoop")) {
      aiResponse = simulatedAiResponses["red flags"];
    } else if (lowerText.includes("duration") || lowerText.includes("how long")) {
      aiResponse = simulatedAiResponses["duration"];
    } else if (lowerText.includes("severity") || lowerText.includes("scale") || lowerText.includes("pain")) {
      aiResponse = simulatedAiResponses["severity"];
    } else if (lowerText.includes("medication") || lowerText.includes("prescription") || lowerText.includes("drug") || lowerText.includes("dose")) {
      aiResponse = simulatedAiResponses["medications"];
    } else if (lowerText.includes("allergy") || lowerText.includes("allergic")) {
      aiResponse = simulatedAiResponses["allergies"];
    } else {
      aiResponse = `### 📋 Clinical Assessment for ${state.clinicalContext.patientName}
Regarding your inquiry: *"${escapeHTML(text)}"*

1. **Differential Impact**: Findings correlate with active differential profile (**${state.clinicalContext.activeDifferentials[0]?.condition || 'Primary Headache Disorder'}**).
2. **Physician Guidance**: Ensure blood pressure remains stable before administering vasoconstrictive abortive agents.
3. **Follow-up Protocol**: Continue tracking symptom episodes in the digital case sheet.

*AI-generated clinical decision support only. Clinical verification required.*`;
    }

    state.chatMessages.push({
      role: 'ai',
      content: aiResponse,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    state.save();
    renderApp();
  }, 1000);
}

// Open Clinic Details Modal
function openClinicDetailsModal(clinic) {
  const modalContainer = document.getElementById('modal-clinic-details');
  const modalBody = document.getElementById('clinic-modal-body');
  if (!modalContainer || !modalBody) return;

  const doctorsList = clinic.doctors.map(d => `
    <li class="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-800 text-xs">
      <div>
        <strong class="text-slate-900 dark:text-white">${d.name}</strong>
        <span class="text-[11px] text-slate-500 dark:text-slate-400 block">${d.role}</span>
      </div>
      <span class="text-[10px] text-teal-600 dark:text-teal-400 font-mono font-semibold">${d.exp}</span>
    </li>
  `).join('');

  const facilitiesList = clinic.facilities.map(f => `
    <span class="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium">✓ ${f}</span>
  `).join('');

  modalBody.innerHTML = `
    <div class="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
      <div>
        <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 uppercase tracking-wider">${clinic.specialty}</span>
        <h3 class="font-bold text-base text-slate-900 dark:text-white mt-1">${clinic.name}</h3>
      </div>
      <button class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" onclick="document.getElementById('modal-clinic-details').classList.add('hidden')">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
    </div>

    <div class="p-5 space-y-4 text-xs">
      <div class="space-y-1 text-slate-600 dark:text-slate-300">
        <p class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-teal-600">location_on</span> ${clinic.address} (<strong>${clinic.distance}</strong>)</p>
        <p class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-teal-600">schedule</span> ${clinic.hours}</p>
        <p class="flex items-center gap-1.5"><span class="material-symbols-outlined text-[16px] text-teal-600">call</span> <strong>${clinic.phone}</strong> • ${clinic.email}</p>
      </div>

      <div>
        <h4 class="font-bold text-slate-900 dark:text-white mb-2">Specialist Physicians on Duty</h4>
        <ul class="space-y-1.5">${doctorsList}</ul>
      </div>

      <div>
        <h4 class="font-bold text-slate-900 dark:text-white mb-1.5">Diagnostic Facilities</h4>
        <div class="flex flex-wrap gap-1.5">${facilitiesList}</div>
      </div>

      <div class="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span class="text-amber-500 font-bold">⭐ ${clinic.rating} / 5.0 (${clinic.reviewsCount} reviews)</span>
        <a href="tel:${clinic.phone}" class="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-1.5 transition">
          <span class="material-symbols-outlined text-[16px]">call</span>
          <span>Contact Clinic</span>
        </a>
      </div>
    </div>
  `;

  modalContainer.classList.remove('hidden');
}

// Modal Helpers
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('hidden');
}

function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('hidden');
}

function closeAllModals() {
  document.querySelectorAll('.ayucase-modal-overlay').forEach(m => m.classList.add('hidden'));
}

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
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
