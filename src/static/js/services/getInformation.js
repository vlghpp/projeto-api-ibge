import { getDataIdNamePeriods as getAllPeriods } from "./createFilterPeriod.js"
import { getAllLocations } from "./createFilterLocations.js"
const tableRows = document.querySelectorAll('.tr_data')
//Fazer uma classe contendo tudo e exportar apenas ela (design patterns)
//Mudar do value ser o id ai é só consultar pelo value (acho que dessa forma posso apagar toda getParamsIdToEndpoint())

let localName = null
let periodName = null
let aggregateName = null
let aggregate = document.getElementById('aggregates');
aggregate.addEventListener('change', (e) => { 
    aggregateName = e.target.value
});

export function getInformationInputIds() {
    localName = document.getElementById('locations').value
    periodName = document.getElementById('dates').value

    //trativa para o -------- do local e --------- das datas
    if (localName === "discard" || periodName === "discard") {
        alert("Foi escolhido uma opção inválida")
    } else {
        const { localId, localLevel, periodId } = getParamsIdToEndpoint(localName, periodName)
        return { localId, localLevel, periodId }
    }
}

export function getInformationInputs() {
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

export function getAggregateName(){
    return aggregateName
}


export function getAllDataMonthlyVariation() {
    let monthlyVariation = {
        "VariacaoMensal": {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            7: null,
            8: null,
            9: null,
        }
    }
    let index = 0
    for (const tr of tableRows) {

        if(tr.id === "monthlyVariation"){
            for (const childTr of tr.children) {
                if(childTr.tagName != "TH"){
                    monthlyVariation["VariacaoMensal"][index] = childTr.textContent
                    index++
                }
            }
        }
    }
    return monthlyVariation
}

export function getAllDataAccumulatedVariationYear() {
    let accumulatedVariationYear = {
        "VariacaoAcumulada": {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            7: null,
            8: null,
            9: null,
        }
    }
    
    let index = 0
    for (const tr of tableRows) {
        if(tr.id === "accumulatedVariationYear"){
            for (const childTr of tr.children) {
                if(childTr.tagName != "TH"){
                    accumulatedVariationYear["VariacaoAcumulada"][index] = childTr.textContent
                    index++
                }
            }
        }
    }
    return accumulatedVariationYear
}
export function getAllDataMonthlyWeight() {
    let monthlyWeight = {
        "PesoMensal": {
            0: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null,
            7: null,
            8: null,
            9: null,
        }
    }
    let index = 0
    for (const tr of tableRows) {
        if(tr.id === "monthlyWeight"){
            for (const childTr of tr.children) {
                if(childTr.tagName != "TH"){
                    monthlyWeight["PesoMensal"][index] = childTr.textContent
                    index++
                }
            }
        }
    }
    return monthlyWeight
}
