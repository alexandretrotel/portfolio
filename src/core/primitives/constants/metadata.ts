import { SITE_CONFIG } from "@/shared/config/site";

export const METADATA = {
  BASE_URL: SITE_CONFIG.baseUrl,
  DESCRIPTION: SITE_CONFIG.description,
  TITLE: SITE_CONFIG.title,
} as const;
