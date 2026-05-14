import Link from 'next/link'
import React from 'react'
import OrderCard from '../_components/OrderCard'
import { FaBox } from 'react-icons/fa6'
import { getOrders, Order } from '../_action/getOrders.action'
import { FaShoppingBag } from 'react-icons/fa'

export default  async function allorders() {
   const orders = await getOrders()
  return (
   <>
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link className="hover:text-green-600 transition" href="/">Home</Link>
              <span>/</span>
              <Link className="hover:text-green-600 transition" href="/cart">cart</Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>
            <div className="flex items-center justify-between flex-wrap">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                    <FaBox />
                  </div>
                  My Orders
                </h1>
                <p className="text-gray-500 mt-2">Track and manage your {orders?.length} orders</p>
              </div>
              <Link className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all text-sm" href="/"> <FaShoppingBag /> Continue Shopping</Link>
            </div>
          </div>
          <div className="space-y-4">
            {orders?.map((order)=>{
              return <OrderCard key={order.id} order={order}/>
            })}
          </div>
        </div>
      </div>
    </>
  )
}
