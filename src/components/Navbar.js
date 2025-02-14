
import React from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { useNavigate } from 'react-router-dom';
import Logo from '../logo.png';

export default function TemplateDemo() {
    const navigate = useNavigate();
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'Dashboard',
            icon: 'pi pi-home',
            command:()=> navigate("/")
        },
        {
            label: 'Transaction',
            icon: 'pi pi-table',
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
        