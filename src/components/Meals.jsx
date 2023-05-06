import { useGlobalContext } from '../context';
import { BsHandThumbsUp } from 'react-icons/bs';
export default function Meals() {
   const { isLoading, meals, noMeals, searchTerm } = useGlobalContext();
   return (
      <div>
         {isLoading && (
            <section className="section">
               <h2>Loading....</h2>
            </section>
         )}
         {noMeals && (
            <section className="section">
               <h4>
                  No meals matched with name <span>{searchTerm}</span>. Please
                  try another meal.
               </h4>
            </section>
         )}
         <section className="section-center">
            {meals &&
               !noMeals &&
               meals.map((meal) => {
                  return (
                     <article key={meal.idMeal} className="single-meal">
                        <img src={meal.strMealThumb} className="img" />
                        <footer>
                           <h5>{meal.strMeal}</h5>
                           <button className="like-btn">
                              <BsHandThumbsUp />
                           </button>
                        </footer>
                     </article>
                  );
               })}
         </section>
      </div>
   );
}
