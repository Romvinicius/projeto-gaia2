function simular() {
  var $qtdTomateKgMes = Number(input_qtd_kq_tomate_mes.value);
  var $valorVendaTomateKg = Number(input_valor_venda_tomate_kg.value);
  var $valorPerdaElemento = valor_perda_html;
  var $valorGanhoElemento = valor_ganho_html;
  var $valorBrutoElemento = valor_bruto_html;
  var $valorLiquidoPerdaElemento = valor_liquido_perda_html;
  var $valorLiquidoComServicoElemento = valor_ganho_conosco;
  var $resultadoSimulador = resultado_simulador;

  var valorProducaoBruto = $qtdTomateKgMes * $valorVendaTomateKg;
  var valorPerda = valorProducaoBruto * 0.3;
  var valorLiquido = valorProducaoBruto - valorPerda;
  var valorGanho = valorLiquido * 0.2;
  var valorLiquidoComSevico = valorLiquido + valorGanho;

  input_qtd_kq_tomate_mes.value = '';
  input_valor_venda_tomate_kg.value = '';

  $valorPerdaElemento.innerHTML = ` - ${valorPerda.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })}`;
  $valorGanhoElemento.innerHTML = valorGanho.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  $valorLiquidoComServicoElemento.innerHTML =
    valorLiquidoComSevico.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  $valorBrutoElemento.innerHTML = valorProducaoBruto.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  $valorLiquidoPerdaElemento.innerHTML = valorLiquido.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  if ($qtdTomateKgMes == '' || $valorVendaTomateKg == '') {
    alert('Por favor, preencha os camps');
  } else {
    $resultadoSimulador.style.display = 'block';
  }
}
