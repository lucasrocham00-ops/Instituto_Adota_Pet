/* =========================================================
   INSTITUTO ADOTA PET
   MÓDULO DE ARMAZENAMENTO
   ========================================================= */


/* =========================================================
   CHAVE DO LOCAL STORAGE
   ========================================================= */

const chaveCadastros =
    "cadastrosInstitutoAdotaPet";


/* =========================================================
   OBTER CADASTROS
   ========================================================= */

export function obterCadastros() {

    try {

        const dados =
            localStorage.getItem(
                chaveCadastros
            );


        if (!dados) {
            return [];
        }


        const cadastros =
            JSON.parse(
                dados
            );


        return Array.isArray(
            cadastros
        )
            ? cadastros
            : [];


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

    try {

        const cadastros =
            obterCadastros();


        cadastros.push(
            cadastro
        );


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