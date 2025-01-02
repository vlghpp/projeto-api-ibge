import { getInformationInputIds, getInformationInputs } from "../services/getInformation.js";
import { createTableWithData } from "../view/tableToMainScreen.js";
import { initializeChartBar } from "../view/graphicBar.js";
import { initializeChartPie } from "../view/graphicPie.js";
import { getMetadatas } from "../services/requestMetadatas.js";

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
    getMetadatas(periodId, localLevel, localId)
    .then(result => {
        return result.json()
    })
    .then(data =>{
        const { localName, periodName } = getInformationInputs()        
        createTableWithData(data, localName, periodName, periodId)
        initializeChartBar()
        initializeChartPie()
    })
    .catch(error => {
        console.log(error.message);
    })
}

const send_button = document.getElementById('send_button')
send_button.onclick = startSearch
