/**
 * AyuCase Clinical Suite — Page 2: Chat & Symptom Checker
 */

import { renderClinicalContext } from './ClinicalContext.js';

export function renderChat(chatMessages = [], contextData, quickActions = []) {
  // Render message stream
  const messagesHTML = chatMessages.map(msg => {
    if (msg.role === 'doctor') {
      return `
        <div class="flex justify-end items-end gap-2.5 message-row">
          <div class="msg-bubble-doctor">
            <p class="whitespace-pre-wrap">${escapeHTML(msg.content)}</p>
            ${msg.attachment ? `
              <div class="mt-2 pt-2 border-t border-teal-600/40 flex items-center gap-1.5 text-[11px] text-teal-200">
                <span class="material-symbols-outlined text-[16px]">attach_file</span>
                <span>Attached: <strong>${escapeHTML(msg.attachment.name)}</strong> (${msg.attachment.size})</span>
              </div>
            ` : ''}
            <span class="text-[10px] text-teal-200/70 block text-right mt-1">${msg.timestamp || 'Just now'}</span>
          </div>
          <span class="w-7 h-7 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-800 shrink-0 mb-1" title="DOCTOR">
            <span class="material-symbols-outlined text-[16px]">person</span>
          </span>
        </div>
      `;
    } else {
      return `
        <div class="flex justify-start items-start gap-2.5 message-row">
          <div class="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-800 shrink-0 mt-1 shadow-sm">
            <span class="material-symbols-outlined text-[18px]">smart_toy</span>
          </div>
          <div class="msg-bubble-ai">
            <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5 mb-2">
              <span class="font-bold text-xs text-teal-700 dark:text-teal-400 flex items-center gap-1">
                Dr. Bot (AI Assistant)
                <span class="text-[10px] font-normal text-slate-400">• Decision Support</span>
              </span>
              <span class="text-[10px] text-slate-400 font-mono">${msg.timestamp || 'Just now'}</span>
            </div>
            <div class="prose prose-sm dark:prose-invert max-w-none text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              ${formatAiMarkdown(msg.content)}
            </div>
          </div>
        </div>
      `;
    }
  }).join('');

  // Quick Action Buttons HTML
  const quickActionsHTML = quickActions.map(action => `
    <button class="quick-action-pill btn-quick-action" data-prompt="${escapeHTML(action.prompt)}">
      <span class="material-symbols-outlined text-[14px] text-teal-600 dark:text-teal-400">add_comment</span>
      <span>${action.label}</span>
    </button>
  `).join('');

  return `
    <div class="flex-1 flex h-full overflow-hidden relative">
      
      <!-- Main Chat Center Column -->
      <div class="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
        
        <!-- Chat Header -->
        <div class="h-14 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0 z-10">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-800">
              <span class="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Dr. Bot (AI Assistant)</h3>
                <span class="flex items-center gap-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </span>
              </div>
              <p class="text-[11px] text-slate-500 dark:text-slate-400">Powered by AyuCase Diagnostics Engine v2.4</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <!-- Reset Session Button -->
            <button id="btn-reset-chat" class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold flex items-center gap-1 transition" title="Clear current session and reset conversation">
              <span class="material-symbols-outlined text-[16px] text-amber-500">restart_alt</span>
              <span class="hidden sm:inline">Reset Session</span>
            </button>

            <!-- Toggle Context on Mobile -->
            <button id="btn-toggle-context" class="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <span class="material-symbols-outlined text-[20px]">side_navigation</span>
            </button>
          </div>
        </div>

        <!-- Chat Messages Scroll Container -->
        <div id="chat-messages-container" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          ${messagesHTML}
        </div>

        <!-- AI Typing Indicator -->
        <div id="chat-typing-indicator" class="hidden px-6 py-2 flex items-center gap-2 text-xs text-teal-600 dark:text-teal-400 bg-white/60 dark:bg-slate-900/60 border-t border-slate-200/60 dark:border-slate-800/60">
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-bounce"></span>
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-bounce delay-100"></span>
          <span class="w-2 h-2 rounded-full bg-teal-500 animate-bounce delay-200"></span>
          <span class="text-[11px] font-medium ml-1">Dr. Bot is analyzing clinical parameters...</span>
        </div>

        <!-- Quick Actions Bar -->
        <div class="px-4 sm:px-6 py-2 bg-white/80 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Quick Prompts:</span>
          ${quickActionsHTML}
        </div>

        <!-- Attachment Preview Bar (if file selected) -->
        <div id="attachment-preview-bar" class="hidden px-4 sm:px-6 py-2 bg-teal-50 dark:bg-teal-950/40 border-t border-teal-200 dark:border-teal-800/60 flex items-center justify-between text-xs text-teal-800 dark:text-teal-200">
          <div class="flex items-center gap-2 truncate">
            <span class="material-symbols-outlined text-[18px] text-teal-600 dark:text-teal-400">description</span>
            <span id="attached-filename" class="font-semibold truncate">document.pdf</span>
            <span id="attached-filesize" class="text-[10px] text-slate-500 dark:text-slate-400">(120 KB)</span>
          </div>
          <button id="btn-remove-attachment" class="text-slate-400 hover:text-red-500 p-0.5 rounded" title="Remove attachment">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        <!-- Input Area Form -->
        <div class="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          <form id="form-chat-input" class="flex items-end gap-2 sm:gap-3">
            
            <!-- Hidden File Input -->
            <input type="file" id="file-attachment-input" class="hidden" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx">
            
            <!-- Attach File Button -->
            <button type="button" id="btn-attach-file" class="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition shrink-0" title="Attach Clinical Document (PDF, Images, Lab Reports)">
              <span class="material-symbols-outlined text-[20px]">attach_file</span>
            </button>

            <!-- Text Input Area -->
            <div class="flex-1 relative">
              <textarea 
                id="chat-textarea" 
                rows="1" 
                placeholder="Type clinical question, symptom update, or medication inquiry... (Shift+Enter for newline)"
                class="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-teal-500 resize-none max-h-32 transition"
              ></textarea>
            </div>

            <!-- Send Button -->
            <button 
              type="submit" 
              id="btn-chat-send" 
              class="h-10 px-4 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-700/20 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              <span class="hidden sm:inline">Send</span>
              <span class="material-symbols-outlined text-[16px]">send</span>
            </button>

          </form>
        </div>

      </div>

      <!-- Right Clinical Context Panel (Responsive) -->
      ${renderClinicalContext(contextData)}

    </div>

    <!-- Reset Confirmation Modal -->
    <div id="modal-confirm-reset" class="ayucase-modal-overlay hidden">
      <div class="ayucase-modal-content max-w-sm p-5 text-center space-y-4">
        <div class="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
          <span class="material-symbols-outlined text-[26px]">warning</span>
        </div>
        <div>
          <h4 class="font-bold text-sm text-slate-900 dark:text-white">Reset Consultation Session?</h4>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">This will clear the current conversation history and restore the initial case intake state.</p>
        </div>
        <div class="flex items-center justify-center gap-2 pt-2">
          <button type="button" id="btn-cancel-reset" class="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold">
            Cancel
          </button>
          <button type="button" id="btn-confirm-reset" class="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold">
            Yes, Reset Session
          </button>
        </div>
      </div>
    </div>
  `;
}

// Simple Helper for Markdown Formatting
function formatAiMarkdown(text = '') {
  return text
    .replace(/^### (.*$)/gim, '<h4 class="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mt-2 mb-1">$1</h4>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc mb-0.5">$1</li>')
    .replace(/\n/gim, '<br>');
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
