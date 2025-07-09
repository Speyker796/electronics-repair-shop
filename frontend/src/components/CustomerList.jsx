import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Pencil, Trash2 } from "lucide-react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/customer")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, []);

  const formatPhoneNumber = (number) => {
    const digits = number.replace(/\D/g, "");
    return digits.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
  };

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
              {/*<th>Action</th>*/}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                // style={{ cursor: "pointer" }}
                // onClick={() => navigate(`/customer/${customer.id}`)}
                // style={{ cursor: "pointer" }}
                className="hover:bg-base-300"
              >
                <th>{customer.id}</th>
                <td>{customer.first_name}</td>
                <td>{customer.last_name}</td>
                <td>{customer.address}</td>
                <td>{formatPhoneNumber(customer.phone_number)}</td>
                <td>
                  <div className="flex flex-wrap justify-center gap-0.5">
                    <button
                      className="btn btn-primary btn-sm group"
                      onClick={() => navigate(`/customer/${customer.id}`)}
                      title="Show"
                    >
                      <Eye className="w-4 h-4 stroke-white group-hover:stroke-black" />
                    </button>
                    <button
                      className="btn btn-info btn-sm group"
                      onClick={() => navigate(`/customer/edit/${customer.id}`)}
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4 stroke-white group-hover:stroke-black" />
                    </button>
                    <button
                      className="btn btn-error btn-sm group"
                      onClick={() =>
                        navigate(`/customer/delete/${customer.id}`)
                      }
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 stroke-white group-hover:stroke-black" />
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

export default CustomerList;
