import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import "./CustomerList.css";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/customer/${id}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, [id]);

  if (!customer) return <p>Loading customer details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/" className="btn btn-primary btn-lg">
          Home
        </a>
        <a href="/customer" className="btn btn-primary btn-lg">
          Customer List Hello
        </a>
      </div>
      <div>
        <h1>
          <b>Name:</b> {customer.first_name} {customer.last_name}
        </h1>
        <h1>
          <b>Address:</b> {customer.address}
        </h1>
        <h1>
          <b>Phone number:</b> {customer.phone_number}
        </h1>
      </div>
    </div>
  );
}

export default CustomerDetails;
