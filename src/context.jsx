import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const randomMeals = 'https://www.themealdb.com/api/json/v1/1/random.php';
const searchMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?f=b';

const AppProvider = ({ children }) => {
   const [meals, setMeals] = useState([]);
   const [noMeals, setNoMeals] = useState(false)
   const [isLoading, setIsLoading] = useState(false)

   //! can share value to every component directly
   useEffect(() => {
      const fetchMeals = async (url) => {
         setIsLoading(true)
         try {
            const { data } = await axios.get(url);
            if(data.meals){
               setMeals(data.meals);
            }else{
               setNoMeals(true)
            }
         } catch (err) {
            console.log(err);
         }
         setIsLoading(false)
      };
      fetchMeals(searchMeals);
   }, []);
   return (
      <AppContext.Provider value={{ isLoading,meals, noMeals }}>{children}</AppContext.Provider>
   );
};

const useGlobalContext = () => useContext(AppContext);
export { AppContext, AppProvider, useGlobalContext };
