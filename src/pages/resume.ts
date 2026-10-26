import type { APIRoute } from "astro";

import { renderResume } from "../lib/resume-pdf";

export const GET: APIRoute = async () =>
  new Response(new Uint8Array(await renderResume()), {
    headers: { "Content-Type": "application/pdf" },
  });
