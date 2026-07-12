export interface TableSeat {
  id: string;
  x: number;
  y: number;
  seats: number;
  shape: "round" | "square";
  reserved: boolean;
}

export const TABLES: TableSeat[] = [
  { id: "A1", x: 14, y: 20, seats: 2, shape: "round", reserved: false },
  { id: "A2", x: 32, y: 18, seats: 2, shape: "round", reserved: true },
  { id: "A3", x: 50, y: 20, seats: 4, shape: "square", reserved: false },
  { id: "A4", x: 70, y: 18, seats: 4, shape: "square", reserved: false },
  { id: "A5", x: 88, y: 22, seats: 2, shape: "round", reserved: true },
  { id: "B1", x: 20, y: 48, seats: 4, shape: "square", reserved: false },
  { id: "B2", x: 44, y: 50, seats: 6, shape: "square", reserved: false },
  { id: "B3", x: 68, y: 48, seats: 4, shape: "square", reserved: true },
  { id: "B4", x: 86, y: 52, seats: 2, shape: "round", reserved: false },
  { id: "C1", x: 16, y: 78, seats: 2, shape: "round", reserved: false },
  { id: "C2", x: 36, y: 80, seats: 4, shape: "square", reserved: false },
  { id: "C3", x: 58, y: 78, seats: 2, shape: "round", reserved: false },
  { id: "C4", x: 80, y: 80, seats: 6, shape: "square", reserved: true },
];

export const TIME_SLOTS = [
  "8:00 AM",
  "9:30 AM",
  "11:00 AM",
  "12:30 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
  "6:30 PM",
];
