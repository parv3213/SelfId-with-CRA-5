import React from 'react';
import logo from './logo.svg';
import './App.css';
import { EthereumAuthProvider, SelfID, WebClient } from '@self.id/web'

const connectSelfId = async () => {
	// The following assumes there is an injected `window.ethereum` provider
	// @ts-ignore
	const addresses = await window.ethereum.enable()
	// @ts-ignore
	const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])

	// The following configuration assumes your local node is connected to the Clay testnet
	const client = new WebClient({
		ceramic: 'testnet-clay',
		connectNetwork: 'testnet-clay',
	})

	// If authentication is successful, a DID instance is returned
	const did = await client.authenticate(authProvider)

	// A SelfID instance can only be created with an authenticated DID
	const self = new SelfID({ client, did })
	console.log('did', did)

	console.log(await self.get('basicProfile'))
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={connectSelfId}>Click me</button>
      </header>
    </div>
  );
}

export default App;
