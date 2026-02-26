import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { Category, CategoryCrud, CategoryMore, DashboardHome, NotFound, ProductCrud, ProductMore, Products, UserCrud, UserMore, Users } from "../pages"
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
    { id: 9, path: PATH.categoryMore, element: <CategoryMore /> },
    { id: 10, path: PATH.categoryCreate, element: <CategoryCrud /> },
    { id: 11, path: PATH.categoryUpdate, element: <CategoryCrud /> },
    { id: 12, path: PATH.usersMore, element: <UserMore /> },
    { id: 13, path: PATH.usersCreate, element: <UserCrud /> },
    { id: 14, path: PATH.usersUpdate, element: <UserCrud /> },
  ]
  
  return (
    <div className="flex h-screen">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#8b1e1e] z-30" />
      <div className="absolute bottom-0 right-0 w-full h-1.5 bg-[#d4a017] z-30" />
      <Sitebar />
      <div className="w-[90%] overflow-y-auto ">
        <Header />
        <Routes>{routeList.map(item => <Route key={item.id} path={item.path} element={item.element} />)}</Routes>
      </div>
    </div>
  )
}

export default DashboardRoute