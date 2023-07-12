import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';
import image from '../../assets/meals.jpeg';

const Header=(props)=>{

    

    return (
        <>
            <header className={classes.header}>
                <h1>MyMeals</h1>
                <HeaderCartButton onClick={props.onShowCartHandler}/>
            </header>
            <div className={classes['main-image']}>
                <img src={image} alt=''/>
            </div>
            {props.children}
        </>
    )
}

export default Header;
