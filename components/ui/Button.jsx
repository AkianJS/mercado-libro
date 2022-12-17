import styles from "./Button.module.css"

const Button = ({text, type, children, handleClick}) => {
  return (
    <button 
    onClick={handleClick}
    type={type || "button"}
    className={`${styles.btnGrad}`}>
        {children}
    </button>
  )
}

export default Button