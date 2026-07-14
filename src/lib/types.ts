import type { Pricing } from "./pricing";

export interface Restriction {
  restrictionId: number;
  manufacturerName: string;
  affectedNdcPrefix: string;
  restrictionType: string;
  policyDetails: string;
  lastChecked: string;
}

export interface Medication {
  ndc11: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  estimatedAmp: number;
  estimatedUra: number | null;
  pricing: Pricing;
  restrictions: Restriction[];
}

export interface Pharmacy {
  npi: string;
  pharmacyName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isIndependent: boolean;
}

export interface Contract {
  contractId: number;
  registrationDate: string;
  pharmacy: Pharmacy;
}

export interface Entity {
  id340b: string;
  entityName: string;
  entityType: string;
  city: string;
  state: string;
  zipCode: string;
  activeContractCount: number;
}

export interface EntityDetail extends Entity {
  contracts: Contract[];
}
