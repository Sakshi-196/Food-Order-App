import classes from './Card.module.css'

const Card=(props)=>{
    return <div className={`${classes.card} ${props.classes} `}>{props.children}</div>
}

export default Card;
