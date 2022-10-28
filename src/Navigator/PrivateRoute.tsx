import { RoleBase } from "Models/Role";
import { ReactElement } from "react";
import { Navigate, useLocation, Outlet } from "react-router";

interface PrivateRouteProps {
  children?: JSX.Element;
  roles: RoleBase[];
  redirectPath?: string;
}

const PrivateRoute = (props: PrivateRouteProps): ReactElement<any, any> => {
  const { children, roles, redirectPath = "/" } = props;

  // const { authenticated, currentRole } = null;
  const authenticated = true;
  const currentRole: RoleBase = RoleBase.Administrator;

  // hook
  const location = useLocation();

  // handler
  const canUserAccess = (): boolean => {
    return authenticated && roles?.includes(currentRole);
  };

  if (canUserAccess()) {
    return children || <Outlet />;
  }
  return <Navigate to={redirectPath} state={{ from: location }} replace />;
};

export default PrivateRoute;
