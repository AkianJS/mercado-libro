import styles from "./Button.module.css"

const Button = ({ type, children, handleClick, className, background, color}) => {
  return (
    <button 
    style={{backgroundColor: background || "000", color: color || "#fff"}}
    onClick={handleClick}
    type={type || "button"}
    className={`${styles.btnGrad} ${className}`}>
        {children}
    </button>
  )
}

export default Button