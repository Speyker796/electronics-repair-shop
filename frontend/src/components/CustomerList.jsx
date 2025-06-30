import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/customer/${id}`);
  };

  useEffect(() => {
    fetch("/api/customer")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-4">
        <a href="/" className="btn btn-primary btn-lg">
          Home
        </a>
      </div>

      <div className="mb-6">
        <h5 className="text-2xl font-semibold text-center">Customer List</h5>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 shadow">
        <table className="table table-md">
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => handleRowClick(customer.id)}
                style={{ cursor: "pointer" }}
                className="hover:bg-base-300"
              >
                <th>{customer.id}</th>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{customer.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerList;
