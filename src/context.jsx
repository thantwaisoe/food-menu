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
   const [showModal, setShowModal] = useState(false);
   const [selectedMeal, setSelectedMeal] = useState(null);
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
   const fetchRandomMeal = () => {
      fetchMeals(randomMeals);
   };
   // all meals url is fetched only when app is loaded or first time render
   useEffect(() => {
      fetchMeals(allMeals);
   }, []);
   //! can share value to every component directly
   useEffect(() => {
      if (!searchTerm) return;
      console.log('search meals url is fetched..');
      fetchMeals(`${allMeals}${searchTerm}`);
   }, [searchTerm]);
   // invoke when users clicked on single Meal
   const clickOnMeal = (id, favMeal) => {
      let meal = meals.find((m) => m.idMeal === id);
      console.log(meal);
      setSelectedMeal(meal);
      setShowModal(true);
   };
   // to toggle modal or close modal
   const closeModal = () => {
      setShowModal(false);
      setSelectedMeal(null)
   };
   // this return is from AppProvider function
   return (
      <AppContext.Provider
         value={{
            isLoading,
            meals,
            noMeals,
            setSearchTerm,
            searchTerm,
            fetchRandomMeal,
            showModal,
            selectedMeal,
            clickOnMeal,
            closeModal,
         }}
      >
         {children}
      </AppContext.Provider>
   );
};

const useGlobalContext = () => useContext(AppContext);
export { AppContext, AppProvider, useGlobalContext };
