import type { APIRoute, GetStaticPaths } from "astro";

import { RESUME_LOCALES } from "../../data/resume";
import { renderResume } from "../../lib/resume-pdf";

export const getStaticPaths = (() =>
  RESUME_LOCALES.map((lang) => ({ params: { lang } }))) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ params }) => {
  const locale = RESUME_LOCALES.find((l) => l === params.lang);
  if (!locale) return new Response(null, { status: 404 });

  const pdf = await renderResume(locale);

  return new Response(new Uint8Array(pdf), {
    headers: { "Content-Type": "application/pdf" },
  });
};
