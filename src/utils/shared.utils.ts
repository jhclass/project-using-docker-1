import { randomInt } from "crypto";
export function generateRandomFourDigitNumber(): number {
  return randomInt(1000, 10000);
}
//existingId
export function validateIdExists(
  id: any,
  errorMessage: string = `id 가 존재하지 않습니다.`,
) {
  if (!id) {
    throw new Error(errorMessage);
  }
}
