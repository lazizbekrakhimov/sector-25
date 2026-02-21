import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { Category, DashboardHome, NotFound, ProductCrud, ProductMore, Products, Users } from "../pages"
import { Header, Sitebar } from "../modules"

const DashboardRoute = () => {

  const routeList = [
    { id: 1, path: PATH.home, element: <DashboardHome /> },
    { id: 2, path: PATH.users, element: <Users /> },
    { id: 3, path: PATH.products, element: <Products /> },
    { id: 4, path: PATH.category, element: <Category /> },
    { id: 5, path: PATH.notFound, element: <NotFound /> },
    { id: 6, path: PATH.productsMore, element: <ProductMore /> },
    { id: 7, path: PATH.productsCreate, element: <ProductCrud /> },
    { id: 8, path: PATH.productsUpdate, element: <ProductCrud /> },

  ]
  return (
    <div className="flex h-screen">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#8b1e1e] z-30" />
      <div className="absolute bottom-0 right-0 w-full h-1.5 bg-[#d4a017] z-30" />
      <Sitebar />
      <div className="w-[78%] overflow-y-auto ">
        <Header />
        <Routes>{routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
      </div>
    </div>
  )
}

export default DashboardRoute