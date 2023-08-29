import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { YourConfig } from './YourConfig/YourConfig';

import './ConfigurateurDesktop.css';

export const ConfigurateurDesktop = () => {

    useEffect(() => {
    
    }, []);

    return (
        <div className="configurateur mt-5">

            <div className="configurateur-desktop-container">
                <h1>Desktop configuration</h1>
                <p>
                    Here you can configure your desktop according to your personal settings and requirements.
                </p>

                <div className="configurateur-desktop-select">

                    <label>
                        Choose your processor
                        <select  className="select-cpu">
                            <option value="i3">Ryzen 5 AMD</option>
                            <option value="i5">i5</option>
                        </select>

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" defaultChecked />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Own ?</label>
                        </div>

                    </label>

                    <label>
                        Choose your graphics card
                        <select className="select-cg">
                            <option value="gtx1050">ASUS ROG Strix GeForce RTX 3060</option>
                            <option value="gtx1060">GTX 1060</option>
                        </select>

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Own ?</label>
                        </div>
                    </label>

                    <label>
                        Choose your RAM
                        <select className="select-ram">
                            <option value="16go">16Go</option>
                            <option value="8go">8Go</option>
                        </select>

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Own ?</label>
                        </div>
                    </label>

                    <label>
                        Choose your SSD
                        <select className="select-ssd">
                            <option value="256go">500Go</option>
                            <option value="128go">128Go</option>
                            <option value="256go">256Go</option>
                        </select> 

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Own ?</label>
                        </div>
                    </label>

                    <label>
                        Choose your motherboard
                        <select className="select-cm">
                            <option value="cm1">ASUS ROG Strix B550-XE Gaming</option>
                            <option value="cm2">motherboard</option>
                        </select>

                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Own ?</label>
                        </div>
                    </label>
                </div>

                <button className="btn btn-group btn-primary">Apply</button>
            </div>

            <YourConfig />

        </div>
	);
};