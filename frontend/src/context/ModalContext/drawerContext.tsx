import { createContext, useContext } from "react";

// Defines available types for the drawer content.
export enum DrawerContentType {
  CART = "cart",
}

export interface DrawerState {
  isOpen: boolean;
  contentType: DrawerContentType | null;
}

export interface DrawerContextData extends DrawerState {
  hideDrawer: () => void;
  showDrawer: (contentType: DrawerContentType) => void;
}

export const DrawerContext = createContext<DrawerContextData>({
  isOpen: false,
  contentType: null,
  hideDrawer: () => {},
  showDrawer: () => {},
});

export const useDrawerContext = () => useContext(DrawerContext);
