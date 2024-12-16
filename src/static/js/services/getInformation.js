import { getDataIdNamePeriods as getAllPeriods } from "./createFilterPeriod.js"
import { getAllLocations } from "./createFilterLocations.js"

export function getInformationInput() {
    const localName = document.getElementById('locations').value
    const periodName = document.getElementById('dates').value

    //trativa para o -------- do local e --------- das datas
    if(localName === "discard" || periodName === "discard"){
        alert("Foi escolhido uma opção inválida")    
    }else{
        const { localId, localLevel, periodId } = getParamsToEndpoint(localName, periodName)
        return { localId, localLevel, periodId }
    }
}

function getParamsToEndpoint(local, period) {
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
