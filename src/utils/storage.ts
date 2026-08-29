import type { Analysis, Patient, User } from "../types";

const KEYS = {
  user: "RetinX.user",
  patients: "RetinX.patients",
  analyses: "RetinX.analyses",
  seeded: "RetinX.seeded",
};

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function readSession<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeSession<T>(key: string, value: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

export const storage = {
  getUser: () => readSession<User | null>(KEYS.user, null),
  setUser: (user: User | null) => writeSession(KEYS.user, user),
  clearUser: () => sessionStorage.removeItem(KEYS.user),

  getPatients: () => read<Patient[]>(KEYS.patients, []),
  setPatients: (patients: Patient[]) => write(KEYS.patients, patients),
  addPatient: (patient: Patient) => {
    const all = read<Patient[]>(KEYS.patients, []);
    write(KEYS.patients, [patient, ...all]);
  },
  getPatient: (id: string) =>
    read<Patient[]>(KEYS.patients, []).find((p) => p.id === id) ?? null,

  getAnalyses: () => read<Analysis[]>(KEYS.analyses, []),
  setAnalyses: (analyses: Analysis[]) => write(KEYS.analyses, analyses),
  addAnalysis: (analysis: Analysis) => {
    const all = read<Analysis[]>(KEYS.analyses, []);
    write(KEYS.analyses, [analysis, ...all]);
  },
  getAnalysis: (id: string) =>
    read<Analysis[]>(KEYS.analyses, []).find((a) => a.id === id) ?? null,
  getAnalysesForPatient: (patientId: string) =>
    read<Analysis[]>(KEYS.analyses, []).filter(
      (a) => a.patientId === patientId
    ),

  isSeeded: () => read<boolean>(KEYS.seeded, false),
  markSeeded: () => write(KEYS.seeded, true),
};

export function nextPatientId(): string {
  const patients = storage.getPatients();
  const numbers = patients
    .map((p) => parseInt(p.id.replace("P-", ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = numbers.length ? Math.max(...numbers) + 1 : 129;
  return `P-${String(next).padStart(5, "0")}`;
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}
