document.addEventListener('DOMContentLoaded', () => {
  // Счётчики
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const update = () => {
      const target = +counter.getAttribute('data-target');
      const current = +counter.innerText;
      const increment = target / 200;
      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('hidden');
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
  });

  // Чат
  const chatInput = document.querySelector('.chat-input input');
  const chatButton = document.querySelector('.chat-input button');
  const chatLog = document.querySelector('.chat-log');

  function appendMessage(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-message ${sender}`;
    div.textContent = text;
    chatLog.appendChild(div);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  function simulateBotReply(userMessage) {
    // Заглушка для интеграции ChatGPT на сервере
    const reply = `Спасибо за ваш вопрос: "${userMessage}". Мы свяжемся с вами в ближайшее время.`;
    setTimeout(() => appendMessage(reply, 'bot'), 1000);
  }

  chatButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message !== '') {
      appendMessage(message, 'user');
      chatInput.value = '';
      simulateBotReply(message);
    }
  });

  chatInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      chatButton.click();
    }
  });
});
