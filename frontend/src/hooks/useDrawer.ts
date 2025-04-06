import { useDrawerContext } from "@/context/ModalContext/drawerContext";

export const useDrawer = () => {
  const context = useDrawerContext();

  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }

  return context;
};
