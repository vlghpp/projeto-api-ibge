// https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/periodos/${periodId}/variaveis/${monthlyVariation}|${accumulatedVariationYear}|${monthlyWeight}?localidades=${localLevel}[${localId}]&classificacao=315[7169,7170,7445,7486,7558,7625,7660,7712,7766,7786]

// https://servicodados.ibge.gov.br/api/v3/agregados/7063/periodos/202401/variaveis/${monthlyVariation}|${accumulatedVariationYear}|${monthlyWeight}?localidades=${localLevel}[${localId}]&classificacao=315${idSubgroups}
const aggregate = 7063 //7060
const monthlyVariation = 44 //63
const accumulatedVariationYear = 68 //69
const monthlyWeight = 45 

export async function getMetadatasSubgroups(periodId, localLevel, localId, idSubgroups) {
    console.log(`ENTROU NA REQUISIÇÃO DOS SUBGROUPS \n INFORMAÇÕES: ID DO PERIODO: ${periodId}\n LEVEL DO LOCAL: ${localLevel}\n ID DO LOCAL: ${localId}\n ID DO SUBGROUPO: ${idSubgroups}`);
    return await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/periodos/${periodId}/variaveis/${monthlyVariation}|${accumulatedVariationYear}|${monthlyWeight}?localidades=${localLevel}[${localId}]&classificacao=315[${idSubgroups}]`)
}