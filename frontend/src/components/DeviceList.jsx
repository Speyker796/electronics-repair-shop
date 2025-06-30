import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DeviceList() {
  const [devices, setDevices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/device")
      .then((response) => response.json())
      .then((data) => setDevices(data))
      .catch((error) => console.error("Błąd pobierania:", error));
  }, []);

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
        <h5 className="text-2xl font-semibold text-center">Device List</h5>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 shadow">
        <table className="table table-md">
          <thead className="text-black">
            <tr>
              <th>#</th>
              <th>Type</th>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id} className="hover:bg-base-300">
                <th>{device.id}</th>
                <td>{device.device_type}</td>
                <td>{device.manufacturer}</td>
                <td>{device.device_model}</td>
                <td>{device.serial_number}</td>
                <td>
                  <div className="flex flex-wrap justify-center gap-0.5">
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => navigate(`/device/${device.id}`)}
                    >
                      SHOW
                    </button>
                    <button
                      className="btn btn-info btn-xs"
                      // onClick={() => navigate(`/device/edit/${device.id}`)}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-error btn-xs"
                      // onClick={() => navigate(`/device/delete/${device.id}`)}
                    >
                      DELETE
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

export default DeviceList;
