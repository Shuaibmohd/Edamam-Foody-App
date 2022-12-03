import React,{ useState, useEffect } from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css/skyblue';

const Popular = () => {
    const [popular, setPopular] = useState([]);
    const [ search, setSearch ] = useState(['']);
    const [ query, setQuery ] = useState('chicken');

    useEffect(() => {
        getRecipes()
    }, [query])

    const getRecipes = async () =>{
        const APP_ID = 'd10f7d94';
        const APP_KEY = 'fd863b7eea15d9c9a7a5bdb835d80226';
        const res = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`) 
        const data = await res.json();

        // console.log(data.hits)
        setPopular(data.hits)
    }

    const updateSearch = (e) => {
        setSearch(e.target.value)
        console.log(search)
    }

    const getSearch = (e) => {
        e.preventDefault()
        setQuery(search)
        setSearch('')
    }

  return (
    <div className='container'>
        <form className="search-from" onSubmit={getSearch}>
            <input type="text" className='search-bar'
            value={search}
            onChange={updateSearch}
            />
            <button type="submit" className="btn search-btn">Search</button>
        </form>
        <h2>Popular Recipes</h2>
        <Splide 
        options={{
            perPage: 2,
            gap: '2rem',
            arrows: true,
            pagination: false,
            drag: 'free'
            
        }}>
        {popular.map(recipe => {
            return(
                <SplideSlide key={recipe.recipe.label}>
                <div className='card'>
                    <h3>{recipe.recipe.label}</h3>
                    <img src={recipe.recipe.image} alt="" />
                    <div className="overlay"></div>
                </div>
                </SplideSlide>
            )
        }
        )}
        </Splide>
    </div>
  )
}

export default Popular