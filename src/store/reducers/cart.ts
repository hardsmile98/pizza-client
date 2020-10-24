import { ICart, ICartItem } from '../../interfaces/interfaces'
import {
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  GET_TOTAL_PRICE,
  INCREASE_ITEM_CART,
  REDUCE_ITEM_CART,
  SET_ITEMS_CART,
} from '../actions/actionTypes'

const initialState = {
  items: [] as Array<ICartItem>,
  total: 0 as number,
}

export default function cartReducer(state: ICart = initialState, action: any) {
  switch (action.type) {
    case ADD_ITEM_CART:
      const findItem = state.items.find((item) => item._id === action.item._id)
      const items = findItem
        ? state.items.map((item) =>
            item._id === findItem._id
              ? { ...item, count: item.count + action.item.count }
              : item
          )
        : [...state.items, action.item]
      return {
        ...state,
        items,
      }
    case GET_TOTAL_PRICE:
      let newTotal = 0
      state.items.forEach((item) => {
        newTotal = newTotal + item.count * item.price
      })
      return { ...state, total: newTotal }
    case SET_ITEMS_CART:
      return {
        ...state,
        items: action.items,
      }
    case DELETE_ITEM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action._id),
      }
    case INCREASE_ITEM_CART:
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action._id ? { ...item, count: ++item.count } : item
        ),
      }
    case REDUCE_ITEM_CART:
      const filter = state.items.map((item) =>
        item._id === action._id
          ? item.count > 0
            ? { ...item, count: --item.count }
            : item
          : item
      )
      return {
        ...state,
        items: filter.filter((item) => item.count > 0),
      }
    default:
      return state
  }
}
