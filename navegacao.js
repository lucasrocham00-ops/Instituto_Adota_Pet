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
   NAVEGAÇÃO ENTRE PÁGINAS
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
                "Não foi possível carregar a página."
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
           Se uma das áreas principais não existir,
           a navegação dinâmica não é utilizada.
        */

        if (
            !novoApp ||
            !appAtual
        ) {

            window.location.href =
                url;

            return;

        }


        /* -----------------------------------------
           Substituição do conteúdo
           ----------------------------------------- */

        appAtual.innerHTML =
            novoApp.innerHTML;


        /* -----------------------------------------
           Atualiza título
           ----------------------------------------- */

        if (
            documento.title
        ) {

            document.title =
                documento.title;

        }


        /* -----------------------------------------
           Histórico
           ----------------------------------------- */

        if (
            adicionarHistorico
        ) {

            history.pushState(
                {},
                "",
                url
            );

        }


        /* -----------------------------------------
           Fecha menu mobile
           ----------------------------------------- */

        fecharMenu();


        /* -----------------------------------------
           Reativa conteúdos dinâmicos
           ----------------------------------------- */

        gerarProjetos();

        ativarFormulario();

        restaurarDadosFormulario();


        /* -----------------------------------------
           Atualiza AOS
           ----------------------------------------- */

        atualizarAOS();


        /* -----------------------------------------
           Hash da URL
           ----------------------------------------- */

        const hash =
            url.includes("#")
                ? url.substring(
                    url.indexOf("#")
                )
                : "";


        if (hash) {

            setTimeout(
                () => {

                    /*
                       O hash vem de links internos
                       controlados pelo próprio projeto.
                    */

                    const elemento =
                        document.getElementById(
                            hash.substring(1)
                        );


                    if (elemento) {

                        elemento.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }

                },
                150
            );

        } else {

            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        }

    } catch (erro) {

        console.error(
            "Erro na navegação:",
            erro
        );


        /*
           Se a navegação dinâmica falhar,
           o navegador utiliza a navegação
           tradicional.
        */

        window.location.href =
            url;

    }

}


/* =========================================================
   LINKS INTERNOS
   ========================================================= */

export function ativarNavegacao() {

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


            /*
               Não interfere em:
               - botão direito;
               - Ctrl + clique;
               - Cmd + clique;
               - Shift + clique;
               - Alt + clique;
               - abertura em nova aba.
            */

            if (
                evento.button !== 0 ||
                evento.ctrlKey ||
                evento.metaKey ||
                evento.shiftKey ||
                evento.altKey
            ) {

                return;

            }


            const target =
                link.getAttribute(
                    "target"
                );


            if (
                target &&
                target !== "_self"
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
               Links externos e outros esquemas
               não devem passar pela navegação SPA.
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

}


/* =========================================================
   HISTÓRICO DO NAVEGADOR
   ========================================================= */

export function ativarHistorico() {

    window.addEventListener(
        "popstate",
        () => {

            const url =
                window.location.pathname +
                window.location.search +
                window.location.hash;


            navegar(
                url,
                false
            );

        }
    );

}