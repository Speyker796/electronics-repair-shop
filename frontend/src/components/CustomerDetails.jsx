import {useParams, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Eye, Pencil, Trash2} from "lucide-react";

function CustomerDetails() {
    const {id} = useParams();
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
                <h1>
                    <b>Devices:</b>
                </h1>
                <div className="overflow-x-auto rounded-box border border-base-content/5 shadow">
                    <table className="table table-md">
                        <thead className="text-black">
                        <tr>
                            <th>#</th>
                            <th>Device Type</th>
                            <th>Device Manufacturer</th>
                            <th>Device Model</th>
                            <th>Serial Number</th>
                            {/*<th>Action</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {customer.devices.map((device) => (
                            <tr
                                key={device.id}
                                // style={{ cursor: "pointer" }}
                                // onClick={() => navigate(`/customer/${customer.id}`)}
                                // style={{ cursor: "pointer" }}
                                className="hover:bg-base-300"
                            >
                                <th>{device.id}</th>
                                <td>{device.device_type}</td>
                                <td>{device.manufacturer}</td>
                                <td>{device.device_model}</td>
                                <td>{device.serial_number}</td>
                                <td>
                                    <div className="flex flex-wrap justify-center gap-0.5">
                                        <button
                                            className="btn btn-primary btn-sm group"
                                            onClick={() => navigate(`/device/${device.id}`)}
                                            title="Show"
                                        >
                                            <Eye className="w-4 h-4 stroke-white group-hover:stroke-black"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/*<ul>*/}
                {/*    {customer.devices.map((device) => (*/}
                {/*        <li key={device.id}>*/}
                {/*            {device.device_type} {device.manufacturer} {device.device_model} {device.serial_number}*/}
                {/*        </li>*/}
                {/*    ))}*/}
                {/*</ul>*/}
            </div>
        </div>
    );
}

export default CustomerDetails;
