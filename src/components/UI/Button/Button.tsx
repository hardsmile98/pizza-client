import React from 'react'
import classes from './Button.module.css'

interface IButton {
  onClick(): void
  label: string
  style?: any
  validate?(): boolean
}

const Button: React.FC<IButton> = ({ validate, onClick, label, style }) => {
  return (
    <button
      className={classes.Button}
      style={{ ...style }}
      disabled={validate ? validate() : false}
      onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
