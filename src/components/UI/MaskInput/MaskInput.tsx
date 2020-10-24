import React from 'react'
import classes from './MaskInput.module.css'
import InputMask from 'react-input-mask'

interface IMaskInput {
  label: string
  value: string
  mask: string
  maskChar?: string
  placeholder?: string
  onChange(e: any): void
}

const MaskInput: React.FC<IMaskInput> = ({
  label,
  value,
  onChange,
  placeholder,
  mask,
  maskChar,
}) => {
  return (
    <div className={classes.MaskInput}>
      <p>{label}</p>
      <InputMask
        mask={mask}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        maskChar={maskChar}
      />
    </div>
  )
}

export default MaskInput
