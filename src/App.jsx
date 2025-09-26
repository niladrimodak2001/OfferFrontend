import { BrowserRouter, Route, Routes } from "react-router";
import KeepIt from "./components/KeepIt";

import { Toaster } from "react-hot-toast";
import Template from "./pages/Template";
import TemplateAddFieldPage from "./pages/TemplateAddFieldPage";
import HistoryPage from "./pages/HistoryPage";


function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/useTemplete/:role" element={<KeepIt />} />
        <Route path="/useTemplete/:role/edit/:id" element={<KeepIt />} />
        <Route path="/" element={<Template />} />
        <Route
          path="/addFields/:templateId"
          element={<TemplateAddFieldPage />}
        />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
