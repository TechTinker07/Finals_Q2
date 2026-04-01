import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoPage from "./pages/TodoPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}
