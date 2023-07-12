import classes from './Cart.module.css'
import Module from '../UI/Modal';
import Modal from '../UI/Modal';
import { useContext, useState,useEffect } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [checkOut, setCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setIsSuccess] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const itemRemoveHandler = (item) => {
        cartCtx.removeItem(item);
    }
    const itemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    }

    const orderHandler = () => {
        setCheckOut(true);
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {
                cartCtx.items.map((item) => <CartItem id={item.id} key={item.id} name={item.name} amount={item.amount} price={item.price} onRemove={itemRemoveHandler.bind(null, item)} onAdd={itemAddHandler.bind(null, item)}></CartItem>)
            }
        </ul>
    )

    const submitHandler = async (data) => {
        setIsSubmitting(true);
        await fetch('https://react-http-6d662-default-rtdb.firebaseio.com/users.json', {
            method: "POST",
            body: JSON.stringify({
                user: data,
                orderedItems: cartCtx.items
            })
        })
        setIsSubmitting(false);
        setIsSuccess(true);
        cartCtx.clearItem();
    }

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.offShowCartHandler}>Close</button>
        <button className={classes.button} onClick={orderHandler}>Order</button>
    </div>


    const modalCart = <>

        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {checkOut && <Checkout onSubmit={submitHandler} onCancel={props.offShowCartHandler} />}
        {!checkOut && modalActions}
    </>




    const modalSuccess = <>
        <p>Successfully sent the order.</p>
        <button onClick={props.offShowCartHandler}>Close</button>
    </>

    return (
        <Modal offShowCartHandler={props.offShowCartHandler}>
            {!isSubmitting && !success && modalCart}
            {isSubmitting && <p>Please wait...</p>}
            {success && modalSuccess}
        </Modal>

    )
}

export default Cart;
