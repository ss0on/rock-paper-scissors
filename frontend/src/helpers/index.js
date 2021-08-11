import { ethers } from 'ethers'
import { App, GameContractABI } from '../config'

function parseBalance(value) {
	return ethers.utils.formatEther(value)
}

export function hasMetaMask() {
	return typeof window !== 'undefined' && window.ethereum?.isMetaMask
}

export function getProvider() {
	if (!hasMetaMask()) return new ethers.providers.JsonRpcProvider(App.ETH_RPC)
	return new ethers.providers.Web3Provider(window.ethereum, 'any')
}

export async function getInitialData() {
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

	return {
		contract,
		signer: { address: signerAddress, balance: parseBalance(signerBalance) }
	}
}

export async function getPastEvents(contract) {
	const _provider = getProvider()
	const signer = await _provider.getSigner()
	const signerAddress = await signer.getAddress()
	const iface = new ethers.utils.Interface(GameContractABI)
	const logs = await contract.queryFilter('depositEvent')
	const logsFiltered = await contract.filters.depositEvent(signerAddress)
	console.log({ logs, logsFiltered })
	// const decodedEvents = logs?.map((log) => {
	// 	return iface.decodeEventLog('depositEvent', log.data)
	// })
	// console.log(decodedEvents)
	// const toAddresses = decodedEvents.map((event) => event['values']['to'])
	// const fromAddresses = decodedEvents.map((event) => event['values']['from'])
	// const amounts = decodedEvents.map((event) => event['values']['value'])
	// return [fromAddresses, toAddresses, amounts]
}
