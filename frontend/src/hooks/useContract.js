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
		const bet = ethers.utils.parseUnits('1.0', 18)
		const txDeposit = await contract.deposit(bet, {
			value: bet
		})
		const tx = await contract.getBalance()
		const balance = Number(tx.value)
		console.log({ contract, provider, signer, balance, txDeposit })
	}
	useEffect(() => {
		getData()
	}, [])
}
