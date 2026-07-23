# Baseline SEO — Google Search Console

Property: `sc-domain:maskiobarberconcept.it`

Period: 2026-06-26 to 2026-07-21

Captured before SEO phase 1 implementation.

## Aggregate performance

- Clicks: 429
- Impressions: 3,263
- CTR: 13.15%
- Query/page rows returned: 83

## Main branded queries

| Query | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| maskio barber | 285 | 333 | 85.59% | 1.0 |
| maskio | 67 | 78 | 85.90% | 1.3 |
| maskio barber concept | 65 | 70 | 92.86% | 1.3 |

## URL Inspection baseline

| URL | Coverage | Declared canonical | Google canonical |
|---|---|---|---|
| `/` | Submitted and indexed | `/` | `/` |
| `/servizi` | Submitted and indexed | `/servizi` | `/servizi` |
| `/contatti` | Submitted and indexed | `/contatti` | `/contatti` |
| `/prodotti` | Submitted and indexed | `/` | `/prodotti` |
| `/location` | Submitted and indexed | `/` | `/location` |
| `/testimonianze` | Submitted and indexed | `/` | `/testimonianze` |
| `/prenota` | Discovered — currently not indexed | none reported | none reported |

GSC reflects the last crawled production version and cannot validate local changes.

## Sitemap baseline

- Submitted: `https://www.maskiobarberconcept.it/sitemap.xml`
- Errors: 0
- Warnings: 0
- Submitted URLs: 13
- Indexed shown in sitemap report: 0

The sitemap indexed count conflicts with URL Inspection, which confirms indexed pages. Treat it as a reporting lag or processing discrepancy and monitor it after deployment.

## HTTP visibility

Historical GSC rows still include `http://www.maskiobarberconcept.it/`. Redirect behavior must be tested independently before changing Next.js or Vercel configuration.

## Security

No credentials, account identifiers, service-account files, OAuth tokens, or API keys are stored in this document.
