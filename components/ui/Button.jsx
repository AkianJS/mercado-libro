import styles from "./Button.module.css"

const Button = ({text, type}) => {
  return (
    <button 
    type={type || "button"}
    className={`${styles.btnGrad}`}>
        { text }
    </button>
  )
}

export default Button