import React, { useState, useEffect, useCallback } from 'react'
import classes from './StylePage.module.css'
import Filter from '../components/Filter/Filter'
import ProductCard from '../components/ProductCard/ProductCard'
import useHttp from '../hooks/useHttp'
import { IProduct } from '../interfaces/interfaces'

const PizzaPage: React.FC = () => {
  const { request } = useHttp()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([] as Array<IProduct>)
  const [fetchData, setFetchData] = useState([] as Array<IProduct>)

  const fetch = useCallback(async () => {
    try {
      const data: Array<IProduct> = await request('/api/v1/product/pizza')
      setProducts(data)
      setFetchData(data)
      setLoading(false)
    } catch (e) {}
  }, [request])

  const sortTitle = () => {
    const sortedByTitleProducts = products.slice().sort((a, b) => {
      if (a.title < b.title) {
        return -1
      }
      if (a.title > b.title) {
        return 1
      }
      return 0
    })
    setProducts(sortedByTitleProducts)
  }

  const sortPrice = () => {
    const sortedByPriceProducts = products.slice().sort((a, b) => {
      return a.price - b.price
    })
    setProducts(sortedByPriceProducts)
  }

  const sortPopular = () => {
    setProducts(fetchData)
  }

  useEffect(() => {
    fetch()
  }, [fetch])

  if (loading) {
    return (
      <div className={classes.Page}>
        <h1>Пицца</h1>
        <div className={classes.Wrap}>
          {Array(8)
            .fill(0)
            .map(() => (
              <ProductCard
                key={Math.random()}
                _id={String(Math.random())}
                price={300}
                title="Пицца"
                description="Описание самой вкусной пиццы"
                image="https://svgshare.com/i/QjW.svg"
              />
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className={classes.Page}>
      <h1>Пицца</h1>
      <Filter
        sortTitle={sortTitle}
        sortPrice={sortPrice}
        sortPopular={sortPopular}
      />
      <div className={classes.Wrap}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            price={product.price}
            title={product.title}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </div>
  )
}

export default PizzaPage
