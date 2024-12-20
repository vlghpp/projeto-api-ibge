import { getDataIdAggregates } from "./createFilterIdAggregates.js"

let data_aggregate = {}
let counterPositions = 0

async function getData(){
    await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        insertData(data)
        for(let key in data){
            data_aggregate[counterPositions] = data[key]  
            counterPositions++          
        }
        getDataIdAggregates()
    })
    .catch(error => {
        console.log(error)
    })
}

function insertData(data){
    const section_aggregates = document.getElementById('aggregates')
    for(let values of data){
        let option = document.createElement('option')
        option.value = values.nome
        option.text = values.nome
        section_aggregates.appendChild(option)
    }
    let lines = document.createElement('option')
    lines.value = "discard"
    lines.text = "---------"
    section_aggregates.appendChild(lines)
}

export function getAllAggregates(){    
    return data_aggregate
}

getData()
