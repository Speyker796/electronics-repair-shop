import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/order/${id}`)
      .then((response) => response.json())
      .then((data) => setOrder(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, [id]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/order")}
        >
          Order List
        </button>
      </div>
      <div>
        <h1>
          <b>Description:</b> {order.order_description}
        </h1>
        <h1>
          <b>Additional details:</b> {order.order_details}
        </h1>
      </div>
    </div>
  );
}

export default OrderDetails;
