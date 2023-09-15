export function isWholeNum(value: number) {
  if (typeof value === "number") {
    const str = value + "";
    const strArr = Array.from(str);
    return strArr.indexOf(".") === -1;
  } else {
    return false;
  }
}
export function isPositive(value: number) {
  if (typeof value === "number") {
    return value > 0;
  } else {
    return false;
  }
}
export function isNegative(value: number) {
  if (typeof value === "number") {
    return value < 0;
  } else {
    return false;
  }
}
