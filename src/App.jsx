import { useState } from 'react'
import Header from './components/Layout/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
function App() {

  const [cartIsShow,setCartIsShow]=useState(false);

  const showCartHandler=()=>{
    setCartIsShow(prev=>!prev);
  }

  return (
    <CartProvider>
      {cartIsShow&&<Cart offShowCartHandler={showCartHandler}/>}
      <Header onShowCartHandler={showCartHandler}>
        <main>
          <Meals/>
        </main>
      </Header>
    </CartProvider>
  )
}

export default App
