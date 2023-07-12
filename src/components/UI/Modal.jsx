import classes from './Modal.module.css'
import ReactDom from 'react-dom';

const Backdrop=(props)=>{
  return (<div className={classes.backdrop} onClick={props.offShowCartHandler}>

  </div>)
}

const ModelOverlay=(props)=>{
   return(
    <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
   )
}

const portalElement=document.getElementById('overlays');

const Modal=(props)=>{
    return(
        <>
            {ReactDom.createPortal(<Backdrop offShowCartHandler={props.offShowCartHandler}/>,portalElement)}
            {ReactDom.createPortal(<ModelOverlay>{props.children}</ModelOverlay>,portalElement)}
        </>
    )  
}

export default Modal;


