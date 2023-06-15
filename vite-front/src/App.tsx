import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	const pingServer = async () => {
		console.log('VITE_GW_HOSTNAME', import.meta.env.VITE_GW_HOSTNAME);
		const res = await fetch(
			`http://${import.meta.env.VITE_GW_HOSTNAME}` || 'http://localhost:6666'
		);
		const obj = await res.json();

		console.log(obj);
		alert(JSON.stringify(obj));
	};

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => pingServer()}>Ping gateway -_-</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
