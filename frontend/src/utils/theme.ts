import { createSystem, defaultConfig, defineConfig, mergeConfigs } from "@chakra-ui/react";

const config = mergeConfigs(
  defaultConfig,
  defineConfig({
    theme: {
      semanticTokens: {
        colors: {
          primary: { value: "#7f1f0e" },
          primaryDark: { value: "#3d0a05" },
          secondary: { value: "#a58570" },
          secondaryLight: { value: "#dac1b1" },
          tertiary: { value: "#ac746c" },
          bgPrimary: { value: "#f7f0ed" },
          bgSecondary: { value: "#e8e2dc" },
          bgTertiary: { value: "#f4e8dd" },
          textPrimary: { value: "#333333" },
          textSecondary: { value: "#666666" },
        },
        fonts: {
          primaryLogo: { value: `"Srisakdi", system-ui` },
          secondaryLogo: { value: `"Domine", serif` },
          body: { value: `"Nunito", sans-serif` },
        },
      },
    },
  })
);

export const system = createSystem(config);
