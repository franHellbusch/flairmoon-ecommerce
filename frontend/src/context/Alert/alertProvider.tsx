import { useState } from "react";
import { AlertContext, AlertSeverity, AlertState } from "./alertContext";
import { Alert, Snackbar } from "@mui/material";

/**
 * Manages the visibility, message and level for the alert.
 */
export const AlertProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [alertState, setAlertState] = useState<AlertState>({
    isOpen: false,
    message: "",
    severity: "info",
  });

  const showAlert = (
    newMessage: string,
    newSeverity: AlertSeverity = "info",
  ) => {
    setAlertState({
      isOpen: true,
      message: newMessage,
      severity: newSeverity,
    });
  };

  const hideAlert = () => {
    setAlertState({
      ...alertState,
      isOpen: false,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        ...alertState,
        showAlert,
        hideAlert,
      }}
    >
      {children}
      <Snackbar open={alertState.isOpen} autoHideDuration={6000} onClose={hideAlert}>
        <Alert onClose={hideAlert} severity={alertState.severity} variant="filled">
          {alertState.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
