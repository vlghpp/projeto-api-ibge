import { getInformationInputIds, getInformationInputs, getAllDataAccumulatedVariationYearService, getAllDataMonthlyVariationService, getAllDataMonthlyWeightService } from "../services/getInformation.js";
import { createTableWithData } from "../view/tableToMainScreen.js";
import { initializeChartColumn } from "../view/graphicColumn.js";
import { initializeChartPie } from "../view/graphicPie.js";
import { initializeChartBar } from "../view/graphicBarSubgroups.js";
import { getMetadatas } from "../services/requestMetadatas.js";
import { getMetadatasSubgroups } from "../services/requestMetadatasSubgroups.js";
import { getAllIdSubgroups, getAllSubgroups } from "../services/createFilterSubgroup.js";
import { createTableSubgroups, deleteTableSubgroups, getAllDataMonthlyVariationTable, getAllDataMonthlyWeightTable, getAllDataYearVariationTable } from "../view/tableSubgroups.js";
import { dataTableToCSVGroups, dataTableToCSVSubgroups } from "../services/dataTableToCSV.js";

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

function getAllDataMonthlyVariationSubgroups(){
    return getAllDataMonthlyVariationTable()
}
function getAllDataYearVariationSubgroups(){
    return getAllDataYearVariationTable()
}
function getAllDataMonthlyWeightSubgroups(){
    return getAllDataMonthlyWeightTable()
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
        initializeChartColumn()
        initializeChartPie()
        if(subgroupName != "default"){
            const idSubgroups = getAllIdSubgroups()
            const nameSubgroups = getAllSubgroups()
            getMetadatasSubgroups(periodId, localLevel, localId, idSubgroups)
            .then(result => result.json())
            .then(data => {
                createTableSubgroups(data, localName, periodName, periodId)
                const dataWeightMonthly = getAllDataMonthlyWeightSubgroups()
                initializeChartBar(nameSubgroups, dataWeightMonthly)
            })
            
        }else{
            deleteTableSubgroups()
        }

    })
    .catch(error => {
        console.error(error.message);
    })
}

const send_button = document.getElementById('send_button')
send_button.onclick = startSearch


const csv_button_groups = document.getElementById('csv_button_groups')

csv_button_groups.onclick = function(){
    const variationMonthly = getAllDataMonthlyVariation()
    const variationYear = getAllDataAccumulatedVariationYear()
    const variationWeight = getAllDataMonthlyWeight()
    dataTableToCSVGroups(variationMonthly,variationYear,variationWeight)
}

const csv_button_subgroups = document.getElementById('csv_button_subgroups')

csv_button_subgroups.onclick = function(){
    const variationMonthly = getAllDataMonthlyVariationSubgroups()
    console.log("PRINTANDO VARIAÇÃO MENSAL: ", variationMonthly);
    
    const variationYear = getAllDataYearVariationSubgroups()
    console.log("PRINTANDO VARIAÇÃO ANUAL: ", variationYear);

    const variationWeight = getAllDataMonthlyWeightSubgroups()
    dataTableToCSVSubgroups(variationMonthly, variationYear, variationWeight)
}