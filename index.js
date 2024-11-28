import express from 'express'
import { obterTodosDados, obterDadosPorAno, obterDadosPorId, calcularReajuste, validarParametros } from "./servicos/servico.js";
const app = express();

app.use(express.json());

app.get('/historicoIPCA', (req, res) => {
  res.status(200).json(obterTodosDados());
});

app.get('/historicoIPCA/ano', (req, res) => {
  const { ano } = req.query;
  const dadosAno = obterDadosPorAno(ano);

  if (dadosAno.length > 0) {
    res.status(200).json(dadosAno);
  } else {
    res.status(404).json({ mensagem: "Ano não encontrado" });
  }
});

app.get('/historicoIPCA/calculo', (req, res) => {
  const { valor, mesInicial, anoInicial, mesFinal, anoFinal } = req.query;

  if (!valor || !mesInicial || !anoInicial || !mesFinal || !anoFinal || !validarParametros(valor, mesInicial, anoInicial, mesFinal, anoFinal)) {
    return res.status(400).json({ mensagem: "Parâmetros inválidos" });
  }

  const resultado = calcularReajuste(valor, mesInicial, anoInicial, mesFinal, anoFinal);

  if (resultado === null) {
    return res.status(404).json({ mensagem: "Período não encontrado" });
  }

  res.status(200).json({ resultado });
});

app.get('/historicoIPCA/:id', (req, res) => {
    const { id } = req.params;
    const dado = obterDadosPorId(id);
  
    if (dado) {
      res.status(200).json(dado);
    } else {
      res.status(404).json({ mensagem: "ID não encontrado" });
    }
  });

app.listen(8080, () => {
  console.log(`Servidor rodando na porta 8080`);
});
