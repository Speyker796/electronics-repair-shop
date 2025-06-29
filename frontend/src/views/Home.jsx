import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center pt-16 min-h-screen bg-base-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to my page!</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <a href="/customer/add" className="btn btn-outline btn-primary text-lg">
          Add new customer
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/customer" className="btn btn-outline btn-primary text-lg">
          Show all customers
        </a>
        <a href="/device" className="btn btn-outline btn-primary text-lg">
          Show all devices
        </a>
        <a href="/order" className="btn btn-outline btn-primary text-lg">
          Show all orders
        </a>
      </div>
    </div>
  );
}

export default Home;
