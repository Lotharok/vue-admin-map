import type LayoutConfigTypes from "./types";

const config: LayoutConfigTypes = {
  general: {
    mode: "system",
    iconsType: "duotone",
  },
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "media/logos/default-dark.svg",
      light: "media/logos/default.svg",
    },
  },
  illustrations: {
    set: "sketchy-1",
  },
  scrollTop: {
    display: false,
  },
  header: {
    display: true,
    menuIcon: "keenthemes",
    width: "fixed",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  toolbar: {
    display: true,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  pageTitle: {
    display: true,
    breadcrumb: true,
    direction: "column",
  },
  aside: {
    display: false,
    theme: "dark",
    fixed: true,
    menuIcon: "keenthemes",
    minimized: false,
    minimize: true,
    hoverable: true,
  },
  sidebar: {
    display: false,
  },
  content: {
    width: "fluid",
  },
  footer: {
    width: "fixed",
  },
};

export default config;
