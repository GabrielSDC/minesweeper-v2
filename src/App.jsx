import { useState } from 'react'
import Field from './components/Field'
import CellField from './utils/CellField.js';

function App() {
	const dimensions = {w: 20, h: 10, b: 20};
	const [field, setField] = useState(new CellField(dimensions));

	function restartGame() {
		setField(new CellField(dimensions)); 
	}

	return (
		<Field field={field} {...dimensions} restartGame={restartGame}/>
	)
}

export default App
