// Seleção dos elementos do DOM
const popupOverlay = document.getElementById('popupOverlay');
const popupTitulo = document.getElementById('popupTitulo');
const popupConteudo = document.getElementById('popupConteudo');
const closeX = document.getElementById('closeX');
const closeBtn = document.getElementById('closeBtn');

// Função para abrir o pop-up e buscar o arquivo HTML correspondente
async function carregarEFecharPopup(urlArquivo) {
  // 1. Limpa o conteúdo anterior e mostra mensagem de carregamento
  popupTitulo.innerText = "Carregando...";
  popupConteudo.innerHTML = `<div class="text-center text-gray-400 py-4">Buscando informações...</div>`;
  popupOverlay.classList.remove('hidden');

  try {
    // 2. Faz a requisição AJAX para ler a outra página [1]
    const resposta = await fetch(urlArquivo);
    if (!resposta.ok) throw new Error('Erro ao carregar arquivo');
    
    const htmlTexto = await resposta.text();

    // 3. Converte o texto recebido em elementos HTML temporários para extrair dados
    const parser = new DOMParser();
    const docExterno = parser.parseFromString(htmlTexto, 'text/html');

    // 4. Extrai o título e o corpo específicos da página filha
    const novoTitulo = docExterno.querySelector('title')?.innerText || "Informação";
    const novoConteudo = docExterno.querySelector('body')?.innerHTML || htmlTexto;

    // 5. Injeta no template do Pop-up
    popupTitulo.innerText = novoTitulo;
    popupConteudo.innerHTML = novoConteudo;

  } catch (erro) {
    popupTitulo.innerText = "Erro";
    popupConteudo.innerHTML = `<p class="text-red-500 text-sm">Não foi possível carregar as informações desta página.</p>`;
  }
}

// Gerencia o clique em qualquer botão que tenha a classe 'btn-abrir'
document.querySelectorAll('.btn-abrir').forEach(botao => {
  botao.addEventListener('click', () => {
    const paginaAlvo = botao.getAttribute('data-pagina');
    carregarEFecharPopup(paginaAlvo);
  });
});

// Funções para fechar o Modal
const fecharPopup = () => popupOverlay.classList.add('hidden');

closeX.addEventListener('click', fecharPopup);
closeBtn.addEventListener('click', fecharPopup);

// Fecha o modal ao clicar fora da caixa branca
popupOverlay.addEventListener('click', (e) => { 
  if (e.target === popupOverlay) fecharPopup(); 
});
