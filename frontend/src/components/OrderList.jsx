import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/order")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="mb-6">
        <h5 className="text-2xl font-semibold text-center">Order List</h5>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 shadow">
        <table className="table table-md">
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Description</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-base-300">
                <th>{order.id}</th>
                <td>{order.order_description}</td>
                <td>{order.order_details}</td>
                <td>
                  <div className="flex flex-wrap justify-center gap-0.5">
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => navigate(`/order/${order.id}`)}
                    >
                      SHOW
                    </button>
                    <button
                      className="btn btn-info btn-xs"
                      // onClick={() => navigate(`/order/edit/${order.id}`)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      // onClick={() => navigate(`/order/delete/${order.id}`)}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderList;
