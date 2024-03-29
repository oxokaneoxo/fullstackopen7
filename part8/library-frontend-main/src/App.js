import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState(null)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <div>
        {error}
      </div>

      <Authors setError={setError} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook setError={setError} show={page === 'add'} />
    </div>
  )
}

export default App