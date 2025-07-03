import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DeviceDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const confirmedRef = useRef(false);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (confirmedRef.current) return;
    const confirmAndDelete = async () => {
      const confirmed = window.confirm(
        "Are you sure you want to delete that device?"
      );
      if (!confirmed) {
        navigate("/device");
        return;
      }
      confirmedRef.current = true;

      try {
        await fetch(`http://localhost:8000/api/device/${id}`, {
          method: "DELETE",
        });
        setStatus("success");

        // navigate("/deleted-successfully");
      } catch (err) {
        console.error(err);
        alert("Error occured while trying to delete device");
        navigate("/device");
      }
    };

    confirmAndDelete();
  }, [id, navigate]);

  if (status === "loading") {
    return (
      <div className="flex flex-wrap justify-center mb-4">
        <h1 className="text-4xl">Deleting in progress...</h1>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div>
        <div className="flex flex-wrap justify-center mb-4">
          <h1 className="text-4xl">Deleted successfully!</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/")}
          >
            Home
          </button>
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate("/device")}
          >
            Device List
          </button>
        </div>
      </div>
    );
  }
}
