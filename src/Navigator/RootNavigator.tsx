import { Routes, Route } from "react-router-dom";

import { RoleBase } from "Models/Role";
import { ReactElement } from "react";
import { publicRoutes, privateRoutes } from "./Routes";
import PrivateRoute from "./PrivateRoute";

interface TypeRenderElement {
  component: JSX.Element;
  auth?: boolean;
  roles?: RoleBase[];
}

const RootNavigator = () => {
  const renderElement = (props: TypeRenderElement): ReactElement<any, any> => {
    const { component, auth = false, roles = [] } = props;

    if (component) return null;
    
    const Page = component as React.ElementType;
    if (auth) {
      return (
        <PrivateRoute roles={roles}>
          <Page />
        </PrivateRoute>
      );
    }
    return <Page />;
  };

  const renderRoute = (route, auth = false) => {
    if (route.child && route.child.length > 0) {
      return (
        <Route
          index={route.index}
          path={route.path}
          element={renderElement(route.component, auth, route?.roles)}
          key={route.name}
        >
          {route.child.map((routeChild) => renderRoute(routeChild))}
        </Route>
      );
    }

    return (
      <Route
        index={route.index}
        path={route.path}
        element={renderElement(route.component, auth, route?.roles)}
        key={route.name}
      />
    );
  };

  return (
    <Routes>
      {publicRoutes.map((route) => {
        return renderRoute(route);
      })}
      {privateRoutes.map((route) => {
        return renderRoute(route, true);
      })}
    </Routes>
  );
};

export default RootNavigator;
