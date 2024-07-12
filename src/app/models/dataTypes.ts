export interface Signup{
    _id: string,
    username: string,
    email: string
    password: string,
    accessToken: string | undefined,
    isAdmin: boolean | undefined
}

export interface Product{
    _id: string,
    title: string,
    price: number,
    color: string,
    categories: string,
    desc: string,
    image: string,
    size: string,
    quantity?: number,
    productId: string
}

export interface Cart{
    productId: string,
    _id: string,
    title: string,
    price: number,
    color: string,
    categories: string,
    desc: string,
    image: string,
    size: string,
    quantity?: number | undefined,
    cart?: any,
    cartCount?: number | undefined
}

export interface PriceSummary{
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface Order{
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    cartTotal: number,
    paymentIntent: {
        id: string,
        amount: number
    },
    orderStatus: string

}

export interface Coupon{
  _id: string,
  couponName: string,
  couponType: string,
  discountType: string,
  percentage: number | null,
  amount: number | null,
  discountTypeOnTop: string,
  category: string,
  percentageOnTop: number | null,
  pointOnTop: number | null,
  everyThb: number | null,
  discountThb: number | null,
  couponId: string
}
