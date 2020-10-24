import React from 'react'
import classes from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={classes.Footer}>
      <div className={classes.Wrap}>
        <div className={classes.Stats}>
          <div className={classes.Part}>
            <span>1 712 430 ₽</span>
            <p>Выручка за прошлый месяц</p>
          </div>
          <div className={classes.Part}>
            <span>150+ пиццерий</span>
            <p>Мы есть почти во всех регионах России</p>
          </div>
        </div>

        <div className={classes.Copy}>
          <p>© 2020 Copyright by PIZZA</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
