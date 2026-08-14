export const REGIONS = ["臺北", "新北", "桃園", "新竹", "宜蘭", "其他"];

const EN = {
  臺北: "Taipei",
  新北: "New Taipei",
  桃園: "Taoyuan",
  新竹: "Hsinchu",
  宜蘭: "Yilan",
  其他: "Elsewhere",
};

export const regionLabel = (region, lang) => (lang === "en" ? EN[region] ?? region : region);
