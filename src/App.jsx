import { useState } from 'react'
import { Movies } from './components/Movies'
import { useSearch } from './hooks/useSearch'
import { useMovies } from './hooks/useMovies'
import { useEffect } from 'react'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

function App() {
  const {search, error, setSearch} = useSearch()
  const [sort, setSort] = useState(false)
  const {movies, getMovies, loading} = useMovies({search, sort})

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies(search)
  }

  const debouncedMovies =  useCallback(debounce((search) => {
    getMovies(search)
  }, 300), []) 

  // debounce required
  const handleSearch = (event) => {
    const newSearch = event.target.value
    setSearch(newSearch)
    debouncedMovies(newSearch)
  }

  const handleSort = (event) => {
    setSort(!sort)
  }

  useEffect(()=> {
    console.log('me crea otra vez ')
  }, [getMovies])

  return (
    <>
        <header className="text-center py-5">
          <h1 className="text-white text-4xl font-bold">OMDB API</h1>
          <form className="flex justify-between items-center mt-7" onSubmit={handleSubmit}>
              <input className="rounded-md py-2 px-4 w-64" placeholder="Avengers, Iron man, Sonic.." onChange={handleSearch}
              value={search}/>
              <input className='w-5 h-5' type='checkbox' onChange={handleSort} checked={sort}/>
              <button className="text-lg text-white bg-black py-3 px-7 rounded-md hover:bg-black/70">Search</button>
          </form>
          {
            error && <p className='text-red-500 text-center font-semibold mt-4'>{error}</p>
          }
        </header>
        <main>
          {
            loading ? <p className='text-center text-white'>Cargando...</p> : <Movies movies={movies}/> 
          }
        </main>
    </>
  )
}

export default App
