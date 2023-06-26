const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const inputNome = document.getElementById('nome')
const itens = JSON.parse(localStorage.getItem("itens")) || [];
nome.focus()

itens.forEach(elemento => {
    criaElemento(elemento)
});

form.addEventListener("submit", (evento) => {
 	evento.preventDefault();
	const nome = evento.target.elements.nome;
	const quantidade = evento.target.elements.quantidade;
    const itemAtual = {
		nome: nome.value.toLowerCase(),
		quantidade: quantidade.value,
	};

    const existe = itens.find(elemento => elemento.nome === nome.value)

    if(nome.value != 0 & quantidade.value > 0 & !existe){
	    criaElemento(itemAtual)

        itens.push(itemAtual)

        itemAtual.id = nome.value
    } else if (existe) {
        itemAtual.id = existe.id
		existe.quantidade = JSON.parse(quantidade.value)
    }

	location.reload()

    localStorage.setItem("itens", JSON.stringify(itens));

	quantidade.value = "";
	nome.value = "";
});

function criaElemento(item) {
    nome.focus()
	const novoItem = document.createElement("li");
	novoItem.classList.add("item");

	const numeroItem = document.createElement("strong");
	if(item.quantidade == 0){
		numeroItem.innerHTML = 1;
	} else {
		numeroItem.innerHTML = item.quantidade;
	}
    	numeroItem.dataset.id = item.id
	const lixeira = document.createElement("img")
	lixeira.setAttribute("src", "lixeira.png")
	lixeira.setAttribute("id", item.nome)
	novoItem.appendChild(numeroItem);   
	novoItem.innerHTML += item.nome;
	novoItem.appendChild(lixeira)
	lista.appendChild(novoItem);
	
	lixeira.addEventListener('click', (evento) => {
		evento.preventDefault();
		const elemento = document.getElementById(item.nome).parentElement
		elemento.remove()
		const index = itens.indexOf(item)
		itens.splice(index, 1)
		localStorage.setItem('itens', JSON.stringify(itens))
	})
	
}
