const API_KEY = `3764dcae`

export const searchMovies = async ({search}) => {
    if (search === "") return
    
    try{
        const res = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await res.json()

        const movies = json.Search
        

        return movies?.map(item => ({
            id: item.imdbID,
            title: item.Title,
            poster: item.Poster,
            type: item.Type,
            year: item.Year
        }))

    }catch(e){
        throw new Error(`Error searching the movie`)
    }

}