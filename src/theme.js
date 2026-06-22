// MUI 风格主题配置
export const theme = {
  colors: {
    primary: "#FF6B35",
    primaryLight: "#FF8A65",
    primaryDark: "#E65100",
    secondary: "#2E7D32",
    secondaryLight: "#4CAF50",
    error: "#D32F2F",
    warning: "#F57C00",
    info: "#1976D2",
    bg: "#FAFAFA",
    bgPaper: "#FFFFFF",
    bgGrey: "#F5F5F5",
    textPrimary: "#212121",
    textSecondary: "#757575",
    textDisabled: "#BDBDBD",
    textHint: "#9E9E9E",
    divider: "#E0E0E0",
    border: "#E0E0E0",
    tabBarBg: "#FFFFFF",
    tabActive: "#FF6B35",
    tabInactive: "#9E9E9E",
  },

  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
    },
  },

  shape: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
};

export const mealConfig = {
  breakfast: {
    label: "早餐",
    icon: "sunrise",
    color: "#FF9800",
    bgColor: "#FFF3E0",
    time: "06:00-09:00",
  },
  morning_snack: {
    label: "早加餐",
    icon: "cafe",
    color: "#8D6E63",
    bgColor: "#EFEBE9",
    time: "09:00-11:00",
  },
  lunch: {
    label: "午餐",
    icon: "sunny",
    color: "#FF6B35",
    bgColor: "#FBE9E7",
    time: "11:00-13:00",
  },
  afternoon_snack: {
    label: "午加餐",
    icon: "cafe",
    color: "#8D6E63",
    bgColor: "#EFEBE9",
    time: "15:00-17:00",
  },
  dinner: {
    label: "晚餐",
    icon: "moon",
    color: "#5C6BC0",
    bgColor: "#E8EAF6",
    time: "17:00-20:00",
  },
  supper: {
    label: "宵夜",
    icon: "weather-night",
    color: "#7B1FA2",
    bgColor: "#F3E5F5",
    time: "20:00-23:00",
  },
};
