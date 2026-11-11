# Content model and information architecture

Working document. Source of truth for copy and numbers used on the site.

## 1. Material inventory

| Source                       | What it gives us                                               | Location                                                         |
| ---------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------- |
| `project-history-summary.md` | Phase-by-phase history, Jul 2025 – Mar 2026                    | `diagoradisa-platform/project-history-summary.md`                |
| `architecture.md`            | Service map, models, contracts, prediction flow                | `diagoradisa-platform/docs/architecture.md`                      |
| Experiment log, Exp 11       | Current model metrics, dataset split, EXIF fix delta           | `diagoradisa-ml/docs/experiment-log/2026-06-14-...md`            |
| Roadmaps + changelogs        | Shipped features, removals, current state to Oct 2026          | each service repo                                                |
| `RESULTS.md`                 | 10-case clinical test, tiers, per-case notes                   | `assets/palmist-ui-2026-11-03/`                                  |
| Screenshots (10)             | Annotator editor, image browser, ML readiness, Palmist         | `assets/`                                                        |
| Case screenshots (10 × 2)    | Results pages + PDFs for the clinical test                     | `assets/palmist-ui-2026-11-03/`                                  |
| Design foundation            | Chairside Instrument tokens (Palmist, Apr 2026)                | `diagoradisa-palmist/docs/plans/2026-04-22-design-foundation.md` |
| Existing deck                | Narrative structure, diagrams, old claims                      | `diagoradisa-platform/docs/presentation/`                        |
| KPMG 2010–2018 inventory     | Nine work projects, schema, positioning, confidentiality notes | `docs/kpmg-2010-2018-inventory.md`                               |

## 2. Verified facts

- **Timeline:** 14 Jul 2025 → 26 Oct 2026. Annotator first, ML from Feb 2026, Palmist from Mar 2026.
- **Commits:** 1,629 across four repositories (899 annotator, 477 ML, 203 Palmist, 50 meta). All authored by Dimitris.
- **Team:** one developer across all four services.
- **Dataset:** 10,575 production-eligible images; 9,362 annotations; 18 classes. Training set 8,774 images (6,143 train / 1,755 val / 876 test).
- **Model:** `yolo26l-seg`, 640 px, 250 epochs, run `yolo26l-seg_640_b32_lr0.005_e250_20260614_181629`.
- **Metrics (clean test set, 876 images):** box mAP@50 0.508, mask mAP@50 0.514, precision 0.570, recall 0.496. At the production operating point (conf 0.25): precision 0.620, recall 0.455.
- **EXIF fix:** 754 of 10,575 images (7.1%) had rotated or degenerate labels. Fix lifted box mAP@50 from 0.460 to 0.508 and recall from 0.423 to 0.496.
- **Clinical test:** 10 cases → 4 correct, 3 wrong, 3 no diagnosis. (The source summary line says 5/3/2; its own table sums to 4/3/3.) Tiers: 6 HIGH, 1 MEDIUM, 3 LOW. The model is bimodal: it fires above 85% or not at all.
- **RF-DETR A/B:** NO-GO. Background false positives 51 vs YOLO's 12 on clean ground truth.
- **Clinical gates:** shipped, A/B on 210 cases, touched ~0.6% of detections, no net benefit, removed 16 Jun 2026.
- **Taxonomy:** 95 ICD-10 classes reduced to 18 by a 150-image minimum. 64 classes dropped in the ML-readiness preview shown in the screenshot.

**KPMG (2010–2018)**

- **Period:** 2010–2018, KPMG Greece, Content Manager on the marketing/digital team.
- **Scope:** web build (Umbraco, SharePoint 2013), email marketing, SEO and analytics, social and brand content.
- **Selection:** nine projects chosen for evidence, not volume.
- **Outcomes:** qualitative. The backfill numbers in the inventory are unfilled — do not invent metrics.

**Do not use:** "95 classes" as a current capability; "3.9 ms" without a date; any LOC figure (counts include tests, config, and generated files); the March 2026 deck's headline numbers without checking them against the current model.

**KPMG do not use:** any metric not backed by the inventory; any KPMG or client brand, screenshot, credential, or PII from `~/Downloads/kpmg/`.

