// Constantes
const formulario = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itemArmazenado = JSON.parse(localStorage.getItem("armazenamentoDeItens")) || []

itemArmazenado.forEach((item) => {
    criaItem(item.nome, item.quantidade)
})

// Funções
function criaItem (itemAdicionado) {

    // Cria 'li' e atribui a classe ".item" a ela.
    const novoItemCadastrado = document.createElement('li')
    novoItemCadastrado.classList.add("item")

    // Cria um 'strong' com a quantiade de objetos adicionados
    const quantidadeItens = document.createElement('strong')
    quantidadeItens.innerHTML = itemAdicionado.quantidade


    // Junta a criação da 'li', com a class ".item" e com o strong, montando a linha no formato correto
    novoItemCadastrado.appendChild(quantidadeItens)
    novoItemCadastrado.innerHTML += itemAdicionado.nome

    // Insere a linha criada na lista pré-existente
    lista.appendChild(novoItemCadastrado)

}

// Scripts
formulario.addEventListener("submit", (capturou) => {
    capturou.preventDefault()

    // Cria constante para melhorar o código
    const nome = capturou.target.elements['nome']
    const quantidade = capturou.target.elements['quantidade']

    const armazenamentoDeItens = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    criaItem(armazenamentoDeItens)

    itemArmazenado.push(armazenamentoDeItens)

    localStorage.setItem("armazenamentoDeItens", JSON.stringify(itemArmazenado))

    nome.value = ""
    quantidade.value = ""

})
