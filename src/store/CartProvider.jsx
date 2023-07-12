import CartContext from "./cart-context";
import {useReducer} from 'react';

const defaultCartState={
    items:[],
    totalAmount:0,
}

const cartReducer= (state,action)=>{
    if(action.type==='ADD')
    {
        const updatedTotalAmount=state.totalAmount+action.item.price*action.item.amount;
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
        const existingItem=state.items[existingItemIndex];
        let newItems;
        if(existingItem)
        {
            const updatedItem={
                ...existingItem,
                amount:action.item.amount+existingItem.amount,
            }
            newItems=[...state.items];
            newItems[existingItemIndex]=updatedItem;
        }
        else{

            newItems=state.items.concat(action.item);
        }
        
        return {
            items:newItems,
            totalAmount:updatedTotalAmount

        }
    }

    if(action.type==='REMOVE')
    {
        const existingItemIndex=state.items.findIndex((item)=>item.id===action.item.id);
        const existingItem=state.items[existingItemIndex];
        const updatedTotalAmount=state.totalAmount-existingItem.price;
        let newItems;
        if(existingItem.amount>1) 
        {
            const updatedItem={...existingItem,amount:(existingItem.amount-1)};
            newItems=[...state.items];
            newItems[existingItemIndex]=updatedItem;
        }
        else {
            newItems=state.items.filter((item)=>item.id!==action.item.id);
        }
        return{

            items:newItems,
            totalAmount:updatedTotalAmount
        };
    }

    if(action.type==="CLEAR") return defaultCartState;
    
    return defaultCartState;
}

const CartProvider=props=>{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState)

    const addItemHandler=(item)=>{
        dispatchCartAction({type:"ADD",item:item});
    }

    const removeItemHandler=(item)=>{
       
        dispatchCartAction({type:"REMOVE",item:item});
    }

    const clearItemHandler=()=>{
        dispatchCartAction({type:"CLEAR"});
    }

    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearItem:clearItemHandler
    }

    return (
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
};

export default CartProvider;
