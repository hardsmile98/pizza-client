import React from 'react'
import classes from './Input.module.css'

interface IInput {
  label: string
  value: string
  onChange(e: any): void
  type?: string
  placeholder?: string
}

const Input: React.FC<IInput> = ({
  label,
  value,
  onChange,
  type,
  placeholder,
}) => {
  const inputType = type || 'text'

  return (
    <div className={classes.Input}>
      <p>{label}</p>
      <input
        type={inputType}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default Input
