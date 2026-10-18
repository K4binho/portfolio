# ADR-001 — Usar site estático modular

## Status

Accepted

## Contexto

O portfólio precisa ser simples de publicar, rápido de carregar e fácil de manter. O workspace começa vazio e não exige dados privados ou processamento no servidor.

## Decisão

Usaremos HTML, CSS e JavaScript sem framework na primeira versão. A estrutura será dividida em módulos de dados, componentes visuais e inicialização da aplicação.

## Consequências

**Positivas:** baixa complexidade, publicação simples, boa performance e manutenção direta.

**Negativas:** alterações de conteúdo exigem edição de arquivos e a listagem do GitHub não será automática nesta versão.

## Alternativas consideradas

- Framework frontend: rejeitado por adicionar complexidade sem necessidade inicial.
- API do GitHub: adiada para evitar rate limits e dependência de dados externos.

## Design rationale

A paleta foi ajustada para uma direção azul fria inspirada na atmosfera visual da Rem: azul-marinho profundo na base, azul-celeste para ações, ciano para estados ativos e lavanda para detalhes secundários. A mudança é reversível e mantém o contraste e a linguagem de painel do StreamHub.

## Evolução da apresentação

Os projetos passaram a usar dados factuais de seus READMEs públicos, com detalhes, status e fluxos próprios. A interface agora usa modais, entrada sequencial de cards, pulso nos nós de arquitetura e terminal animado. A animação serve para explicar o funcionamento dos produtos, não apenas decorar a página.

As capturas reais do OBS foram adicionadas como galeria do StreamHub, mantendo os arquivos em `assets/streamhub/` e a lista de imagens no módulo de dados.

A composição hero gerada foi reposicionada para o card do StreamHub em “Projetos selecionados”, onde funciona como evidência visual do produto sem competir com a apresentação principal.
