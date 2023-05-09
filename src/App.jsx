import './App.css'
import Favorites from './components/Favorites'
import Meals from './components/Meals'
import Modal from './components/Modal'
import Search from './components/Search'
import { useGlobalContext } from './context';

export default function App() {
  const {showModal, favorite} = useGlobalContext()
  return (
    <main>
      <Search />
      {favorite&& favorite.length> 0 && <Favorites/>}
      <Meals />
     {showModal &&  <Modal /> }

    </main>
  )
}
