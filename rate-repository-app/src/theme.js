import { Platform } from "react-native"

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#ffffff",
    primary: "#0366d6",
    neutral50: "#e1e4e8",
    shades0: "white",
    appBarBackground: "#24292e",
    error: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fontFamily: {
    main: Platform.select({
      ios: "Arial",
      android: "Roboto",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
}

export default theme
