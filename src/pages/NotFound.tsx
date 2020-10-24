import React from 'react'
import classes from './StylePage.module.css'
import { Link } from 'react-router-dom'
import { Logo } from '../components/Icons/Icons'

const NotFound: React.FC = () => {
  return (
    <div className={classes.NotFound}>
      <Logo />
      <p>Страница не найдена, либо еще не создана</p>
      <Link to="/pizza">Перейти на главную</Link>
    </div>
  )
}

export default NotFound
