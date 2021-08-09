async function main() {
	// We get the contract to deploy
	const RockPaperScissorsGame = await ethers.getContractFactory(
		'RockPaperScissorsGame'
	)
	const gameContract = await RockPaperScissorsGame.deploy()

	console.log('GameContract deployed to:', gameContract.address)
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error)
		process.exit(1)
	})
