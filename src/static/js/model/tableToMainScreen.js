export async function createTableWithData(data) {
    console.log("ENTROU EM tableToMainScreen", data);
    
    const table = document.getElementById('table_data')
    table.innerHTML = JSON.stringify(data)
}