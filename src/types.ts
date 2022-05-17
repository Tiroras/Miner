export type CellType = {
  id: number;
  haveBomb: boolean;
  bombsAround: number;
  wasChecked: boolean
  haveFlag: boolean;
  x: number;
  y: number;
}