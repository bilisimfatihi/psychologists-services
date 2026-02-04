import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Layout from "../components/Layout"
import Psychologists from "../pages/Psychologists"
import Favorites from "../pages/Favorites"
import Home from "../pages/Home"

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route index element={<Home />} />
                <Route path="psychologists" element={<Psychologists />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter