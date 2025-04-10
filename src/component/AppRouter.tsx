import {Routes, Route, Navigate} from "react-router-dom"
import {publicRoutes} from "../router";
import {HOME_ROUTE} from "../utils/const"


function AppRouter() {
  return (
    <div>
      <Routes>
        {publicRoutes.map(({ path, Component }) => (
          <Route 
            key={path} 
            path={path} 
            element={<Component />}
          />
        ))}
        <Route path="*" element={<Navigate to={HOME_ROUTE} replace />} />
      </Routes>
    </div>
  )
}

export default AppRouter