import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CustomerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  });

  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");

  const formatPhoneNumber = (number) => {
    const digits = number.replace(/\D/g, "");
    return digits.replace(/(\d{3})(\d{3})(\d{3})/, "$1-$2-$3");
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/customer/${id}`);
        if (!res.ok) throw new Error("Failed to fetch customer data");
        const data = await res.json();

        setFormData({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          address: data.address || "",
          phone_number: data.phone_number || "",
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setResponseMessage("Error fetching customer data");
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedPhone = formatPhoneNumber(formData.phone_number);
    const updatedData = {
      ...formData,
      phone_number: formattedPhone,
    };

    try {
      const res = await fetch(`http://localhost:8000/api/customer/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) throw new Error("Failed to update customer");

      const data = await res.json();
      setResponseMessage(data.message || "Customer updated successfully");
      
      // Go back to customer list
      navigate(`/customer`);
    } catch (error) {
      console.error("Error updating customer:", error);
      setResponseMessage("Error occurred while updating customer");
    }
  };

  if (loading) return <p>Loading customer data...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <a href="/" className="btn btn-primary btn-lg">
          Home
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <form onSubmit={handleSubmit}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">
              Update Customer Information
            </legend>

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
              minlength="9"
              maxlength="9"
              title="Must be 9 digits"
              value={formData.phone_number}
              onChange={handleChange}
            />
            <p className="validator-hint">Must be 9 digits</p>

            <button type="submit" className="btn btn-primary mt-4">
              Update
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

export default CustomerEdit;
