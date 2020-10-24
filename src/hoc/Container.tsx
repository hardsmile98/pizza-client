import React from 'react'
import classes from './Container.module.css'

const Container: React.FC = ({ children }) => {
  return (
    <main className={classes.Main}>
      <div className={classes.Container}>{children}</div>
    </main>
  )
}

export default Container
