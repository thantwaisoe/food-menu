import { useGlobalContext } from '../context';

export default function Favorites() {
   const { favorite, clickOnMeal, removeFromFavorite } = useGlobalContext();
   return (
      <section className="favorites">
         <div className="favorites-content">
            <h5>Favorites</h5>
            <div className="favorites-container">
               {favorite.map((meal) => {
                  return (
                     <div key={meal.idMeal} className="favorite-item">
                        <img
                           src={meal.strMealThumb}
                           className="favorites-img img"
                           onClick={() => clickOnMeal(meal.idMeal)}
                        />
                        <button className='remove-btn' onClick={() => removeFromFavorite(meal.idMeal)}>
                           remove
                        </button>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   );
}
