<script lang="ts">
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  
  const isOpen = writable(false);
  let messages: {text: string, isUser: boolean}[] = [];
  let currentMessage = '';
  let messagesContainer: HTMLDivElement;

  // Function to scroll to bottom of messages
  function scrollToBottom() {
    if (messagesContainer) {
      setTimeout(() => {
        messagesContainer.scrollTo({
          top: messagesContainer.scrollHeight,
          behavior: 'smooth'
        });
      }, 100); // Small delay to ensure content is rendered
    }
  }

  function toggleChat() {
    $isOpen = !$isOpen;
    if ($isOpen) {
      // Scroll to bottom when chat is opened
      scrollToBottom();
    }
  }

  async function sendMessage() {
    if (currentMessage.trim()) {
      messages = [...messages, { text: currentMessage, isUser: true }];
      const userMessage = currentMessage;
      currentMessage = '';
      scrollToBottom();
      
      try {
        const response = await fetch('https://iceboxdev-fastapi--8000.prod1a.defang.dev/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage
          })
        });

        const data = await response.json();
        messages = [...messages, { 
          text: data.response || "Sorry, there was an error processing your message.", 
          isUser: false 
        }];
        scrollToBottom();
      } catch (error) {
        console.error('Error:', error);
        messages = [...messages, { 
          text: "Sorry, there was an error processing your message.", 
          isUser: false 
        }];
        scrollToBottom();
      }
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  // Watch for messages changes and scroll to bottom
  $: if (messages.length) {
    scrollToBottom();
  }
</script>

<div class="chatbot-container">
  {#if $isOpen}
    <div class="chat-window">
      <div class="chat-header">
        <span>Chat Support</span>
        <button class="close-button" on:click={toggleChat}>×</button>
      </div>
      <div class="messages" bind:this={messagesContainer}>
        {#each messages as message}
          <div class="message {message.isUser ? 'user' : 'bot'}">
            {message.text}
          </div>
        {/each}
      </div>
      <div class="input-area">
        <textarea
          placeholder="Type your message..."
          bind:value={currentMessage}
          on:keydown={handleKeydown}
        />
        <button class="send-button" on:click={sendMessage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  {/if}
  
  <button class="chat-button" on:click={toggleChat}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  </button>
</div>

<style>
  .chatbot-container {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
  }

  .chat-button {
    width: 56px;
    height: 56px;
    border-radius: 28px;
    background: #e31837;
    border: none;
    box-shadow: 0 4px 12px rgba(227, 24, 55, 0.3);
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    padding: 0;
  }

  .chat-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(227, 24, 55, 0.4);
  }

  .chat-window {
    position: absolute;
    bottom: 80px;
    right: 0;
    width: 340px;
    height: 480px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .chat-header {
    padding: 1.25rem;
    background: #e31837;
    color: white;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .close-button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    transition: background 0.2s;
  }

  .close-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .messages {
    flex-grow: 1;
    padding: 1.25rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    background: #f8f9fa;
  }

  .message {
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    max-width: 85%;
    word-break: break-word;
    font-size: 0.95rem;
    line-height: 1.4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  .message.user {
    background: #e31837;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 0.25rem;
  }

  .message.bot {
    background: white;
    color: #333;
    align-self: flex-start;
    border-bottom-left-radius: 0.25rem;
  }

  .input-area {
    padding: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    gap: 0.75rem;
    background: white;
  }

  textarea {
    flex-grow: 1;
    border: 1px solid #e0e0e0;
    border-radius: 24px;
    padding: 0.75rem 1.25rem;
    resize: none;
    height: 45px;
    font-family: inherit;
    font-size: 0.95rem;
    line-height: 1.4;
    transition: border-color 0.2s;
  }

  textarea:focus {
    outline: none;
    border-color: #e31837;
  }

  .send-button {
    width: 45px;
    height: 45px;
    padding: 0;
    border: none;
    border-radius: 23px;
    background: #e31837;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    flex-shrink: 0;
  }

  .send-button:hover {
    background: #c41530;
    transform: scale(1.05);
  }

  @media (max-width: 480px) {
    .chat-window {
      width: calc(100vw - 40px);
      right: 0;
      bottom: 80px;
    }
  }
</style> 