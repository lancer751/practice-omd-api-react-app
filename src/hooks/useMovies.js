import { useState } from 'react'
import { searchMovies } from '../services/movies'
import { useRef } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'


export function useMovies({search, sort}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previousSearch = useRef(search)


    const getMovies = useCallback(async(search) => {
        if(previousSearch.current === search) return

        try{
            setLoading(true)
            setError(null)
            previousSearch.current = search
            const newMovies = await searchMovies({search})
            setMovies(newMovies)
        }catch(e){
            setError(e.getMessage)
            throw new Error(error)
        }finally{
            setLoading(false)
            setError(null)
        }
    },[]) 

    //evitando recrear logica
    const sortedMovies = useMemo(()=>{
        if(movies === undefined) return [] 
        
        return  sort ? [...movies]?.sort((a, b) => a.title.localeCompare(b.title))
        : movies
    }, [sort, movies]) 


    return {movies: sortedMovies, getMovies, loading}
}