import { getAllDataMonthlyVariation, getAllDataAccumulatedVariationYear } from '../services/getInformation.js'

google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

let monthlyVariation = getAllDataMonthlyVariation() 
let accumulatedVariationYear = getAllDataAccumulatedVariationYear()


function drawChart() {
    // Definir dados
    var data = google.visualization.arrayToDataTable([
        ['Índice geral e grupos de produtos e serviços', 'Variação Mensal', 'Variação Acumulada ao Ano'],
        ['Indice Geral', 0.19, 3],
        ['Alimentação e bebidas', 0.45, 3],
        ['Habitação', 0.45, 3],
        ['Artigos de residência', -0.07, 3],
        ['Vestuário', -0.46, 3],
        ['Transportes', 0.43, 3],
        ['Saúde e cuidados pessoais', -0.76, 3],
        ['Despesas pessoais', 0.30, 3],
        ['Educação', 0.17, 3],
        ['Comunicação', 0.09, 3]
    ]);

    // Definir opções do gráfico
    const options = {
        title: 'IBGE - Índice Nacional de Preços ao Consumidor',
        width: 1383,
        height: 400,
        hAxis: {
            title: 'Total Vendido',
            minValue: 0,
        },
        vAxis: {
            title: 'Valor'
        },
        bars: 'horizontal'
    };

    // Desenhar gráfico
    const chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);
}

