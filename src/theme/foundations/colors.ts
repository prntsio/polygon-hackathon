import { Colors } from "@chakra-ui/react"


export const colors: Colors = {
  text: {
    black: "#000000",
    white: "#FFFFFF",

    gray: "hsl(227, 15%, 65%)",
    invGray: "hsl(227, 20%, 65%)",

    lightgray: "hsl(227, 15%, 85%)",
    invLightgray: "hsl(227, 20%, 45%)",

    title: "#006D6D",
    invTitle: "#070726",
  },

  background: {
    white: "#FFFFFF",
    black: "hsl(227, 100%, 13%)",

    gray: "#ECEDF0",
    invGray: "",

    main: "#202225",
    
    transparent: "#000000AA",
    blue: {
      start: "#04002F",
      end: "#5400A8",
    }
  },

  green: {
    main: "#03C5B9",
    light: "#03C58922",
  },
  blue: {
    main: "#1A48E4",
    light: "#1A48E422",
  },
  red: {
    main: "#F7592A",
    light: "#F7592A22",
  },
  yellow: {
    main: "#FEBF12",
    light: "#FEBF1222",
  },
  pink: {
    main: "#FF89B9",
    light: "#FF89B922",
  },

  choice: {
    0: "#000E40",
    1: "#000E40",
    2: "#000E40",
    3: "#000E40"
  },
  star: {
    on: "#FEBF12",  // yellow.main
    off: "transparent",
  }
}
