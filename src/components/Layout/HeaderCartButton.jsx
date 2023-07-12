import {useContext,useEffect,useState} from 'react';
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import CartContext from "../../store/cart-context";

const HeaderCartButton=(props)=>{
    const cartCtx=useContext(CartContext);
    const numberOfItems=cartCtx.items.reduce((number,item)=>{
        return number+item.amount;
    },0);
    const {items}=cartCtx;
    const [bump,setBump]=useState(false);
    const btnClasses=`${classes.button} ${bump ? classes.bump : ''}`

    useEffect(()=>{
        if(items.length===0) {return;}
        setBump(true);
        const timer=setTimeout(() => {
            setBump(false);
        }, 300);
        return ()=>{
            clearTimeout(timer);
        }
    },[items])

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;
