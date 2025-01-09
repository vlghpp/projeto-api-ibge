import aggregateConst from "./getVariables.js"

let data_subgroups = [] 
let id_subgroups = []
const aggregate = aggregateConst 
async function getData(){
    await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/metadados`)
    .then(result => {
        return result.json()
    })
    .then(data => {
        insertData(data)
    })
    .catch(error => {
        console.log(error.message)
    })
}

function insertData(data){
    const path_elements = data.classificacoes[0].categorias
    for(let value of path_elements){
        if(value.nivel == 2){
            id_subgroups.push(value.id)
            data_subgroups.push(value.nome)
        }
    }
}

export function getAllSubgroups(){
    return data_subgroups
}


export function getAllIdSubgroups(){
    return id_subgroups
}

getData()

