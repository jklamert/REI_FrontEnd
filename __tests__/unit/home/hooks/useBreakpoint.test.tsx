import useBreakpoint from "#app/_hooks/useBreakpoint";

describe("useBreakpoint", () => {
  it("Returns phone is true on screens <= to 640px", () => {
    const { isDesktop, isPhone, isTablet } = useBreakpoint(640);
    expect(isPhone).toBeTruthy();
    expect(isDesktop).toBeFalsy();
    expect(isTablet).toBeFalsy();
  });
  it("Returns phone is true on screens < 640px", () => {
    const { isDesktop, isPhone, isTablet } = useBreakpoint(600);
    expect(isPhone).toBeTruthy();
    expect(isDesktop).toBeFalsy();
    expect(isTablet).toBeFalsy();
  });
  it("Returns tablet is true on screens > 640px and <= 1024px", () => {
    const { isDesktop, isPhone, isTablet } = useBreakpoint(1000);
    expect(isTablet).toBeTruthy();
    expect(isDesktop).toBeFalsy();
    expect(isPhone).toBeFalsy();
  });
  it("Returns tablet is true on screens > 640px and <= 1024px", () => {
    const { isDesktop, isPhone, isTablet } = useBreakpoint(1024);
    expect(isTablet).toBeTruthy();
    expect(isDesktop).toBeFalsy();
    expect(isPhone).toBeFalsy();
  });
  it("Returns desktop is true on screens > 1024px", () => {
    const { isDesktop, isPhone, isTablet } = useBreakpoint(1025);
    expect(isTablet).toBeFalsy();
    expect(isDesktop).toBeTruthy();
    expect(isPhone).toBeFalsy();
  });
});
