import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
	const pingServer = async () => {
		console.log('VITE_GW_HOSTNAME', import.meta.env.VITE_GW_HOSTNAME);
		const res = await fetch(
			`${import.meta.env.VITE_GW_HOSTNAME}/api` || 'http://localhost:80'
		);
		const obj = await res.json();

		console.log(obj);
		alert(JSON.stringify(obj));
	};

	return (
		<>
			<button onClick={() => pingServer()}>Ping gateway -_- DEPLOYMENT</button>
		</>
	);
}

export default App;
