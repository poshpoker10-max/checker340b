import { prisma } from "./prisma";
import { computePricing } from "./pricing";
import type { Medication, Entity, EntityDetail, Restriction } from "./types";

type MedRow = {
  ndc11: string;
  brandName: string;
  genericName: string;
  dosageForm: string;
  strength: string;
  estimatedAmp: unknown;
  estimatedUra: unknown;
};

function toRestriction(r: {
  restrictionId: number;
  manufacturerName: string;
  affectedNdcPrefix: string;
  restrictionType: string;
  policyDetails: string;
  lastChecked: string;
}): Restriction {
  return {
    restrictionId: r.restrictionId,
    manufacturerName: r.manufacturerName,
    affectedNdcPrefix: r.affectedNdcPrefix,
    restrictionType: r.restrictionType,
    policyDetails: r.policyDetails,
    lastChecked: r.lastChecked,
  };
}

async function decorateMedications(rows: MedRow[]): Promise<Medication[]> {
  const restrictions = await prisma.manufacturerRestriction.findMany();
  return rows.map((m) => {
    const amp = Number(m.estimatedAmp);
    const ura = m.estimatedUra === null ? null : Number(m.estimatedUra);
    const prefix = m.ndc11.substring(0, 5);
    return {
      ndc11: m.ndc11,
      brandName: m.brandName,
      genericName: m.genericName,
      dosageForm: m.dosageForm,
      strength: m.strength,
      estimatedAmp: amp,
      estimatedUra: ura,
      pricing: computePricing(amp, ura),
      restrictions: restrictions
        .filter((r) => r.affectedNdcPrefix === prefix)
        .map(toRestriction),
    };
  });
}

export async function searchMedications(query: string): Promise<Medication[]> {
  const q = query.trim();
  const rows = await prisma.medication.findMany({
    where: q
      ? {
          OR: [
            { brandName: { contains: q, mode: "insensitive" } },
            { genericName: { contains: q, mode: "insensitive" } },
            { ndc11: { contains: q } },
          ],
        }
      : undefined,
    orderBy: { brandName: "asc" },
  });
  return decorateMedications(rows);
}

export async function getMedication(ndc: string): Promise<Medication | null> {
  const row = await prisma.medication.findUnique({ where: { ndc11: ndc } });
  if (!row) return null;
  const [med] = await decorateMedications([row]);
  return med;
}

export async function searchEntities(query: string): Promise<Entity[]> {
  const q = query.trim();
  const rows = await prisma.coveredEntity.findMany({
    where: q
      ? {
          OR: [
            { entityName: { contains: q, mode: "insensitive" } },
            { id340b: { contains: q, mode: "insensitive" } },
            { city: { contains: q, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { entityName: "asc" },
    include: {
      _count: {
        select: { contracts: { where: { terminationDate: null } } },
      },
    },
  });
  return rows.map((e) => ({
    id340b: e.id340b,
    entityName: e.entityName,
    entityType: e.entityType,
    city: e.city,
    state: e.state,
    zipCode: e.zipCode,
    activeContractCount: e._count.contracts,
  }));
}

export async function getEntity(id: string): Promise<EntityDetail | null> {
  const e = await prisma.coveredEntity.findUnique({
    where: { id340b: id },
    include: {
      contracts: {
        where: { terminationDate: null },
        include: { pharmacy: true },
        orderBy: { registrationDate: "asc" },
      },
    },
  });
  if (!e) return null;
  return {
    id340b: e.id340b,
    entityName: e.entityName,
    entityType: e.entityType,
    city: e.city,
    state: e.state,
    zipCode: e.zipCode,
    activeContractCount: e.contracts.length,
    contracts: e.contracts.map((c) => ({
      contractId: c.contractId,
      registrationDate: c.registrationDate.toISOString().slice(0, 10),
      pharmacy: {
        npi: c.pharmacy.npi,
        pharmacyName: c.pharmacy.pharmacyName,
        address: c.pharmacy.address,
        city: c.pharmacy.city,
        state: c.pharmacy.state,
        zipCode: c.pharmacy.zipCode,
        isIndependent: c.pharmacy.isIndependent,
      },
    })),
  };
}

export async function getRestrictions(): Promise<Restriction[]> {
  const rows = await prisma.manufacturerRestriction.findMany({
    orderBy: { restrictionId: "asc" },
  });
  return rows.map(toRestriction);
}
