import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./app/hooks";
import ContactsPage from "./pages/ContactsPage/ContactsPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { loginUserActionCreator } from "./features/users/slices/userSlice/userSlice";
import fetchToken from "./utils/auth/auth";
import DetailContactPage from "./pages/DetailContactPage/DetailContactPage";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  useNavigate();

  if (token) {
    const user = fetchToken(token);
    dispatch(loginUserActionCreator(user));
  }

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Navigate to="/contacts" />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/contact/:id" element={<DetailContactPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
