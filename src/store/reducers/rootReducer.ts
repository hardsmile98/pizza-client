import { combineReducers } from 'redux'
import { ICart } from '../../interfaces/interfaces'
import authReducer from './auth'
import cartReducer from './cart'

export interface IRootReducer {
  auth: {
    token: string | null
  }
  cart: ICart
}

export default combineReducers({
  auth: authReducer,
  cart: cartReducer,
})
