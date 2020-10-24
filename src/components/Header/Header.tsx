import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import classes from './Header.module.css'
import { Logo, MenuIcon } from '../Icons/Icons'
import Modal from '../Modal/Modal'
import Login from './Auth/Login'
import Register from './Auth/Register'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducer } from '../../store/reducers/rootReducer'
import { logout } from '../../store/actions/auth'

const Header: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false)
  const closeModal = () => setModal(false)
  const openModal = () => setModal(true)
  const [mobileMenu, setModalMenu] = useState<boolean>(false)
  const closeMobileMenu = () => setModalMenu(false)
  const openMobileMenu = () => setModalMenu(true)

  const clsMobileMenu = [classes.Mobile]
  if (mobileMenu) {
    clsMobileMenu.push(classes.MobileActive)
  }

  const [isAuthForm, setIsAuthForm] = useState<boolean>(true)
  const swithForm = () => setIsAuthForm(!isAuthForm)

  const token = useSelector((state: IRootReducer) => state.auth.token)
  const isAuth = !!token
  const dispatch = useDispatch()

  const total = useSelector((state: IRootReducer) => state.cart.total)

  return (
    <div className={classes.Header}>
      <nav className={classes.Wrap}>
        <div className={classes.Left}>
          <Link to="/pizza" className={classes.Logo}>
            <Logo />
          </Link>
          <ul className={classes.Menu}>
            <li>
              <NavLink to="/pizza" activeClassName={classes.Active}>
                Пицца
              </NavLink>
            </li>
            <li>
              <NavLink to="/snacks" activeClassName={classes.Active}>
                Закуски
              </NavLink>
            </li>
            <li>
              <NavLink to="/drinks" activeClassName={classes.Active}>
                Напитки
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={classes.Buttons}>
          {isAuth && (
            <Link className={classes.Cabinet} to="/cabinet">
              Личный кабинет
            </Link>
          )}

          <Link className={classes.Basket} to="/cart">
            Корзина {total ? <span>({total} руб)</span> : null}
          </Link>

          {isAuth ? (
            <button className={classes.Auth} onClick={() => dispatch(logout())}>
              Выйти
            </button>
          ) : (
            <button className={classes.Auth} onClick={openModal}>
              Войти
            </button>
          )}
        </div>

        <MenuIcon className={classes.Hamburger} onClick={openMobileMenu} />

        <div className={clsMobileMenu.join(' ')}>
          <ul className={classes.MobileMenu}>
            <li>
              <NavLink
                to="/pizza"
                activeClassName={classes.Active}
                onClick={closeMobileMenu}>
                Пицца
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/snacks"
                activeClassName={classes.Active}
                onClick={closeMobileMenu}>
                Закуски
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/drinks"
                activeClassName={classes.Active}
                onClick={closeMobileMenu}>
                Напитки
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                activeClassName={classes.Active}
                onClick={closeMobileMenu}>
                Корзина
              </NavLink>
            </li>
            <li>
              {isAuth && (
                <NavLink
                  to="/cabinet"
                  activeClassName={classes.Active}
                  onClick={closeMobileMenu}>
                  Личный кабинет
                </NavLink>
              )}
            </li>

            <li>
              {isAuth ? (
                <div
                  onClick={() => {
                    closeMobileMenu()
                    dispatch(logout())
                  }}>
                  Выйти
                </div>
              ) : (
                <div
                  onClick={() => {
                    closeMobileMenu()
                    openModal()
                  }}>
                  Войти
                </div>
              )}
            </li>
          </ul>
          <div className={classes.Backdrop} onClick={closeMobileMenu} />
        </div>

        {modal && (
          <Modal closeModal={closeModal}>
            {isAuthForm ? (
              <Login swithForm={swithForm} closeModal={closeModal} />
            ) : (
              <Register swithForm={swithForm} />
            )}
          </Modal>
        )}
      </nav>
    </div>
  )
}

export default Header
