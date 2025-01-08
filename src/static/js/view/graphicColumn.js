import { getAllDataMonthlyVariation, getAllDataAccumulatedVariationYear } from '../controller/informationController.js';

google.charts.load('current', { 'packages': ['corechart'] });

export function initializeChartColumn() {
    let monthlyVariation = getAllDataMonthlyVariation(); 
    let accumulatedVariationYear = getAllDataAccumulatedVariationYear();

    var data = google.visualization.arrayToDataTable([
        ['Índice geral e grupos de produtos e serviços', 'Variação Mensal', 'Variação Acumulada ao Ano'],
        ['Indice Geral', Number(monthlyVariation['VariacaoMensal'][0]), Number(accumulatedVariationYear["VariacaoAcumulada"][0])],
        ['Alimentação e bebidas', Number(monthlyVariation['VariacaoMensal'][1]), Number(accumulatedVariationYear["VariacaoAcumulada"][1])],
        ['Habitação',Number(monthlyVariation['VariacaoMensal'][2]), Number(accumulatedVariationYear["VariacaoAcumulada"][2])],
        ['Artigos de residência',Number(monthlyVariation['VariacaoMensal'][3]), Number(accumulatedVariationYear["VariacaoAcumulada"][3])],
        ['Vestuário', Number(monthlyVariation['VariacaoMensal'][4]), Number(accumulatedVariationYear["VariacaoAcumulada"][4])],
        ['Transportes', Number(monthlyVariation['VariacaoMensal'][5]), Number(accumulatedVariationYear["VariacaoAcumulada"][5])],
        ['Saúde e cuidados pessoais', Number(monthlyVariation['VariacaoMensal'][6]), Number(accumulatedVariationYear["VariacaoAcumulada"][6])],
        ['Despesas pessoais', Number(monthlyVariation['VariacaoMensal'][7]), Number(accumulatedVariationYear["VariacaoAcumulada"][7])],
        ['Educação', Number(monthlyVariation['VariacaoMensal'][8]), Number(accumulatedVariationYear["VariacaoAcumulada"][8])],
        ['Comunicação', Number(monthlyVariation['VariacaoMensal'][9]), Number(accumulatedVariationYear["VariacaoAcumulada"][9])]
    ]);

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

    const chart = new google.visualization.BarChart(document.getElementById('graphicBar'));
    chart.draw(data, options);
}

google.charts.setOnLoadCallback(initializeChartColumn);
