import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from 'primereact/selectbutton';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Panel } from "primereact/panel";
import transaksiStore from "../stores/zustand/Store";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

function Transaksi() {
    const optTrx = ['Jual', 'Beli'];
    const { dataTrx, upsertTrx } = transaksiStore();
    const [formData, setFormData] = useState({
        id: '',
        jenis: '',
        tanggal: '',
        unitKend: '',
        unitDesc: '',
        tahun: '',
        harga: ''
    });

    
    const units = [
        { name: 'Toyota Avanza', code: '01' },
        { name: 'Daihatsu Xenia', code: '02' },
        { name: 'Suzuki Ertiga', code: '03' },
        { name: 'Toyota Rush', code: '04' },
        { name: 'Daihatsu Terios', code: '05' }
    ];

    const tahunTemplate = (item) => {
        const xTahun = new Date(item.tahun).getFullYear();
        console.log(xTahun);
        return xTahun;
    }

    const tanggalTemplate = (e) => {
        if (e.tanggal==='') {
            return '';
        }
        console.log("Tanggal : ", e.tanggal);
        const date = new Date(e.tanggal);
        // const formattedDate = ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")};
        const formattedDate = `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
        console.log(formattedDate);
        return formattedDate;
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="flex gap-2">
                <Button icon="pi pi-pencil" className="p-button-sm p-button-info" onClick={() => handleEdit(rowData)} />
                <Button icon="pi pi-trash" className="p-button-sm p-button-danger" onClick={() => handleDelete(rowData)} />
            </div>
        );
    };

    const handleEdit = (rowData) => {
        console.log("Edit:", rowData);

        setFormData({
            id: rowData.id,
            jenis: rowData.jenis,
            tanggal: new Date(rowData.tanggal),
            unitKend: rowData.unitKend,
            unitDesc: rowData.unitKend.name,
            tahun: new Date(rowData.tahun),
            harga: rowData.harga
        });
        // setJnsTrx(rowData.jenis);
        // setUnitTrx({ code: rowData.unitKend.code,  name: rowData.unitKend.name });
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
        const fData = dataTrx;
        let upsertData = fData;
        let payload = formData;
        console.log("fData => ", fData);
        console.log("dormData => ", formData);
        if (formData.id === '') {
            payload.id = `ID-${Date.now()}-${uuidv4().slice(0, 8)}`;
            upsertData = fData.concat(payload);
        } else {
            upsertData = [].concat(payload);
        }
        console.log(upsertData);
        upsertTrx(upsertData);
        setFormData({
            id: '',
            jenis: '',
            tanggal: '',
            unitKend: '',
            unitDesc: '',
            tahun: '',
            harga: ''
        });
        Swal.fire("Data berhasil disimpan!", "", "success");
    }
    console.log(dataTrx);
    return (
        <div className="grid mt-5">
            <div className="col-12 md:col-4">
                <Panel header="Form Transaksi">
                    <form onSubmit={handleSubmit}>
                        <div className="card p-fluid">
                            <div className="field">
                                <div className="card flex justify-content-center">
                                    <SelectButton value={formData.jenis} onChange={(e) => setFormData({ ...formData, jenis: e.target.value })} options={optTrx} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="tglTrx" >Tanggal</label>
                                <div className="col">
                                    <Calendar inputId="tglTrx" maxDate={new Date()} dateFormat="dd-mm-yy"
                                        showIcon value={formData.tanggal ? new Date(formData.tanggal) : ''}
                                        onChange={(e) => {
                                            setFormData({ ...formData, tanggal: e.value });
                                        }}
                                    />

                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="unit" >Unit Kendaraan</label>
                                <div className="col">
                                    <Dropdown value={formData.unitKend} onChange={(e) => setFormData({ ...formData, unitKend: e.target.value, unitDesc: e.target.value.name })} options={units} optionLabel="name"
                                        placeholder="Pilih Unit" className="w-full md:w-14rem" />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="tahun" >Tahun</label>
                                <div className="col">
                                    <Calendar value={formData.tahun}
                                        onChange={(e) => {
                                            setFormData({ ...formData, tahun: e.value });
                                        }}
                                        view="year" dateFormat="yy"
                                    />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="harga" >Harga</label>
                                <div className="col">
                                    <InputText className="p-inputtext-sm" value={formData.harga} onChange={(e) => setFormData({ ...formData, harga: e.target.value })} />
                                </div>
                            </div>
                            <div className="field">
                                <Button label="Submit" size="small" />
                            </div>
                        </div>
                    </form >
                </Panel>
            </div>
            <div className="col-12 md:col-8">
                <Panel header="History">
                    <DataTable value={Array.isArray(dataTrx) ? dataTrx : Object.values(dataTrx)} tableStyle={{ minWidth: '50rem' }}>
                        <Column field="id" hidden="true">id</Column>
                        <Column field="jenis" header="Jual/Beli"></Column>
                        <Column body={tanggalTemplate} field="tanggal" header="Tanggal"></Column>
                        <Column field="unitDesc" header="Unit"></Column>
                        <Column body={tahunTemplate} field="tahun" header="Tahun"></Column>
                        <Column field="harga" header="Harga"></Column>
                        <Column body={actionBodyTemplate} header="Actions" style={{ width: "120px" }} bodyStyle={{ textAlign: "center" }} />
                    </DataTable>
                </Panel>
            </div>
        </div>
    )
}

export default Transaksi;