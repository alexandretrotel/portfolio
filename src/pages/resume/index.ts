import type { APIRoute } from "astro";

import { LOCALE_COOKIE, detectLocale, parseAcceptLanguage } from "../../lib/locale";

export const prerender = false;

export const GET: APIRoute = ({ cookies, request, redirect }) => {
  const locale = detectLocale(
    cookies.get(LOCALE_COOKIE)?.value,
    parseAcceptLanguage(request.headers.get("accept-language")),
  );

  return redirect(`/resume/${locale}.pdf`, 302);
};
