/* =========================================================
   INSTITUTO ADOTA PET
   MÓDULO DE NAVEGAÇÃO
   ========================================================= */

import {
    gerarProjetos
} from "./projetos.js";

import {
    ativarFormulario,
    restaurarDadosFormulario
} from "./formulario.js";

import {
    atualizarAOS,
    fecharMenu
} from "./interface.js";


/* =========================================================
   COMPONENTES FORA DO #APP
   ========================================================= */

/*
 * Alguns componentes dos HTML ficam fora do #app:
 *
 * index.html
 * - #toast
 * - #modal
 *
 * cadastro.html
 * - #successModal
 *
 * Como a navegação dinâmica troca somente o #app,
 * precisamos sincronizar esses elementos manualmente.
 */

function sincronizarComponentesGlobais(
    documento
) {

    const ids =
        [
            "toast",
            "modal",
            "successModal"
        ];


    ids.forEach(
        (id) => {

            const componenteAtual =
                document.getElementById(
                    id
                );


            const componenteNovo =
                documento.getElementById(
                    id
                );


            /* =============================================
               EXISTE NA NOVA PÁGINA
               ============================================= */

            if (componenteNovo) {

                const copia =
                    componenteNovo.cloneNode(
                        true
                    );


                if (componenteAtual) {

                    componenteAtual.replaceWith(
                        copia
                    );

                } else {

                    document.body.appendChild(
                        copia
                    );

                }


                return;

            }


            /* =============================================
               NÃO EXISTE NA NOVA PÁGINA
               ============================================= */

            if (componenteAtual) {

                componenteAtual.remove();

            }

        }
    );

}


/* =========================================================
   POSICIONAMENTO POR HASH
   ========================================================= */

function navegarParaHash(
    url
) {

    const indiceHash =
        url.indexOf("#");


    if (
        indiceHash === -1
    ) {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        return;

    }


    const hash =
        url.substring(
            indiceHash + 1
        );


    if (!hash) {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });


        return;

    }


    /*
     * Usamos getElementById em vez de querySelector
     * para evitar problemas com caracteres especiais.
     */

    setTimeout(
        () => {

            const elemento =
                document.getElementById(
                    hash
                );


            if (!elemento) {

                return;

            }


            elemento.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        },
        150
    );

}


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

export async function navegar(
    url,
    adicionarHistorico = true
) {

    try {

        const resposta =
            await fetch(
                url
            );


        if (!resposta.ok) {

            throw new Error(
                `Não foi possível carregar a página. Status: ${resposta.status}`
            );

        }


        const html =
            await resposta.text();


        const documento =
            new DOMParser().parseFromString(
                html,
                "text/html"
            );


        const novoApp =
            documento.querySelector(
                "#app"
            );


        const appAtual =
            document.querySelector(
                "#app"
            );


        /*
         * Se uma das páginas não possuir #app,
         * o navegador assume o controle normalmente.
         */

        if (
            !novoApp ||
            !appAtual
        ) {

            window.location.href =
                url;

            return;

        }


        /* =================================================
           ATUALIZA O CONTEÚDO PRINCIPAL
           ================================================= */

        appAtual.innerHTML =
            novoApp.innerHTML;


        /* =================================================
           ATUALIZA O TÍTULO
           ================================================= */

        if (
            documento.title
        ) {

            document.title =
                documento.title;

        }


        /* =================================================
           COMPONENTES GLOBAIS
           ================================================= */

        sincronizarComponentesGlobais(
            documento
        );


        /* =================================================
           HISTÓRICO
           ================================================= */

        if (
            adicionarHistorico
        ) {

            history.pushState(
                {},
                "",
                url
            );

        }


        /* =================================================
           MENU
           ================================================= */

        fecharMenu();


        /* =================================================
           PROJETOS
           ================================================= */

        gerarProjetos();


        /* =================================================
           FORMULÁRIO
           ================================================= */

        ativarFormulario();

        restaurarDadosFormulario();


        /* =================================================
           AOS
           ================================================= */

        atualizarAOS();


        /* =================================================
           HASH / SCROLL
           ================================================= */

        navegarParaHash(
            url
        );


    } catch (erro) {

        console.error(
            "Erro na navegação:",
            erro
        );


        /*
         * Se a navegação dinâmica falhar,
         * fazemos o carregamento tradicional da página.
         */

        window.location.href =
            url;

    }

}


/* =========================================================
   VERIFICAÇÃO DE LINK INTERNO
   ========================================================= */

function podeInterceptarLink(
    evento,
    link
) {

    /*
     * Apenas clique esquerdo.
     */

    if (
        evento.button !== 0
    ) {

        return false;

    }


    /*
     * Não interferir em:
     * Ctrl + clique
     * Cmd + clique
     * Shift + clique
     * Alt + clique
     */

    if (
        evento.ctrlKey ||
        evento.metaKey ||
        evento.shiftKey ||
        evento.altKey
    ) {

        return false;

    }


    /*
     * Links que abrem nova aba/janela
     * não devem ser interceptados.
     */

    if (
        link.target === "_blank"
    ) {

        return false;

    }


    return true;

}


/* =========================================================
   LINKS INTERNOS
   ========================================================= */

export function ativarNavegacao() {

    if (
        window.navegacaoInicializada
    ) {

        return;

    }


    document.addEventListener(
        "click",
        (evento) => {

            const link =
                evento.target.closest(
                    "[data-route]"
                );


            if (!link) {

                return;

            }


            if (
                !podeInterceptarLink(
                    evento,
                    link
                )
            ) {

                return;

            }


            const url =
                link.getAttribute(
                    "href"
                );


            if (!url) {

                return;

            }


            /*
             * Links externos ou protocolos especiais
             * permanecem com o comportamento padrão.
             */

            if (
                url.startsWith(
                    "http://"
                ) ||
                url.startsWith(
                    "https://"
                ) ||
                url.startsWith(
                    "mailto:"
                ) ||
                url.startsWith(
                    "tel:"
                ) ||
                url.startsWith(
                    "#"
                ) ||
                url.startsWith(
                    "javascript:"
                )
            ) {

                return;

            }


            evento.preventDefault();


            navegar(
                url
            );

        }
    );


    window.navegacaoInicializada =
        true;

}


/* =========================================================
   HISTÓRICO DO NAVEGADOR
   ========================================================= */

export function ativarHistorico() {

    if (
        window.historicoInicializado
    ) {

        return;

    }


    window.addEventListener(
        "popstate",
        () => {

            navegar(
                window.location.href,
                false
            );

        }
    );


    window.historicoInicializado =
        true;

}   