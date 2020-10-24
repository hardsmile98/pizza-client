import React from 'react'
import classes from './Loader.module.css'
import { Logo } from '../Icons/Icons'

const Loader: React.FC = () => {
  return (
    <div className={classes.Loader}>
      <Logo />
    </div>
  )
}

export default Loader
