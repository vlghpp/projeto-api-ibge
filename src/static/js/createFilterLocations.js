const section_locations = document.getElementById('locations')

function searchData(){
    const geograficLevel = ["N1", "N7", "N6"]
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
    })
    .catch(error => {
        console.log(error)
    })
}

function insertData(data){
    for(values of data){
        console.log(values);
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

searchData()