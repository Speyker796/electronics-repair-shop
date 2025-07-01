import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const DeviceAddNew = () => {
    const [formData, setFormData] = useState({
        device_type: "", manufacturer: "", device_model: "", serial_number: "",
    });

    const navigate = useNavigate();

    const [responseMessage, setResponseMessage] = useState("");

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/api/device", {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setResponseMessage(data.message || "Added a new device!");

            setFormData({
                device_type: "", manufacturer: "", device_model: "", serial_number: "",
            });
        } catch (error) {
            console.error("Error occured while trying to add new device:", error);
            setResponseMessage("Error occured while trying to add new device");
        }
    };

    return (<div className="max-w-5xl mx-auto p-4">
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
                    <legend className="fieldset-legend">Device Information</legend>

                    <label className="label">Device type</label>
                    <input
                        type="text"
                        className="input device-type"
                        name="device_type"
                        required
                        placeholder="Device Type"
                        value={formData.device_type}
                        onChange={handleChange}
                    />

                    <label className="label">Manufacturer</label>
                    <input
                        type="text"
                        className="input manufacturer"
                        name="manufacturer"
                        required
                        placeholder="Last Name"
                        value={formData.manufacturer}
                        onChange={handleChange}
                    />

                    <label className="label">Device model</label>
                    <input
                        type="text"
                        className="input device-model"
                        name="device_model"
                        required
                        placeholder="Device model"
                        value={formData.device_model}
                        onChange={handleChange}
                    />

                    <label className="label">Serial number</label>
                    <input
                        type="text"
                        className="input serial-number"
                        name="serial_number"
                        required
                        placeholder="Serial number"
                        value={formData.serial_number}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-primary mt-4">
                        Add
                    </button>

                    {responseMessage && (<p className="mt-2 text-sm text-success">{responseMessage}</p>)}
                </fieldset>
            </form>
        </div>
    </div>);
};

export default DeviceAddNew;