const adicionarTarefaBtn = document.querySelector('.app__button--add-task');
const formAddTarefa = document.querySelector('.app__form-add-task');
const listaTarefas = document.querySelector('.app__section-task-list');
const textArea = document.querySelector('.app__form-textarea');
const limparTodasTarefasBtn = document.getElementById("btn-remover-todas");
const limparTarefasConcluidasBtn = document.getElementById("btn-remover-concluidas");
const btnCancelarAcao = document.querySelector('.app__form-footer__button--cancel');
adicionarTarefaBtn.addEventListener('click', () => {
    formAddTarefa.classList.toggle('hidden');
});

// Recupera a lista de tarefas da localStorage
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

window.onload = function() {
    // Para cada tarefa na lista
    for (let textoTarefa of tarefas) {
        // Cria um novo item de tarefa e o adiciona à lista de tarefas
        criarTarefa(textoTarefa, false);
    }
};

function criarTarefa(textoTarefa, salvar = true) {
    if (salvar) {
        // Adiciona a nova tarefa à lista
        tarefas.push(textoTarefa);
        // Armazena a lista atualizada de volta na localStorage
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    const novaTarefa = document.createElement('li');
    novaTarefa.classList.add('app__section-task-list-item');

    // Cria um novo botão de edição
    const botaoEditar = document.createElement('button');
    botaoEditar.classList.add('app_button-edit');
    const imgBtnEditar = document.createElement('img');
    imgBtnEditar.setAttribute('src', '/imagens/edit.png');
    botaoEditar.append(imgBtnEditar);

    // Cria um novo botão de exclusão
    const botaoExcluir = document.createElement('button');
    botaoExcluir.classList.add('app__button-delete');
    const imgBtnExcluir = document.createElement('img');
    imgBtnExcluir.setAttribute('src', '/imagens/delete.png');
    imgBtnExcluir.setAttribute('alt', 'Excluir');
    imgBtnExcluir.classList.add('app__button-delete');
    botaoExcluir.append(imgBtnExcluir);

    // Criar botão de tarefa concluída
    const botaoCheck = document.createElement('button');
    botaoCheck.classList.add('button-Check');
    const imgBtnCheck = document.createElement('img');
    imgBtnCheck.setAttribute('src', '/imagens/check.svg');
    imgBtnCheck.setAttribute('alt', 'Check');
    botaoCheck.append(imgBtnCheck);

    // Evento para excluir a tarefa
    botaoExcluir.addEventListener('click', () => {
        const index = tarefas.indexOf(textoTarefa);
        if (index > -1) {
            tarefas.splice(index, 1);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            novaTarefa.remove();
        }
    });
    // Evento para editar a tarefa
    botaoEditar.addEventListener('click', () => {
        const index = tarefas.indexOf(textoTarefa);
        if (index > -1) {
            tarefas.splice(index, 1);
            localStorage.setItem('tarefas', JSON.stringify(tarefas));
            novaTarefa.remove();
            textArea.value = textoTarefa;
            formAddTarefa.classList.remove('hidden');
            btnCancelarAcao.classList.add('hidden');
        }
    });
    // Evento botão de check
    botaoCheck.addEventListener('click', function() {
        botaoCheck.classList.toggle('completed'); // Adiciona ou remove a classe 'completed'
    });

    // Cria um novo elemento p
    const paragrafo = document.createElement('p');
    paragrafo.classList.add('app__section-task-list-item-description');
    paragrafo.textContent = textoTarefa;

    // Adiciona os botões, o p e o SVG ao li
    novaTarefa.appendChild(botaoEditar);
    novaTarefa.appendChild(botaoExcluir);
    novaTarefa.appendChild(botaoCheck);
    novaTarefa.appendChild(paragrafo);

    // Adiciona a nova tarefa à lista de tarefas
    listaTarefas.appendChild(novaTarefa);
}

formAddTarefa.addEventListener('submit', (event) => {
    event.preventDefault();

    const textoTarefa = textArea.value;

    if (!textoTarefa) {
        alert('Digite uma tarefa!');
        return;
    }
    else if (textoTarefa.length > 53) {
        alert(`A tarefa não pode ter mais de 53 caracteres!`);
        return
    }

    criarTarefa(textoTarefa);

    textArea.value = '';
    formAddTarefa.classList.add('hidden');
});

limparTodasTarefasBtn.addEventListener('click', () => {
    // Limpa a lista de tarefas do array e da localStorage
    tarefas = [];
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    // Remove todas as tarefas do DOM
    while (listaTarefas.firstChild) {
        listaTarefas.removeChild(listaTarefas.firstChild);
    }
});

limparTarefasConcluidasBtn.addEventListener('click', () => {
    // Seleciona todas as tarefas
    const tarefasItens = document.querySelectorAll('.app__section-task-list-item');

    // Cria uma nova lista de tarefas filtrada, mantendo apenas as não concluídas
    tarefas = Array.from(tarefasItens).reduce((acumulador, tarefa) => {
        const botaoCheck = tarefa.querySelector('.button-Check');
        if (botaoCheck.classList.contains('completed')) {
            // Remove a tarefa concluída do DOM
            tarefa.remove();
        } else {
            // Adiciona a tarefa não concluída ao acumulador
            acumulador.push(tarefa.querySelector('p').textContent);
        }
        return acumulador;
    }, []);

    // Atualiza a lista de tarefas na localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
});
btnCancelarAcao.addEventListener('click', (event) => {
    event.preventDefault();
    const textoAtual = textArea.value.trim();
    if (textoAtual === '') {
        formAddTarefa.classList.add('hidden'); // Oculta o formulário de adição de tarefa
    }else {
        formAddTarefa.classList.add('hidden'); // Oculta o formulário de adição de tarefa
    }
});
