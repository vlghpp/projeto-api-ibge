//Pega as informações consultando a API baseado na localização e periodo

function getInformationAll() {
    console.log("TESTE");
    
    let params = window.location.search.substring(1).split('&')
    
    let location = {
        "location": params[0].split("=")[1].replace("+", " ")
    }
    let period = {
        "period": params[1].split("=")[1].replace("+", " ")
    }
    console.log(location);
    console.log(period);
 }

let send_button = document.getElementById('send_button')
