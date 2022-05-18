const labels = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const dataLine = {
  labels: labels,
  datasets: [
    {
      label: 'Temperatura',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 20, 20, 30, 45],
    },
    {
      label: 'Umidade',
      backgroundColor: 'rgb(0, 64, 255)',
      borderColor: 'rgb(0, 64, 255)',
      data: [0, 20, 30, 18, 34, 26, 15],
    },
  ],
};

const configLine = {
  type: 'line',
  data: dataLine,
  options: {},
};
const chartLine = new Chart(document.getElementById('chartLine'), configLine);

const dataDoughnut = {
  labels: ['vermelho', 'azul', 'amarelo'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4,
    },
  ],
};

const configDoughnut = {
  type: 'doughnut',
  data: dataDoughnut,
  options: {},
};
const chartPizza = new Chart(
  document.getElementById('chartPizza'),
  configDoughnut
);

function selectSetor() {
  if (listSetors.value == 'setor1') {
    chartLine.data.datasets[0].data = [0, 23, 45, 28, 15, 30, 20];
    chartLine.data.datasets[1].data = [20, 47, 21, 32, 43, 30, 62];
    chartLine.update();
  } else if (listSetors.value == 'setor2') {
    chartLine.data.datasets[0].data = [5, 10, 5, 2, 10, 32, 37];
    chartLine.data.datasets[1].data = [2, 32, 45, 18, 34, 26, 15];
    chartLine.update();
  } else if (listSetors.value == 'setor3') {
    chartLine.data.datasets[0].data = [0, 32, 45, 22, 10, 20, 54];
    chartLine.data.datasets[1].data = [10, 52, 63, 32, 12, 20, 54];
    chartLine.update();
  } else if (listSetors.value == 'setor4') {
    chartLine.data.datasets[0].data = [2, 40, 13, 43, 4, 24, 30];
    chartLine.data.datasets[1].data = [0, 50, 63, 33, 23, 49, 33];
    chartLine.update();
  }
}
