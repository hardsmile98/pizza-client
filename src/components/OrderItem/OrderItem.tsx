import React from 'react'
import { IOrderItem } from '../../interfaces/interfaces'
import classes from './OrderItem.module.css'

const OrderItem: React.FC<IOrderItem> = ({ items, total, createdAt }) => {
  const titleItems = items.map((item) => item.title + ' x ' + item.count)
  const stringItems = titleItems.join(',')

  return (
    <div className={classes.OrderItem}>
      <p className={classes.Items}>{stringItems}</p>
      <p className={classes.Price}>
        {total}
        <span>₽</span>
      </p>
      <p className={classes.Date}>{new Date(createdAt).toLocaleString()}</p>
    </div>
  )
}

export default OrderItem
