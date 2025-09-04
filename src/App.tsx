import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import ZonesPage from "./pages/Dashboard/ZonesPage";
import TicketsPage from "./pages/Dashboard/TicketsPage";
import ReportsPage from "./pages/Dashboard/ReportsPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/Layout/ProtectedRoute";
import Categories from "./pages/Dashboard/Categories";
import Subscriptions from "./pages/Dashboard/Subscriptions";
import RushHours from "./pages/Dashboard/RushHour";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<ZonesPage />} />
            <Route path="zones" element={<ZonesPage />} />
            <Route path="tickets" element={<TicketsPage />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="rushHours" element={<RushHours />} />
          </Route>
        </Route>
        {/* Page Not Found 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
