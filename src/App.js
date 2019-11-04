import React from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = React.useState()
  React.useEffect(() => {
    axios
      .get('/.netlify/functions/todos')
      .then(res => {
        setData({ data: res.data })
      })
      .catch(err => console.log({ err }))
  }, [])
  return (
    <div>
      <h1>APP!!!</h1>
      {data ? data : <p>loading..</p>}
    </div>
  )
}

export default App
