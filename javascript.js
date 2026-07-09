
<script>
  document.getElementById('search').addEventListener('input', function() {
      let searchText = this.value;
      let originalText = document.getElementById('p').textContent;
      let highlightedText;

      // Se o campo de pesquisa não estiver vazio, destaque o texto
      if (searchText) {
          highlightedText = originalText.replace(new RegExp(searchText, 'gi'), function(match) {
              return `<span class="highlight">${match}</span>`;
          });
      } else {
          highlightedText = originalText; // Caso contrário, use o texto original
      }
      document.getElementById('p').innerHTML = highlightedText;
  });
</script>


<script>
var ocorrencias = []; // Armazenará todas as ocorrências encontradas
var indiceAtual = 0; // Índice da ocorrência atual que está em foco

function searchFunction() {
    var textoPesquisa = document.getElementById('pesquisa').value.trim().toLowerCase();
    var elementos = document.getElementsByTagName('p');
    ocorrencias = []; // Reiniciar a lista de ocorrências para cada nova pesquisa

    for (var i = 0; i < elementos.length; i++) {
        var textoOriginal = elementos[i].textContent || elementos[i].innerText;
        var palavras = textoOriginal.split(' ');
        var textoDestacado = '';

        palavras.forEach(function(palavra) {
            var palavraMinuscula = palavra.toLowerCase();
            var pos = palavraMinuscula.indexOf(textoPesquisa);

            if (pos !== -1) {
                var inicio = palavra.substring(0, pos);
                var destaque = palavra.substring(pos, pos + textoPesquisa.length);
                var fim = palavra.substring(pos + textoPesquisa.length);

                textoDestacado += inicio + '<span class="highlight">' + destaque + '</span>' + fim;
            } else {
                textoDestacado += palavra;
            }

            textoDestacado += ' ';
        });

        elementos[i].innerHTML = textoDestacado.trim();
    }

    // Registrar todas as ocorrências após a busca
    ocorrencias = document.querySelectorAll('.highlight');
    if (ocorrencias.length > 0) {
        rolarParaOcorrencia(0); // Rolar para a primeira ocorrência
    }
}

function rolarParaOcorrencia(indice) {
    ocorrencias[indice].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });
    indiceAtual = indice;
}

function rolarParaProximaOcorrencia() {
    if (indiceAtual < ocorrencias.length - 1) {
        indiceAtual++;
        rolarParaOcorrencia(indiceAtual);
    } else {
        // Se já estiver na última ocorrência, rolar para a primeira
        indiceAtual = 0;
        rolarParaOcorrencia(indiceAtual);
    }
}

function rolarParaOcorrenciaAnterior() {
    if (indiceAtual > 0) {
        indiceAtual--;
        rolarParaOcorrencia(indiceAtual);
    } else {
        // Se já estiver na primeira ocorrência, rolar para a última
        indiceAtual = ocorrencias.length - 1;
        rolarParaOcorrencia(indiceAtual);
    }
}

</script>


<script>
    function toggleMenu() {
      var menu = document.getElementById("sidebar");
      var menuBtn = document.querySelector(".menu-btn");
  
      menu.classList.toggle("active");
      menuBtn.classList.toggle("active");
       
    }   

    function atualizarPagina() {
  var urlSemExtensao = window.location.pathname.replace(/\.[^/.]+$/, "");
  window.location.href = urlSemExtensao;
}
  </script>
// Mostrar o botão de rolagem quando o usuário rolar 20 pixels para baixo
<script>
  function Mudarestado(el) {
      var element = document.getElementById(el);
      var botao = document.getElementById("toggleButton");

      if (element.style.maxHeight === "0px" || element.style.maxHeight === "") {
          element.style.maxHeight = "1000px"; // Este valor pode ser ajustado conforme o tamanho do seu conteúdo
          element.style.opacity = "1";
          botao.innerHTML = "Ocultar texto";
      } else {
          element.style.maxHeight = "0px";
          element.style.opacity = "0";
          botao.innerHTML = "Ver mais:";
      }
  }
</script>

<script>
  function Mudarestado(btn) {
      var element = btn.nextElementSibling; // Pega o próximo elemento após o botão

      if (element.style.maxHeight === "0px" || element.style.maxHeight === "") {
          element.style.maxHeight = "1000px";
          element.style.opacity = "1";
          btn.innerHTML = "Ocultar texto";
      } else {
          element.style.maxHeight = "0px";
          element.style.opacity = "0";
          btn.innerHTML = "Ver mais:";
      }
  }
</script>


  <script>
    
    window.onscroll = function() {scrollFunction()};
  
    function scrollFunction() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTop").style.display = "block";
      } else {
        document.getElementById("scrollToTop").style.display = "none";
      }
    }
  
    // Função para rolar suavemente para o topo
    function scrollToTop() {
      document.body.scrollTop = 0; // Para Safari
      document.documentElement.scrollTop = 0; // Para Chrome, Firefox, IE e Opera
    }

    function rolarTotalmenteParaBaixo() {
  window.scrollTo(0, document.body.scrollHeight);
}
  </script>

<footer class="footer">
  
    <p> Desenvolvido por Murilo de Mello Campos<br>
      Sugestões de melhorias: murilo.campos@mdic.gov.br</p>
  </footer>

  <!-- Botão de voltar ao topo -->
  <button id="backToTop" onclick="scrollToTop()">Voltar ao topo</button>

  <script>
      // Seleciona o botão
      const btn = document.getElementById("backToTop");

      // Função para rolar de volta ao topo
      function scrollToTop() {
          window.scrollTo({
              top: 0,
              behavior: "smooth" // Rolagem suave
          });
      }

      // Função para mostrar/ocultar o botão dependendo da posição de rolagem
      window.addEventListener('scroll', function() {
          if (window.pageYOffset > 300) { // Mostrar após 300px
              btn.style.display = "block";
          } else {
              btn.style.display = "none";
          }
      });
  </script>

<script type="text/javascript">
  // Função para desabilitar o clique direito
  function desabilitarCliqueDireito(event) {
      if (event.button == 2) { // Verifica se o clique é o direito
          alert("Clique direito desabilitado nesta página.");
          return false; // Retorna falso para cancelar a ação padrão
      }
      return true;
  }

  // Adiciona o evento no carregamento da página
  document.addEventListener('DOMContentLoaded', function() {
      document.addEventListener('mousedown', desabilitarCliqueDireito);
  });
</script>