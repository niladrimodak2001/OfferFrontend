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
        {/* For all */}
        <Route path="/" element={<Template />} />
        <Route path="/history" element={<HistoryPage />} />
        
        {/* For urgent use */}
        <Route path="/useTemplete/:role" element={<KeepIt />} />
        <Route path="/useTemplete/:role/edit/:id" element={<KeepIt />} />

        {/* For dynamic offer letter generation */}
        <Route
          path="/addFields/:templateId"
          element={<TemplateAddFieldPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
