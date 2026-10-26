import { measure, render } from "takumi-pdf";

import { RESUME } from "../data/resume";

class SafeHtml {
  readonly value: string;
  constructor(value: string) {
    this.value = value;
  }
}

const escapeHtml = (value: string): string =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

const toHtml = (value: unknown): string => {
  if (value instanceof SafeHtml) {
    return value.value;
  }
  if (Array.isArray(value)) {
    return value.map(toHtml).join("");
  }
  return escapeHtml(String(value));
};

const html = (strings: TemplateStringsArray, ...values: unknown[]): SafeHtml =>
  new SafeHtml(
    strings.reduce((out, part, i) => out + toHtml(values[i - 1]) + part)
  );

const formatMonth = (value: string): string =>
  new Date(`${value}-01`).toLocaleDateString("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

const formatPeriod = (period: { start: string; end: string | null }): string =>
  `${formatMonth(period.start)} - ${period.end === null ? "Present" : formatMonth(period.end)}`;

const section = (title: string, body: SafeHtml): SafeHtml =>
  html`<section>
    <h2>${title}</h2>
    ${body}
  </section>`;

const entry = (
  title: SafeHtml,
  period: string,
  body: SafeHtml | string = ""
): SafeHtml =>
  html`<div class="entry">
    <div class="row">
      <h3>${title}</h3>
      <span class="period">${period}</span>
    </div>
    ${body}
  </div>`;

const css = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .page { display: flex; flex-direction: column; gap: 14px; width: 100%; color: #222; font-size: 12px; line-height: 1.35; }
  a { color: inherit; text-decoration: none; }
  header { display: flex; flex-direction: column; gap: 5px; }
  h1 { font-size: 24px; font-weight: 700; line-height: 1.1; }
  .headline { display: flex; flex-wrap: wrap; gap: 4px 12px; font-size: 13px; font-weight: 500; }
  .meta { display: flex; flex-wrap: wrap; gap: 4px 12px; color: #555; }
  section { display: flex; flex-direction: column; gap: 8px; }
  h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; padding-bottom: 3px; border-bottom: 1px solid #ccc; }
  .entry { display: flex; flex-direction: column; gap: 3px; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  h3 { font-size: 12px; font-weight: 600; }
  h3 span { font-weight: 400; }
  .period { flex-shrink: 0; color: #555; }
  ul { display: flex; flex-direction: column; gap: 1px; }
  li { display: flex; gap: 6px; list-style: none; }
  li span { flex-shrink: 0; }
  .muted { color: #555; }
  .lines { display: flex; flex-direction: column; gap: 3px; }
  b { font-weight: 600; }
`;

const label = (name: string): SafeHtml => html`<b>${name}:</b> `;

const buildHtml = (): string => {
  const header = html`<header>
    <h1>${RESUME.name}</h1>
    <p class="headline">
      <span>${RESUME.headline}</span>
      <span class="muted">${RESUME.location}</span>
    </p>
    <div class="meta">
      ${RESUME.contact.map((c) => html`<a href="${c.url}">${c.label}</a>`)}
    </div>
  </header>`;

  const summary = section("Summary", html`<p>${RESUME.summary}</p>`);

  const experience = section(
    "Experience",
    html`${RESUME.experience.map((job) =>
      entry(
        html`${job.company}<span>, ${job.role}</span>`,
        formatPeriod(job.period),
        html`<ul>
          ${job.highlights.map((h) => html`<li><span>•</span>${h}</li>`)}
        </ul>`
      )
    )}`
  );

  const education = section(
    "Education",
    html`${RESUME.education.map((school) =>
      entry(
        html`${school.school}<span>, ${school.degree}</span>`,
        formatPeriod(school.period),
        "details" in school ? html`<p class="muted">${school.details}</p>` : ""
      )
    )}`
  );

  const skills = section(
    "Skills",
    html`<div class="lines">
      ${RESUME.skills.map((s) => html`<p>${label(s.category)}${s.items.join(", ")}</p>`)}
    </div>`
  );

  const projects = section(
    "Projects",
    html`<p>
      ${RESUME.projects.map(
        (p, i) =>
          html`${i > 0 ? " · " : ""}<a href="${p.url}"><b>${p.name}</b></a>
            (${p.stars} ${"stars"}): ${p.description}`
      )}
    </p>`
  );

  const { leadership } = RESUME;
  const extras = html`<div class="lines">
    <p>
      ${label("Leadership")}${leadership.role}, ${leadership.organization},
      ${leadership.kind} (${formatPeriod(leadership.period)}).
      ${leadership.description}
    </p>
    <p>${label("Languages")}${RESUME.languages.join(", ")}</p>
    <p>${label("Interests")}${RESUME.interests}</p>
  </div>`;

  return html`<div class="page">
    ${[header, summary, experience, education, skills, projects, extras]}
  </div>`.value;
};

const PAGE = { width: 794, height: 1123 };
const MARGIN = 40;

export const renderResume = async (): Promise<Uint8Array> => {
  const document = buildHtml();

  const { height } = await measure(document, {
    viewport: { width: PAGE.width - 2 * MARGIN },
    css,
    lang: "en",
  });
  if (height > PAGE.height - 2 * MARGIN) {
    throw new Error(
      `The resume overflows one page (${Math.ceil(height)}px of content).`
    );
  }

  return await render(document, {
    size: "a4",
    margin: MARGIN,
    css,
    lang: "en",
    metadata: {
      title: `${RESUME.name}, ${RESUME.headline}`,
      authors: [RESUME.name],
    },
  });
};
