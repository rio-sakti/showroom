
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import Logo from '../logo.png';

export default function TemplateDemo() {
    const navigate = useNavigate();

    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command:()=> navigate("/")
        },
        {
            label: 'Transaction',
            icon: 'pi pi-sync',
            command:()=> navigate("/transaction")
        },
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command:()=> navigate("/profile")
        }
    ];

    const start = <img alt="logo" src={Logo} height="30" className="mr-2"></img>;
    return (
        <div >
            <Menubar model={items} start={start} />
        </div>
    )
}
        