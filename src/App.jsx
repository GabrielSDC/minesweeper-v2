import Field from './components/Field'
import { FieldProvider } from './contexts/FieldContext.jsx';

function App() {
	return (
		<FieldProvider>
			<Field />
		</FieldProvider>
	)
}

export default App
