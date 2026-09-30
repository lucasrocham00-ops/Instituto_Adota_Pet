/* =========================================================
   INSTITUTO ADOTA PET
   MÓDULO DE FORMULÁRIO
   ========================================================= */

import {
    obterUltimoCadastro,
    salvarCadastro
} from "./armazenamento.js";

import {
    mostrarToast,
    abrirModalSucesso
} from "./interface.js";


/* =========================================================
   RESTAURAÇÃO DOS DADOS
   ========================================================= */

export function restaurarDadosFormulario() {

    const formulario =
        document.getElementById(
            "cadastroForm"
        );


    if (!formulario) {
        return;
    }


    const ultimoCadastro =
        obterUltimoCadastro();


    if (!ultimoCadastro) {
        return;
    }


    Object.keys(
        ultimoCadastro
    ).forEach(
        (chave) => {

            const campo =
                formulario.elements[chave];


            if (!campo) {
                return;
            }


            /*
             * Evita tentar colocar valores inválidos
             * em elementos que não sejam campos de formulário.
             */

            if (
                "value" in campo
            ) {

                campo.value =
                    ultimoCadastro[chave] ?? "";

            }

        }
    );

}


/* =========================================================
   VALIDAÇÃO DE CAMPO
   ========================================================= */

export function validarCampo(campo) {

    if (!campo) {
        return true;
    }


    const valido =
        campo.checkValidity();


    campo.classList.toggle(
        "campo-invalido",
        !valido
    );


    campo.classList.toggle(
        "campo-valido",
        valido
    );


    return valido;

}


/* =========================================================
   LIMPAR ESTADO VISUAL
   ========================================================= */

function limparValidacao(
    formulario
) {

    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    campos.forEach(
        (campo) => {

            campo.classList.remove(
                "campo-invalido",
                "campo-valido"
            );

        }
    );

}


/* =========================================================
   MONTAR OBJETO DO CADASTRO
   ========================================================= */

function criarCadastro(
    dados
) {

    return {

        nome:
            dados.get("nome"),

        email:
            dados.get("email"),

        dataNascimento:
            dados.get("dataNascimento"),

        cpf:
            dados.get("cpf"),

        telefone:
            dados.get("telefone"),

        cep:
            dados.get("cep"),

        endereco:
            dados.get("endereco"),

        cidade:
            dados.get("cidade"),

        estado:
            dados.get("estado"),

        interesse:
            dados.get("interesse"),

        mensagem:
            dados.get("mensagem")

    };

}


/* =========================================================
   FORMULÁRIO
   ========================================================= */

export function ativarFormulario() {

    const formulario =
        document.getElementById(
            "cadastroForm"
        );


    if (!formulario) {
        return;
    }


    /*
     * Como o #app pode ser substituído durante a navegação,
     * o formulário atual sempre é um elemento novo.
     * Portanto, podemos registrar os eventos normalmente.
     */

    const campos =
        formulario.querySelectorAll(
            "input, select, textarea"
        );


    /* =====================================================
       BLUR
       ===================================================== */

    campos.forEach(
        (campo) => {

            campo.addEventListener(
                "blur",
                () => {

                    validarCampo(
                        campo
                    );

                }
            );


            /* =================================================
               INPUT
               ================================================= */

            campo.addEventListener(
                "input",
                () => {

                    if (
                        campo.classList.contains(
                            "campo-invalido"
                        )
                    ) {

                        validarCampo(
                            campo
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       SUBMIT
       ===================================================== */

    formulario.addEventListener(
        "submit",
        (evento) => {

            evento.preventDefault();


            let formularioValido =
                true;


            campos.forEach(
                (campo) => {

                    if (
                        !validarCampo(
                            campo
                        )
                    ) {

                        formularioValido =
                            false;

                    }

                }
            );


            if (!formularioValido) {

                const primeiroInvalido =
                    formulario.querySelector(
                        ".campo-invalido"
                    );


                if (
                    primeiroInvalido
                ) {

                    primeiroInvalido.focus();

                }


                return;

            }


            const dados =
                new FormData(
                    formulario
                );


            const cadastro =
                criarCadastro(
                    dados
                );


            const salvo =
                salvarCadastro(
                    cadastro
                );


            if (!salvo) {

                mostrarToast();

                return;

            }


            const modal =
                document.getElementById(
                    "successModal"
                );


            if (modal) {

                abrirModalSucesso();

            } else {

                mostrarToast();

            }

        }
    );


    /* =====================================================
       RESET
       ===================================================== */

    formulario.addEventListener(
        "reset",
        () => {

            /*
             * O reset nativo acontece depois do evento.
             * O pequeno timeout garante que a limpeza visual
             * aconteça depois da restauração dos valores.
             */

            setTimeout(
                () => {

                    limparValidacao(
                        formulario
                    );

                },
                0
            );

        }
    );

}