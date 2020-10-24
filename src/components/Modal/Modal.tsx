import React from 'react'
import classes from './Modal.module.css'
import { CloseIcon } from '../Icons/Icons'

interface IModal {
  closeModal(): void
}

const Modal: React.FC<IModal> = ({ children, closeModal }) => {
  return (
    <div className={classes.Modal}>
      <div className={classes.Content}>
        <CloseIcon onClick={closeModal} className={classes.Close} />
        {children}
      </div>
      <div className={classes.Backdrop} onClick={closeModal} />
    </div>
  )
}

export default Modal
