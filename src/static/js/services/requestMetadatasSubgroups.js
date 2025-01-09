import aggregateConst from "./getVariables.js"
const aggregate = aggregateConst //7060
const monthlyVariation = 44 //63
const accumulatedVariationYear = 68 //69
const monthlyWeight = 45 

export async function getMetadatasSubgroups(periodId, localLevel, localId, idSubgroups) {
    console.log(`ENTROU NA REQUISIÇÃO DOS SUBGROUPS \n INFORMAÇÕES: ID DO PERIODO: ${periodId}\n LEVEL DO LOCAL: ${localLevel}\n ID DO LOCAL: ${localId}\n ID DO SUBGROUPO: ${idSubgroups}`);
    return await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/periodos/${periodId}/variaveis/${monthlyVariation}|${accumulatedVariationYear}|${monthlyWeight}?localidades=${localLevel}[${localId}]&classificacao=315[${idSubgroups}]`)
}