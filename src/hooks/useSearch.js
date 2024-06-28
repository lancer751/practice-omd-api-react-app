import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"

export function useSearch(){
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)

    // form validation

    useEffect(()=>{
        if(isFirstInput.current){
        isFirstInput.current = search === ''
        return
        }

        if(search === ''){
        setError('No se admiten espacios vacíos.')
        return
        }

        if(search.length < 3){
        setError('Escribe al menos tres caracteres para realizar la busqueda.')
        return
        }

        setError(null)
    }, [search])


    return {search, setSearch, error}
}