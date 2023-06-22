import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
	const pingServer = async () => {
		console.log('VITE_GW_HOSTNAME', import.meta.env.VITE_GW_HOSTNAME);
		const res = await fetch(`${import.meta.env.VITE_GW_HOSTNAME}/api/v1`);
		const obj = await res.json();

		console.log(obj);
		alert(JSON.stringify(obj));
	};

	const pingFromGW = async () => {
		const res = await fetch(
			`${import.meta.env.VITE_GW_HOSTNAME}/api/v1/products`
		);
		const obj = await res.json();

		console.log(obj);
		alert(JSON.stringify(obj));
	};

	const pingFromPdt = async () => {
		console.log(
			'VITE_PRODUCTS_HOSTNAME',
			import.meta.env.VITE_PRODUCTS_HOSTNAME
		);
		const res = await fetch(
			`${import.meta.env.VITE_PRODUCTS_HOSTNAME}/pv/products`
		);
		const obj = await res.json();

		console.log(obj);
		alert(JSON.stringify(obj));
	};

	return (
		<>
			<button onClick={() => pingServer()}>Ping gateway -_- DEPLOYMENT</button>
			<button onClick={() => pingFromGW()}>Ping GW</button>
			<button onClick={() => pingFromPdt()}>Ping pdts</button>
		</>
	);
}

export default App;
