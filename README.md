# Caderno de Normas de Direito Administrativo Sancionador

Este repositório mantém o site **Caderno de Normas de Direito Administrativo Sancionador**, uma página de consulta organizada com normas, comentários, combinações legais e materiais de apoio relacionados ao Direito Administrativo Sancionador.

O objetivo do projeto é facilitar o acesso rápido a dispositivos legais relevantes, especialmente no contexto de processos correcionais, responsabilização administrativa, integridade pública e gestão de corregedoria.

Site publicado: [https://www.cadernodenormas.com.br](https://www.cadernodenormas.com.br)

## Sobre o projeto

O Caderno de Normas reúne, em uma única página, referências e comentários sobre normas como:

- Constituição Federal;
- Lei nº 8.112/1990;
- Lei nº 9.784/1999;
- Lei nº 12.527/2011;
- Lei nº 12.846/2013;
- Decreto nº 11.129/2022;
- Decreto nº 1.171/1994;
- Lei nº 5.172/1966;
- Decreto-Lei nº 4.657/1942;
- materiais de apoio sobre PAD, PAR, notas de regularidade e priorização de processos.

O conteúdo possui links para fontes oficiais e materiais complementares, além de recursos de navegação, busca interna e apoio por assistente de IA.

## Estrutura do repositório

Atualmente, os principais arquivos do projeto são:

- `index.html`: página principal do Caderno de Normas, contendo o conteúdo, estilos e scripts da aplicação;
- `css/style.css`: arquivo de estilos herdado de versão anterior do projeto;
- `README.md`: documentação do repositório.

Recomenda-se, em futuras melhorias, separar a página em arquivos mais específicos:

- `assets/css/styles.css` para estilos;
- `assets/js/search.js` para busca interna;
- `assets/js/menu.js` para navegação e menu lateral;
- `assets/js/chat.js` para o assistente de IA;
- arquivos de conteúdo ou dados separados para facilitar atualização das normas.

## Como publicar

O site é estático e pode ser publicado em serviços como GitHub Pages, Netlify, Vercel ou hospedagem própria.

### Publicação pelo GitHub Pages

1. Acesse as configurações do repositório no GitHub.
2. Entre em **Settings > Pages**.
3. Em **Build and deployment**, selecione a branch `main`.
4. Selecione a pasta raiz do projeto, caso o `index.html` esteja na raiz.
5. Salve a configuração.
6. Aguarde o GitHub gerar o endereço de publicação.

Caso o domínio próprio `www.cadernodenormas.com.br` seja usado, configure também o DNS do domínio e o campo de domínio customizado no GitHub Pages.

### Publicação em hospedagem própria

Para publicar em hospedagem própria, envie os arquivos do projeto para a pasta pública do servidor, normalmente chamada de `public_html`, `www` ou equivalente.

O arquivo `index.html` deve permanecer acessível na raiz do domínio.

## Como atualizar o conteúdo

Enquanto o conteúdo estiver concentrado no `index.html`, as atualizações devem ser feitas diretamente nesse arquivo.

Fluxo recomendado:

1. Localize a seção da norma que deseja alterar.
2. Atualize o texto, comentário, link ou material de apoio.
3. Confira se os links apontam para fontes oficiais ou documentos confiáveis.
4. Verifique se a navegação interna continua funcionando.
5. Teste a busca interna após a alteração.
6. Publique a nova versão.

Ao adicionar nova norma ou novo tópico, lembre-se de atualizar também:

- o menu lateral;
- a área inicial de links;
- os identificadores de seção, como `section1`, `section2` etc.;
- eventuais links internos que apontem para a nova seção.

## Cuidados editoriais

Antes de publicar uma alteração, recomenda-se conferir:

- se a norma citada está vigente;
- se o link oficial ainda está ativo;
- se há alteração legislativa recente;
- se o comentário está separado claramente do texto legal;
- se a informação depende de interpretação jurídica ou de contexto específico.

O site deve deixar claro que o conteúdo tem finalidade informativa e de apoio, não substituindo a consulta à legislação oficial nem a análise jurídica do caso concreto.

## Assistente de IA

A página possui um componente de chat que envia perguntas para:

`https://www.cadernodenormas.com.br/api/chat`

Para que o chat funcione, é necessário que exista uma API publicada nesse endereço. Caso o site seja hospedado apenas como página estática, sem backend, o assistente não responderá corretamente.

Recomenda-se manter aviso visível de que as respostas geradas por IA devem ser conferidas com a base normativa aplicável.

## Melhorias recomendadas

Algumas melhorias úteis para a manutenção do projeto:

- separar HTML, CSS e JavaScript;
- remover estilos e scripts não utilizados;
- revisar links `http://` e substituir por `https://` sempre que possível;
- corrigir funções JavaScript duplicadas ou quebradas;
- melhorar acessibilidade do menu, botões e busca;
- adicionar data de última atualização do conteúdo;
- revisar o README sempre que a estrutura do projeto mudar.

## Créditos

Projeto desenvolvido por Murilo de Mello Campos.

Sugestões e melhorias podem ser encaminhadas pelo canal indicado no site.
