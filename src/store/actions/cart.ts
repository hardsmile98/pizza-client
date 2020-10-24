import {
  ADD_ITEM_CART,
  DELETE_ITEM_CART,
  GET_TOTAL_PRICE,
  INCREASE_ITEM_CART,
  REDUCE_ITEM_CART,
  SET_ITEMS_CART,
} from './actionTypes'
import { ICartItem } from '../../interfaces/interfaces'

export const addToCart = (item: ICartItem) => {
  return {
    type: ADD_ITEM_CART,
    item,
  }
}

export const getTotal = () => {
  return {
    type: GET_TOTAL_PRICE,
  }
}

export const setItemsCart = (items: Array<ICartItem>) => {
  return {
    type: SET_ITEMS_CART,
    items,
  }
}

export const deleteItemCart = (_id: string) => {
  return {
    type: DELETE_ITEM_CART,
    _id,
  }
}

export const reduceItemCart = (_id: string) => {
  return {
    type: REDUCE_ITEM_CART,
    _id,
  }
}

export const increaseItemCart = (_id: string) => {
  return {
    type: INCREASE_ITEM_CART,
    _id,
  }
}
