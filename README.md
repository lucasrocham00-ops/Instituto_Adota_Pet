# Instituto Adota Pet

Site do Instituto Adota Pet, projeto de divulgação de adoção de animais, desenvolvido com HTML, CSS e JavaScript.

## Páginas

- `index.html`: página inicial
- `projetos.html`: projetos do instituto
- `cadastro.html`: formulário de cadastro, com pop-up de confirmação

## Estrutura do projeto

```
Instituto_Adota_Pet/
├── CSS/       estilo.css
├── HTML/      index.html, projetos.html, cadastro.html
├── IMAGENS/   imagens do site
└── JS/        app.js, armazenamento.js, formulario.js,
               interface.js, navegacao.js, projetos.js
```

## Como executar

1. Clone o repositório:
   `git clone https://github.com/lucasrocham00-ops/Instituto_Adota_Pet.git`
2. Abra a pasta no VS Code.
3. Abra `HTML/index.html` no navegador (ou use a extensão Live Server, se você a utiliza).

## Fluxo de trabalho

Git Flow simplificado, com branches `feature/*` → `develop` → `main`, merges `--no-ff`, commits no padrão Conventional Commits e versionamento semântico por tags (`v1.0.0`, `v1.0.1`, `v1.0.2`).

## Versões

| Tag    | Mudança                                  |
|--------|------------------------------------------|
| v1.0.0 | Estrutura inicial do projeto             |
| v1.0.1 | Remoção de arquivos JS duplicados        |
| v1.0.2 | Correção: pop-up de cadastro fecha no X  |