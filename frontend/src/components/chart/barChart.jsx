import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { data } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "black", // Warna teks legend
      },
    },
    title: {
      display: true,
      text: "Tugas per tahun",
      color: "black",
    },
  },
};

const dataChartFormat = (labels, data) => {
  data = {
    labels: labels,
    datasets: [
      {
        label: "Data set",
        data: data,
        backgroundColor: [
          "rgb(255, 99, 132)", // Merah muda
          "rgb(255, 159, 64)", // Oranye terang
          "rgb(255, 205, 86)", // Kuning
          "rgb(75, 192, 192)", // Toska
          "rgb(54, 162, 235)", // Biru muda
          "rgb(153, 102, 255)", // Ungu terang
          "rgb(201, 203, 207)", // Abu-abu terang
          "rgb(100, 181, 246)", // Biru langit
          "rgb(129, 199, 132)", // Hijau terang
          "rgb(255, 138, 128)", // Merah coral
          "rgb(174, 213, 129)", // Hijau lemon
          "rgb(255, 241, 118)", // Kuning pastel
        ],

        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
          "rgb(100, 181, 246)",
          "rgb(129, 199, 132)",
          "rgb(255, 138, 128)",
          "rgb(174, 213, 129)",
          "rgb(255, 241, 118)",
        ],
        borderWidth: 3,
      },
    ],
  };

  return data;
};

const barChart = (data = []) => {
  let labelChart = [];
  let dataChart = [];

  data.data.map((val, index) => {
    labelChart.push(val.bulan);
    dataChart.push(val.total_tugas);
  });

  dataChart = dataChartFormat(labelChart, dataChart);
  return <Bar options={options} data={dataChart} />;
};
export default barChart;
