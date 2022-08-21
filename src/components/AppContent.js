import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// routes config
import routes from '../routes';


const AppContent = () => {
  return (
    <Routes>
      {routes.map((route, idx) => {
        return (
          route.element && (
            <Route
              key={idx}
              path={route.path}
              // exact={route.exact}
              name={route.name}
              element={<route.element />}
            />
          )
        )
      })}
      <Route path="/" element={<Navigate to="login" replace />} />
    </Routes>
  )
}

export default React.memo(AppContent)
