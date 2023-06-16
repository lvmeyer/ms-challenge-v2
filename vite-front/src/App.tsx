import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
	const pingServer = async () => {
		console.log('VITE_GW_HOSTNAME', import.meta.env.VITE_GW_HOSTNAME);
		const res = await fetch(
			'http://k8s-default-bando-bb95bbe7b5-1421794689.eu-west-3.elb.amazonaws.com/api/'
		);
		const obj = await res.json();

		console.log(obj);
		alert(JSON.stringify(obj));
	};

	return (
		<>
			<button onClick={() => pingServer()}>Ping gateway -_-</button>
		</>
	);
}

export default App;
