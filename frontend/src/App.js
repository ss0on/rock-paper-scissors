import './App.css'
import { useContract } from './hooks/useContract'

function App() {
	const response = useContract()
	return <div>Test</div>
}

export default App
