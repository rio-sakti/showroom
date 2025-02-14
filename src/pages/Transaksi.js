// import "../App.css";
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from "primereact/panel";
import useStore from "../stores/zustand/Store";
import {v4 as uuidv4} from 'uuid';

function Transaksi() {
    const [tanggal, setTanggal] = useState(null);
    const optTrx = ['Jual', 'Beli'];
    const [jnsTrx, setJnsTrx] = useState(optTrx[0]);
    const [unit, setUnit] = useState(null);
    const [harga, setHarga] = useState('');
    const {dataTrx, upsertTrx} = useStore();
    const [tahun, setTahun] = useState(null);
    const units = [
        { name: 'Toyota Avanza', code: '01' },
        { name: 'Daihatsu Xenia', code: '02' },
        { name: 'Suzuki Ertiga', code: '03' },
        { name: 'Toyota Rush', code: '04' },
        { name: 'Daihatsu Terios', code: '05' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        console.log(tanggal);
        console.log(unit);
        console.log(tahun);
        console.log(harga);
        const fData = dataTrx;
        const payload={
            id : `ID-${Date.now()}-${uuidv4().slice(0, 8)}`,
            tanggal: tanggal,
            unit: unit,
            tahun: tahun,
            harga: harga
        }
        console.log(payload);
        const newData = fData.concat(payload);
        // upsertTrx(newData);
        // if (formData.name === "" && formData.email === "") {
        //     alert("Nama dan email harus di isi");
        // } else {
        //     console.log("Nama ", formData.name);
        //     setFormData(formData);
        // }
    }
    return (
        
            <div className="grid mt-5">
                <div className="col-12 md:col-4">
                    <Panel header="Form Transaksi">
                    <form onSubmit={handleSubmit}>
                        <div className="card p-fluid">
                            <div class="field">
                                <label class="col-fixed" ></label>
                                <div class="col">
                                    <SelectButton value={jnsTrx} onChange={(e) => setJnsTrx(e.jnsTrx)} options={optTrx} />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="tanggal" >Tanggal</label>
                                <div class="col">
                                    {/* <Calendar className="p-inputtext-sm" value={tanggal} onChange={(e) => setTanggal(e.value)} /> */}
                                    <Calendar inputId="tanggal" maxDate={new Date()} dateFormat="dd-mm-yy"
                                showIcon value={dataTrx.tanggal ? new Date(dataTrx.tanggal) : null}
                                 />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="unit" >Unit</label>
                                <div class="col">
                                    <Dropdown size="10px" value={unit} onChange={(e) => setUnit(e.value)} options={units} optionLabel="name"
                                        placeholder="Pilih Unit" className="w-full md:w-14rem" />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="tahun" >Tahun</label>
                                <div class="col">
                                    <Calendar value={tahun} onChange={(e) => setTahun(e.value)} view="year" dateFormat="yy" />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="harga" >Harga</label>
                                <div class="col">
                                    <InputText className="p-inputtext-sm" value={harga} onChange={(e) => setHarga(e.target.value)} />
                                </div>
                            </div>
                            <div class="field">
                                <Button label="Submit" size="small" />
                            </div>
                        </div>
                        </form >
                    </Panel>
                </div>
                <div className="col-12 md:col-8">
                    <Panel header="History">
                        <DataTable value={dataTrx}  size="small" tableStyle={{ minWidth: '50rem' }}>
                            <Column field="tanggal" header="Tanggal"></Column>
                            <Column field="unit" header="Unit"></Column>
                            <Column field="tahun" header="Tahun"></Column>
                            <Column field="harga" header="Harga"></Column>
                        </DataTable>
                    </Panel>
                </div>
            </div>
        

    )
}

export default Transaksi;