import { getInformationInputIds, getInformationInputs, getAllDataAccumulatedVariationYearService, getAllDataMonthlyVariationService, getAllDataMonthlyWeightService } from "../services/getInformation.js";
import { createTableWithData } from "../view/tableToMainScreen.js";
import { initializeChartBar } from "../view/graphicBar.js";
import { initializeChartPie } from "../view/graphicPie.js";
import { getMetadatas } from "../services/requestMetadatas.js";
import { getMetadatasSubgroups } from "../services/requestMetadatasSubgroups.js";
import { getAllIdSubgroups } from "../services/createFilterSubgroup.js";
import { createTableSubgroups } from "../view/tableSubgroups.js";

function getAllInformation(){
    const { localId, localLevel, periodId, subgroupName } = getInformationInputIds()    
    return { localId, localLevel, periodId, subgroupName }
}

export function getAllDataAccumulatedVariationYear(){
    return getAllDataAccumulatedVariationYearService()
}

export function getAllDataMonthlyVariation(){
    return getAllDataMonthlyVariationService()
}

export function getAllDataMonthlyWeight(){
    return getAllDataMonthlyWeightService()
}

function startSearch(){
    sendEndpointIBGE()
}

async function sendEndpointIBGE(){
    const { localId, localLevel, periodId, subgroupName } = getAllInformation()
    getMetadatas(periodId, localLevel, localId)
    .then(result => {
        return result.json()
    })
    .then(data =>{
        const { localName, periodName } = getInformationInputs()        
        createTableWithData(data, localName, periodName, periodId)
        initializeChartBar()
        initializeChartPie()
        if(subgroupName != "default"){
            const idSubgroups = getAllIdSubgroups()
            getMetadatasSubgroups(periodId, localLevel, localId, idSubgroups)
            .then(result => result.json())
            .then(data => {
                createTableSubgroups(data, localName, periodName, periodId)
            })
            
        }


        //chamar função que faz a requisição dos dados para a tabela de subgroups (exemplo: getMetadatas desse arquivo), então verificar se o valor é != de default, caso for, então chamar esta função que vai ter .then criando a tabela de subgroups 


    })
    .catch(error => {
        console.log(error.message);
    })
}

const send_button = document.getElementById('send_button')
send_button.onclick = startSearch
