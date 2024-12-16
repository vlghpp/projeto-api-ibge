let data_periods = {}

async function getData(){
    await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/7063/periodos`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        insertData(data)
        data_periods = data
    })
    .catch(error => {
        console.log(error)
    })
}

function insertData(data){
    const section_dates = document.getElementById('dates')
    let values = null
    for(values of data){
        let option = document.createElement('option')
        option.value = values.literals[0]
        option.text = values.literals[0]
        section_dates.appendChild(option)
    }
    let lines = document.createElement('option')
    lines.value = "discard"
    lines.text = "---------"
    section_dates.appendChild(lines)

}

export function getDataIdNamePeriods(){
    return data_periods
}

getData()




