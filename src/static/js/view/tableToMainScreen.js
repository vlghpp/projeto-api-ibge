const table = document.getElementById('table_data')
const tbody = document.getElementById('tbody')
const tfoot = document.getElementById('tfoot')
const chart = document.getElementById('myChart')
const allTableRows = document.querySelectorAll(".tr_data")
let trFoot = null, thFoot = null
let hasContent = false
export function createTableWithData(data, localName, periodName, periodId) {
    if(hasContent){
        for(const child of tbody.children){
            for(const childOfChild of child.children){
                if(childOfChild.tagName != "TH"){
                    childOfChild.textContent = ""    
                }
            }
        }
        thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor ${localName} - ${periodName}` 
    }else{
        trFoot = document.createElement('tr')
        thFoot = document.createElement('th')
        thFoot.colSpan = 11
        trFoot.appendChild(thFoot)
        tfoot.appendChild(trFoot)
    }
    
    const nameTable = document.getElementById('name_table')
    nameTable.textContent = `${localName} - ${periodName}`

    table.style.display = 'block' 
    chart.style.display = 'block'

    if(!hasContent){
        let counter = 0
        for(let i in data){
            for(let j in data[i].resultados){ 
                const td = document.createElement('td')   
                let tr = allTableRows[counter]
                const value = data[i].resultados[j].series[0].serie[periodId];
                td.textContent = value
                tr.appendChild(td)
                tbody.appendChild(tr)
            }
            counter++
        }
        thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor ${localName} - ${periodName}`
        thFoot.colSpan = 11
        hasContent = true
    }else{
        let counter = 0
        let childrenCounter = 1
        for(let i in data){
            for(let j in data[i].resultados){    
                let tr = allTableRows[counter]
                const child = tr.children[childrenCounter]
                if(child.tagName !== "TH"){
                    const value = data[i].resultados[j].series[0].serie[periodId];
                    child.textContent = value 
                }
                childrenCounter++
            }
            childrenCounter = 1
            counter++
        }
    }
    
}

