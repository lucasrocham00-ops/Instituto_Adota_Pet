/* =========================================================
   INSTITUTO ADOTA PET
   JAVASCRIPT PRINCIPAL
   ========================================================= */

import {
    gerarProjetos
} from "./projetos.js";

import {
    ativarFormulario,
    restaurarDadosFormulario
} from "./formulario.js";

import {
    inicializarAOS,
    atualizarAOS,
    ativarInterface
} from "./interface.js";

import {
    ativarNavegacao,
    ativarHistorico
} from "./navegacao.js";


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

function inicializarAplicacao() {

    inicializarAOS();

    gerarProjetos();

    ativarFormulario();

    restaurarDadosFormulario();

    ativarInterface();

    ativarNavegacao();

    ativarHistorico();

    atualizarAOS();

}


/* =========================================================
   DOM READY
   ========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        inicializarAplicacao,
        {
            once: true
        }
    );

} else {

    inicializarAplicacao();

}