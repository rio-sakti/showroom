import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';
import transaksiStore from "../stores/zustand/Store";

function Dashboard() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const { dataTrx } = transaksiStore();

  useEffect(() => {
    if (!dataTrx || dataTrx.length === 0) return;

    const documentStyle = getComputedStyle(document.documentElement);
    
    const labels = dataTrx.map(trx => trx.unitDesc); 
    const dataValues = dataTrx.map(trx => trx.harga); 

    let data = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--red-500'),
            documentStyle.getPropertyValue('--cyan-500'),
            documentStyle.getPropertyValue('--green-500')
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--red-400'),
            documentStyle.getPropertyValue('--cyan-400'),
            documentStyle.getPropertyValue('--green-400')
          ]
        }
      ]
    };

    const options = {
      cutout: '60%'
    };

    console.log("Chart Data:", data);

    setChartData(data);
    setChartOptions(options);
  }, [dataTrx]); 

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
        {/* <Panel header="Pembelian">
          <div>

          </div>
        </Panel> */}
      </div>
    </div>
  );
}

export default Dashboard;