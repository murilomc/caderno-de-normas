(() => {
  const visitCounter = document.getElementById('visitas');
  const backToTopBtn = document.getElementById('backToTop');
  const searchInput = document.getElementById('pesquisa');
  let ocorrencias = [];
  let indiceAtual = 0;

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function limparDestaques() {
    document.querySelectorAll('span.highlight').forEach((span) => {
      span.replaceWith(document.createTextNode(span.textContent || ''));
    });
    document.querySelectorAll('.content p').forEach((p) => p.normalize());
  }

  function destacarTexto(node, regex) {
    if (node.nodeType === Node.TEXT_NODE) {
      const texto = node.nodeValue || '';
      if (!regex.test(texto)) return;
      regex.lastIndex = 0;
      const fragment = document.createDocumentFragment();
      let ultimoIndice = 0;
      texto.replace(regex, (match, offset) => {
        fragment.appendChild(document.createTextNode(texto.slice(ultimoIndice, offset)));
        const span = document.createElement('span');
        span.className = 'highlight';
        span.textContent = match;
        fragment.appendChild(span);
        ultimoIndice = offset + match.length;
        return match;
      });
      fragment.appendChild(document.createTextNode(texto.slice(ultimoIndice)));
      node.replaceWith(fragment);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE || ['SCRIPT', 'STYLE'].includes(node.nodeName)) return;
    Array.from(node.childNodes).forEach((child) => destacarTexto(child, regex));
  }

  function rolarParaOcorrencia(indice) {
    if (!ocorrencias.length || !ocorrencias[indice]) return;
    ocorrencias[indice].scrollIntoView({ behavior: 'smooth', block: 'center' });
    indiceAtual = indice;
  }

  window.searchFunction = function searchFunction() {
    const termo = (searchInput?.value || '').trim();
    limparDestaques();
    ocorrencias = [];
    indiceAtual = 0;

    if (!termo) return;

    const regex = new RegExp(escapeRegExp(termo), 'gi');
    document.querySelectorAll('.content p').forEach((p) => destacarTexto(p, regex));
    ocorrencias = Array.from(document.querySelectorAll('.highlight'));
    if (ocorrencias.length) rolarParaOcorrencia(0);
  };

  window.rolarParaProximaOcorrencia = function rolarParaProximaOcorrencia() {
    if (!ocorrencias.length) return;
    rolarParaOcorrencia((indiceAtual + 1) % ocorrencias.length);
  };

  window.rolarParaOcorrenciaAnterior = function rolarParaOcorrenciaAnterior() {
    if (!ocorrencias.length) return;
    rolarParaOcorrencia((indiceAtual - 1 + ocorrencias.length) % ocorrencias.length);
  };

  window.toggleMenu = function toggleMenu() {
    const menu = document.getElementById('sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    if (!menu || !menuBtn) return;
    const isActive = menu.classList.toggle('active');
    menuBtn.classList.toggle('active', isActive);
    menuBtn.setAttribute('aria-expanded', String(isActive));
  };

  window.atualizarPagina = function atualizarPagina() {
    window.location.href = window.location.pathname.replace(/\.[^/.]+$/, '');
  };

  window.Mudarestado = function Mudarestado(btn) {
    const wrapper = btn.closest('p');
    const element = btn.nextElementSibling || wrapper?.nextElementSibling;
    if (!element) return;
    const isClosed = !element.style.maxHeight || element.style.maxHeight === '0px';
    element.style.maxHeight = isClosed ? '1000px' : '0px';
    element.style.opacity = isClosed ? '1' : '0';
    btn.textContent = isClosed ? 'Ocultar texto' : 'Ver mais:';
  };

  window.scrollToTop = function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.rolarTotalmenteParaBaixo = function rolarTotalmenteParaBaixo() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  window.addEventListener('scroll', () => {
    if (!backToTopBtn) return;
    backToTopBtn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
  });

  async function atualizarContador() {
    if (!visitCounter) return;

    const namespace = 'cadernodenormas.com.br';
    const key = 'home';
    const cacheKey = `visitas-cache-${key}`;
    const cacheVal = localStorage.getItem(cacheKey);
    if (cacheVal) visitCounter.textContent = Number(cacheVal).toLocaleString('pt-BR');

    const providers = [
      {
        hit: `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}?amount=1`,
        get: `https://api.countapi.xyz/get/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`,
        parse: (data) => (typeof data?.value === 'number' ? data.value : null),
      },
      {
        hit: `https://api.counterapi.dev/v1/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}/up`,
        get: `https://api.counterapi.dev/v1/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`,
        parse: (data) => (typeof data?.count === 'number' ? data.count : null),
      },
    ];

    const jaContou = sessionStorage.getItem(`visitou-${key}`) === 'sim';
    for (const provider of providers) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);
        const response = await fetch(jaContou ? provider.get : provider.hit, { cache: 'no-store', signal: controller.signal });
        clearTimeout(timeout);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const total = provider.parse(await response.json());
        if (total == null) throw new Error('Resposta inválida');
        if (!jaContou) sessionStorage.setItem(`visitou-${key}`, 'sim');
        localStorage.setItem(cacheKey, String(total));
        visitCounter.textContent = Number(total).toLocaleString('pt-BR');
        return;
      } catch (error) {
        console.warn('contador não atualizado', error);
      }
    }
  }

  atualizarContador();
})();