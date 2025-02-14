import "../App.css";
import { useState, useEffect } from 'react';
import { Panel } from "primereact/panel";
import { Chart } from 'primereact/chart';
// import transaksiStore from "../stores/zustand/Store";

function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  // const dataTrx = transaksiStore();
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };
    const options = {
      cutout: '60%'
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="grid mt-5">
      <div className="col-12 md:col-4">
        <Panel header="Penjualan">
          <div className="card flex justify-content-center">
            <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
          </div>
        </Panel>
      </div>
      <div className="col-12 md:col-4">
        <Panel header="Pembelian">
          <div>

          </div>
        </Panel>
      </div>
    </div>
  )
}

export default Dashboard;