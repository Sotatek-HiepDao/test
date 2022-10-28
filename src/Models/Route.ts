import React from "react";
import { RoleBase } from "./Role";

export interface RouteDef {
  name: string;
  component: React.ReactNode;
  path: string;
  auth?: boolean;
  roles?: RoleBase[];
  key?: string;
  layout?: React.ReactNode;
}
