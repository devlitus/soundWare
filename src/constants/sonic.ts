import { Platform } from "react-native";

export const SonicColors = {
  primary: "#d0bcff",
  secondary: "#89ceff",
  background: "#131313",
  surface: "#131313",
  "surface-dim": "#131313",
  "surface-bright": "#393939",
  "surface-container-lowest": "#0e0e0e",
  "surface-container-low": "#1c1b1b",
  "surface-container": "#20201f",
  "surface-container-high": "#2a2a2a",
  "surface-container-highest": "#353535",
  "on-surface": "#e5e2e1",
  "on-surface-variant": "#cbc3d7",
  "on-background": "#e5e2e1",
  "inverse-surface": "#e5e2e1",
  "inverse-on-surface": "#313030",
  outline: "#958ea0",
  "outline-variant": "#494454",
  "surface-tint": "#d0bcff",
  "on-primary": "#3c0091",
  "primary-container": "#a078ff",
  "on-primary-container": "#340080",
  "inverse-primary": "#6d3bd7",
  tertiary: "#c8c6c5",
  "on-tertiary": "#313030",
  "tertiary-container": "#929090",
  "on-tertiary-container": "#2a2a29",
  error: "#ffb4ab",
  "on-error": "#690005",
  "error-container": "#93000a",
  "on-error-container": "#ffdad6",
} as const;

export const SonicTypography = {
  displayLg: {
    fontSize: 40,
    fontWeight: "800" as const,
    lineHeight: 48,
    letterSpacing: -0.02 * 40,
  },
  headlineLg: {
    fontSize: 32,
    fontWeight: "700" as const,
    lineHeight: 40,
    letterSpacing: -0.01 * 32,
  },
  headlineLgMobile: {
    fontSize: 28,
    fontWeight: "700" as const,
    lineHeight: 36,
  },
  titleMd: {
    fontSize: 20,
    fontWeight: "600" as const,
    lineHeight: 28,
  },
  bodyLg: {
    fontSize: 16,
    fontWeight: "400" as const,
    lineHeight: 24,
  },
  bodySm: {
    fontSize: 14,
    fontWeight: "400" as const,
    lineHeight: 20,
  },
  labelCaps: {
    fontSize: 12,
    fontWeight: "700" as const,
    lineHeight: 16,
    letterSpacing: 0.05 * 12,
  },
} as const;

export const SonicSpacing = {
  unit: 4,
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
  marginMobile: 20,
  marginDesktop: 40,
  gutter: 16,
  stackSm: 8,
  stackMd: 16,
  stackLg: 32,
} as const;

export const SonicRadius = {
  sm: 4,
  default: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const MiniPlayerHeight = 64;
export const BottomNavHeight = 80;
export const TopAppBarHeight = 64;

export const MiniPlayerInset =
  Platform.select({
    ios: MiniPlayerHeight,
    android: MiniPlayerHeight + 0,
  }) ?? MiniPlayerHeight;
