import { useState } from 'react'
import Field from './components/Field'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Field h='10' w='10' b='10'/>
  )
}

export default App
