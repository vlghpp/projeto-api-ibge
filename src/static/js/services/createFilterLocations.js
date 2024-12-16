let data_locations = {}
let counterPositions = 0

function searchData(){
    const geograficLevel = ["N1", "N7", "N6"]
    let value = null
    for(value of geograficLevel){
        getData(value)
    }
}

async function getData(geograficLevel){
    await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/7063/localidades/${geograficLevel}`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        insertData(data)
        let key = null //para não dar erro de undefined
        for(key in data){
            data_locations[counterPositions] = data[key]  
            counterPositions++          
        }        
    })
    .catch(error => {
        console.log(error)
    })
}

function insertData(data){
    const section_locations = document.getElementById('locations')
    let values = null
    for(values of data){
        let option = document.createElement('option')
        option.value = values.nome
        option.text = values.nome
        section_locations.appendChild(option)
    }
    let lines = document.createElement('option')
    lines.value = "discard"
    lines.text = "---------"
    section_locations.appendChild(lines)
}


export function getAllLocations(){
    return data_locations
}

searchData()
