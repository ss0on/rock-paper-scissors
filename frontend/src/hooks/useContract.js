import { ethers } from 'ethers'
import { App } from '../config'

export function hasMetaMask() {
	return typeof window !== 'undefined' && window.ethereum?.isMetaMask
}

export function getProvider() {
	if (!hasMetaMask()) return new ethers.providers.JsonRpcProvider(App.ETH_RPC)
	return new ethers.providers.Web3Provider(window.ethereum, 'any')
}
