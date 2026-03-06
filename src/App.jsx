import { useState } from 'react'
import Field from './components/Field'
import CellField from './utils/CellField.js';

function App() {
  const dimensions = {w: 10, h: 10, b: 10};
  const [field, setField] = useState(new CellField(dimensions));
  
  return (
    <Field field={field} {...dimensions}/>
  )
}

export default App
