    /* =========================================================
    INSTITUTO ADOTA PET
    MÓDULO DE INTERFACE
    ========================================================= */


    /* =========================================================
    AOS
    ========================================================= */

    export function inicializarAOS() {

        if (
            typeof window.AOS === "undefined"
        ) {
            return;
        }


        if (
            window.aosInicializado
        ) {
            return;
        }


        window.AOS.init({

            duration: 700,

            easing: "ease-out-cubic",

            once: true,

            offset: 80

        });


        window.aosInicializado =
            true;

    }


    /* =========================================================
    ATUALIZAR AOS
    ========================================================= */

    export function atualizarAOS() {

        if (
            typeof window.AOS === "undefined"
        ) {
            return;
        }


        /*
        * Depois que o #app é substituído pela navegação
        * dinâmica, o AOS precisa reconhecer novamente
        * os elementos adicionados.
        */

        if (
            typeof window.AOS.refreshHard === "function"
        ) {

            window.AOS.refreshHard();

            return;

        }


        if (
            typeof window.AOS.refresh === "function"
        ) {

            window.AOS.refresh();

        }

    }


    /* =========================================================
    MENU MOBILE
    ========================================================= */

    export function fecharMenu() {

        const menu =
            document.getElementById(
                "menu-toggle"
            );


        if (menu) {

            menu.checked =
                false;

        }

    }


    /* =========================================================
    TOAST
    ========================================================= */

    export function mostrarToast() {

        const toast =
            document.getElementById(
                "toast"
            );


        if (!toast) {
            return;
        }


        toast.style.display =
            "flex";


        toast.setAttribute(
            "aria-hidden",
            "false"
        );


        clearTimeout(
            window.toastTimeout
        );


        window.toastTimeout =
            setTimeout(
                () => {

                    fecharToast();

                },
                4000
            );

    }


    /* =========================================================
    FECHAR TOAST
    ========================================================= */

    export function fecharToast() {

        const toast =
            document.getElementById(
                "toast"
            );


        if (!toast) {
            return;
        }


        toast.style.display =
            "none";


        toast.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /* =========================================================
    MODAL PRINCIPAL
    ========================================================= */

    export function abrirModal() {

        const modal =
            document.getElementById(
                "modal"
            );


        if (!modal) {
            return;
        }


        modal.style.display =
            "flex";


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-aberto"
        );

    }


    /* =========================================================
    FECHAR MODAL PRINCIPAL
    ========================================================= */

    export function fecharModal() {

        const modal =
            document.getElementById(
                "modal"
            );


        if (!modal) {
            return;
        }


        modal.style.display =
            "none";


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-aberto"
        );

    }


    /* =========================================================
    MODAL DE SUCESSO
    ========================================================= */

    export function abrirModalSucesso() {

        const modal =
            document.getElementById(
                "successModal"
            );


        if (!modal) {
            return;
        }


        modal.style.display =
            "flex";


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-aberto"
        );

    }


    /* =========================================================
    FECHAR MODAL DE SUCESSO
    ========================================================= */

    export function fecharModalSucesso() {

        const modal =
            document.getElementById(
                "successModal"
            );


        if (!modal) {
            return;
        }


        modal.style.display =
            "none";


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-aberto"
        );

    }


    /* =========================================================
    FECHAR MODAL COM ESC
    ========================================================= */

    function ativarTeclaEscape() {

        if (
            window.escapeInterfaceInicializado
        ) {
            return;
        }


        document.addEventListener(
            "keydown",
            (evento) => {

                if (
                    evento.key !== "Escape"
                ) {
                    return;
                }


                fecharModal();

                fecharModalSucesso();

                fecharToast();

            }
        );


        window.escapeInterfaceInicializado =
            true;

    }


    /* =========================================================
    INTERFACE
    ========================================================= */

    export function ativarInterface() {

        /*
        * Evita cadastrar os mesmos eventos mais de uma vez.
        */

        if (
            window.interfaceInicializada
        ) {

            ativarTeclaEscape();

            return;

        }


        /*
        * Os HTML atuais utilizam onclick.
        * Como app.js é um módulo, os métodos precisam
        * ser disponibilizados explicitamente no objeto window.
        */

        window.mostrarToast =
            mostrarToast;

        window.fecharToast =
            fecharToast;

        window.abrirModal =
            abrirModal;

        window.fecharModal =
            fecharModal;

        window.abrirModalSucesso =
            abrirModalSucesso;

        window.fecharModalSucesso =
            fecharModalSucesso;


        ativarTeclaEscape();


        window.interfaceInicializada =
            true;

    }