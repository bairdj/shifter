export function required(input) {
  if (input == null) {
    return false;
  } else if (input.length === 0) {
    return false;
  }
  return true;
}

export function timePattern(input) {
  const pattern = /^[0-9]{2}:[0-9]{2}$/
  return pattern.test(input);
}

export function aboveZero(input) {
  const parsed = parseFloat(input);
  if (isNaN(parsed)) return false;
  return parsed >= 0;
}
