import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

function DeviceDetails() {
  const { id } = useParams();
  const [device, setDevice] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/api/device/${id}`)
      .then((response) => response.json())
      .then((data) => setDevice(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, [id]);

  if (!device) return <p>Loading device details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex flex-wrap justify-center gap-4">
        <a href="/" className="btn btn-primary btn-lg">
          Home
        </a>
        <a href="/device" className="btn btn-primary btn-lg">
          Device List
        </a>
      </div>
      <div>
        <h1>
          <b>Type:</b> {device.device_type}
        </h1>
        <h1>
          <b>Manufacturer:</b> {device.manufacturer}
        </h1>
        <h1>
          <b>Model:</b> {device.device_model}
        </h1>
        <h1>
          <b>Serial number:</b> {device.serial_number}
        </h1>
      </div>
    </div>
  );
}

export default DeviceDetails;
