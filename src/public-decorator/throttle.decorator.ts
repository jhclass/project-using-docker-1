import { Reflector } from "@nestjs/core";

export const Throttle = Reflector.createDecorator<{
  count: number;
  unit: "minute"; //필요할 경우 "minute" | "hour"
}>();
