// Constantes
const formulario = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itemArmazenado = JSON.parse(localStorage.getItem("armazenamentoDeItens")) || []

itemArmazenado.forEach((item) => {
    criaItem(item)
})

// Funções
function criaItem (itemAdicionado) {

       // Cria 'li' e atribui a classe ".item" a ela.
    const novoItemCadastrado = document.createElement('li')
    novoItemCadastrado.classList.add("item")

        // Cria um 'strong' com a quantiade de objetos adicionados
    const quantidadeItens = document.createElement('strong')
    quantidadeItens.innerHTML = itemAdicionado.quantidade
        //Insere uma 'id' no item
    quantidadeItens.dataset.id = itemAdicionado.id

        // Junta a criação da 'li', com a class ".item" e com o strong, montando a linha no formato correto
    novoItemCadastrado.appendChild(quantidadeItens)
    novoItemCadastrado.innerHTML += itemAdicionado.nome

    novoItemCadastrado.appendChild(botaoDeleta(itemAdicionado.id))

        // Insere a linha criada na lista pré-existente
    lista.appendChild(novoItemCadastrado)

}

function atualizaItem (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// Scripts
formulario.addEventListener("submit", (capturou) => {
    capturou.preventDefault()

        // Cria constante para melhorar o código
    const nome = capturou.target.elements['nome']
    const quantidade = capturou.target.elements['quantidade']

    const existe = itemArmazenado.find(item => item.nome === nome.value)

    const armazenamentoDeItens = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        armazenamentoDeItens.id = existe.id

        atualizaItem(armazenamentoDeItens)

        itemArmazenado[itemArmazenado.findIndex(item => item.id === existe.id)] = armazenamentoDeItens
    }

    else {
        armazenamentoDeItens.id = itemArmazenado[itemArmazenado.length -1] ? (itemArmazenado[itemArmazenado.length -1]).id + 1 : 0

        criaItem(armazenamentoDeItens)

        itemArmazenado.push(armazenamentoDeItens)

    }

    localStorage.setItem("armazenamentoDeItens", JSON.stringify(itemArmazenado))

    nome.value = ""
    quantidade.value = ""

})

function botaoDeleta (id) {
    const botaoDelete = document.createElement("button")
    botaoDelete.innerText = "x"

    botaoDelete.addEventListener("click", function() {
        deletaItem(this.parentNode, id)
    })

    return botaoDelete
}

function deletaItem (tagHTML, id) {
    tagHTML.remove()

    itemArmazenado.splice(itemArmazenado.findIndex(item => item.id === id), 1)

    localStorage.setItem("armazenamentoDeItens", JSON.stringify(itemArmazenado))
}