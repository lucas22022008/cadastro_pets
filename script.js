function adicionarPet() {
    const nomePet = document.getElementById('nome').value;
    const tipoPet = document.getElementById('tipo').value;
    const idadePet = document.getElementById('idade').value;
    const racaPet = document.getElementById('raca').value;
    const generoPet = document.getElementById('genero').value;

    const petInfo = `<div class="pet-info">
                        <p><strong>Nome:</strong> ${nomePet}</p>
                        <p><strong>Tipo:</strong> ${tipoPet}</p>
                        <p><strong>Idade:</strong> ${idadePet}</p>
                        <p><strong>Raça:</strong> ${racaPet}</p>
                        <p><strong>Gênero:</strong> ${generoPet}</p>
                        <button onclick="editarPet(this)">Editar</button>
                        <button onclick="excluirPet(this)">Excluir</button>
                     </div>`;

    document.getElementById('lista-pets').insertAdjacentHTML('beforeend', petInfo);

    // Limpar os campos de input após adicionar o pet
    document.getElementById('nome').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('raca').value = '';

    // Armazenar os dados do pet no localStorage
    const petsCadastrados = JSON.parse(localStorage.getItem('pets')) || [];
    petsCadastrados.push({
        nome: nomePet,
        tipo: tipoPet,
        idade: idadePet,
        raca: racaPet,
        genero: generoPet
    });
    localStorage.setItem('pets', JSON.stringify(petsCadastrados));
}

// Recuperar os pets cadastrados do localStorage ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    atualizarListaPets();
});

function editarPet(button) {
    const petInfoDiv = button.parentNode;
    const nomePet = petInfoDiv.querySelector('p:nth-child(2) strong').textContent;
    const tipoPet = petInfoDiv.querySelector('p:nth-child(1) strong').textContent;
    const idadePet = petInfoDiv.querySelector('p:nth-child(3) strong').textContent;
    const racaPet = petInfoDiv.querySelector('p:nth-child(4) strong').textContent;
    const generoPet = petInfoDiv.querySelector('p:nth-child(5) strong').textContent;

    document.getElementById('nome').value = nomePet;
    document.getElementById('tipo').value = tipoPet;
    document.getElementById('idade').value = idadePet;
    document.getElementById('raca').value = racaPet;
    document.getElementById('genero').value = generoPet;

    excluirPet(button);
}

function excluirPet(button) {
    const petInfoDiv = button.parentNode;
    petInfoDiv.remove();

    const petsCadastrados = JSON.parse(localStorage.getItem('pets')) || [];
    const nomePet = petInfoDiv.querySelector('p:nth-child(2) strong').textContent;
    const tipoPet = petInfoDiv.querySelector('p:nth-child(1) strong').textContent;
    const idadePet = petInfoDiv.querySelector('p:nth-child(3) strong').textContent;
    const racaPet = petInfoDiv.querySelector('p:nth-child(4) strong').textContent;
    const generoPet = petInfoDiv.querySelector('p:nth-child(5) strong').textContent;

    const petIndex = petsCadastrados.findIndex((pet) => {
        return (
            pet.nome === nomePet &&
            pet.tipo === tipoPet &&
            pet.idade === idadePet &&
            pet.raca === racaPet &&
            pet.genero === generoPet
        );
    });

    if (petIndex !== -1) {
        petsCadastrados.splice(petIndex, 1);
        localStorage.setItem('pets', JSON.stringify(petsCadastrados)); // Atualizar o localStorage após exclusão
    }
}

function atualizarListaPets() {
    // Limpar a lista atual de pets exibidos na página
    const listaPetsElement = document.getElementById('lista-pets');
    listaPetsElement.innerHTML = '';

    // Recuperar os pets cadastrados do localStorage
    const petsCadastrados = JSON.parse(localStorage.getItem('pets')) || [];

    // Recriar a lista de pets na página
    petsCadastrados.forEach((pet) => {
        const petInfo = `<div class="pet-info">
                            <p><strong>Nome:</strong> ${pet.nome}</p>
                            <p><strong>Tipo:</strong> ${pet.tipo}</p>
                            <p><strong>Idade:</strong> ${pet.idade}</p>
                            <p><strong>Raça:</strong> ${pet.raca}</p>
                            <p><strong>Gênero:</strong> ${pet.genero}</p>
                            <button onclick="editarPet(this)">Editar</button>
                            <button onclick="excluirPet(this)">Excluir</button>
                         </div>`;
        listaPetsElement.insertAdjacentHTML('beforeend', petInfo);
    });
}