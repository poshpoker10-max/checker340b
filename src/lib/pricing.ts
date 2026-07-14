export interface Pricing {
  ceiling: string;
  wac: string;
  savings: string;
  pct: string;
}

export function computePricing(amp: number, ura: number | null): Pricing {
  const ceiling = ura !== null ? amp - ura : amp * 0.7;
  const wac = amp * 1.15;
  const savings = wac - ceiling;
  const pct = ((savings / wac) * 100).toFixed(1);
  return {
    ceiling: ceiling.toFixed(2),
    wac: wac.toFixed(2),
    savings: savings.toFixed(2),
    pct,
  };
}
