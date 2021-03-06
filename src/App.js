import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/login.jsx';
import AdminDashboard from './components/admin-dashboard/admin-dashboard.jsx';
import Users from './components/admin-dashboard/users/users.jsx';
import Clothes from './components/admin-dashboard/clothes/clothes.jsx';
import Orders from './components/orders/orders.jsx';
import OrderManagement from './components/orders-management/orders-management.jsx';
import Header from "./components/shared/header/header";

function App() {
  return (
    <div>
      <div className="container">
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </div>
      <div>
        <div>
          <Router>
            <Routes>
              <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
              <Route exact path="/admin-dashboard/users" element={<Users />} />
              <Route exact path="/admin-dashboard/clothes" element={<Clothes />} />
              <Route exact path="/orders" element={<Orders />} />
              <Route exact path="/orders-management" element={<OrderManagement />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;