import React from 'react'
import classes from './CartItem.module.css'
import { useDispatch } from 'react-redux'
import { DeleteIcon } from '../Icons/Icons'
import { ICartItem } from '../../interfaces/interfaces'
import {
  deleteItemCart,
  increaseItemCart,
  reduceItemCart,
} from '../../store/actions/cart'

const CartItem: React.FC<ICartItem> = ({
  _id,
  title,
  price,
  description,
  image,
  count,
}) => {
  const dispatch = useDispatch()

  return (
    <div className={classes.CartItem}>
      <img className={classes.Image} src={image} alt="product" />
      <div className={classes.Product}>
        <p className={classes.Title}>{title}</p>
        <p className={classes.Desc}>{description}</p>
      </div>
      <div className={classes.Buttons}>
        <button onClick={() => dispatch(reduceItemCart(_id))}>-</button>
        <p className={classes.Counter}>{count}</p>
        <button onClick={() => dispatch(increaseItemCart(_id))}>+</button>
      </div>
      <p className={classes.Price}>{price * count}₽</p>
      <button
        className={classes.Delete}
        onClick={() => dispatch(deleteItemCart(_id))}>
        <DeleteIcon />
      </button>
    </div>
  )
}

export default CartItem
