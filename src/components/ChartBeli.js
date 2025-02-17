import React, { useState, useEffect } from 'react';
import { Panel } from 'primereact/panel';
import { Chart } from 'primereact/chart';
import transaksiStore from "../stores/zustand/Store";

function ChartBeli() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const { dataTrx } = transaksiStore();

    useEffect(() => {
        if (!dataTrx || dataTrx.length === 0) return;
        const filteredData = dataTrx.filter(trx => trx.jenis === "Beli");

        const documentStyle = getComputedStyle(document.documentElement);

        const labels = filteredData.map(trx => trx.unitDesc);
        const dataValues = filteredData.map(trx => trx.harga);

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

        <Panel header="Pembelian">
            <div className="card flex justify-content-center">
                <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
            </div>
        </Panel>
    )

}

export default ChartBeli;