(() => {
  const btn = document.getElementById('cn-chat-btn');
  const panel = document.getElementById('cn-chat-panel');
  const expandBtn = document.getElementById('cn-chat-expand');
  const form = document.getElementById('cn-chat-form');
  const input = document.getElementById('cn-chat-input');
  const sendBtn = document.getElementById('cn-chat-send');
  const msgs = document.getElementById('cn-chat-messages');
  const apiUrl = 'https://www.cadernodenormas.com.br/api/chat';

  if (!btn || !panel || !form || !input || !sendBtn || !msgs) return;

  function addMessage(text, who) {
    const wrap = document.createElement('div');
    wrap.className = `cn-msg ${who}`;
    const bubble = document.createElement('div');
    bubble.className = 'cn-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
    return bubble;
  }

  function typeIntoBubble(bubble, text, speed = 18) {
    bubble.textContent = '';
    let i = 0;
    function typeChar() {
      if (i >= text.length) return;
      bubble.textContent += text.charAt(i);
      i += 1;
      msgs.scrollTop = msgs.scrollHeight;
      setTimeout(typeChar, speed);
    }
    typeChar();
  }

  function addTypingMessage(text, who, speed = 28) {
    const bubble = addMessage('', who);
    typeIntoBubble(bubble, text, speed);
  }

  function isOpen() {
    return panel.classList.contains('open');
  }

  function closeChat() {
    panel.classList.remove('open', 'fullscreen');
    expandBtn.textContent = '⤢';
    expandBtn.title = 'Ampliar';
  }

  function openChat() {
    panel.classList.add('open');
    input.focus();
    if (msgs.childElementCount === 0) {
      addTypingMessage('Olá. Este assistente auxilia na compreensão das normas do direito administrativo sancionador. Qual é a sua dúvida?', 'bot');
    }
  }

  btn.addEventListener('click', (event) => {
    event.preventDefault();
    if (isOpen()) closeChat();
    else openChat();
  });

  expandBtn.addEventListener('click', (event) => {
    event.preventDefault();
    if (panel.classList.contains('fullscreen')) closeChat();
    else {
      panel.classList.add('fullscreen');
      expandBtn.textContent = '✕';
      expandBtn.title = 'Fechar';
    }
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    input.value = '';
    sendBtn.disabled = true;
    const typingBubble = addMessage('Estou pensando. Aguarde um pouco...', 'bot');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json().catch(() => ({}));
      if (data?.reply) typeIntoBubble(typingBubble, data.reply);
      else if (data?.error) typeIntoBubble(typingBubble, `Erro: ${data.error}`);
      else typeIntoBubble(typingBubble, 'Não consegui obter resposta agora. Tente novamente.');
    } catch (error) {
      typeIntoBubble(typingBubble, 'Falha de conexão. Verifique sua internet e tente de novo.');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) closeChat();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      form.requestSubmit();
    }
  });

  window.addEventListener('load', openChat);
})();