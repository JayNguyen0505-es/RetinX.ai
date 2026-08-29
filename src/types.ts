export interface User {
    id: string;
    name: string;
    email: string;
    verified: boolean;
  }
  
  export interface Patient {
    id: string;
    name: string;
    age?: number;
    sex?: string;
    notes?: string;
    createdAt: string;
  }
  
  export type DrGrade = 0 | 1 | 2 | 3 | 4;
  
  export type DrLabel =
    | "No DR"
    | "Mild DR"
    | "Moderate DR"
    | "Severe DR"
    | "Proliferative DR";
  
  export interface Analysis {
    id: string;
    patientId: string;
    eye: "left" | "right";
    imageUrl: string;
    createdAt: string;
    drGrade: DrGrade;
    drLabel: DrLabel;
    severityScore: number;
    reviewStatus: "pending" | "reviewed";
  }
  
  export const DR_LABELS: DrLabel[] = [
    "No DR",
    "Mild DR",
    "Moderate DR",
    "Severe DR",
    "Proliferative DR"
  ];