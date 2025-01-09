import { getAllDataMonthlyWeight }from '../controller/informationController.js';

google.charts.load('current', { 'packages': ['corechart'] });

export function initializeChartPie() {

    let monthlyWeight = getAllDataMonthlyWeight();

    const data = google.visualization.arrayToDataTable([
        ['Grupos de produtos e serviços', 'Peso Mensal'],
        ['Alimentação e bebidas', Number(monthlyWeight["PesoMensal"][1])],
        ['Habitação',Number(monthlyWeight["PesoMensal"][2])],
        ['Artigos de residência',Number(monthlyWeight["PesoMensal"][3])],
        ['Vestuário', Number(monthlyWeight["PesoMensal"][4])],
        ['Transportes', Number(monthlyWeight["PesoMensal"][5])],
        ['Saúde e cuidados pessoais', Number(monthlyWeight["PesoMensal"][6])],
        ['Despesas pessoais', Number(monthlyWeight["PesoMensal"][7])],
        ['Educação', Number(monthlyWeight["PesoMensal"][8])],
        ['Comunicação',Number(monthlyWeight["PesoMensal"][9])]
    ])
    
    const options = {
        title: 'INPC - Peso mensal (%) - Grupos de produtos e serviços',
        width: 1383,
        height: 400,
        is3D: true
    };
    
    const chart = new google.visualization.PieChart(document.getElementById('graphicPie'));
    chart.draw(data, options);
}



google.charts.setOnLoadCallback(initializeChartPie);