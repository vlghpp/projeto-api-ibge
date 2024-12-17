const table = document.getElementById('table_data')
const tbody = document.getElementById('tbody')
const tfoot = document.getElementById('tfoot')
const allTableRows = document.querySelectorAll(".tr_data")
export function createTableWithData(data, localName, periodName, periodId) {
    //pega o conteúdo, já está certo
    const nameTable = document.getElementById('name_table')
    nameTable.textContent = `${localName} - ${periodName}`

    table.style.display = 'block'

    let i = 0
    let j = 0
    let counter = 0
    for(i in data){
        for(j in data[i].resultados){ 
            
            const td = document.createElement('td')   
            /**
             * A api retorna 4 objetos, sendo o INPC - Variação mensal
             * INPC - Variação anual acumulada
             * INPC - Variação acumulada em 12 meses
             * INPC - Peso mensal
             * 
             * Então por estar ignorando o INPC - Variação acumulada em 12 meses ele passava direto do counter 1 para o 3, já que o indice do INPC - Variação acumulada em 12 meses é o 2, e então não printava o valor do Peso Mensal, por isso é necessário fazer essa correção de counter == 3 para counter = 2
             *  */  
            if(counter == 3) counter = 2      
            //se a variavel for variacao acumulada ele só retorna ... nas serie 
            if(data[i].variavel !== "INPC - Variação acumulada em 12 meses"){
                let tr = allTableRows[counter]
                const value = data[i].resultados[j].series[0].serie[periodId];
                td.textContent = value
                tr.appendChild(td)
                tbody.appendChild(allTableRows[counter])
            }
        }
        counter++
    }

    let trFoot = document.createElement('tr')
    let thFoot = document.createElement('th')
    thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor ${periodName}`
    thFoot.colSpan = 11
    trFoot.appendChild(thFoot)
    tfoot.appendChild(trFoot)
}