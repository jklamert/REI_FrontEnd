export const PHONE_BP = 640;
export const TABLET_BP = 1024;

const getCurrentBreakpoint = (width: number): string => {
  let BP = "";
  if (width <= PHONE_BP) {
    BP = "phone";
  }
  if (width > PHONE_BP && width <= TABLET_BP) {
    BP = "tablet";
  } else if (width > TABLET_BP) {
    BP = "desktop";
  }
  return BP;
};

export default function useBreakpoint(windowWidth: number): {
  isDesktop: boolean;
  isTablet: boolean;
  isPhone: boolean;
} {
  const BP = getCurrentBreakpoint(windowWidth);
  return {
    isDesktop: "desktop" === BP,
    isTablet: "tablet" === BP,
    isPhone: "phone" === BP,
  };
}
