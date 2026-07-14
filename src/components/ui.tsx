import type { ReactNode } from "react";

// Palette: federal-authority navy + clinical teal + amber alert + off-white
export const TOKEN = {
  navy: "#0B2545",
  navyMid: "#1B3F6E",
  teal: "#0E7C7B",
  tealLight: "#E6F4F4",
  amber: "#C97B1E",
  amberLight: "#FEF3E2",
  red: "#B91C1C",
  redLight: "#FEE2E2",
  green: "#15803D",
  greenLight: "#DCFCE7",
  slate: "#64748B",
  slateLight: "#F1F5F9",
  white: "#FFFFFF",
  ink: "#0F172A",
};

type BadgeType =
  | "default"
  | "dsh"
  | "fqhc"
  | "ped"
  | "active"
  | "inactive"
  | "warning"
  | "chain"
  | "independent";

export function Badge({
  type = "default",
  children,
  className = "",
}: {
  type?: BadgeType;
  children: ReactNode;
  className?: string;
}) {
  const styles: Record<BadgeType, string> = {
    default: "bg-slate-100 text-slate-700",
    dsh: "bg-blue-100 text-blue-800",
    fqhc: "bg-emerald-100 text-emerald-800",
    ped: "bg-purple-100 text-purple-800",
    active: "bg-emerald-100 text-emerald-800",
    inactive: "bg-red-100 text-red-700",
    warning: "bg-amber-100 text-amber-800",
    chain: "bg-slate-100 text-slate-700",
    independent: "bg-teal-100 text-teal-800",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold tracking-wide uppercase ${styles[type] || styles.default} ${className}`}
    >
      {children}
    </span>
  );
}

type PillColor = "teal" | "amber" | "navy" | "green" | "red";

export function Pill({
  label,
  value,
  color = "teal",
}: {
  label: string;
  value: string;
  color?: PillColor;
}) {
  const cols: Record<PillColor, string> = {
    teal: "border-teal-300 bg-teal-50 text-teal-900",
    amber: "border-amber-300 bg-amber-50 text-amber-900",
    navy: "border-blue-300 bg-blue-50 text-blue-900",
    green: "border-emerald-300 bg-emerald-50 text-emerald-900",
    red: "border-red-300 bg-red-50 text-red-900",
  };
  return (
    <div className={`border rounded-lg px-4 py-3 ${cols[color]}`}>
      <div className="text-xs font-medium uppercase tracking-widest opacity-70 mb-0.5">
        {label}
      </div>
      <div className="text-lg font-bold font-mono">{value}</div>
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-4">
      <div className="text-xs font-bold tracking-widest uppercase text-teal-600 mb-1">
        {eyebrow}
      </div>
      <h2 className="text-xl font-bold text-slate-900">{title}</h2>
    </div>
  );
}

type AlertType = "info" | "warning" | "danger" | "success";

export function Alert({
  type = "info",
  title,
  children,
}: {
  type?: AlertType;
  title?: string;
  children: ReactNode;
}) {
  const styles: Record<AlertType, { wrap: string; icon: string; text: string }> = {
    info: { wrap: "bg-blue-50 border-blue-300", icon: "ℹ", text: "text-blue-900" },
    warning: { wrap: "bg-amber-50 border-amber-300", icon: "⚠", text: "text-amber-900" },
    danger: { wrap: "bg-red-50 border-red-300", icon: "✕", text: "text-red-900" },
    success: { wrap: "bg-emerald-50 border-emerald-300", icon: "✓", text: "text-emerald-900" },
  };
  const s = styles[type];
  return (
    <div className={`border rounded-lg p-4 ${s.wrap}`}>
      <div className={`flex gap-2 items-start ${s.text}`}>
        <span className="text-base font-bold mt-0.5 shrink-0">{s.icon}</span>
        <div>
          {title && <div className="font-semibold text-sm mb-0.5">{title}</div>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Divider() {
  return <div className="border-t border-slate-200 my-5" />;
}

export const entityTypeMap: Record<string, BadgeType> = {
  DSH: "dsh",
  FQHC: "fqhc",
  PED: "ped",
};

export function formatNdc(ndc: string) {
  return `${ndc.substring(0, 5)}-${ndc.substring(5, 9)}-${ndc.substring(9)}`;
}
