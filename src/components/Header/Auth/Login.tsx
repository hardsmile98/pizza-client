import React from 'react'
import classes from './Auth.module.css'
import Input from '../../UI/Input/Input'
import useInput from '../../../hooks/useInput'
import useHttp from '../../../hooks/useHttp'
import { validateEmail } from '../../../utils/utils'
import { useDispatch } from 'react-redux'
import { login } from '../../../store/actions/auth'
import Button from '../../UI/Button/Button'

interface ILogin {
  swithForm(): void
  closeModal(): void
}

const Login: React.FC<ILogin> = ({ swithForm, closeModal }) => {
  const email = useInput()
  const password = useInput()
  const { request, error } = useHttp()
  const dispatch = useDispatch()

  const loginHandler = async () => {
    const data = {
      email: email.value,
      password: password.value,
    }
    try {
      const response = await request('/api/v1/auth/login', 'POST', data)
      dispatch(login(response.token))
      closeModal()
    } catch (e) {}
  }

  const validate = () => {
    if (validateEmail(email.value) && password.value.length > 5) {
      return false
    }
    return true
  }

  return (
    <div className={classes.Auth}>
      <h1>Вход на сайт</h1>
      <div className={classes.Form}>
        <Input
          label="Email"
          type="text"
          value={email.value}
          onChange={email.onChange}
        />
        <Input
          label="Пароль"
          type="password"
          value={password.value}
          onChange={password.onChange}
        />
        {error && <p className={classes.Error}>{error}</p>}
        <Button label="Войти" onClick={loginHandler} validate={validate} />
      </div>
      <div className={classes.Switch}>
        <span>У вас ещё нет акканута? </span>
        <span onClick={swithForm} className={classes.Link}>
          Зарегистрироваться
        </span>
      </div>
    </div>
  )
}

export default Login
