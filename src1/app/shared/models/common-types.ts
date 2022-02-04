export type Script =
  | "bootstrap"
  | "carousel"
  | "echo"
  | "wow"
  | "jquery"
  | "electro"
  | "tether"
  | "default";

export interface FieldType {
  FieldID?: number;
  FieldDesc?: string;
}
