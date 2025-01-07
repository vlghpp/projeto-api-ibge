import { getAllSubgroups } from "../services/createFilterSubgroup.js";

const table = document.getElementById('table_subgroups');
const tbody = document.getElementById('tbody_subgroups');
const tfoot = document.getElementById('tfoot_subgroups');
const chartBar = document.getElementById('graphicBarSubgroups');
const chartPie = document.getElementById('graphicPieSubgroups');
let thFoot = null;
let hasContent = false

export function createTableSubgroups(data, localName, periodName, periodId) {
    const nameTable = document.getElementById('name_table_subgroups');
    nameTable.textContent = `${localName} - ${periodName}`;
    table.style.display = 'block';
    chartBar.style.display = 'block';
    chartPie.style.display = 'block';

    if (!hasContent) {
        const subgroupNames = getAllSubgroups()
        let i = 0
        let coluna = 0
        for (let j in data[i].resultados) {
            const tr = document.createElement('tr')
            const th = document.createElement('th')
            th.textContent = subgroupNames[j]
            const valueMonthly = data[0].resultados[j].series[0].serie[periodId]; //ta correto, pega o valor certo
            const valueYear = data[1].resultados[j].series[0].serie[periodId];
            const valueWeight = data[2].resultados[j].series[0].serie[periodId]

            const tdMonthly = document.createElement('td')
            const tdYear = document.createElement('td')
            const tdWeight = document.createElement('td')
            tdMonthly.textContent = valueMonthly;
            tdYear.textContent = valueYear
            tdWeight.textContent = valueWeight



            tdMonthly.setAttribute('data-row-subgroup', coluna);
            tdMonthly.setAttribute('data-column-subgroup', j);

            console.log(`COLOCANDO VARIACAO MENSAL NA POSIÇÃO ${j}x${coluna} -- VALOR: ${valueMonthly}`);
            
            coluna++

            tdYear.setAttribute('data-row-subgroup', coluna);
            tdYear.setAttribute('data-column-subgroup', j);
            console.log(`COLOCANDO VARIACAO ANUAL NA POSIÇÃO ${j}x${coluna} -- VALOR: ${valueYear}`);
            coluna++

            tdWeight.setAttribute('data-row-subgroup', coluna);
            tdWeight.setAttribute('data-column-subgroup', j);
            console.log(`COLOCANDO PESO MENSAL NA POSIÇÃO ${coluna}x${j} -- VALOR: ${valueWeight}`);

            tr.appendChild(th)
            tr.appendChild(tdMonthly);
            tr.appendChild(tdYear);
            tr.appendChild(tdWeight);

            tbody.appendChild(tr);
            i++
            coluna = 0
        }

        thFoot = document.createElement('th');
        thFoot.colSpan = 11;
        thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor ${localName} - ${periodName}`;
        const trFoot = document.createElement('tr');
        trFoot.appendChild(thFoot);
        tfoot.appendChild(trFoot);
        hasContent = true;
    } else {
        for (let i in data) {
            for (let j in data[i].resultados) {
                const value = data[i].resultados[j].series[0].serie[periodId];

                console.log(`O i ta na posição ${i} e o J na posição ${j} ---- COLOCANDO O VALOR ${value}`);

                const td = tbody.querySelector(`td[data-row-subgroup="${i}"][data-column-subgroup="${j}"]`);
                if (td) {
                    td.textContent = value;
                }
            }
        }
    }
    thFoot.textContent = `Fonte: IBGE - Índice Nacional de Preços ao Consumidor ${localName} - ${periodName}`;
}

