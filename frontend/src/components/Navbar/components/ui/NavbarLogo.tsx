import { chakra, Heading } from "@chakra-ui/react";

export const NavbarLogoContainer = chakra("div", {
  base: {
    display: "flex",
    alignItems: "center",
  },
});

export const NavbarLogoText = chakra(Heading, {
  base: {
    fontSize: 28,
    fontFamily: "primaryLogo",
    color: "textPrimary",
  },
});

export const NavbarLogoSecondaryText = chakra("span", {
  base: {
    fontFamily: "secondaryLogo",
    color: "primary",
  },
});