## 3. Content model

### 3.1 Diagoradisa

#### 3.1.1 Project

```yaml
id: diagoradisa
title: Diagoradisa
url: https://bookscanner.gr/en/oral-disease-diagnosis/
kind: Clinical AI platform
period: Jul 2025 — Oct 2026
role: Sole developer
status: In production since Aug 2025
services: 3
commits: 1629
stack:
  [
    Laravel 12,
    Livewire 4,
    PHP 8.5,
    Python,
    FastAPI,
    YOLO26l-seg,
    MariaDB,
    Docker,
    Apache,
  ]
one_line: An annotation tool, a dataset pipeline, a model server, and a clinician app — built as one system.
description: Oral Disease Diagnosis using Artificial Intelligence
```

#### 3.1.2 Service

```yaml
- id: annotator
  name: Annotator
  role: Dataset creation
  stack: Laravel 12, OpenSeadragon, Annotorious, MariaDB
  proof:
    [
      deep zoom,
      polygon + rectangle annotation,
      ICD-10 lookup,
      batches,
      RBAC,
      ML-readiness dashboard,
    ]
- id: ml
  name: ML service
  role: Training and inference
  stack: Python, Ultralytics YOLO, FastAPI
  proof:
    [
      run + experiment model,
      compare and assess reports,
      29 API endpoints,
      model hot-swap,
      SAM 2 endpoint,
    ]
- id: palmist
  name: Palmist
  role: Clinician surface
  stack: Laravel 12, Livewire 4, Tailwind 4, DaisyUI 5
  proof:
    [
      multi-image case upload,
      case-level aggregation,
      PDF + Excel reports,
      mobile capture,
      Greek/English labels,
    ]
```

**Infrastructure**

```yaml
- id: infra
  name: Infra
  role: Infrastructure
  stack: Docker, Apache, Bash
  proof:
    [container deploys, reverse proxy, backups, security headers, migrations]
```

#### 3.1.3 Hard problems (case notes)

| #   | Problem                                   | Evidence                                                                                       | Resolution                                                                                          |
| --- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| 1   | EXIF orientation corrupted 7.1% of labels | 754 / 10,575 images; compare report showed rotated masks                                       | Normalise to the EXIF-applied size; rebuild dataset; +0.048 mAP@50, +0.073 recall                   |
| 2   | Detection recall plateaued at ~0.49       | Four lever sweeps: label-space collapse, size diagnostics, 1024 px retrain, lichen reweighting | All closed. RF-DETR A/B NO-GO (51 vs 12 background FPs). Conclusion: acquire data, not architecture |
| 3   | A clinical safety layer added no value    | ON/OFF A/B, 210 cases, ~0.6% of detections touched                                             | Removed the gate engine, the flag, the API fields, and the loader                                   |

#### 3.1.4 Clinical test (10 cases)

| #   | Ground truth                  | Model output       | Best conf | Views | Tier   | Verdict           |
| --- | ----------------------------- | ------------------ | --------- | ----- | ------ | ----------------- |
| 1   | Leukoplakia                   | Leukoplakia        | 94.1      | 4/4   | HIGH   | correct           |
| 2   | Oral lichen planus            | Oral lichen planus | 71.5      | 2/6   | MEDIUM | correct           |
| 3   | Mucocele                      | Mucocele           | 93.4      | 3/3   | HIGH   | correct           |
| 4   | Stevens–Johnson syndrome      | Oral lichen planus | 89.1      | 2/3   | HIGH   | wrong             |
| 5   | Fibroma                       | Papilloma          | 87.9      | 3/3   | HIGH   | wrong             |
| 6   | Chronic traumatic ulcer       | none               | 58.1      | 0/2   | LOW    | no diagnosis      |
| 7   | Aphthous ulcers               | none               | 77.3      | 0/4   | LOW    | no diagnosis      |
| 8   | Geographic tongue             | Oral lichen planus | 93.1      | 3/4   | HIGH   | wrong             |
| 9   | Leukoplakia                   | none               | 0.0       | 0/2   | LOW    | no diagnosis      |
| 10  | Traumatic ulcer + leukoplakia | Leukoplakia        | 93.2      | 4/4   | HIGH   | correct (partial) |

