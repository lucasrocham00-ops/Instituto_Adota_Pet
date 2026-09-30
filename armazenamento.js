/* =========================================================
   INSTITUTO ADOTA PET
   MÓDULO DE ARMAZENAMENTO
   ========================================================= */


/* =========================================================
   CONFIGURAÇÃO
   ========================================================= */

const chaveCadastros =
    "cadastrosInstitutoAdotaPet";


/* =========================================================
   OBTER CADASTROS
   ========================================================= */

export function obterCadastros() {

    const dados =
        localStorage.getItem(
            chaveCadastros
        );


    if (!dados) {

        return [];

    }


    try {

        const cadastros =
            JSON.parse(
                dados
            );


        if (
            Array.isArray(
                cadastros
            )
        ) {

            return cadastros;

        }


        return [];

    } catch (erro) {

        console.error(
            "Erro ao recuperar os cadastros:",
            erro
        );

        return [];

    }

}


/* =========================================================
   SALVAR CADASTRO
   ========================================================= */

export function salvarCadastro(
    cadastro
) {

    const cadastros =
        obterCadastros();


    cadastros.push(
        cadastro
    );


    try {

        localStorage.setItem(
            chaveCadastros,
            JSON.stringify(
                cadastros
            )
        );

        return true;

    } catch (erro) {

        console.error(
            "Erro ao salvar o cadastro:",
            erro
        );

        return false;

    }

}


/* =========================================================
   OBTER ÚLTIMO CADASTRO
   ========================================================= */

export function obterUltimoCadastro() {

    const cadastros =
        obterCadastros();


    if (
        cadastros.length === 0
    ) {

        return null;

    }


    return cadastros[
        cadastros.length - 1
    ];

}