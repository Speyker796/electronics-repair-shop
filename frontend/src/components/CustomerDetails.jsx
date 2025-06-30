import { useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function CustomerDetails() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/customer/${id}`)
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, [id]);

  const formatPhoneNumber = (number) => {
    const digits = number.replace(/\D/g, "");
    return digits.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
  };

  if (!customer) return <p>Loading customer details...</p>;

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
          onClick={() => navigate("/customer")}
        >
          Customer List
        </button>
      </div>
      <div>
        <h1>
          <b>Name:</b> {customer.first_name} {customer.last_name}
        </h1>
        <h1>
          <b>Address:</b> {customer.address}
        </h1>
        <h1>
          <b>Phone number:</b> {formatPhoneNumber(customer.phone_number)}
        </h1>
      </div>
    </div>
  );
}

export default CustomerDetails;
