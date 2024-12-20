import { getAllAggregates } from './createFilterAggregates.js'
import { getAggregateName } from './getInformation.js'



let data_aggregate = {}

export function getDataIdAggregates() {
    const id_aggregates = getAllAggregates()
    insertData(id_aggregates)
}

function insertData(data) {
    const section_id_aggregates = document.getElementById('idAggregates')
    const aggregate_selected = getAggregateName()

    console.log(aggregate_selected);
    console.log(data);

    for (let index in data) {
        if (aggregate_selected == data[index].nome) {
            for (let idAggregate in data[index].agregados) {
                let option = document.createElement('option')
                option.value = data[index].agregados[idAggregate].id
                option.text = data[index].agregados[idAggregate].id
                section_id_aggregates.appendChild(option)
            }
        }
    }
}

