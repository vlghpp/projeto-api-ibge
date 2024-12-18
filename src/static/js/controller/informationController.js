import { getInformationInputIds, getInformationInputs } from "../services/getInformation.js";
import { createTableWithData } from "../view/tableToMainScreen.js";
const aggregate = 7063 //7060
const monthlyVariation = 44 //63
const accumulatedVariationYear = 68 //69
const monthlyWeight = 45 

function getAllInformation(){
    const { localId, localLevel, periodId } = getInformationInputIds()    
    return { localId, localLevel, periodId }
}

function startSearch(){
    getAllInformation()
    sendEndpointIBGE()
}

async function sendEndpointIBGE(){
    const { localId, localLevel, periodId } = getAllInformation()
    await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/periodos/${periodId}/variaveis/${monthlyVariation}|${accumulatedVariationYear}|${monthlyWeight}?localidades=${localLevel}[${localId}]&classificacao=315[7169,7170,7445,7486,7558,7625,7660,7712,7766,7786]`) 

    .then(result => {
        return result.json()
    })
    .then(data =>{
        const { localName, periodName } = getInformationInputs()        
        createTableWithData(data, localName, periodName, periodId)
    })
    .catch(error => {
        console.log(error.message);
    })
}

const send_button = document.getElementById('send_button')
send_button.onclick = startSearch
