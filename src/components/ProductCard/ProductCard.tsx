import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './ProductCard.module.css'
import { IProduct, ICartItem } from '../../interfaces/interfaces'
import { addToCart, getTotal } from '../../store/actions/cart'

const ProductCard: React.FC<IProduct> = ({
  _id,
  title,
  price,
  description,
  image,
}) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState<number>(0)

  const onReduce = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const addHandler = () => {
    if (count) {
      const cartItem: ICartItem = {
        _id,
        title,
        price,
        description,
        image,
        count,
      }
      dispatch(addToCart(cartItem))
      dispatch(getTotal())
      setCount(0)
    }
  }

  return (
    <div className={classes.ProductCard}>
      <div>
        <img className={classes.Image} src={image} alt="product" />
        <div className={classes.Buttons}>
          <button onClick={onReduce}>-</button>
          <p className={classes.Counter}>
            {count ? count + 'шт' : <span>Добавьте</span>}
          </p>
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        <p className={classes.Title}>{title}</p>
        <p className={classes.Desc}>{description}</p>
      </div>

      <div className={classes.Bottom}>
        <p className={classes.Price}>{price} ₽</p>
        <button className={classes.Add} onClick={addHandler}>
          В корзину
        </button>
      </div>
    </div>
  )
}

export default ProductCard
