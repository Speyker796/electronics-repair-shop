import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

function Home() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/order")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-md px-4">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Computer Repair Shop</h1>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <button
                className="btn btn-ghost text-lg"
                onClick={() => navigate("/customer")}
              >
                Show all customers
              </button>
            </li>
            <li>
              <button
                className="btn btn-ghost text-lg"
                onClick={() => navigate("/device")}
              >
                Show all devices
              </button>
            </li>
            <li>
              <button
                className="btn btn-ghost text-lg"
                onClick={() => navigate("/order")}
              >
                Show all orders
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-grow overflow-hidden">
        {/*Sidebar*/}
        <aside className="bg-base-200 w-60 p-4 flex flex-col">
          <nav className="flex flex-col space-y-2">
            <button className="btn btn-ghost justify-start">Something</button>
            <button className="btn btn-ghost justify-start">Something</button>
            <button className="btn btn-ghost justify-start">Something</button>
            <button className="btn btn-ghost justify-start">Something</button>
          </nav>
          <div className="mt-auto text-center text-sm text-gray-500">
            © 2025 Computer repair shop
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-grow overflow-auto p-6 bg-base-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                onClick={() => navigate(`/order/${order.id}`)}
                key={order.id}
                className="card hover:cursor-pointer hover:bg-gray-200 shadow-md py-4 px-0 flex flex-col space-y-8 items-center text-center">
                <div>{order.id}</div>
                <div>{format(new Date(order.created_at), 'dd.MM.yyyy HH:mm', { locale: pl })}</div>
                <div>{order.order_description}</div>
                <div>{order.order_details}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
      {/* Footer */}
      <footer className="bg-base-100 shadow-inner p-4 flex-none text-center text-sm text-gray-600">
        © 2025 Computer repair shop. All rights reserved.
      </footer>
      {/*<div className="flex flex-wrap justify-center gap-4 mb-4">*/}
      {/*    <button*/}
      {/*        className="btn btn-outline btn-primary text-lg"*/}
      {/*        onClick={() => navigate("/customer/add")}*/}
      {/*    >*/}
      {/*        Add new customer*/}
      {/*    </button>*/}
      {/*    <button*/}
      {/*        className="btn btn-outline btn-primary text-lg"*/}
      {/*        onClick={() => navigate("/device/add")}*/}
      {/*    >*/}
      {/*        Add new device*/}
      {/*    </button>*/}
      {/*</div>*/}
    </div>
  );
}

export default Home;
