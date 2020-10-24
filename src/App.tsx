import React, { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IRootReducer } from './store/reducers/rootReducer'
import { ICartItem } from './interfaces/interfaces'
import Footer from './components/Footer/Footer'
import Header from './components/Header/Header'
import Loader from './components/Loader/Loader'
import Container from './hoc/Container'
import NotFound from './pages/NotFound'
import PizzaPage from './pages/PizzaPage'
import { autoLogin } from './store/actions/auth'
import { getTotal, setItemsCart } from './store/actions/cart'
import SnaksPage from './pages/SnaksPage'
import DrinksPage from './pages/DrinksPage'
import CartPage from './pages/CartPage'
import CabinetPage from './pages/CabinetPage'

const App: React.FC = () => {
  const token = useSelector((state: IRootReducer) => state.auth.token)
  const [ready, setReady] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const cartData: Array<ICartItem> = JSON.parse(
      localStorage.getItem('cartItems') as string
    )
    if (cartData) {
      dispatch(setItemsCart(cartData))
    }
    dispatch(autoLogin())
    setReady(true)
  }, [dispatch])

  const items = useSelector((state: IRootReducer) => state.cart.items)
  useEffect(() => {
    dispatch(getTotal())
    localStorage.setItem('cartItems', JSON.stringify(items))
  }, [items, dispatch])

  let routes = (
    <Switch>
      <Redirect exact from="/" to="/pizza" />
      <Route path="/pizza" component={PizzaPage} />
      <Route path="/snacks" component={SnaksPage} />
      <Route path="/drinks" component={DrinksPage} />
      <Route path="/cart" component={CartPage} />
      <Route component={NotFound} />
    </Switch>
  )

  if (!!token) {
    routes = (
      <Switch>
        <Redirect exact from="/" to="/pizza" />
        <Route path="/pizza" component={PizzaPage} />
        <Route path="/snacks" component={SnaksPage} />
        <Route path="/drinks" component={DrinksPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/cabinet" component={CabinetPage} />
        <Route component={NotFound} />
      </Switch>
    )
  }

  if (!ready) {
    return <Loader />
  }

  return (
    <BrowserRouter>
      <Header />
      <Container>{routes}</Container>
      <Footer />
    </BrowserRouter>
  )
}

export default App
