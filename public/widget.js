(function() {
    'use strict';

    // Configuration
    const API_BASE = window.location.origin + '/api/widget';
    const WS_HOST = window.location.hostname;
    const WS_PORT = 8080; // Reverb default port
    const COMPANY_ID = window.ChatterlySettings?.companyId;

    if (!COMPANY_ID) {
        console.error('Chatterly: Company ID not provided');
        return;
    }

    // State
    let widgetState = {
        isOpen: false,
        isLoaded: false,
        settings: null,
        visitor: null,
        conversation: null,
        messages: [],
        isOnline: false,
    };

    // Generate or retrieve visitor UUID
    function getVisitorUUID() {
        let uuid = localStorage.getItem('chatterly_visitor_uuid');
        if (!uuid) {
            uuid = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('chatterly_visitor_uuid', uuid);
        }
        return uuid;
    }

    // API calls
    async function apiCall(endpoint, method = 'GET', data = null) {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(API_BASE + endpoint, options);
        return response.json();
    }

    // Initialize widget
    async function initWidget() {
        try {
            // Load settings
            const data = await apiCall(`/${COMPANY_ID}/settings`);
            widgetState.settings = data.settings;
            widgetState.isOnline = data.is_online;
            widgetState.company = data.company;

            // Track visitor
            await trackVisitor();

            // Create widget UI
            createWidgetUI();

            widgetState.isLoaded = true;
        } catch (error) {
            console.error('Chatterly: Failed to initialize', error);
        }
    }

    // Track visitor
    async function trackVisitor() {
        try {
            const visitorData = {
                visitor_uuid: getVisitorUUID(),
                current_page: window.location.href,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
            };

            const data = await apiCall(`/${COMPANY_ID}/track`, 'POST', visitorData);
            widgetState.visitor = data.visitor;
        } catch (error) {
            console.error('Chatterly: Failed to track visitor', error);
        }
    }

    // Create widget UI
    function createWidgetUI() {
        const settings = widgetState.settings;

        // Create container
        const container = document.createElement('div');
        container.id = 'chatterly-widget';
        container.style.cssText = `
            position: fixed;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        `;

        // Position the container
        const positions = {
            'bottom-right': 'bottom: 20px; right: 20px;',
            'bottom-left': 'bottom: 20px; left: 20px;',
            'top-right': 'top: 20px; right: 20px;',
            'top-left': 'top: 20px; left: 20px;',
        };
        container.style.cssText += positions[settings.widget_position] || positions['bottom-right'];

        // Create bubble button
        const bubble = document.createElement('button');
        bubble.id = 'chatterly-bubble';
        bubble.style.cssText = `
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: none;
            background-color: ${settings.primary_color};
            color: white;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s, box-shadow 0.2s;
        `;
        bubble.innerHTML = `
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
        `;
        bubble.addEventListener('click', toggleChat);
        bubble.addEventListener('mouseenter', () => {
            bubble.style.transform = 'scale(1.1)';
            bubble.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
        });
        bubble.addEventListener('mouseleave', () => {
            bubble.style.transform = 'scale(1)';
            bubble.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });

        // Create chat window (hidden by default)
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chatterly-chat-window';
        chatWindow.style.cssText = `
            display: none;
            width: 380px;
            height: 600px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            flex-direction: column;
            margin-bottom: 80px;
        `;

        // Chat header
        const header = document.createElement('div');
        header.style.cssText = `
            background-color: ${settings.primary_color};
            color: white;
            padding: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        header.innerHTML = `
            <div>
                <h3 style="margin: 0; font-size: 18px; font-weight: 600;">${widgetState.company.name}</h3>
                <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">
                    ${widgetState.isOnline ? settings.online_message : settings.offline_message}
                </p>
            </div>
            <button id="chatterly-close" style="background: none; border: none; color: white; cursor: pointer; font-size: 24px; line-height: 1;">×</button>
        `;

        // Messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.id = 'chatterly-messages';
        messagesContainer.style.cssText = `
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: #f8f9fa;
        `;

        // Input container
        const inputContainer = document.createElement('div');
        inputContainer.style.cssText = `
            padding: 16px;
            border-top: 1px solid #e5e7eb;
            background: white;
        `;
        inputContainer.innerHTML = `
            <form id="chatterly-form" style="display: flex; gap: 8px;">
                <input
                    type="text"
                    id="chatterly-input"
                    placeholder="Type your message..."
                    style="flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; outline: none;"
                />
                <button
                    type="submit"
                    style="padding: 10px 20px; background-color: ${settings.primary_color}; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 500;"
                >
                    Send
                </button>
            </form>
        `;

        // Assemble chat window
        chatWindow.appendChild(header);
        chatWindow.appendChild(messagesContainer);
        chatWindow.appendChild(inputContainer);

        // Assemble container
        container.appendChild(chatWindow);
        container.appendChild(bubble);

        // Add to page
        document.body.appendChild(container);

        // Event listeners
        document.getElementById('chatterly-close').addEventListener('click', toggleChat);
        document.getElementById('chatterly-form').addEventListener('submit', sendMessage);

        // Show welcome message if available
        if (settings.welcome_message) {
            displaySystemMessage(settings.welcome_message);
        }
    }

    // Toggle chat window
    function toggleChat() {
        const chatWindow = document.getElementById('chatterly-chat-window');
        const bubble = document.getElementById('chatterly-bubble');

        widgetState.isOpen = !widgetState.isOpen;

        if (widgetState.isOpen) {
            chatWindow.style.display = 'flex';
            bubble.style.display = 'none';
        } else {
            chatWindow.style.display = 'none';
            bubble.style.display = 'flex';
        }
    }

    // Send message
    async function sendMessage(e) {
        e.preventDefault();

        const input = document.getElementById('chatterly-input');
        const message = input.value.trim();

        if (!message) return;

        // Clear input
        input.value = '';

        // Display message locally
        displayMessage(message, true);

        try {
            if (!widgetState.conversation) {
                // Start new conversation
                const data = await apiCall(`/${COMPANY_ID}/conversation`, 'POST', {
                    visitor_uuid: getVisitorUUID(),
                    message: message,
                });
                widgetState.conversation = data.conversation;
            } else {
                // Send to existing conversation
                await apiCall(
                    `/${COMPANY_ID}/conversation/${widgetState.conversation.conversation_uuid}/message`,
                    'POST',
                    {
                        visitor_uuid: getVisitorUUID(),
                        message: message,
                    }
                );
            }
        } catch (error) {
            console.error('Chatterly: Failed to send message', error);
            displaySystemMessage('Failed to send message. Please try again.');
        }
    }

    // Display message
    function displayMessage(text, isVisitor = false) {
        const messagesContainer = document.getElementById('chatterly-messages');
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 12px;
            display: flex;
            ${isVisitor ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}
        `;

        const bubble = document.createElement('div');
        bubble.style.cssText = `
            max-width: 70%;
            padding: 10px 14px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.4;
            ${isVisitor
                ? `background-color: ${widgetState.settings.primary_color}; color: white;`
                : 'background-color: white; color: #1f2937; border: 1px solid #e5e7eb;'
            }
        `;
        bubble.textContent = text;

        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Display system message
    function displaySystemMessage(text) {
        const messagesContainer = document.getElementById('chatterly-messages');
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            margin-bottom: 12px;
            text-align: center;
        `;

        const bubble = document.createElement('div');
        bubble.style.cssText = `
            display: inline-block;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 13px;
            color: #6b7280;
            background-color: #f3f4f6;
        `;
        bubble.textContent = text;

        messageDiv.appendChild(bubble);
        messagesContainer.appendChild(messageDiv);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWidget);
    } else {
        initWidget();
    }
})();
