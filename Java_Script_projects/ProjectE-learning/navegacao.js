document.addEventListener("DOMContentLoaded", function () {

    const htmlCursoElement = document.querySelector('.opcao-curso.html');
    if (htmlCursoElement) {
        htmlCursoElement.addEventListener('click', function () {
            window.location.href = "../pagAulas/pagCurso.html";
        });
    }

    const aula1Element = document.querySelector('.lesson');
    if (aula1Element) {
        aula1Element.addEventListener('click', function () {
            window.location.href = "../pateFInal/parteFinalVideo.html";
        });
    }
});
