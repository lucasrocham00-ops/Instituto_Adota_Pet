```javascript
/* =========================================================
   INSTITUTO ADOTA PET
   MÓDULO DE INTERFACE
   ========================================================= */


/* =========================================================
   AOS
   ========================================================= */

export function inicializarAOS() {

    if (
        typeof AOS === "undefined"
    ) {

        console.warn(
            "A biblioteca AOS não foi carregada."
        );

        return;

    }


    if (
        window.aosInicializado
    ) {

        return;

    }


    AOS.init({

        duration: 700,

        easing:
            "ease-out-cubic",

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
        typeof AOS === "undefined"
    ) {

        return;

    }


    if (
        typeof AOS.refreshHard === "function"
    ) {

        AOS.refreshHard();

    } else {

        AOS.refresh();

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


    modal.hidden =
        false;


    modal.style.display =
        "flex";


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.style.overflow =
        "hidden";

}


export function fecharModal() {

    const modal =
        document.getElementById(
            "modal"
        );


    if (!modal) {

        return;

    }


    modal.hidden =
        true;


    modal.style.display =
        "none";


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

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


    /*
     * O cadastro.html utiliza o atributo hidden.
     * Portanto, ele precisa ser removido antes
     * de exibir o modal.
     */

    modal.hidden =
        false;


    modal.style.display =
        "flex";


    modal.setAttribute(
        "aria-hidden",
```