### 3.2 KPMG Greece

#### 3.2.1 Project

```yaml
id: kpmg
title: KPMG Greece
url: https://kpmg.com/gr/en.html
kind: Digital content, web & marketing
period: 2010 — 2018
role: Content Manager
status: Completed 2018
work: 9
stack:
  [
    Umbraco,
    SharePoint 2013,
    HTML/CSS,
    JavaScript,
    jQuery,
    Python,
    IIS,
    SEO,
    email marketing,
  ]
one_line: Nine years as content and web lead inside a Big Four firm — I wrote the content, built the pages, and measured them.
```

#### 3.2.2 Work entries

Each entry uses the schema `Project · Years · Role · What I did · Skills · Outcome · Evidence · Confidentiality`. Full "What I did" and evidence paths stay in the inventory.

| #   | Work                                    | Years            | Role                                      | One-line outcome                                                                                                        |
| --- | --------------------------------------- | ---------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| 1   | SharePoint 2013 intranet Portal         | 2016–2017        | Content Manager; content & front-end lead | Led the Greece portal migration; wrote the page-type, image-size, and colour reference cards and the web-part patterns. |
| 2   | JUSTJOBS.GR job board                   | 2011–2018        | Content Manager; content & SEO            | Triaged 4,913 SEO violations into a documented roadmap; delivered an Umbraco 7 rebuild demo.                            |
| 3   | Events Website                          | 2017             | Content Manager; site build               | Defined the document types and image-rendition set; ran the UAT and CSS/UX pass.                                        |
| 4   | cpalaw.gr law firm site                 | 2018             | Content Manager; web content & build      | Delivered the 2018 content and template update across five practice areas.                                              |
| 5   | Alumni portal                           | 2016–2018        | Content Manager; content & web lead       | Wrote the page-by-page content plan and site structure from the global Alumni toolkit.                                  |
| 6   | Fortune "Most Admired Companies" survey | 2015, 2016, 2018 | Content Manager; web build                | Delivered three annual cycles of EN/GR survey pages, phase A/B variants, and campaign email.                            |
| 7   | Email and newsletter suite              | 2014–2018        | Content Manager; email marketing          | Built reusable responsive templates across four campaign families; documented the tool evaluation.                      |
| 8   | Family Business Dynamics microsite      | 2017             | Content Manager; web content              | Shipped the Greek microsite from the global family-business campaign.                                                   |
| 9   | "Content is King" landing page          | 2017             | Designer and builder (personal)           | Built a self-contained interactive content-marketing piece with image-map hotspots.                                     |

### 3.3 Confidential project (zitamu)

Role statement only until the client clears the name:

- **Role statement:** a Greek real-estate marketplace, Laravel 13 + Nuxt 3.
- **Not publishable:** the name, screenshots, client details, and any metric.

### 3.4 Reusable copy blocks

**Diagoradisa**

- **Positioning:** One layer above the plumbing.
- **Project line:** An annotation tool, a dataset pipeline, a model server, and a clinician app — built as one system.
- **Method:** Measure before you claim. Own the seams. Delete what doesn't earn its place.
- **Caveat:** Ten cases is a product test, not a validation study.

**KPMG Greece**

- **Positioning:** Digital generalist: content, web, and marketing.
- **Project line:** Nine years as content and web lead inside a Big Four firm — I wrote the content, built the pages, and measured them.
- **Method:** Write the content, build the page, measure it.

## 4. Information architecture

```
/                       Home
/work/diagoradisa.html  Case study (Diagoradisa)
/work/kpmg.html         Case study (KPMG Greece)
/about.html             About + stack + contact
/design/                Design system reference
```

**Global nav:** Work · About · Contact · theme toggle.
**Home order:** hero → selected work (Diagoradisa, KPMG) → method → contact.
**Diagoradisa order:** header → context → constraints → architecture → four surfaces → three failures → evidence → next → footer.
**KPMG order:** header → context → nine projects → what it proves → current direction → footer.
**About order:** intro → how I got here → tools → contact.

**Future work:** the work index is a list of two. Adding a third project means adding a card to `#work` and a page under `/work/`; no template changes.
