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
