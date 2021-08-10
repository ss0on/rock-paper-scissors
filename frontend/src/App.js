import { ethers } from 'ethers'
import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { App, GameContractABI } from './config'
import { getProvider, useContract } from './hooks/useContract'

function App2() {
	const [contract, setContract] = useState()
	const getData = useCallback(async () => {
		const provider = await getProvider()
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			App.CONTRACT_ADDRESS,
			GameContractABI,
			signer
		)
		contract.on('CheckTreasury', (x) => {
			console.log('CheckTreasury Event', { x })
		})

		// console.log({txDeposit})
		setContract(contract)
	}, [])

	async function handleDepositFunds() {
		const bet = ethers.utils.parseUnits('1.5', 18)
		const txDeposit = await contract.deposit(bet, {
			value: bet
		})
		console.log({ txDeposit })
	}

	useEffect(() => {
		getData()
	}, [getData])
	return (
		<div>
			<button onClick={handleDepositFunds}>Deposit funds</button>
		</div>
	)
}

export default App2
