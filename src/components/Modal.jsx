import { useGlobalContext } from '../context';
export default function Modal() {
  const {selectedMeal, closeModal} = useGlobalContext()
  return (
    <>
      <aside className='modal-overlay'>
        <div className="modal-container">
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} className='img modal-img'/>
          <div className='modal-content'>
            <h4>{selectedMeal.strMeal}</h4>
            <p>Cooking Instructions</p>
            <p>{selectedMeal.strInstructions}</p>
            <a href={selectedMeal.strSource} target='_blank'>Original Source</a>
          </div>
      
          <button className='btn btn-hipster close-btn' onClick={closeModal}>Close</button>
        </div>
      </aside>
    </>
  )
}
