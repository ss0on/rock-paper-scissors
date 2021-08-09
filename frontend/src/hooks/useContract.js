import { useEffect } from 'react'
import { ethers } from 'ethers'
import { App, GameContractABI } from '../config'

function hasMetaMask() {
	return typeof window !== 'undefined' && window.ethereum?.isMetaMask
}

function getProvider() {
	if (!hasMetaMask()) return new ethers.providers.JsonRpcProvider(App.ETH_RPC)
	return new ethers.providers.Web3Provider(window.ethereum, 'any')
}

export const useContract = async () => {
	const getData = async () => {
		const provider = await getProvider()
		const signer = await provider.getSigner()
		const contract = new ethers.Contract(
			App.CONTRACT_ADDRESS,
			GameContractABI,
			signer
		)
		// const bet = ethers.utils.parseUnits('1.5', 18)
		// const txDeposit = await contract.deposit(bet, {
		// 	value: bet
		// })
		// console.log({txDeposit})

		const tx = await contract.getBalance()
		const balance = Number(tx.value)
		contract.on('CheckTreasury', (from, to, amount, event) => {
			console.log({ from, to, amount, event })
			// The event object contains the verbatim log data, the
			// EventFragment and functions to fetch the block,
			// transaction and receipt and event functions
		})
		console.log({ contract, provider, signer, balance, tx })
	}
	useEffect(() => {
		getData()
	}, [])
}
