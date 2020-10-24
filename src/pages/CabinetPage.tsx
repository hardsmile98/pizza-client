import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from '../components/OrderItem/OrderItem'
import useHttp from '../hooks/useHttp'
import { IOrderItem } from '../interfaces/interfaces'
import { IRootReducer } from '../store/reducers/rootReducer'
import classes from './StylePage.module.css'

const CabinetPage: React.FC = () => {
  const [orders, setOrders] = useState([] as Array<IOrderItem>)
  const token = useSelector((state: IRootReducer) => state.auth.token)
  const { request } = useHttp()

  const fetch = useCallback(async () => {
    try {
      const data = await request('/api/v1/order', 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setOrders(data)
    } catch (e) {}
  }, [request, token])

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <div className={classes.Page}>
      <h1>Мои заказы</h1>
      <div className={classes.List}>
        {orders.length ? (
          orders.map((order) => (
            <OrderItem
              key={order._id}
              items={order.items}
              total={order.total}
              createdAt={order.createdAt}
            />
          ))
        ) : (
          <p>У вас нет заказов</p>
        )}
      </div>
    </div>
  )
}

export default CabinetPage
