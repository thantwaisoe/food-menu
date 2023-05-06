import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const randomMeals = 'https://www.themealdb.com/api/json/v1/1/random.php';
const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const AppProvider = ({ children }) => {
   const [meals, setMeals] = useState([]);
   const [searchTerm, setSearchTerm] = useState('');
   const [noMeals, setNoMeals] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const fetchMeals = async (url) => {
      setIsLoading(true);
      try {
         const { data } = await axios.get(url);
         if (data.meals) {
            setMeals(data.meals);
         } else {
            setNoMeals(true);
         }
      } catch (err) {
         console.log(err);
      }
      setIsLoading(false);
   };
   const fetchRandomMeal = () =>{
      fetchMeals(randomMeals)
   } 
   // all meals url is fetched only when app is loaded or first time render
   useEffect(() =>{
      console.log('all meals url is fetched ....')
      fetchMeals(allMeals)
   }, [])
   //! can share value to every component directly
   useEffect(() => {  
      if (!searchTerm) return
      console.log("search meals url is fetched..")
      fetchMeals(`${allMeals}${searchTerm}`);
   }, [searchTerm]);
   // this return is from AppProvider function
   return (
      <AppContext.Provider value={{ isLoading, meals, noMeals, setSearchTerm, searchTerm, fetchRandomMeal }}>
         {children}
      </AppContext.Provider>
   );
};

const useGlobalContext = () => useContext(AppContext);
export { AppContext, AppProvider, useGlobalContext };
