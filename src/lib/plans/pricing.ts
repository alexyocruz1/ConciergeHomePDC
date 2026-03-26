export const PLAN_PRICING = {
  vitrina: {
    shortTermCommissionPercent: 0.1, // 10% short-term bookings
    shortTermMinMxnPerBooking: 500,
    longTermCommissionPercentRange: [0.5, 0.75] as const, // 50–75% first month's rent
    saleReferralPercentRange: [0.02, 0.03] as const, // 2–3% as agreed / typically agency-paid
  },
  esencial: {
    commissionPercent: 0.18,
    minMonthlyUsd: 140,
  },
  fullManagement: {
    commissionPercent: 0.25,
    minMonthlyUsd: 180,
  },
  serviceArea: ["Centro", "Zazil-Ha", "Playacar"] as const,
};

function roundToNearest(value: number, step: number) {
  return Math.round(value / step) * step;
}

export const MIN_MONTHLY_INCOME_POTENTIAL_USD = {
  esencial: roundToNearest(
    PLAN_PRICING.esencial.minMonthlyUsd / PLAN_PRICING.esencial.commissionPercent,
    10,
  ), // 140 / 0.18 = 777.78 -> 780
  fullManagement: roundToNearest(
    PLAN_PRICING.fullManagement.minMonthlyUsd /
      PLAN_PRICING.fullManagement.commissionPercent,
    10,
  ), // 180 / 0.25 = 720 -> 720
};

export function formatPercent(percent: number) {
  return `${Math.round(percent * 100)}%`;
}

