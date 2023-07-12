import classes from './Checkout.module.css';
import {useRef,useState} from 'react';

const isValid=(value)=>value.trim()!=='';
const isFiveChar=(value)=>value.length===5;

const Checkout=(props)=>{
    const [formValidity,setFormValidity]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    })

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();

    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredName=nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostalCode=postalCodeInputRef.current.value;
        const enteredCity=cityInputRef.current.value;

        const nameIsValid=isValid(enteredName);
        const streetIsValid=isValid(enteredStreet);
        const cityIsValid=isValid(enteredCity);
        const postalCodeIsValid=isFiveChar(enteredPostalCode);

        setFormValidity({
            name:nameIsValid,
            street:streetIsValid,
            postalCode:postalCodeIsValid,
            city:cityIsValid
        })

        const formIsValid=nameIsValid&&streetIsValid&&cityIsValid&&postalCodeIsValid;
        if(!formIsValid) return;
        props.onSubmit({
            name:enteredName,
            street:enteredStreet,
            postalCode:enteredPostalCode,
            city:enteredCity
        })

    }

    return (
    <form onSubmit={submitHandler}>
        <div className={`${classes.control} ${formValidity.name ? '' : classes.invalid }`}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id='name' ref={nameInputRef}/>
            {!formValidity.name&&<p>Please enter a valid name.</p>}     
        </div>
        <div className={`${classes.control} ${formValidity.street ? '' : classes.invalid }`}>
            <label htmlFor="street">street</label>
            <input type='text' id='street' ref={streetInputRef}/>  
            {!formValidity.street&&<p>Please enter a valid street.</p>}             
        </div>
        <div className={`${classes.control} ${formValidity.postalCode ? '' : classes.invalid }`}>                
            <label htmlFor="postal">Postal Code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}/>
            {!formValidity.postalCode&&<p>Please enter a valid postal code.</p>}
        </div>
        <div className={`${classes.control} ${formValidity.city ? '' : classes.invalid }`}>
            <label htmlFor="city">City</label>
            <input type='text' id='city' ref={cityInputRef}/>
            {!formValidity.city&&<p>Please enter a valid city.</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit} >Confirm</button>
        </div>

    </form>
    )
}

export default Checkout
