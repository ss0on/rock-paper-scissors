import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { App, GameContractABI } from './config'
import { getProvider } from './hooks/useContract'

function App2() {
	const [contract, setContract] = useState()
	const [signerData, setSignerData] = useState()

	const getData = useCallback(async () => {
		const provider = await getProvider()
		const signer = await provider.getSigner()
		const signerAddress = await signer.getAddress()
		const signerBalance = await signer.getBalance()

		const contract = new ethers.Contract(
			App.CONTRACT_ADDRESS,
			GameContractABI,
			signer
		)
		contract.on('depositEvent', (x) => {
			console.log('depositEvent Event', { x })
		})
		// console.log({txDeposit})
		setSignerData({
			address: signerAddress,
			balance: ethers.utils.formatEther(signerBalance)
		})
		setContract(contract)
	}, [])

	async function handleDepositFunds() {
		const bet = ethers.utils.parseUnits('1.5', 18)
		const txDeposit = await contract.deposit(bet, {
			value: bet
		})
		console.log({ txDeposit })
	}
	async function handleReadDeposits() {
		try {
			const provider = await getProvider()
			const signer = await provider.getSigner()

			const txBalance = await contract.getViewBalance()
			console.log({ txBalance })
		} catch (err) {
			console.log('error', err)
		}
	}

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<div>
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>
					<strong>Address:</strong> {signerData?.address}
				</span>
				<span>
					<strong>Balance: </strong> {signerData?.balance} ETH
				</span>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<button
					onClick={handleDepositFunds}
					style={{
						background: 'lightgreen',
						border: 'none',
						fontSize: '18px',
						padding: '1rem',
						cursor: 'pointer',
						margin: '1rem'
					}}>
					Deposit funds
				</button>
				<button
					style={{
						background: 'lightblue',
						border: 'none',
						fontSize: '18px',
						padding: '1rem',
						cursor: 'pointer',
						margin: '1rem'
					}}
					onClick={handleReadDeposits}>
					Read deposited funds
				</button>
			</div>
		</div>
	)
}

export default App2
