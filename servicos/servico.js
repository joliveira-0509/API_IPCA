import historicoInflacao from "../dados/dados.js";

export function obterTodosDados() {
  return historicoInflacao;
}

export function obterDadosPorAno(ano) {
  return historicoInflacao.filter(item => item.ano == ano);
}

export function obterDadosPorId(id) {
  return historicoInflacao.find(item => item.id == id);
}

export function calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal) {
  const dadosPeriodo = historicoInflacao.filter(item => {
    const data = new Date(item.ano, item.mes - 1);
    const dataInicial = new Date(anoInicial, mesInicial - 1);
    const dataFinal = new Date(anoFinal, mesFinal - 1);

    return data >= dataInicial && data <= dataFinal;
  });

  if (dadosPeriodo.length === 0) {
    return null;
  }

  const resultado = dadosPeriodo.reduce((acc, item) => {
    return acc * (1 + item.ipca / 100);
  }, valor);

  return resultado.toFixed(2);
}

export function validarParametros(valor, mesInicial, anoInicial, mesFinal, anoFinal) {
  if (valor <= 0 || mesInicial < 1 || mesInicial > 12 || mesFinal < 1 || mesFinal > 12 || anoInicial > anoFinal) {
    return false;
  }
  return true;
}
