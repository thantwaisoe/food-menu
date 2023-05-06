import { useState } from 'react';
import {useGlobalContext} from '../context'
export default function Search() {
   const [searchText, setSearchText] = useState('');
    const {setSearchTerm, fetchRandomMeal} = useGlobalContext() 
   const handleOnChange = (e) => {
      setSearchText(e.target.value);
   };

   const handleSubmit = (e) =>{
    e.preventDefault()
    setSearchTerm(searchText)
   }

   const handleRandomMeal = () =>{
      setSearchTerm('')
      setSearchText('')
      fetchRandomMeal()
   }
   return (
      <>
         <header className="search-container">
            <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  value={searchText}
                  onChange={handleOnChange}
                  placeholder="type favorite meal"
                  className="form-input"
               />
               <button type="submit" className="btn">
                  search
               </button>
               <button type="button" onClick={handleRandomMeal} className="btn btn-hipster">
                  Suprise Me!
               </button>
            </form>
         </header>
      </>
   );
}
