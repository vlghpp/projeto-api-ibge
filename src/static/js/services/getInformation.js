import { getDataIdNamePeriods as getAllPeriods } from "./createFilterPeriod.js"
import { getAllLocations } from "./createFilterLocations.js"
const tableRows = document.querySelectorAll('.tr_data')
//Fazer uma classe contendo tudo e exportar apenas ela (design patterns)
//Mudar do value ser o id ai é só consultar pelo value (acho que dessa forma posso apagar toda getParamsIdToEndpoint())

let localName = null
let periodName = null

export function getInformationInputIds() {
    localName = document.getElementById('locations').value
    periodName = document.getElementById('dates').value

    //trativa para o -------- do local e --------- das datas
    if(localName === "discard" || periodName === "discard"){
        alert("Foi escolhido uma opção inválida")    
    }else{
        const { localId, localLevel, periodId } = getParamsIdToEndpoint(localName, periodName)
        return { localId, localLevel, periodId }
    }
}

export function getInformationInputs(){
    return { localName, periodName }
}

function getParamsIdToEndpoint(local, period) {
    const data_periods = getAllPeriods() 
    const data_locations = getAllLocations() 

    let localId = null, periodId = null, localLevel = null

    for (let key in data_periods) {
        if (data_periods[key].literals[0] === period) {
            periodId = data_periods[key].id
        }
    }

    for (let key in data_locations) {
        if (data_locations[key].nome === local) {
            localId = data_locations[key].id
            localLevel = data_locations[key].nivel.id
        }
    }

    return { localId, localLevel, periodId }
}

export function getAllDataMonthlyVariation(){
    let monthlyVariation = []
    
    for(const tr of tableRows[0].children){
        for(const tdAndTh of tr.children){
            if(tdAndTh.tagName !== "TH"){
                console.log(tdAndTh.textContent);
                monthlyVariation.push(tdAndTh.textContent)
            }
        }
    }
    return monthlyVariation
}

export function getAllDataAccumulatedVariationYear(){
    let accumulatedVariationYear = []

    for(const tr of tableRows[1].children){
        for(const tdAndTh of tr.children){
            if(tdAndTh.tagName !== "TH"){
                console.log(tdAndTh.textContent);
                accumulatedVariationYear.push(tdAndTh.textContent)
            }
        }
    }
    return accumulatedVariationYear
}
