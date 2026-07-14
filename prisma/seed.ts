import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const medications = [
  { ndc11: "00002321401", brandName: "Humalog", genericName: "Insulin Lispro", dosageForm: "Injection", strength: "100 units/mL", estimatedAmp: 312.84, estimatedUra: 218.99 },
  { ndc11: "00002771563", brandName: "Trulicity", genericName: "Dulaglutide", dosageForm: "Injection", strength: "1.5 mg/0.5 mL", estimatedAmp: 891.22, estimatedUra: 623.85 },
  { ndc11: "00006002754", brandName: "Januvia", genericName: "Sitagliptin", dosageForm: "Tablet", strength: "100 mg", estimatedAmp: 489.30, estimatedUra: 342.51 },
  { ndc11: "00310027160", brandName: "Farxiga", genericName: "Dapagliflozin", dosageForm: "Tablet", strength: "10 mg", estimatedAmp: 521.75, estimatedUra: 365.23 },
  { ndc11: "00003089421", brandName: "Eliquis", genericName: "Apixaban", dosageForm: "Tablet", strength: "5 mg", estimatedAmp: 598.40, estimatedUra: 418.88 },
  { ndc11: "00071015423", brandName: "Lipitor", genericName: "Atorvastatin", dosageForm: "Tablet", strength: "40 mg", estimatedAmp: 189.60, estimatedUra: 132.72 },
  { ndc11: "59148006106", brandName: "Xarelto", genericName: "Rivaroxaban", dosageForm: "Tablet", strength: "20 mg", estimatedAmp: 612.90, estimatedUra: 429.03 },
  { ndc11: "00085126601", brandName: "Invokana", genericName: "Canagliflozin", dosageForm: "Tablet", strength: "300 mg", estimatedAmp: 534.10, estimatedUra: 373.87 },
  { ndc11: "00456458030", brandName: "Brilinta", genericName: "Ticagrelor", dosageForm: "Tablet", strength: "90 mg", estimatedAmp: 445.20, estimatedUra: 311.64 },
  { ndc11: "00074262602", brandName: "Humira", genericName: "Adalimumab", dosageForm: "Injection", strength: "40 mg/0.8 mL", estimatedAmp: 6812.00, estimatedUra: 4768.40 },
];

const coveredEntities = [
  { id340b: "DSH230001TX", entityName: "Harris Health System – Ben Taub Hospital", entityType: "DSH", city: "Houston", state: "TX", zipCode: "77030" },
  { id340b: "CHC230012TX", entityName: "Legacy Community Health – Bellaire Clinic", entityType: "FQHC", city: "Bellaire", state: "TX", zipCode: "77401" },
  { id340b: "CHC230015TX", entityName: "Avenue 360 Health & Wellness", entityType: "FQHC", city: "Houston", state: "TX", zipCode: "77006" },
  { id340b: "PED230003TX", entityName: "Texas Children's Hospital", entityType: "PED", city: "Houston", state: "TX", zipCode: "77030" },
  { id340b: "RRC230008TX", entityName: "Baylor St. Luke's Medical Center", entityType: "DSH", city: "Houston", state: "TX", zipCode: "77030" },
  { id340b: "CHC230020TX", entityName: "Lone Star Circle of Care – Bellaire", entityType: "FQHC", city: "Bellaire", state: "TX", zipCode: "77401" },
];

const contractPharmacies = [
  { npi: "1234567890", pharmacyName: "CVS Pharmacy #8821", address: "5015 Bellaire Blvd", city: "Bellaire", state: "TX", zipCode: "77401", isIndependent: false },
  { npi: "1345678901", pharmacyName: "Walgreens #12453", address: "6100 S Rice Ave", city: "Bellaire", state: "TX", zipCode: "77401", isIndependent: false },
  { npi: "1456789012", pharmacyName: "H-E-B Pharmacy #456", address: "4800 Beechnut St", city: "Houston", state: "TX", zipCode: "77096", isIndependent: false },
  { npi: "1567890123", pharmacyName: "Bellaire Discount Pharmacy", address: "407 S Loop W", city: "Bellaire", state: "TX", zipCode: "77401", isIndependent: true },
  { npi: "1678901234", pharmacyName: "Rice Village Pharmacy", address: "2512 Robinhood St", city: "Houston", state: "TX", zipCode: "77005", isIndependent: true },
  { npi: "1789012345", pharmacyName: "Walmart Pharmacy #2341", address: "9669 S Main St", city: "Houston", state: "TX", zipCode: "77025", isIndependent: false },
];

