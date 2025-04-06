import React, { useState } from "react";
import { DrawerContext, DrawerContentType, DrawerState } from "./drawerContext";
import { CloseButton, Drawer, Heading, Portal } from "@chakra-ui/react";

/**
 * Manages the visibility, content type, and data for the drawer.
 */
export const DrawerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerState, setDrawerState] = useState<DrawerState>({
    isOpen: false,
    contentType: null,
  });

  const hideDrawer = () => {
    setDrawerState({
      isOpen: false,
      contentType: drawerState.contentType,
    });
  };

  const showDrawer = (contentType: DrawerContentType) => {
    setDrawerState({
      isOpen: true,
      contentType,
    });
  };

  const renderDrawerContent = () => {
    switch (drawerState.contentType) {
      case DrawerContentType.CART:
        return <h1>Cart</h1>;
      default:
        return null;
    }
  };

  return (
    <DrawerContext.Provider
      value={{
        ...drawerState,
        hideDrawer,
        showDrawer,
      }}>
      <Drawer.Root open={drawerState.isOpen} onOpenChange={hideDrawer}>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner padding='2'>
            <Drawer.Content rounded='md'>
              <Drawer.Header>
                <Heading size='md'>Header</Heading>
              </Drawer.Header>
              <Drawer.Body>{renderDrawerContent()}</Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size='md' />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
      {children}
    </DrawerContext.Provider>
  );
};
