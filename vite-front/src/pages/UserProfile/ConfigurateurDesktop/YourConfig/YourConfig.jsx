import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './YourConfig.css';

export const YourConfig = () => {

    useEffect(() => {
    
    }, []);

    return (
        <div className="your-configuration">
            <h1>Your configuration</h1>
            <p>
                Here you can see your current configuration.<br/>
                An algorithm will suggest components based on your current configuration.
            </p>

            <div className="your-configuration-container">
                <div className="your-configuration-container-description">
                    <div>
                        <h2>Graphic Card</h2>
                        <p>ASUS ROG Strix GeForce RTX 3060</p>
                    </div>
                    <img src="https://m.media-amazon.com/images/I/81gBKaOGz9L._AC_UF1000,1000_QL80_.jpg" alt="CPU" />
                </div>

                <div className="your-configuration-container-description">
                    <div>
                        <h2>Processor</h2>
                        <p>Ryzen 5 AMD</p>
                    </div>
                    <img src="https://m.media-amazon.com/images/I/51GUexhiieL.jpg" alt="GPU" />
                </div>

                <div className="your-configuration-container-description">
                    <div>
                        <h2>RAM</h2>
                        <p>CORSAIR VENGEANCE LPX 32GB</p><span>Suggested</span>
                    </div>
                    <img src="https://www.1fodiscount.com/ressources/site/img/product/kit-barrettes-memoire-32go-2x16go-dimm-ddr4-corsair-vengeance-lpx-pc4-25600-3200-mhz-noir_141304__480.webp" alt="RAM" />
                </div>

                <div className="your-configuration-container-description">
                    <div>
                        <h2>SSD</h2>
                        <p>SanDisk Ultra 3D SSD 500 GB</p><span>Suggested</span>
                    </div>
                    <img src="https://m.media-amazon.com/images/I/41qDf0ZNC6L._AC_UF1000,1000_QL80_.jpg" alt="SSD" />
                </div>

                <div className="your-configuration-container-description">
                    <div>
                        <h2>Motherboards</h2>
                        <p>ASUS ROG Strix B550-XE Gaming</p>
                    </div>
                    <img src="https://media.ldlc.com/r1600/ld/products/00/05/75/20/LD0005752029_1.jpg" alt="Carte mère" />
                </div>
                
            </div>
        </div>
	);
};