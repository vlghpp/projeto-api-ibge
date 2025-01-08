let data_periods = {}
const aggregate = 7063 //7060
async function getData(){
    await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/periodos`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        insertData(data)
        data_periods = data
    })
    .catch(error => {
        console.error(error.message)
    })
}

function insertData(data){
    const section_dates = document.getElementById('dates')
    for(let values of data){
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




