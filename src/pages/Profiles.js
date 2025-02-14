import "../App.css";
import { Panel } from "primereact/panel";
import ImgProfile from '../rio.jpeg';

export default function Profiles() {

    return (
        <div className="grid mt-5">
            <div  className="col-12 md:col-4">
                <Panel align="center" header="User Profile">
                    <div>
                    <img alt="profile" src={ImgProfile} height="200" className="mr-1"></img>
                    </div>
                    <div>
                        <label >Nama : Rio Tyas Baito</label>
                    </div>
                    <div>
                        <label>Email : rio.tyas.baito@gmail.com</label>
                    </div>
                    <div>
                        <label>Divisi : Back End</label>
                    </div>
                    <div>
                        <label>Project : Sakti</label>
                    </div>
                </Panel>
            </div>

        </div>
    )
}

