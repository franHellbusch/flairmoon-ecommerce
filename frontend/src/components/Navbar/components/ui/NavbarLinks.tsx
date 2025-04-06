import { Link as RouterLink } from "react-router-dom";
import { Button, chakra, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface NavLinkRouterProps extends ButtonProps {
  to: string;
  children: ReactNode;
}

const baseNavbarLinkStyles = {
  _hover: { bg: "bgPrimary" },
  fontWeight: 400,
  fontSize: 16,
  outline: 0,
  color: "textPrimary",
};

export const NavbarLink = chakra(Button, {
  base: baseNavbarLinkStyles,
});

export const NavLinkRouter: React.FC<NavLinkRouterProps> = ({ to, children, ...rest }) => {
  return (
    <RouterLink to={to} style={{ textDecoration: "none" }}>
      <NavbarLink {...rest}>{children}</NavbarLink>
    </RouterLink>
  );
};
