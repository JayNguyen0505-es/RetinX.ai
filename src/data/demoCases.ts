import type { DrGrade, DrLabel } from "../types";

export interface CcemWeights {
  gradcam: number;
  adasise: number;
  sgig: number;
}

export interface DemoCase {
  id: string;
  sampleLabel: string;
  original: string;
  gradcam: string;
  adasise: string;
  sgig: string;
  ccem: string;
  grade: DrGrade;
  label: DrLabel;
  severityScore: number;
  ccemWeights: CcemWeights;
  focusRegion: string;
}

function paths(grade: number) {
  const base = `/assets/cases/grade${grade}`;
  return {
    original: `${base}-original.png`,
    gradcam: `${base}-gradcam.png`,
    adasise: `${base}-adasise.png`,
    sgig: `${base}-sgig.png`,
    ccem: `${base}-ccem.png`,
  };
}

export const DEMO_CASES: DemoCase[] = [
  {
    id: "grade0",
    sampleLabel: "Sample 1",
    ...paths(0),
    grade: 0,
    label: "No DR",
    severityScore: 0.22,
    ccemWeights: { gradcam: 31, adasise: 25, sgig: 44 },
    focusRegion:
      "No lesion-level activation. Attention spread diffusely across the posterior pole.",
  },
  {
    id: "grade1",
    sampleLabel: "Sample 2",
    ...paths(1),
    grade: 1,
    label: "Mild DR",
    severityScore: 1.18,
    ccemWeights: { gradcam: 24, adasise: 29, sgig: 47 },
    focusRegion: "Scattered microaneurysms in the superior-temporal quadrant.",
  },
  {
    id: "grade2",
    sampleLabel: "Sample 3",
    ...paths(2),
    grade: 2,
    label: "Moderate DR",
    severityScore: 2.24,
    ccemWeights: { gradcam: 27, adasise: 22, sgig: 51 },
    focusRegion:
      "Microaneurysms and dot-blot haemorrhages across the temporal arcades.",
  },
  {
    id: "grade3",
    sampleLabel: "Sample 4",
    ...paths(3),
    grade: 3,
    label: "Severe DR",
    severityScore: 3.12,
    ccemWeights: { gradcam: 33, adasise: 26, sgig: 41 },
    focusRegion:
      "Extensive haemorrhages in all four quadrants with venous beading superiorly.",
  },
  {
    id: "grade4",
    sampleLabel: "Sample 5",
    ...paths(4),
    grade: 4,
    label: "Proliferative DR",
    severityScore: 3.84,
    ccemWeights: { gradcam: 29, adasise: 31, sgig: 40 },
    focusRegion:
      "Neovascular activity at the disc with fibrovascular proliferation temporally.",
  },
];
