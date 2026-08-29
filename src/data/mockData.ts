import type { Analysis, Patient } from "../types";
import { storage } from "../utils/storage";

export const DEMO_ACCOUNT = {
  email: "doctor@retinx.demo",
  password: "password123",
  name: "Dr. Nguyen",
};

export const DEMO_RESULT = {
  drGrade: 2 as const,
  drLabel: "Moderate DR" as const,
  severityScore: 2.24,
  demoConfidence: 0.87,
};

const SEED_PATIENTS: Patient[] = [
  {
    id: "P-00128",
    name: "Nguyen A.",
    age: 58,
    sex: "Male",
    notes: "Type 2 diabetes, 11 years. Annual screening.",
    createdAt: "2026-08-25T09:10:00.000Z",
  },
  {
    id: "P-00127",
    name: "Tran M.",
    age: 64,
    sex: "Female",
    notes: "Referred from district clinic.",
    createdAt: "2026-08-25T08:05:00.000Z",
  },
  {
    id: "P-00126",
    name: "Le H.",
    age: 45,
    sex: "Male",
    notes: "First screening visit.",
    createdAt: "2026-08-24T14:30:00.000Z",
  },
];

const SEED_ANALYSES: Analysis[] = [
  {
    id: "A-1001",
    patientId: "P-00128",
    eye: "right",
    imageUrl: "/assets/demo-fundus.jpg",
    createdAt: "2026-08-25T09:20:00.000Z",
    drGrade: 2,
    drLabel: "Moderate DR",
    severityScore: 2.24,
    reviewStatus: "reviewed",
  },
  {
    id: "A-1002",
    patientId: "P-00127",
    eye: "left",
    imageUrl: "/assets/demo-fundus.jpg",
    createdAt: "2026-08-25T08:40:00.000Z",
    drGrade: 3,
    drLabel: "Severe DR",
    severityScore: 3.11,
    reviewStatus: "pending",
  },
  {
    id: "A-1003",
    patientId: "P-00126",
    eye: "right",
    imageUrl: "/assets/demo-fundus.jpg",
    createdAt: "2026-08-24T15:02:00.000Z",
    drGrade: 0,
    drLabel: "No DR",
    severityScore: 0.31,
    reviewStatus: "reviewed",
  },
];

export function seedIfNeeded(): void {
  if (storage.isSeeded()) return;
  storage.setPatients(SEED_PATIENTS);
  storage.setAnalyses(SEED_ANALYSES);
  storage.markSeeded();
}
