import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

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
        <a href="/" className="btn btn-primary btn-lg">
          Home
        </a>
        <a href="/order" className="btn btn-primary btn-lg">
          Order List
        </a>
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
