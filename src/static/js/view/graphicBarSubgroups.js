google.charts.load("current", { packages: ['corechart'] });

export function initializeChartBar(arrayNameValue, arrayMonthlyWeight) {

    const arrayToChart = createArrayToChart(arrayNameValue, arrayMonthlyWeight)
    var data = google.visualization.arrayToDataTable(arrayToChart);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);

    var options = {
        title: "INPC - Peso Mensal(%) x Subgrupos - Subgrupos de produtos e serviços",
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById("graphicBarSubgroups"));
    chart.draw(view, options);
}

function createArrayToChart(names, monthlyWeight){
    let arrayForChart = [["Subgrupo", "Peso Mensal", { role: "style" }]]

    let j = 0
    for(let i = 1; i <= names.length; i++){
        arrayForChart.push([])
        arrayForChart[i][0] = names[j]
        arrayForChart[i][1] = Number(monthlyWeight[j])
        arrayForChart[i][2] = `#b00800${i}`
        j++
    }

    console.log("ESSE É O ARRAY DE ELEMENTOS PARA O GRÁFICO ",arrayForChart);

    return arrayForChart
}


google.charts.setOnLoadCallback(initializeChartBar);