import type { Medication, EntityDetail } from "@/lib/types";
import {
  TOKEN,
  Badge,
  Pill,
  SectionHeader,
  Alert,
  Divider,
  entityTypeMap,
  formatNdc,
} from "./ui";

export function MedicationPricingPanel({
  med,
  onClose,
}: {
  med: Medication;
  onClose: () => void;
}) {
  const { pricing, restrictions } = med;
  const ndcPrefix = med.ndc11.substring(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div
        style={{ background: `linear-gradient(135deg, ${TOKEN.navy}, ${TOKEN.navyMid})` }}
        className="px-6 py-5"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="text-teal-300 text-xs font-bold tracking-widest uppercase mb-1">
              Medication Detail
            </div>
            <h3 className="text-white text-2xl font-bold">{med.brandName}</h3>
            <div className="text-blue-200 text-sm mt-0.5">
              {med.genericName} · {med.strength} · {med.dosageForm}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-white transition-colors text-2xl leading-none mt-1"
          >
            ×
          </button>
        </div>
        <div className="mt-3">
          <span className="font-mono text-xs bg-white/10 text-blue-100 px-2 py-1 rounded">
            NDC {formatNdc(med.ndc11)}
          </span>
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        <div>
          <SectionHeader eyebrow="Pricing Estimator" title="340B Ceiling vs. WAC" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Pill label="Est. AMP" value={`$${med.estimatedAmp.toFixed(2)}`} color="navy" />
            <Pill
              label="Est. URA"
              value={med.estimatedUra === null ? "—" : `$${med.estimatedUra.toFixed(2)}`}
              color="navy"
            />
            <Pill label="340B Ceiling" value={`$${pricing.ceiling}`} color="teal" />
            <Pill label="Est. WAC" value={`$${pricing.wac}`} color="amber" />
          </div>
          <div className="mt-3 flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
            <div className="text-3xl font-bold font-mono text-emerald-700">
              ${pricing.savings}
            </div>
            <div>
              <div className="text-emerald-900 font-semibold text-sm">
                Estimated Savings per Unit
              </div>
              <div className="text-emerald-600 text-xs">
                {pricing.pct}% below WAC · Based on published AMP/URA estimates
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            * 340B ceiling = AMP − URA. WAC estimated at 115% AMP. Figures are estimates
            only; actual pricing varies by quarter and manufacturer. Always verify with your
            TPA.
          </p>
        </div>

        <Divider />

        <div>
          <SectionHeader eyebrow="Compliance Check" title="Manufacturer Restrictions" />
          {restrictions.length === 0 ? (
            <Alert type="success" title="No known restrictions">
              No manufacturer restrictions found for NDC prefix{" "}
              <span className="font-mono">{ndcPrefix}</span>. Standard 340B contract pharmacy
              rules apply.
            </Alert>
          ) : (
            <div className="space-y-3">
              {restrictions.map((r) => (
                <div
                  key={r.restrictionId}
                  className="border border-amber-200 rounded-xl overflow-hidden"
                >
                  <div className="bg-amber-50 px-4 py-2 flex items-center justify-between">
                    <div className="font-semibold text-amber-900 text-sm">
                      {r.manufacturerName}
                    </div>
                    <Badge type="warning">{r.restrictionType}</Badge>
                  </div>
                  <div className="px-4 py-3 text-sm text-slate-700 leading-relaxed">
                    {r.policyDetails}
                  </div>
                  <div className="px-4 pb-3 text-xs text-slate-400">
                    Last verified: {r.lastChecked}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContractPharmacyPanel({
  entity,
  onClose,
}: {
  entity: EntityDetail;
  onClose: () => void;
}) {
  const contracts = entity.contracts;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      <div
        style={{ background: `linear-gradient(135deg, ${TOKEN.teal}, #0a5857)` }}
        className="px-6 py-5"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="text-teal-200 text-xs font-bold tracking-widest uppercase mb-1">
              Covered Entity
            </div>
            <h3 className="text-white text-xl font-bold leading-tight">
              {entity.entityName}
            </h3>
            <div className="text-teal-200 text-sm mt-1">
              {entity.city}, {entity.state} {entity.zipCode}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-teal-300 hover:text-white transition-colors text-2xl leading-none mt-1"
          >
            ×
          </button>
        </div>
        <div className="mt-3 flex gap-2">
          <span className="font-mono text-xs bg-white/10 text-teal-100 px-2 py-1 rounded">
            {entity.id340b}
          </span>
          <Badge type={entityTypeMap[entity.entityType] || "default"}>
            {entity.entityType}
          </Badge>
        </div>
      </div>

      <div className="px-6 py-5">
        <SectionHeader
          eyebrow={`${contracts.length} Active Registrations`}
          title="Contract Pharmacy Network"
        />

        {contracts.length === 0 ? (
          <Alert type="info" title="No active contracts">
            This entity has no active contract pharmacy registrations on file in our dataset.
          </Alert>
        ) : (
          <div className="space-y-3">
            {contracts.map((c) => (
              <div
                key={c.contractId}
                className="border border-slate-200 rounded-xl overflow-hidden hover:border-teal-300 transition-colors"
              >
                <div className="px-4 py-3 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-900 text-sm truncate">
                      {c.pharmacy.pharmacyName}
                    </div>
                    <div className="text-slate-500 text-xs mt-0.5">
                      {c.pharmacy.address}, {c.pharmacy.city}, {c.pharmacy.state}{" "}
                      {c.pharmacy.zipCode}
                    </div>
                    <div className="text-slate-400 text-xs mt-1 font-mono">
                      NPI: {c.pharmacy.npi}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge type={c.pharmacy.isIndependent ? "independent" : "chain"}>
                      {c.pharmacy.isIndependent ? "Independent" : "Chain"}
                    </Badge>
                    <Badge type="active">Active</Badge>
                  </div>
                </div>
                <div className="bg-slate-50 border-t border-slate-100 px-4 py-2 text-xs text-slate-500">
                  Registered: {c.registrationDate}
                </div>
              </div>
            ))}
          </div>
        )}

        <Divider />
        <Alert type="warning" title="Manufacturer restriction check required">
          Before dispensing, verify that the selected drug&apos;s manufacturer has not
          restricted 340B pricing at contract pharmacies for this entity type. Use the
          Medication Lookup tab to check restrictions.
        </Alert>
      </div>
    </div>
  );
}
