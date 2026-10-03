import type { FarmSiteGlobals } from "@/types/farm-cms";

export function getLineOfficialUrl(globals: FarmSiteGlobals | null) {
  const lineId = process.env.NEXT_PUBLIC_LINE_OFFICIAL_ID || globals?.lineOfficialId || "@844kyxqq";
  const normalizedLineId = lineId.startsWith("@") ? lineId : `@${lineId}`;
  return process.env.NEXT_PUBLIC_LINE_OFFICIAL_URL || globals?.lineOfficialUrl || `https://line.me/R/ti/p/${encodeURIComponent(normalizedLineId)}`;
}
