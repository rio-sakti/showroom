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
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";


function Transaksi() {
    // const [tanggal, setTanggal] = useState(null);
    const optTrx = ['Jual', 'Beli'];
    const [jnsTrx, setJnsTrx] = useState(optTrx[0]);
    const [tglTrx] = useState(null);
    const [unitTrx, setUnitTrx] = useState(null);
    const [hargaTrx] = useState('');
    const { dataTrx, upsertTrx } = useStore();
    const [tahunTrx] = useState(null);
    const [formData, setFormData] = useState({
        jenis: '',
        tanggal: null,
        unitKend: null,
        tahun: null,
        harga: null
    });

    const units = [
        { name: 'Toyota Avanza', code: '01' },
        { name: 'Daihatsu Xenia', code: '02' },
        { name: 'Suzuki Ertiga', code: '03' },
        { name: 'Toyota Rush', code: '04' },
        { name: 'Daihatsu Terios', code: '05' }
    ];

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className="p-button-sm p-button-info" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(rowData)} />
            </div>
        );
    };

    const handleEdit = (rowData) => {
        // console.log("Edit:", rowData);
        upsertTrx({
            id: rowData.id,
            jenis: rowData.jnsTrx,
            tanggal: rowData.tglTrx,
            unitKend: rowData.unitTrx,
            tahun: rowData.tahunTrx,
            jumlah: rowData.jumlahTrx
        });
        setJnsTrx(rowData.jnsTrx);
        setUnitTrx({ name: rowData.unitTrx });
    };

    const handleDelete = (rowData) => {
        Swal.fire({
            title: "Hapus Data?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Ya",
            // denyButtonText: Batal
        }).then((result) => {
            if (result.isConfirmed) {
                const filteredData = dataTrx.filter((item) => item.id !== rowData.id);
                upsertTrx(filteredData);
                Swal.fire("Data berhasil dihapus!", "", "success");
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        // const fData = dataTrx;
        const payload = {
            id: `ID-${Date.now()}-${uuidv4().slice(0, 8)}`,
            jenis: jnsTrx,
            tanggal: tglTrx,
            unitKend: unitTrx,
            tahun: tahunTrx,
            harga: hargaTrx
        }
        console.log("Payload : ", payload);
        // const newData = fData.concat(payload);
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
                                <div className="card flex justify-content-center">
                                    <SelectButton value={formData.jenis} onChange={(e) => setFormData({ ...formData, jenis: e.target.value })} options={optTrx} />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="tglTrx" >Tanggal</label>
                                <div class="col">
                                    {/* <Calendar className="p-inputtext-sm" value={tanggal} onChange={(e) => setTanggal(e.value)} /> */}
                                    <Calendar inputId="tglTrx" maxDate={new Date()} dateFormat="dd-mm-yy"
                                        showIcon value={formData.tanggal ? new Date(formData.tanggal) : null}
                                        onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="unit" >Unit Kendaraan</label>
                                <div class="col">
                                    <Dropdown size="10px" value={formData.unitKend} onChange={(e) => setFormData({ ...formData, unitKend: e.target.value })} options={units} optionLabel="name"
                                        placeholder="Pilih Unit" className="w-full md:w-14rem" />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="tahunTrx" >Tahun</label>
                                <div class="col">
                                    <Calendar value={formData.tahun} onChange={(e) => setFormData({ ...formData, tahun: e.target.value })} view="year" dateFormat="yy" />
                                </div>
                            </div>
                            <div class="field">
                                <label htmlFor="hargaTrx" >Harga</label>
                                <div class="col">
                                    <InputText id="hargaTrx" className="p-inputtext-sm" value={formData.harga} onChange={(e) => setFormData({ ...formData, harga: e.target.value })} />
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
                    <DataTable value={dataTrx} size="small" tableStyle={{ minWidth: '50rem' }}>
                        <Column field="jnsTrx" header="Jual/Beli"></Column>
                        <Column field="tglTrx" header="Tanggal"></Column>
                        <Column field="unitTrx" header="Unit"></Column>
                        <Column field="tahunTrx" header="Tahun"></Column>
                        <Column field="hargaTrx" header="Harga"></Column>
                        <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} bodyStyle={{ textAlign: "center" }} />
                    </DataTable>
                </Panel>
            </div>
        </div>
    )
}

export default Transaksi;