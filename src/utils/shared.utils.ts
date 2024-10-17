import { randomInt } from "crypto";
export function generateRandomFourDigitNumber(): number {
  return randomInt(1000, 10000);
}
