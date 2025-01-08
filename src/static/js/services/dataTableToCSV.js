export function dataTableToCSVGroups(variationMonthly, variationYear, variationWeight){ //três arrays das informações para ir para csv
    let arrayMonthly = []
    let arrayYear = []
    let arrayWeight = []
    let csvData = ''
   Object.values(variationMonthly.VariacaoMensal).forEach(element => {
        arrayMonthly.push(element)
   })
   Object.values(variationYear.VariacaoAcumulada).forEach(element => {
        arrayYear.push(element)
   })
   Object.values(variationWeight.PesoMensal).forEach(element => {
        arrayWeight.push(element)
   })

   for(let index in arrayMonthly){
        csvData += arrayMonthly[index] + "," + arrayYear[index] + "," + arrayWeight[index] + "\n"
   }
       
    let anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    anchor.target = '_blank';
    anchor.download = 'csv_grupos.csv';
    anchor.click();
}

export function dataTableToCSVSubgroups(variationMonthly, variationYear, variationWeight){
    let csvData = ''     

    for(let index in variationMonthly){
        csvData += variationMonthly[index] + "," + variationYear[index] + "," + variationWeight[index] + "\n"
   }
       
    let anchor = document.createElement('a');
    anchor.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
    anchor.target = '_blank';
    anchor.download = 'csv_subgrupos.csv';
    anchor.click();
}