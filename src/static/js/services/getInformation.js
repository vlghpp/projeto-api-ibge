import { getDataIdNamePeriods as getAllPeriods } from "./createFilterPeriod.js"
import { getAllLocations } from "./createFilterLocations.js"
const tableRows = document.querySelectorAll('.tr_data')

let localName = null
let periodName = null

export function getInformationInputIds() {
    localName = document.getElementById('locations').value
    periodName = document.getElementById('dates').value

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
    const data_periods = getAllPeriods();
    const data_locations = getAllLocations();

    const periodObj = Object.values(data_periods).find(p => p.literals[0] === period);
    const locationObj = Object.values(data_locations).find(loc => loc.nome === local);

    return {
        localId: locationObj ? locationObj.id : null,
        localLevel: locationObj ? locationObj.nivel.id : null,
        periodId: periodObj ? periodObj.id : null
    };
}

function extractDataFromTable(tableId, label) {
    const data = { [label]: {} };
    let index = 0;
    const targetTable = Array.from(tableRows).find(tr => tr.id === tableId);

    if (targetTable) {
        Array.from(targetTable.children).forEach(childTr => {
            if (childTr.tagName !== "TH") {
                data[label][index] = childTr.textContent;
                index++;
            }
        });
    }
    return data;
}

export function getAllDataMonthlyVariationService() {
    return extractDataFromTable("monthlyVariation", "VariacaoMensal");
}

export function getAllDataAccumulatedVariationYearService() {
    return extractDataFromTable("accumulatedVariationYear", "VariacaoAcumulada");
}

export function getAllDataMonthlyWeightService() {
    return extractDataFromTable("monthlyWeight", "PesoMensal");
}