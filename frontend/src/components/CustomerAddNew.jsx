import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerAddNew = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  });

  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/api/customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setResponseMessage(data.message || "Added a new customer!");

      setFormData({
        first_name: "",
        last_name: "",
        address: "",
        phone_number: "",
      });
    } catch (error) {
      console.error("Error occured while trying to add new customer:", error);
      setResponseMessage("Error occured while trying to add new customer");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Customer Information</legend>

            <label className="label">First name</label>
            <input
              type="text"
              className="input first-name"
              name="first_name"
              required
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />

            <label className="label">Last Name</label>
            <input
              type="text"
              className="input last-name"
              name="last_name"
              required
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />

            <label className="label">Address</label>
            <input
              type="text"
              className="input address"
              name="address"
              required
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />

            <label className="label">Phone number</label>
            <input
              type="tel"
              className="input validator tabular-nums"
              name="phone_number"
              required
              placeholder="Phone number"
              pattern="[0-9]*"
              minLength="9"
              maxLength="9"
              title="Must be 9 digits"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <p className="validator-hint">Must be 9 digits</p>

            <button type="submit" className="btn btn-primary mt-4">
              Add
            </button>

            {responseMessage && (
              <p className="mt-2 text-sm text-success">{responseMessage}</p>
            )}
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default CustomerAddNew;
