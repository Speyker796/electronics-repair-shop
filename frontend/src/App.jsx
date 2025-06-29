import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import CustomerList from "./components/CustomerList";
import DeviceList from "./components/DeviceList";
import OrderList from "./components/OrderList";
import Home from "./views/Home";
import CustomerDetails from "./components/CustomerDetails";
import DeviceDetails from "./components/DeviceDetails";
import OrderDetails from "./components/OrderDetails";
import CustomerAddNew from "./components/CustomerAddNew";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/customer" element={<CustomerList />} />
      <Route path="/customer/:id" element={<CustomerDetails />} />
      <Route path="/device" element={<DeviceList />} />
      <Route path="/device/:id" element={<DeviceDetails />} />
      <Route path="/order" element={<OrderList />} />
      <Route path="/order/:id" element={<OrderDetails />} />
      <Route path="/customer/add" element={<CustomerAddNew />} />
    </Routes>
  );
}

export default App;
