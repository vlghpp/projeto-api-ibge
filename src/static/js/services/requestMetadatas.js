import aggregateConst from "./getVariables.js"

const aggregate = aggregateConst //7060
const monthlyVariation = 44 //63
const accumulatedVariationYear = 68 //69
const monthlyWeight = 45 

export async function getMetadatas(periodId, localLevel, localId) {
    return await fetch(`https://servicodados.ibge.gov.br/api/v3/agregados/${aggregate}/periodos/${periodId}/variaveis/${monthlyVariation}|${accumulatedVariationYear}|${monthlyWeight}?localidades=${localLevel}[${localId}]&classificacao=315[7169,7170,7445,7486,7558,7625,7660,7712,7766,7786]`)
}