import { createContext, useContext } from "react";

// Defines severity levels for the alert.
export type AlertSeverity = "error" | "info" | "success" | "warning";

export interface AlertState {
  isOpen: boolean;
  message: string;
  severity: AlertSeverity;
}

interface AlertContextData {
  isOpen: boolean;
  message: string;
  severity: "error" | "info" | "success" | "warning";
  showAlert: (
    message: string,
    severity?: "error" | "info" | "success" | "warning",
  ) => void;
  hideAlert: () => void;
}

export const AlertContext = createContext<AlertContextData>({
  isOpen: false,
  message: "",
  severity: "info",
  showAlert: () => {},
  hideAlert: () => {},
});

export const useAlertContext = () => useContext(AlertContext);
