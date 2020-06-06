function populateUFs() {
    const uFSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then(res => res.json()).then(states => {
        for (const state of states) {
            uFSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url).then(res => res.json()).then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>` 
        }
        citySelect.disabled = false;
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

// Itens de coleta
// Pegar todos os li's
const itemsCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event) {

    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

    console.log('Item id:',  itemId);
    
  

    // verificar se existem items selecionados, se sim
    // pegar os items selecionados

    const alereadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso será true ou false
        return itemFound
    })


    // se já estiver selecionado, 
    if (alereadySelected >= 0) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // senão estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems:', selectedItems)

    // atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems
}