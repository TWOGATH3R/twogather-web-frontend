const mobileFontSizes = {
  small: "6px",
  base: "8px",
  lg: "10px",
  xl: "12px",
  xxl: "14px",
  xxxl: "16px",
  xxxxl: "18px",
};

const fontSizes = {
  small: "14px",
  base: "16px",
  lg: "18px",
  xl: "20px",
  xxl: "22px",
  xxxl: "24px",
  name: "30px",
  subTitleSize: "40px",
  titleSize: "50px",
};

const paddings = {
  small: "8px",
  base: "10px",
  lg: "12px",
  xl: "14px",
  xxl: "16px",
  xxxl: "18px",
};

const margins = {
  small: "8px",
  base: "10px",
  lg: "12px",
  xl: "14px",
  xxl: "16px",
  xxxl: "18px",
};

const deviceSizes = {
  mobile: "600px",
  tablet: "900px",
  laptop: "1200px",
  desktop: "1800px",
};

const colors = {
  black: "#000000",
  white: "#ffffff",
  gray_1: "#222222",
  gray_2: "#767676",
  green_1: "#3cb46e",
  mainBackgroundColor: "#0E0909",
  subColor1: "#e5e5e5",
  subColor2: "#2663FF",
  subColor3: "#ff4f4f",
  yellow: "#FFB800",
};

const theme = {
  fontSizes,
  colors,
  mobile: `(max-width: ${deviceSizes.mobile})`,
  tablet: `(max-width: ${deviceSizes.tablet})`,
  laptop: `(max-width: ${deviceSizes.laptop})`,
  desktop: `(min-width: ${deviceSizes.desktop})`,
  paddings,
  margins,
  mobileFontSizes,
};

export default theme;
