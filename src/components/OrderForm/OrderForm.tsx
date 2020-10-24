import React from 'react'
import classes from './OrderForm.module.css'
import useInput from '../../hooks/useInput'
import Input from '../UI/Input/Input'
import MaskInput from '../UI/MaskInput/MaskInput'
import Button from '../UI/Button/Button'
import { validatePhone } from '../../utils/utils'
import { ICartItem } from '../../interfaces/interfaces'
import useHttp from '../../hooks/useHttp'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setItemsCart } from '../../store/actions/cart'

interface IOrderForm {
  total: number
  items: Array<ICartItem>
  token: string | null
}

const OrderForm: React.FC<IOrderForm> = ({ total, items, token }) => {
  const name = useInput()
  const phone = useInput()
  const address = useInput()

  const { request } = useHttp()
  const history = useHistory()
  const dispatch = useDispatch()

  const makeOrderHandler = async () => {
    const orderItems = items.map((item) => {
      return { _id: item._id, count: item.count, title: item.title }
    })

    const data = {
      name: name.value,
      phone: phone.value,
      address: address.value,
      items: orderItems,
      total,
    }
    try {
      await request('/api/v1/order/add', 'POST', data, {
        Authorization: `Bearer ${token}`,
      })
      dispatch(setItemsCart([]))
      history.push('/cabinet')
    } catch (e) {}
  }

  const validate = () => {
    if (name.value && validatePhone(phone.value) && address.value) {
      return false
    }
    return true
  }

  return (
    <div className={classes.OrderForm}>
      <Input
        label="Имя"
        type="text"
        value={name.value}
        onChange={name.onChange}
      />
      <MaskInput
        mask="+7(999)999-99-99"
        label="Телефон"
        value={phone.value}
        onChange={phone.onChange}
      />
      <Input
        label="Адрес"
        type="text"
        value={address.value}
        onChange={address.onChange}
      />
      <Button
        label="Сделать заказ"
        onClick={makeOrderHandler}
        validate={validate}
      />
    </div>
  )
}

export default OrderForm
