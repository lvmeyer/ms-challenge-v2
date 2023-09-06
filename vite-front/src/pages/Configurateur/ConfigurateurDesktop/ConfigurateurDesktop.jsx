import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import './ConfigurateurDesktop.css';
import './YourConfig.css';

export const ConfigurateurDesktop = () => {

    const [baskedId, setBaskedId] = useState(0);

    const [products, setProducts] = useState([]);

    const [totalConfig, setTotalConfig] = useState(0);

    const [processors, setProcessors] = useState([]);
    const [processorSelected, setProcessorSelected] = useState();

    const [motherboards, setMotherboards] = useState([]);
    const [motherboardSelected, setMotherboardSelected] = useState();

    const [memory, setMemory] = useState([]);
    const [memorySelected, setMemorySelected] = useState();

    const [graphicscards, setGraphicsCards] = useState([]);
    const [graphicscardSelected, setGraphicsCardSelected] = useState();


    useEffect(() => {

        fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/user-basket', {
			mode: 'cors',
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization:
					'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
			},
		})
        .then((response) => response.json())
        .then((data) => {
            setBaskedId(data.basketId);
        });


        fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer ' +
                    JSON.parse(localStorage.getItem('userInfo')).access_token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.data);
            const proc = data.data.filter(
                (product) => product.category.name === 'Processors'
            );
            setProcessors(proc);

            const motherboards = data.data.filter(
                (product) => product.category.name === 'Motherboards'
            );
            setMotherboards(motherboards);

            const graphicscards = data.data.filter(
                (product) => product.category.name === 'Graphics Cards'
            );
            setGraphicsCards(graphicscards);

            const memory = data.data.filter(
                (product) => product.category.name === 'Memory'
            );
            setMemory(memory);

            console.log(motherboards);
        });
    }, []);

    const handleChangeProcessor = (id) => {

        const productSelected = products.find((product) => product.id === id);

        setProcessorSelected(productSelected);

        //socket du processeurs selectionné
        let procSelectedSocket = productSelected ? productSelected.productSubCategory.filter(
            (subCategory) => subCategory.subCategory.type === 'SOCKET'
        ) : [];

        //on recupere toutes les cartes meres
        const motherboards = products.filter(
            (product) => product.category.name === 'Motherboards'
        );
        setMotherboards(motherboards);

        //carte mere compatible avec le socket du processeur selectionné s'il existe sinon toutes les cartes meres sont compatibles
        if (procSelectedSocket.length > 0) {
            const motherboardsCompatible = motherboards.filter((motherboard) =>{
                return motherboard.productSubCategory.some((subCategory) => {
                    return subCategory.subCategory.name === procSelectedSocket[0].subCategory.name;
                });
            });
            setMotherboards(motherboardsCompatible);
            toast.info('Update : Motherboards compatible with the selected processor');
        }

    }

    const handleChangeMotherboard = (id) => {

        const productSelected = products.find((product) => product.id === id);

        setMotherboardSelected(productSelected);

        //socket du motherboard selectionné
        let motherboardSelectedSocket = productSelected ? productSelected.productSubCategory.filter(
            (subCategory) => subCategory.subCategory.type === 'SOCKET'
        ) : [];

        //SLOT du motherboard selectionné
        let motherboardSelectedSLOT = productSelected ? productSelected.productSubCategory.filter(
            (subCategory) => subCategory.subCategory.type === 'SLOT'
        ) : [];

        //RAM du motherboard selectionné
        let motherboardSelectedRAM = productSelected ? productSelected.productSubCategory.filter(
            (subCategory) => subCategory.subCategory.type === 'RAM'
        ) : [];


        //on recupere tout les procs
        const processeurs = products.filter(
            (product) => product.category.name === 'Processors'
        );
        setProcessors(processeurs);

        //on recupere toutes les memory
        const memory = products.filter(
            (product) => product.category.name === 'Memory'
        );
        setMemory(memory);

        //on recupere toutes les graphics cards
        const graphicscards = products.filter(
            (product) => product.category.name === 'Graphics Cards'
        );
        setGraphicsCards(graphicscards);

        //processeurs compatible avec le socket de la carte mere selectionné si elle existe sinon tout les processeurs sont compatibles
        if (motherboardSelectedSocket.length > 0) {
            const procsCompatible = processeurs.filter((processor) =>{
                return processor.productSubCategory.some((subCategory) => {
                    return subCategory.subCategory.name === motherboardSelectedSocket[0].subCategory.name;
                });
            });
            setProcessors(procsCompatible);
            toast.info('Update : Processors compatible with the selected motherboard');
        }

        if (motherboardSelectedSLOT.length > 0) {
            const graphicCompatible = graphicscards.filter((graphic) =>{
                return graphic.productSubCategory.some((subCategory) => {
                    return subCategory.subCategory.name === motherboardSelectedSLOT[0].subCategory.name;
                });
            });
            setGraphicsCards(graphicCompatible);
            toast.info('Update : Graphic Cards compatible with the selected motherboard');
        }

        if (motherboardSelectedRAM.length > 0) {
            const graphicCompatible = memory.filter((mem) =>{
                return mem.productSubCategory.some((subCategory) => {
                    return subCategory.subCategory.name === motherboardSelectedRAM[0].subCategory.name;
                });
            });
            setMemory(graphicCompatible);
            toast.info('Update : Memory compatible with the selected motherboard');
        }
    }

    const handleChangeGraphicCard= (id) => {

        const productSelected = products.find((product) => product.id === id);

        setGraphicsCardSelected(productSelected);

        //SLOT de la graphic card selectionné
        let graphiccardSelectedSLOT = productSelected ? productSelected.productSubCategory.filter(
            (subCategory) => subCategory.subCategory.type === 'SLOT'
        ) : [];

        //on recupere toutes les motherboards
         const motherboards = products.filter(
            (product) => product.category.name === 'Motherboards'
        );
        setMotherboards(motherboards);


        if (graphiccardSelectedSLOT.length > 0) {
            const motherBoardCompatible = motherboards.filter((motherboard) =>{
                return motherboard.productSubCategory.some((subCategory) => {
                    return subCategory.subCategory.name === graphiccardSelectedSLOT[0].subCategory.name;
                });
            });
            setMotherboards(motherBoardCompatible);
            toast.info('Update : MotherBoards compatible with the selected graphic card');
        }
    }

    const handleChangeMemory= (id) => {

        const productSelected = products.find((product) => product.id === id);

        setMemorySelected(productSelected);

        //RAM de la memory selectionné
        let memorySelectedRAM = productSelected ? productSelected.productSubCategory.filter(
            (subCategory) => subCategory.subCategory.type === 'RAM'
        ) : [];

        //on recupere toutes les motherboards
         const motherboards = products.filter(
            (product) => product.category.name === 'Motherboards'
        );
        setMotherboards(motherboards);


        if (memorySelectedRAM.length > 0) {
            const motherBoardCompatible = motherboards.filter((motherboard) =>{
                return motherboard.productSubCategory.some((subCategory) => {
                    return subCategory.subCategory.name === memorySelectedRAM[0].subCategory.name;
                });
            });
            setMotherboards(motherBoardCompatible);
            toast.info('Update : MotherBoards compatible with the selected memory');
        }
    }


    useEffect(() => {
        // Initialisation du total à zéro
        let newTotal = 0;
    
        // Ajouter le prix du processeur sélectionné s'il existe
        if (processorSelected) {
            newTotal += processorSelected.price;
        }
    
        // Ajouter le prix de la carte mère sélectionnée s'il existe
        if (motherboardSelected) {
            newTotal += motherboardSelected.price;
        }
    
        // Ajouter le prix de la carte graphique sélectionnée s'il existe
        if (graphicscardSelected) {
            newTotal += graphicscardSelected.price;
        }
    
        // Ajouter le prix de la mémoire sélectionnée s'il existe
        if (memorySelected) {
            newTotal += memorySelected.price;
        }
    
        // Mettre à jour le total
        setTotalConfig(newTotal);
    }, [processorSelected, motherboardSelected, graphicscardSelected, memorySelected]);

    

    const [cartItems, setCartItems] = useState([]);

    const addToCart = async  () => {

        const config = [processorSelected, motherboardSelected, graphicscardSelected, memorySelected];

        for (const product of config) {
            if (product) {
                const existingItem = cartItems.find((item) => item.id === product.id);

                if (existingItem) {
                    toast.info('Product is already in the cart');
                } else {
                    try {
                        const response = await fetch(import.meta.env.VITE_GW_HOSTNAME + '/api/v1/basket/add', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('userInfo')).access_token,
                            },
                            body: JSON.stringify({
                                basketId: baskedId,
                                productId: product.id,
                            }),
                        });
    
                        if (response.ok) {
                            setCartItems([...cartItems, product]);
                            toast.success('Product added to cart successfully');
                        } else {
                            throw new Error('Failed to add product to cart');
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error('Failed to add product to cart');
                    }
                }
            }
        };
	};


    const saveConfigSession = () => {

        const config = [processorSelected, motherboardSelected, graphicscardSelected, memorySelected];

        config.forEach(product => {
            if (product) {
                localStorage.setItem('config', 
                    JSON.stringify({
                        processor: processorSelected,
                        motherboard: motherboardSelected,
                        graphicscard: graphicscardSelected,
                        memory: memorySelected,
                    }));
            }
        });

        toast.success('Configuration saved successfully!');
    }

    return (
        <div className="configurateur">

            <div className="configurateur-desktop-container">
                <h1>COMPONENTS</h1>
                <p>
                    Choose your components to create your tailor-made PC. The configurator will check the compatibility of the components.
                </p>

                <div className="configurateur-desktop-select">

                    <select className="select-cpu" onChange={(e) => handleChangeProcessor(e.target.value)}>
                        <option value="null">CHOOSE A PROCESSOR</option>
                        {processors.map((processor) => (
                            <option value={processor.id} key={processor.id}>{processor.name} - {processor.price}$ - 🟢</option>
                        ))}
                    </select>

                    <select className="select-cm" onChange={(e) => handleChangeMotherboard(e.target.value)}>
                        <option value="null">CHOOSE A MOTHERBOARD</option>
                        {motherboards.map((motherboard) => (
                            <option value={motherboard.id} key={motherboard.id}>{motherboard.name} - {motherboard.price}$ - 🟢</option>
                        ))}
                    </select>

                    <select className="select-cg" onChange={(e) => handleChangeGraphicCard(e.target.value)}>
                        <option value="null">CHOOSE A GRAPHIC CARD</option>
                        {graphicscards.map((graphicscard) => (
                            <option value={graphicscard.id} key={graphicscard.id}>{graphicscard.name} - {graphicscard.price}$ - 🟢</option>
                        ))}
                    </select>

                    <select className="select-ram" onChange={(e) => handleChangeMemory(e.target.value)}>
                        <option value="null">CHOOSE A MEMORY</option>
                        {memory.map((memory) => (
                            <option value={memory.id} key={memory.id}>{memory.name} - {memory.price}$ - 🟢</option>
                        ))}
                    </select>


                </div>
            </div>

            <div className="your-configuration">
                <h1>YOUR SELECTION</h1>

                {!processorSelected && !motherboardSelected && !graphicscardSelected && !memorySelected ? (
                    <p>
                        ‹ Choose the components opposite, our configurator automatically adjusts the selection according to the added parts.
                    </p>
                ) : ""}

                <div className="your-configuration-container">

                    {processorSelected ? (
                        <div className="your-configuration-container-description">

                            <p>
                                <h2>{processorSelected.name}</h2>
                            {processorSelected.category.name} -  <span className=''>
                                {processorSelected.price}$
                                </span>
                            </p>
                            <img src={processorSelected.image} alt="CPU" />
                        </div>
                    ) : (
                        <div></div>
                    )}

                    {motherboardSelected ? (
                        <div className="your-configuration-container-description">

                            <p>
                                <h2>{motherboardSelected.name}</h2>
                                {motherboardSelected.category.name} -  <span>
                                {motherboardSelected.price}$
                            </span>
                            </p>
                            <img src={motherboardSelected.image} alt="CPU" />

                        </div>
                    ) : (
                        <div></div>
                    )}

                    {graphicscardSelected ? (
                        <div className="your-configuration-container-description">

                           <p>
                            <h2>{graphicscardSelected.name}</h2>
                            {graphicscardSelected.category.name} -  <span className=''>
                                {graphicscardSelected.price}$
                            </span>
                            </p>
                            <img src={graphicscardSelected.image} alt="CPU" />

                        </div>
                    ) : (
                        <div></div>
                    )}

                    {memorySelected ? (
                        <div className="your-configuration-container-description">

                           <p>
                            <h2>{memorySelected.name}</h2>
                            {memorySelected.category.name} -  <span className=''>
                                {memorySelected.price}$
                            </span>
                            </p>
                            <img src={memorySelected.image} alt="CPU" />

                        </div>
                    ) : (
                        <div></div>
                    )}

                    {processorSelected || motherboardSelected || graphicscardSelected || memorySelected ? (
                        <div className='your-configuration-container-footer'>
                            <h2 className=''>Total : {totalConfig}$</h2>
                            <button className="btn btn-group btn-dark" onClick={() => addToCart()}>Add to Cart</button>
                            <button className="btn btn-group btn-outline-dark" onClick={() => saveConfigSession()}>Save configuration</button>
                        </div>
                    ) : ""}
                    
                </div>
            </div>

            <ToastContainer position="bottom-center" />
        </div>
	);
};