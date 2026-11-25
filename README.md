# BankBondhu

A complete local-data React MVP for learning about savings in Bangladesh. Includes Home, Banks, Compare, Learn, About, and a friendly 404. No API keys, database or backend are required.

## Run the delivered project

Prerequisite: Node.js 22.12+ (Node 24 LTS recommended) and npm. Internet is needed for the initial dependency installation only. Extract BankBondhu.zip, then open a terminal in its parent folder:

```sh
cd bankbondhu
npm ci
npm run dev
```

Open the local address printed by Vite, normally http://localhost:5173.

```sh
npm test
npm run build
npm run preview
```

`npm run build` creates `dist/`; `npm run preview` serves that build locally. Use a web server, not a double-click on `dist/index.html`.

## Create from a new Vite scaffold (alternative)

The archive is already scaffolded. If recreating it manually:

```sh
npm create vite@latest bankbondhu -- --template react
cd bankbondhu
```

Replace the generated files with all the supplied source/config/test files and package.json. Remove the unused starter files (App.css, src/index.css and src/assets/react.svg). Copy the supplied package-lock.json, then:

```sh
npm ci
npm run dev
```

If deliberately not using the supplied lockfile, use `npm install` instead of `npm ci` once to generate one. The delivered lockfile reproduces the tested dependency versions.

## Stack and structure

React 19, Vite 7, React Router 7, Tailwind CSS 3.4 (standard PostCSS setup with explicit Tailwind configuration), Lucide icons. Vitest, Testing Library and jsdom provide automated checks. No external font or image requests.

```text
bankbondhu/
  index.html
  package.json
  package-lock.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  .gitignore
  README.md
  src/
    main.jsx
    App.jsx
    components/
      UI.jsx
      Layout.jsx
      SchemeCard.jsx
      Calculator.jsx
    pages/
      Home.jsx
      Banks.jsx
      Compare.jsx
      Learn.jsx
      About.jsx
    data/
      banks.json
      lessons.json
      catalog.js
    styles/
      index.css
    utils/
      finance.js
  tests/
    setup.js
    finance.test.js
    app.test.jsx
```

The archive also includes `FULL_SOURCE.md`, containing every authored file's full contents plus package-lock.json. Generated `dist/` and installed `node_modules/` are intentionally excluded: the commands above recreate them.

## Features

- A searchable directory of 63 banks with the website links provided, plus four clearly fictional banks and twelve illustrative DPS, FDR and savings schemes.
- Combine bank, scheme type, tenure, minimum annual rate and text filters; sort by bank, rate or minimum deposit. Reset and empty-result states included.
- Compare up to three schemes, including annual rate, deposit, term, interest method, eligibility, withdrawal and demo branch/contact information. Selection survives client-side navigation, resets on refresh.
- Six lessons in sequence, each with a worked BDT example. Lessons can also be linked with `/learn?lesson=fdr` (IDs are defined in lessons.json).
- Interactive DPS/FDR calculators with validation, zero-interest support and transparent assumptions.
- Responsive mobile menu, skip link, visible keyboard focus, labeled inputs, pressed/selected states, semantic comparison table and calculation live region.
- Error boundary and 404 route. No accounts, tracking, application forms, live bank feeds or recommendation engine.

## Editing the data

Edit `src/data/banks.json`. Add institutions to the top-level `directory` array (`name`, `url`, and optional `note`) to update the searchable directory. These entries are for reference; verify names, links and status directly. The separate `banks` array powers the illustrative scheme comparison. Add a bank object there or a scheme to a bank's `schemes` array. Use globally unique scheme IDs and unique bank IDs. Keep numeric values as JSON numbers, not strings. Vite rebuilds JSON at build time; after edits in production, rebuild and redeploy.

Bank fields: `id`, `name`, `initials`, `description`, `fictional`, `eligibility`, `branch`, `contact`, `schemes`.

Scheme fields:

| Field | Format / meaning |
| --- | --- |
| id | Unique string, e.g. `bank-5-dps` |
| type | `DPS`, `FDR`, or `Savings` |
| name | Scheme display name |
| rate | Nominal annual percentage, e.g. `8.25` |
| minimumDeposit | Minimum taka; monthly amount for DPS |
| tenures | Array of months; `[0]` means flexible savings |
| interestMethod | Plain-language interest basis |
| withdrawal | Access and early-closure terms |
| rateNote | Sample status / assumptions |

A scheme's one sample rate applies to every tenure in its array. For tenure-dependent rates, create distinct scheme entries with distinct IDs, rates and matching tenures. Bank names and rates here must not be treated as real offers. If moving beyond the demo, verify information from each actual institution and revise the fictional-data disclosures appropriately.

Edit `src/data/lessons.json` to change lesson text and examples. `calculator` accepts `DPS`, `FDR`, or `null`. The UI derives counts and navigation from local data.

## Calculation specification

All monetary values are BDT. Results are displayed rounded to the nearest taka; arithmetic is not rounded between periods. These are mathematical illustrations, not bank payout quotes.

DPS: monthly deposit `P`, number of months `n`, nominal annual percentage `r`, monthly rate `i = r / 100 / 12`.

- End-of-month deposits: `FV = P × ((1+i)^n − 1) / i`.
- Start-of-month deposits: multiply that result by `(1+i)`.
- Zero interest: `FV = P × n`.
- Contributed principal: `P × n`.
- All installments arrive on time; the rate remains constant; monthly compounding is assumed.

FDR: one-time principal `P`, years `t = months / 12`, decimal annual rate `r`.

- Simple: `FV = P × (1 + r × t)`.
- Compound: `FV = P × (1 + r / m)^(m × t)`, where `m` is 1, 4 or 12.
- Fractional compound periods are approximations; actual bank crediting rules can differ.
- Interest = maturity value minus contributed principal.

Accepted input: amount ৳1–100,000,000; rate 0–30%; whole months 1–360. Empty, nonfinite and out-of-range entries suppress results and display an error. No tax, excise duty, fees, missed installments or early-withdrawal penalties are included. Calculator settings are exploratory and are not automatically associated with a listed bank.

## Validation

`npm test` covers calculation results against a monthly cash-flow ledger; zero rates; start/end timing; simple and compounded FDR; invalid inputs; unique data IDs; combined filters; selection limit; route navigation; comparison removal/clearing; filter reset; lesson navigation; calculator switching; mobile menu state and 404 behavior.

`npm run build` verifies production compilation. jsdom tests do not replace cross-browser or device visual testing.

## Hosting later

Deploy `dist/` to a static host that supports an SPA fallback: route unknown paths to `/index.html` so direct visits to `/banks`, `/compare`, `/learn` and `/about` work. Vite dev/preview already handle this. For subdirectory deployment, configure both Vite `base` and BrowserRouter `basename`. No deployment is required to use this local MVP.

## Educational and technical references

- Compound interest definition: https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest
- Calculator concepts: https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator
- Vite setup: https://vite.dev/guide/
- Tailwind v3 Vite setup: https://v3.tailwindcss.com/docs/guides/vite

The examples are original illustrations, not sourced bank rates. Educational information only; verify rates, taxes, eligibility and terms directly with your chosen bank.
