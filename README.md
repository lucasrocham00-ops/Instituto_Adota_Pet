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

## Pré-requisitos

O projeto é um site estático em HTML, CSS e JavaScript puro, por isso não há dependências a instalar, build a gerar nem testes automatizados. Você só precisa de:

- um navegador atual;
- o Git, para clonar o repositório;
- opcionalmente, o VS Code com a extensão Live Server.

## Como executar

1. Clone o repositório:
   `git clone https://github.com/lucasrocham00-ops/Instituto_Adota_Pet.git`
2. Abra a pasta no VS Code.
3. Abra `HTML/index.html` no navegador ou, se preferir, use a extensão Live Server.

## Fluxo de trabalho

Git Flow simplificado, com branches `feature/*` → `develop` → `main`, merges `--no-ff`, commits no padrão Conventional Commits e versionamento semântico por tags (`v1.0.0`, `v1.0.1`, `v1.0.2`, `v1.1.0`). Issues, milestones e pull requests documentam cada entrega.

## Versões

| Tag    | Mudança                                    |
|--------|--------------------------------------------|
| v1.0.0 | Estrutura inicial do projeto               |
| v1.0.1 | Remoção de arquivos JS duplicados          |
| v1.0.2 | Correção: pop-up de cadastro fecha no X    |
| v1.1.0 | Documentação: adição do README ao projeto  |