"use client";

import { useEffect, useState } from "react";
import type { Medication, Entity, EntityDetail, Restriction } from "@/lib/types";
import { TOKEN, Badge, Alert, entityTypeMap, formatNdc } from "@/components/ui";
import {
  MedicationPricingPanel,
  ContractPharmacyPanel,
} from "@/components/panels";

const TABS = ["medication", "entity", "about"] as const;
type Tab = (typeof TABS)[number];
const TAB_LABELS: Record<Tab, string> = {
  medication: "Medication Lookup",
  entity: "Entity & Pharmacies",
  about: "About 340B",
};

const ABOUT_ITEMS = [
  {
    title: "What is 340B?",
    body: "The 340B Drug Pricing Program requires pharmaceutical manufacturers participating in Medicaid to sell outpatient drugs at significantly reduced prices to eligible health care organizations (covered entities). It was created by Congress in 1992 as part of the Veterans Health Care Act.",
  },
  {
    title: "Who are Covered Entities?",
    body: "Covered entities include federally qualified health centers (FQHCs), disproportionate share hospitals (DSH), Ryan White HIV/AIDS clinics, children's hospitals, and other safety-net providers. They must register with HRSA and maintain compliance with program rules.",
  },
  {
    title: "Contract Pharmacies",
    body: "Since 1996, HRSA guidance has allowed covered entities to contract with outside pharmacies to dispense 340B drugs. These arrangements must be registered in the HRSA database. Multiple contract pharmacy locations are permitted per covered entity, subject to manufacturer restrictions.",
  },
  {
    title: "Manufacturer Restrictions (Post-2020)",
    body: "Starting in 2020, several manufacturers — including AbbVie, Eli Lilly, AstraZeneca, Boehringer Ingelheim, and Sanofi — began placing restrictions on 340B pricing at contract pharmacies. Some require data submission through proprietary portals; others limit each entity to one contract pharmacy. Litigation is ongoing.",
  },
  {
    title: "How 340B Ceiling Price is Calculated",
    body: "The 340B ceiling price = Average Manufacturer Price (AMP) − Unit Rebate Amount (URA). The URA is the greater of: (a) AMP × 23.1% (brand) or AMP × 13% (generic), or (b) AMP − Best Price. Prices are updated quarterly by CMS and provided to HRSA for the OPAIS system.",
  },
];

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>("medication");
  const [medQuery, setMedQuery] = useState("");
  const [entityQuery, setEntityQuery] = useState("");
  const [medResults, setMedResults] = useState<Medication[]>([]);
  const [entityResults, setEntityResults] = useState<Entity[]>([]);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [selectedMed, setSelectedMed] = useState<Medication | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<EntityDetail | null>(null);

  // Medications: fetch (debounced) whenever the query changes.
  useEffect(() => {
    const handle = setTimeout(() => {
      fetchJson<{ medications: Medication[] }>(
        `/api/medications?q=${encodeURIComponent(medQuery)}`
      )
        .then((d) => setMedResults(d.medications))
        .catch(() => setMedResults([]));
    }, 150);
    return () => clearTimeout(handle);
  }, [medQuery]);

  // Entities: fetch (debounced) whenever the query changes.
  useEffect(() => {
    const handle = setTimeout(() => {
      fetchJson<{ entities: Entity[] }>(
        `/api/entities?q=${encodeURIComponent(entityQuery)}`
      )
        .then((d) => setEntityResults(d.entities))
        .catch(() => setEntityResults([]));
    }, 150);
    return () => clearTimeout(handle);
  }, [entityQuery]);

  // Restrictions for the About tab: fetch once.
  useEffect(() => {
    fetchJson<{ restrictions: Restriction[] }>("/api/restrictions")
      .then((d) => setRestrictions(d.restrictions))
      .catch(() => setRestrictions([]));
  }, []);

  async function openEntity(id: string) {
    try {
      const d = await fetchJson<{ entity: EntityDetail }>(
        `/api/entities/${encodeURIComponent(id)}`
      );
      setSelectedEntity(d.entity);
    } catch {
      setSelectedEntity(null);
    }
  }

  const hasMedQuery = medQuery.trim().length > 0;
  const hasEntityQuery = entityQuery.trim().length > 0;

  return (
    <div className="min-h-screen" style={{ background: "#F0F4F8" }}>
      <header style={{ background: TOKEN.navy }} className="sticky top-0 z-30 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-black text-xs"
                style={{ background: TOKEN.teal }}
              >
                340B
              </div>
              <div>
                <div className="text-white font-bold text-sm leading-none">340B Checker</div>
                <div className="text-blue-300 text-xs">
                  Contract Pharmacy &amp; Pricing Estimator
                </div>
              </div>
            </div>
            <div className="text-blue-300 text-xs hidden sm:block">
              Bellaire / Houston, TX · MVP
            </div>
          </div>

          <div className="flex gap-0 -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedMed(null);
                  setSelectedEntity(null);
                }}
                className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-teal-400 text-teal-300"
                    : "border-transparent text-blue-300 hover:text-white"
                }`}
              >
                {TAB_LABELS[tab]}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {activeTab === "medication" &&
          (!selectedMed ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Medication Lookup</h1>
                <p className="text-slate-500 text-sm mt-1">
                  Search by brand name, generic name, or NDC to check 340B ceiling pricing and
                  manufacturer restrictions.
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={medQuery}
                  onChange={(e) => setMedQuery(e.target.value)}
                  placeholder="Search medications — e.g. Humira, insulin, atorvastatin…"
                  className="w-full bg-white border border-slate-300 rounded-xl px-5 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {medQuery && (
                  <button
                    onClick={() => setMedQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-lg"
                  >
                    ×
                  </button>
                )}
              </div>

              {hasMedQuery && medResults.length === 0 && (
                <Alert type="info">
                  No medications found for <strong>&quot;{medQuery}&quot;</strong>. Try a
                  different brand name, generic name, or partial NDC.
                </Alert>
              )}

              {hasMedQuery && medResults.length > 0 && (
                <div className="space-y-2">
                  {medResults.map((med) => (
                    <button
                      key={med.ndc11}
                      onClick={() => setSelectedMed(med)}
                      className="w-full text-left bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-teal-400 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900">{med.brandName}</span>
                            <span className="text-slate-500 text-sm">
                              ({med.genericName})
                            </span>
                            {med.restrictions.length > 0 && (
                              <Badge type="warning">Restricted</Badge>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 mt-1 font-mono">
                            NDC {formatNdc(med.ndc11)} · {med.strength} · {med.dosageForm}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-emerald-700 font-bold font-mono text-lg">
                            ${med.pricing.ceiling}
                          </div>
                          <div className="text-xs text-slate-400">340B ceiling</div>
                          <div className="text-xs text-emerald-600 font-semibold mt-0.5">
                            Save {med.pricing.pct}%
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {!hasMedQuery && (
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="text-xs font-bold tracking-widest uppercase text-slate-400 mb-3">
                    All Medications in Dataset
                  </div>
                  <div className="space-y-2">
                    {medResults.map((med) => (
                      <button
                        key={med.ndc11}
                        onClick={() => setSelectedMed(med)}
                        className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg hover:bg-teal-50 hover:text-teal-900 transition-colors group"
                      >
                        <div>
                          <span className="font-semibold text-slate-800 group-hover:text-teal-900">
                            {med.brandName}
                          </span>
                          <span className="text-slate-400 text-xs ml-2">
                            {med.genericName} · {med.strength}
                          </span>
                          {med.restrictions.length > 0 && (
                            <Badge type="warning" className="ml-2">
                              ⚠ Restricted
                            </Badge>
                          )}
                        </div>
                        <span className="font-mono text-emerald-700 font-bold text-sm">
                          ${med.pricing.ceiling}{" "}
                          <span className="text-slate-400 font-normal text-xs">ceiling</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <MedicationPricingPanel med={selectedMed} onClose={() => setSelectedMed(null)} />
          ))}

        {activeTab === "entity" &&
          (!selectedEntity ? (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Covered Entities &amp; Contract Pharmacies
                </h1>
                <p className="text-slate-500 text-sm mt-1">
                  Find 340B-registered covered entities and view their active contract pharmacy
                  networks.
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={entityQuery}
                  onChange={(e) => setEntityQuery(e.target.value)}
                  placeholder="Search by entity name, 340B ID, or city…"
                  className="w-full bg-white border border-slate-300 rounded-xl px-5 py-3.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                {entityQuery && (
                  <button
                    onClick={() => setEntityQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-lg"
                  >
                    ×
                  </button>
                )}
              </div>

              {hasEntityQuery && entityResults.length === 0 && (
                <Alert type="info">
                  No entities found for <strong>&quot;{entityQuery}&quot;</strong>.
                </Alert>
              )}

              <div className="space-y-2">
                {entityResults.map((entity) => (
                  <button
                    key={entity.id340b}
                    onClick={() => openEntity(entity.id340b)}
                    className="w-full text-left bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-teal-400 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-slate-900">
                            {entity.entityName}
                          </span>
                          <Badge type={entityTypeMap[entity.entityType] || "default"}>
                            {entity.entityType}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-400 mt-1">
                          <span className="font-mono">{entity.id340b}</span> · {entity.city},{" "}
                          {entity.state} {entity.zipCode}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-teal-700 font-bold text-lg">
                          {entity.activeContractCount}
                        </div>
                        <div className="text-xs text-slate-400">active contracts</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <ContractPharmacyPanel
              entity={selectedEntity}
              onClose={() => setSelectedEntity(null)}
            />
          ))}

        {activeTab === "about" && (
          <div className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">About the 340B Program</h1>
              <p className="text-slate-500 text-sm mt-1">
                Program overview, key concepts, and compliance guidance.
              </p>
            </div>

            {ABOUT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl border border-slate-200 px-6 py-5"
              >
                <h3 className="font-bold text-slate-900 text-base mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.body}</p>
              </div>
            ))}

            <div className="bg-white rounded-2xl border border-slate-200 px-6 py-5">
              <h3 className="font-bold text-slate-900 text-base mb-3">
                Manufacturer Restrictions in Dataset
              </h3>
              <div className="space-y-3">
                {restrictions.map((r) => (
                  <div
                    key={r.restrictionId}
                    className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0"
                  >
                    <div className="shrink-0 mt-0.5">
                      <Badge type="warning">⚠</Badge>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">
                        {r.manufacturerName}{" "}
                        <span className="font-mono text-slate-400 font-normal text-xs">
                          (NDC prefix {r.affectedNdcPrefix})
                        </span>
                      </div>
                      <div className="text-slate-600 text-xs mt-0.5 leading-relaxed">
                        {r.restrictionType}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Alert type="warning" title="Disclaimer">
              This tool is an MVP for educational and planning purposes only. Pricing figures
              are estimates based on publicly available AMP and URA data structures and should
              not be used for actual claims adjudication. Always verify 340B eligibility and
              pricing with your covered entity&apos;s Third-Party Administrator (TPA) and
              HRSA&apos;s OPAIS system.
            </Alert>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs text-slate-400">
            340B Checker MVP · Bellaire / Houston, TX focus · Data is illustrative
          </div>
          <div className="text-xs text-slate-400">
            Schema: medications · covered_entities · contract_pharmacies · hrsa_contracts ·
            manufacturer_restrictions
          </div>
        </div>
      </footer>
    </div>
  );
}