const hrsaContracts = [
  { contractId: 1, entityId: "CHC230012TX", pharmacyNpi: "1234567890", registrationDate: "2019-03-01", terminationDate: null },
  { contractId: 2, entityId: "CHC230012TX", pharmacyNpi: "1345678901", registrationDate: "2020-07-15", terminationDate: null },
  { contractId: 3, entityId: "CHC230012TX", pharmacyNpi: "1567890123", registrationDate: "2021-01-10", terminationDate: null },
  { contractId: 4, entityId: "DSH230001TX", pharmacyNpi: "1234567890", registrationDate: "2018-06-01", terminationDate: null },
  { contractId: 5, entityId: "DSH230001TX", pharmacyNpi: "1456789012", registrationDate: "2018-06-01", terminationDate: null },
  { contractId: 6, entityId: "DSH230001TX", pharmacyNpi: "1789012345", registrationDate: "2019-09-20", terminationDate: null },
  { contractId: 7, entityId: "CHC230015TX", pharmacyNpi: "1678901234", registrationDate: "2020-02-14", terminationDate: null },
  { contractId: 8, entityId: "CHC230015TX", pharmacyNpi: "1234567890", registrationDate: "2020-02-14", terminationDate: null },
  { contractId: 9, entityId: "PED230003TX", pharmacyNpi: "1456789012", registrationDate: "2017-11-01", terminationDate: null },
  { contractId: 10, entityId: "RRC230008TX", pharmacyNpi: "1234567890", registrationDate: "2016-04-05", terminationDate: "2023-12-31" },
  { contractId: 11, entityId: "CHC230020TX", pharmacyNpi: "1567890123", registrationDate: "2022-05-01", terminationDate: null },
  { contractId: 12, entityId: "CHC230020TX", pharmacyNpi: "1345678901", registrationDate: "2022-05-01", terminationDate: null },
];

const manufacturerRestrictions = [
  { restrictionId: 1, manufacturerName: "AbbVie", affectedNdcPrefix: "00074", restrictionType: "Contract Pharmacy Data Submission Required", policyDetails: "AbbVie requires covered entities to use its 340B ESP platform for all contract pharmacy claims involving products with NDC prefix 00074. Claims not submitted through ESP will not receive 340B pricing.", lastChecked: "2025-01-15" },
  { restrictionId: 2, manufacturerName: "Eli Lilly", affectedNdcPrefix: "00002", restrictionType: "Limited Contract Pharmacy Participation", policyDetails: "Lilly limits 340B contract pharmacy arrangements to one designated contract pharmacy per covered entity site, with exceptions for covered entities without an in-house pharmacy.", lastChecked: "2025-01-15" },
  { restrictionId: 3, manufacturerName: "AstraZeneca", affectedNdcPrefix: "00310", restrictionType: "Contract Pharmacy Data Submission Required", policyDetails: "AstraZeneca requires use of its 340B Solution Center portal. Entities must register and ensure TPA integration for all participating contract pharmacies.", lastChecked: "2025-01-15" },
  { restrictionId: 4, manufacturerName: "Sanofi", affectedNdcPrefix: "00088", restrictionType: "Contract Pharmacy Data Submission Required", policyDetails: "Sanofi restricts 340B pricing at contract pharmacies not submitting claims data through the Sanofi 340B portal.", lastChecked: "2025-01-15" },
  { restrictionId: 5, manufacturerName: "Boehringer Ingelheim", affectedNdcPrefix: "00597", restrictionType: "Single Pharmacy Designation", policyDetails: "BI limits each covered entity to one contract pharmacy unless the entity has no in-house pharmacy.", lastChecked: "2025-01-15" },
];

async function main() {
  await prisma.hrsaContract.deleteMany();
  await prisma.manufacturerRestriction.deleteMany();
  await prisma.medication.deleteMany();
  await prisma.contractPharmacy.deleteMany();
  await prisma.coveredEntity.deleteMany();

  await prisma.medication.createMany({ data: medications });
  await prisma.coveredEntity.createMany({ data: coveredEntities });
  await prisma.contractPharmacy.createMany({ data: contractPharmacies });
  await prisma.manufacturerRestriction.createMany({ data: manufacturerRestrictions });
  await prisma.hrsaContract.createMany({
    data: hrsaContracts.map((c) => ({
      ...c,
      registrationDate: new Date(c.registrationDate),
      terminationDate: c.terminationDate ? new Date(c.terminationDate) : null,
    })),
  });

  console.log("Seeded 340B dataset.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
