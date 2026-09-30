/* =========================================================
   INSTITUTO ADOTA PET
   MÓDULO DE PROJETOS
   ========================================================= */

import {
    atualizarAOS
} from "./interface.js";


/* =========================================================
   DADOS DOS PROJETOS
   ========================================================= */

export const projetos = [

    {
        id: "doacao",
        numero: "01",
        titulo: "Doação",
        categoria: "Apoio necessário",
        classeBadge: "badge-neutral",
        descricao:
            "As doações ajudam a manter ações de proteção, alimentação, cuidados e bem-estar dos animais.",
        imagem: "../IMAGENS/gato-carinho.jpg",
        alt: "Gato recebendo carinho e atenção"
    },

    {
        id: "voluntariado",
        numero: "02",
        titulo: "Voluntariado",
        categoria: "Novas oportunidades",
        classeBadge: "badge-warning",
        descricao:
            "O voluntariado permite que pessoas contribuam com ações relacionadas à proteção e ao cuidado dos animais.",
        imagem: "../IMAGENS/passeio-caes.jpg",
        alt: "Cães participando de uma atividade ao ar livre"
    },

    {
        id: "adocao",
        numero: "03",
        titulo: "Adoção responsável",
        categoria: "Disponível para adoção",
        classeBadge: "badge-success",
        descricao:
            "Adotar significa assumir o compromisso de oferecer cuidado, segurança, alimentação e carinho durante toda a vida do animal.",
        imagem: "../IMAGENS/familia-doacao.jpg",
        alt: "Família relacionada à adoção responsável de animais"
    }

];


/* =========================================================
   GERAÇÃO DOS PROJETOS
   ========================================================= */

export function gerarProjetos() {

    const lista =
        document.getElementById(
            "lista-projetos"
        );

    const template =
        document.getElementById(
            "projeto-template"
        );


    if (!lista || !template) {
        return;
    }


    lista.innerHTML = "";


    projetos.forEach(
        (projeto) => {

            const clone =
                template.content.cloneNode(
                    true
                );


            const secao =
                clone.querySelector(
                    "section"
                );

            const imagem =
                clone.querySelector(
                    "img"
                );

            const numero =
                clone.querySelector(
                    ".card-number"
                );

            const titulo =
                clone.querySelector(
                    "h2"
                );

            const descricao =
                clone.querySelector(
                    ".projeto-descricao"
                );

            const categoria =
                clone.querySelector(
                    ".badge"
                );


            /* =================================================
               SEÇÃO
               ================================================= */

            if (secao) {

                /*
                 * Prefixo para evitar conflito com os IDs
                 * das seções estáticas de projetos.html.
                 */

                secao.id =
                    `projeto-${projeto.id}`;

                secao.setAttribute(
                    "data-projeto",
                    projeto.id
                );

                secao.setAttribute(
                    "data-aos",
                    "fade-up"
                );

            }


            /* =================================================
               IMAGEM
               ================================================= */

            if (imagem) {

                imagem.src =
                    projeto.imagem;

                imagem.alt =
                    projeto.alt;

            }


            /* =================================================
               NÚMERO
               ================================================= */

            if (numero) {

                numero.textContent =
                    projeto.numero;

            }


            /* =================================================
               TÍTULO
               ================================================= */

            if (titulo) {

                titulo.textContent =
                    projeto.titulo;

            }


            /* =================================================
               DESCRIÇÃO
               ================================================= */

            if (descricao) {

                descricao.textContent =
                    projeto.descricao;

            }


            /* =================================================
               BADGE
               ================================================= */

            if (categoria) {

                categoria.textContent =
                    projeto.categoria;

                categoria.className =
                    `badge ${projeto.classeBadge}`;

            }


            lista.appendChild(
                clone
            );

        }
    );


    atualizarAOS();

}