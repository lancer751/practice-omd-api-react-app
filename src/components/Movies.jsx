function ListOfMovies({movies}){

    return(
        <section className="w-full grid grid-cols-[repeat(auto-fit,_minmax(200px,1fr))] gap-4">
            {
                movies.map(item => (
                    <div className="text-white text-center space-y-2 min-h-72" key={item.id}>
                        <img src={item.poster} alt={item.title} className="w-full"/>
                        <h4>{item.title}</h4>
                        <span>{item.year}</span>
                    </div>
                ))                
            }
        </section>  
    )
}

function NoMoviesResults(){
    return(
        <p className="text-center text-white font-medium">No se encontraron peliculas con ese nombre</p>
    )
}

export function Movies({movies}){
    const hasmovies = movies?.length > 0
    
    return(
        hasmovies? <ListOfMovies movies={movies}/> : <NoMoviesResults/>
    )
}