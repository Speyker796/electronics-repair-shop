import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-16 min-h-screen bg-base-100">
      <h1 className="text-3xl font-bold mb-8">Welcome to my page!</h1>

      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          className="btn btn-outline btn-primary text-lg"
          onClick={() => navigate("/customer/add")}
        >
          Add new customer
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="btn btn-outline btn-primary text-lg"
          onClick={() => navigate("/customer")}
        >
          Show all customers
        </button>
        <button
          className="btn btn-outline btn-primary text-lg"
          onClick={() => navigate("/device")}
        >
          Show all devices
        </button>
        <button
          className="btn btn-outline btn-primary text-lg"
          onClick={() => navigate("/order")}
        >
          Show all orders
        </button>
      </div>
    </div>
  );
}

export default Home;
