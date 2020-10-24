import React from 'react'
import classes from './StylePage.module.css'
import { useSelector } from 'react-redux'
import { IRootReducer } from '../store/reducers/rootReducer'
import { ICartItem } from '../interfaces/interfaces'
import CartItem from '../components/CartItem/CartItem'
import OrderForm from '../components/OrderForm/OrderForm'

const CartPage: React.FC = () => {
  const items: Array<ICartItem> = useSelector(
    (state: IRootReducer) => state.cart.items
  )
  const total = useSelector((state: IRootReducer) => state.cart.total)

  const token = useSelector((state: IRootReducer) => state.auth.token)
  const isAuth = !!token

  return (
    <div className={classes.Page}>
      <h1>Корзина</h1>
      <div className={classes.List}>
        {items.length ? (
          items.map((item) => (
            <CartItem
              key={item._id}
              _id={item._id}
              title={item.title}
              price={item.price}
              count={item.count}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p>Корзина пустая, добавьте что-то</p>
        )}
      </div>

      {items.length ? (
        <div className={classes.Order}>
          <h1>Оформление заказа</h1>
          {isAuth ? (
            <OrderForm total={total} items={items} token={token} />
          ) : (
            <p>Необходимо авторизоваться, чтобы сделать заказ</p>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default CartPage
