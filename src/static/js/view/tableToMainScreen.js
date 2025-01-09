const table = document.getElementById('table_data');
const tbody = document.getElementById('tbody');
const thead = document.getElementById('thead_groups')
const tfoot = document.getElementById('tfoot');
const allTableRows = document.querySelectorAll(".tr_data");
const chartColumn = document.getElementById('graphicBar');
const chartPie = document.getElementById('graphicPie');
let thFoot = null;
let hasContent = false;

const csv_button = document.createElement('button')
csv_button.textContent = "EXPORTAR"
csv_button.id = 'csv_button_groups'
thead.appendChild(csv_button)

export function createTableWithData(data, localName, periodName, periodId) {
    const nameTable = document.getElementById('name_table');
    nameTable.textContent = `INPC - Tabela de Grupos: ${localName} - ${periodName}`;
    table.style.display = 'block';
    chartColumn.style.display = 'block';
    chartPie.style.display = 'block';

    if (!hasContent) {
        let counter = 0;
        for (let i in data) {
            for (let j in data[i].resultados) {
                const tr = allTableRows[counter];
                const value = data[i].resultados[j].series[0].serie[periodId];
                const td = document.createElement('td');
                td.textContent = value;
                td.setAttribute('data-row', counter);
                td.setAttribute('data-column', j);
                tr.appendChild(td);
                tbody.appendChild(tr);
            }
            counter++;
        }
        thFoot = document.createElement('th');
        thFoot.colSpan = 11;
        thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor: ${localName} - ${periodName}`;
        const trFoot = document.createElement('tr');
        trFoot.appendChild(thFoot);
        tfoot.appendChild(trFoot);
        hasContent = true;
    } else {
        let counter = 0;
        for (let i in data) {
            for (let j in data[i].resultados) {
                const value = data[i].resultados[j].series[0].serie[periodId];
                const td = tbody.querySelector(`td[data-row="${counter}"][data-column="${j}"]`);
                if (td) {
                    td.textContent = value;
                }
            }
            counter++;
        }
    }
    thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor: ${localName} - ${periodName}`;
}