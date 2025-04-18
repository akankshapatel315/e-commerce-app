import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import { LoginPage } from "./components/login/LoginPage";
import {HomePage} from "./components/home/HomePage";
import { Header } from "./components/header/HeaderPage";

function App() {
  return (
    <Router>
      <Header/>
      <Toaster richColors position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
