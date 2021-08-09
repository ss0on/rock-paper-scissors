export const GameContractABI = [
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor'
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'treasuryAddress',
				type: 'address'
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'treasuryBalance',
				type: 'uint256'
			}
		],
		name: 'CheckTreasury',
		type: 'event'
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_bet',
				type: 'uint256'
			}
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	},
	{
		inputs: [],
		name: 'getBalance',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address'
			}
		],
		name: 'players',
		outputs: [
			{
				internalType: 'uint256',
				name: 'bet',
				type: 'uint256'
			}
		],
		stateMutability: 'view',
		type: 'function'
	},
	{
		inputs: [],
		name: 'withdrawFunds',
		outputs: [],
		stateMutability: 'payable',
		type: 'function'
	}
]
