export interface IProduct {
  _id: string
  title: string
  description: string
  price: number
  image: string
}

export interface ICartItem extends IProduct {
  count: number
}

export interface ICart {
  items: Array<ICartItem>
  total: number
}

export interface IOrderItem {
  _id?: string
  items: Array<{
    _id: string
    title: string
    count: number
  }>
  total: number
  createdAt: Date
}
