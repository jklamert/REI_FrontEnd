import {
  isNegative,
  isPositive,
  isValidZip,
  isWholeNum,
} from "#app/_utils/validators";

describe("isWholeNum", () => {
  it("isWholeNum valid for 6", () => {
    const input = 6;
    const result = isWholeNum(input);
    expect(result).toBeTruthy();
  });
  it("isWholeNum invalid for 6.6", () => {
    const input = 6.6;
    const result = isWholeNum(input);
    expect(result).toBeFalsy();
  });
  it("isWholeNum valid for 0", () => {
    const input = 0;
    const result = isWholeNum(input);
    expect(result).toBeTruthy();
  });
  it("isWholeNum valid for -1", () => {
    const input = -1;
    const result = isWholeNum(input);
    expect(result).toBeTruthy();
  });
  it("isWholeNum valid for -1.1", () => {
    const input = -1.1;
    const result = isWholeNum(input);
    expect(result).toBeFalsy();
  });
});

describe("isPositive", () => {
  it("isPositive valid for 6", () => {
    const input = 6;
    const result = isPositive(input);
    expect(result).toBeTruthy();
  });
  it("isPositive valid for 6.6", () => {
    const input = 6.6;
    const result = isPositive(input);
    expect(result).toBeTruthy();
  });
  it("isPositive invalid for 0", () => {
    const input = 0;
    const result = isPositive(input);
    expect(result).toBeFalsy();
  });
  it("isPositive invalid for -1", () => {
    const input = -1;
    const result = isPositive(input);
    expect(result).toBeFalsy();
  });
  it("isPositive invalid for -1.1", () => {
    const input = -1.1;
    const result = isPositive(input);
    expect(result).toBeFalsy();
  });
});

describe("isNegative", () => {
  it("isNegative invalid for 6", () => {
    const input = 6;
    const result = isNegative(input);
    expect(result).toBeFalsy();
  });
  it("isNegative invalid for 6.6", () => {
    const input = 6.6;
    const result = isNegative(input);
    expect(result).toBeFalsy();
  });
  it("isNegative invalid for 0", () => {
    const input = 0;
    const result = isNegative(input);
    expect(result).toBeFalsy();
  });
  it("isNegative valid for -1", () => {
    const input = -1;
    const result = isNegative(input);
    expect(result).toBeTruthy();
  });
  it("isNegative valid for -1.1", () => {
    const input = -1.1;
    const result = isNegative(input);
    expect(result).toBeTruthy();
  });
});

describe("isValidZip", () => {
  it("isValidZip invalid for empty string", () => {
    const input = "";
    const result = isValidZip(input);
    expect(result).toBeFalsy();
  });
  it("isValidZip invalid for 30", () => {
    const input = "30";
    const result = isValidZip(input);
    expect(result).toBeFalsy();
  });
  it("isValidZip invalid for 630107", () => {
    const input = "0";
    const result = isValidZip(input);
    expect(result).toBeFalsy();
  });
  it("isValidZip valid for 63010", () => {
    const input = "63010";
    const result = isValidZip(input);
    expect(result).toBeTruthy();
  });
});
