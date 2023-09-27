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
export function isValidZip(value: string) {
  let didPass = false;
  const validChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (value && value.length === 5) {
    for (let index = 0; index < value.length; index++) {
      const char = value[index] || "";
      if (validChars.indexOf(char) < 0) {
        didPass = false;
      }
    }
    didPass = true;
  }
  return didPass;
}
