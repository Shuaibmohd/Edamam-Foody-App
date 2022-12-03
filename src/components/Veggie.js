import React,{ useState, useEffect } from 'react'
// import '../App.css'


const Veggie = () => {

  const [veggie, setVeggie] = useState([])

  useEffect(() => {
    getVeggie();
  }, [])

  const getVeggie = async () => {
    const APP_ID = 'd10f7d94';
    const APP_KEY = 'fd863b7eea15d9c9a7a5bdb835d80226';
    const res = await fetch(`https://api.edamam.com/search?q=vegetarian&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await res.json();

    console.log(data)
    setVeggie(data.hits)
  }
  

  return (
    <div>
        <h2>Vegetarian Recipes</h2>
        <div className="veggie-card">
        {veggie.map(recipe => {
          return(
            <div className='card' key={recipe.recipe.label}>
              <h3>{recipe.recipe.label}</h3>
              <img src={recipe.recipe.image} alt="Vegetarian" />
              <div className="overlay"></div>
            </div>
          )
        })}
        </div>
    </div>
  )
}

export default Veggie