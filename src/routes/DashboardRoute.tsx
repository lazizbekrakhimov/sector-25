import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { Category, DashboardHome, NotFound, Products, Users } from "../pages"

const DashboardRoute = () => {

  const routeList = [
    { id: 1, path: PATH.home, element: <DashboardHome /> },
    { id: 2, path: PATH.users, element: <Users /> },
    { id: 3, path: PATH.products, element: <Products /> },
    { id: 4, path: PATH.category, element: <Category /> },
    { id: 5, path: PATH.notFound, element: <NotFound /> },
  ]
  return (
    <Routes>{routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
  )
}

export default DashboardRoute