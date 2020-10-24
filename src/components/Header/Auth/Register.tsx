import React from 'react'
import classes from './Auth.module.css'
import Input from '../../UI/Input/Input'
import useInput from '../../../hooks/useInput'
import useHttp from '../../../hooks/useHttp'
import { validateEmail } from '../../../utils/utils'
import Button from '../../UI/Button/Button'

interface IRegister {
  swithForm(): void
}

const Register: React.FC<IRegister> = ({ swithForm }) => {
  const email = useInput()
  const password = useInput()
  const { request, error } = useHttp()

  const registerHandler = async () => {
    const data = {
      email: email.value,
      password: password.value,
    }
    try {
      await request('/api/v1/auth/register', 'POST', data)
      swithForm()
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
      <h1>Регистрация на сайте</h1>
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
        <Button
          label="Зарегистрироваться"
          onClick={registerHandler}
          validate={validate}
        />
      </div>
      <div className={classes.Switch}>
        <span>У уже есть аккаунт? </span>
        <span onClick={swithForm} className={classes.Link}>
          Вход
        </span>
      </div>
    </div>
  )
}

export default Register
