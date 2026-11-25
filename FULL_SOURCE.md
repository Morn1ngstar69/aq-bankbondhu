# BankBondhu — complete project source

Every source, configuration and test file is reproduced below. README.md includes the folder tree and exact setup commands. The dependency lockfile is included in full for reproducibility.

## .gitignore

````text
node_modules/
dist/
.DS_Store
*.local

````

## README.md

````markdown
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

- Four clearly fictional banks and twelve illustrative schemes: DPS, FDR and savings.
- Combine bank, scheme type, tenure, minimum annual rate and text filters; sort by bank, rate or minimum deposit. Reset and empty-result states included.
- Compare up to three schemes, including annual rate, deposit, term, interest method, eligibility, withdrawal and demo branch/contact information. Selection survives client-side navigation, resets on refresh.
- Six lessons in sequence, each with a worked BDT example. Lessons can also be linked with `/learn?lesson=fdr` (IDs are defined in lessons.json).
- Interactive DPS/FDR calculators with validation, zero-interest support and transparent assumptions.
- Responsive mobile menu, skip link, visible keyboard focus, labeled inputs, pressed/selected states, semantic comparison table and calculation live region.
- Error boundary and 404 route. No accounts, tracking, application forms, live bank feeds or recommendation engine.

## Editing the data

Edit `src/data/banks.json`. UI components do not need to change. Add a bank object to `banks`, or a scheme to a bank's `schemes` array. Use globally unique scheme IDs and unique bank IDs. Keep numeric values as JSON numbers, not strings. Vite rebuilds JSON at build time; after edits in production, rebuild and redeploy.

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

````

## index.html

````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#153F35" />
    <meta name="description" content="Understand savings, compare illustrative bank schemes, and explore DPS and FDR maturity with BankBondhu." />
    <title>BankBondhu — A little clarity. A better tomorrow.</title>
  </head>
  <body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body>
</html>

````

## package-lock.json

````json
{
  "name": "bankbondhu",
  "version": "1.0.0",
  "lockfileVersion": 3,
  "requires": true,
  "packages": {
    "": {
      "name": "bankbondhu",
      "version": "1.0.0",
      "dependencies": {
        "lucide-react": "^0.468.0",
        "react": "^19.2.0",
        "react-dom": "^19.2.0",
        "react-router-dom": "^7.9.0"
      },
      "devDependencies": {
        "@testing-library/jest-dom": "^6.9.1",
        "@testing-library/react": "^16.3.0",
        "@testing-library/user-event": "^14.6.1",
        "@vitejs/plugin-react": "^5.0.4",
        "autoprefixer": "^10.4.21",
        "jsdom": "^26.1.0",
        "postcss": "^8.5.6",
        "tailwindcss": "3.4.17",
        "vite": "^7.1.9",
        "vitest": "^3.2.4"
      },
      "engines": {
        "node": ">=22.12.0"
      }
    },
    "node_modules/@adobe/css-tools": {
      "version": "4.5.0",
      "resolved": "https://registry.npmjs.org/@adobe/css-tools/-/css-tools-4.5.0.tgz",
      "integrity": "sha512-6OzddxPio9UiWTCemp4N8cYLV2ZN1ncRnV1cVGtve7dhPOtRkleRyx32GQCYSwDYgaHU3USMm84tNsvKzRCa1Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@alloc/quick-lru": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/@alloc/quick-lru/-/quick-lru-5.3.0.tgz",
      "integrity": "sha512-U4+70Pc5ZS9osnCBCE5Jha/ciHM+Yp+CNMNC/7HvYbNRk1Ldd+f7qO65W5qfhu/TCv+/ozljlXXe9Nj8419DMA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/@asamuzakjp/css-color": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/@asamuzakjp/css-color/-/css-color-3.2.0.tgz",
      "integrity": "sha512-K1A6z8tS3XsmCMM86xoWdn7Fkdn9m6RSVtocUrJYIwZnFVkng/PvkEoWtOWmP+Scc6saYWHWZYbndEEXxl24jw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@csstools/css-calc": "^2.1.3",
        "@csstools/css-color-parser": "^3.0.9",
        "@csstools/css-parser-algorithms": "^3.0.4",
        "@csstools/css-tokenizer": "^3.0.3",
        "lru-cache": "^10.4.3"
      }
    },
    "node_modules/@asamuzakjp/css-color/node_modules/lru-cache": {
      "version": "10.4.3",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-10.4.3.tgz",
      "integrity": "sha512-JNAzZcXrCt42VGLuYz0zfAzDfAvJWW6AfYlDBQyDV5DClI2m5sAmK+OIO7s59XfsRsWHp02jAJrRadPRGTt6SQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/@babel/code-frame": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.29.7.tgz",
      "integrity": "sha512-Aup7aUOfpbAUg2ROOJN6Iw5f9DMBlzu0mIkm/malLQFN/YQgO48wCj0Kxa3sEHJvPVFg7siR+qRInwXd2qhQKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-validator-identifier": "^7.29.7",
        "js-tokens": "^4.0.0",
        "picocolors": "^1.1.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/compat-data": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/compat-data/-/compat-data-7.29.7.tgz",
      "integrity": "sha512-locTkQyKvwIEgBzVrn8693ebc97F2U8ZHjbXwDXJ5Fn2TCpNwTlKcaKLkdHop5c/icOFE7qt7Q9JC5hnKNa6Gg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/core": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/core/-/core-7.29.13.tgz",
      "integrity": "sha512-j1nvOQCZYSgp7HLmisnCXFTpVvFODiijQ9QHkORfGKWH6YDtskTEeCJS7eV545GZ9UBzrq0e2xsOd5QQ5PjIqw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.13",
        "@babel/helper-compilation-targets": "^7.29.13",
        "@babel/helper-module-transforms": "^7.29.13",
        "@babel/helpers": "^7.29.13",
        "@babel/parser": "^7.29.13",
        "@babel/template": "^7.29.7",
        "@babel/traverse": "^7.29.13",
        "@babel/types": "^7.29.11",
        "@jridgewell/remapping": "^2.3.5",
        "convert-source-map": "^2.0.0",
        "debug": "^4.1.0",
        "gensync": "^1.0.0-beta.2",
        "json5": "^2.2.3",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/babel"
      }
    },
    "node_modules/@babel/generator": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/generator/-/generator-7.29.13.tgz",
      "integrity": "sha512-T5FRo+RzVHvGjWOuF1Ljc44b+NXAOazodHkGUHp4I3zCkQ4/sNVJm56h1S278LMR0bY5xBhztGziSbli8zObIw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.29.13",
        "@babel/types": "^7.29.11",
        "@jridgewell/gen-mapping": "^0.3.12",
        "@jridgewell/trace-mapping": "^0.3.28",
        "jsesc": "^3.0.2"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-compilation-targets": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/helper-compilation-targets/-/helper-compilation-targets-7.29.13.tgz",
      "integrity": "sha512-8WxJ4/Vmes3ghacj8VOJy3NW8eyHiFY/4thU/LSBuBE470+igjR/j1ZTNn8fV5VdNrLx6iXUwig526UdOvfP0w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/compat-data": "^7.29.7",
        "@babel/helper-validator-option": "^7.29.7",
        "browserslist": "^4.24.0",
        "lru-cache": "^5.1.1",
        "semver": "^6.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-globals": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-globals/-/helper-globals-7.29.7.tgz",
      "integrity": "sha512-3nQVUAtvkKH9zahfWgw96Jc/uFOmjACE1kQz82E2lqWmHBgjzbNlsC22nuQTfahmWeQtTq5nQ/4Nnd2A1wj4zA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-imports": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-imports/-/helper-module-imports-7.29.7.tgz",
      "integrity": "sha512-ejHwrQQYcm9xnTivShn2IDOlIzInN34AXskvq9QicvCtEzq1Vzclu/tKF8Jq1Cg8JG2GL6/EmjgsCT7lXepE3g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/traverse": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-module-transforms": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/helper-module-transforms/-/helper-module-transforms-7.29.13.tgz",
      "integrity": "sha512-/U96wOz+SCoZ7Da/8kjDGltcNY280JPQcRNPK0Hk3PTbdpaiBDQImtC6JsbVwb1HGMr3usZQU2WsWVjhYNmRzw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-module-imports": "^7.29.7",
        "@babel/helper-validator-identifier": "^7.29.7",
        "@babel/traverse": "^7.29.13"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0"
      }
    },
    "node_modules/@babel/helper-plugin-utils": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-plugin-utils/-/helper-plugin-utils-7.29.7.tgz",
      "integrity": "sha512-G7sHYigPY17oO5SYWnfD/0MTBwVR781S/JI643e/JhUYgVgWE/61SoW3NH9KWUKyKq5LVh3npif99Wkt6j86Jw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-string-parser": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/helper-string-parser/-/helper-string-parser-7.29.13.tgz",
      "integrity": "sha512-fWegr+WsEsiMVW4KUNdIIzzMTZSzNiqhy0//6+2MRi2d5NFNsL/AYwBQW8eBnRbTBVRnDVzjaJEUqKaCWjMMdQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-identifier": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-identifier/-/helper-validator-identifier-7.29.7.tgz",
      "integrity": "sha512-qehxGkRj55h/ff8EMaJ+cYhyaKlHIxqYDn682wQD7RNp9UujOQsHog2uS0r2vzr4pW+sXf90NeeayjcNaX3fFg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helper-validator-option": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/helper-validator-option/-/helper-validator-option-7.29.7.tgz",
      "integrity": "sha512-N9ZErrD+yW5geCDtBqnOoxmR8+tNKiGuxKlDpuJxfsqpa2dFcexaziGAE/qoHLiDDreVNMupxGmSoNlyvsA3gw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/helpers": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/helpers/-/helpers-7.29.13.tgz",
      "integrity": "sha512-laoRpD/kO/iA4CDlgJbixHekg7oPvWALK0PQyK3Ob2I2njZRvVAD77RfWCIImtqWCq6KijoBoZK7bp/HlTWASQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.11"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/parser": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/parser/-/parser-7.29.13.tgz",
      "integrity": "sha512-fJM50YYjlTiBhgdkGmC1tBpv+FMAyo4annf2X6Aks+0yRlaiVkYW/3f07xAfVVkYIoZ9fFZp+mEThUFnuybhkQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.29.11"
      },
      "bin": {
        "parser": "bin/babel-parser.js"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-self": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-self/-/plugin-transform-react-jsx-self-7.29.7.tgz",
      "integrity": "sha512-TL0hMc9xzy86VD31nUiwzd5otRAcyEPcsegCxolO0PvcXuH1v0kECe/UIznYFihpkvU5wg/jk4v0TTEFfm53fw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/plugin-transform-react-jsx-source": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/plugin-transform-react-jsx-source/-/plugin-transform-react-jsx-source-7.29.7.tgz",
      "integrity": "sha512-06IyK09H3wi4cGbhDBwp5gUGo0IKtnYa8tyTiephirPCK6fbobVGiXMMI5zLQ4aKEYP3wZ3ArU44o+8KMrSG/Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-plugin-utils": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      },
      "peerDependencies": {
        "@babel/core": "^7.0.0-0"
      }
    },
    "node_modules/@babel/runtime": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/runtime/-/runtime-7.29.13.tgz",
      "integrity": "sha512-v+oN26xP4YIlQsbQ/CbTH1WG5m/l/DjKKZNy/Kp3f/AFvbgt7Em/D0FeMM3O2hX0YzeN2M16W8lOpyhIkfCBcQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/template": {
      "version": "7.29.7",
      "resolved": "https://registry.npmjs.org/@babel/template/-/template-7.29.7.tgz",
      "integrity": "sha512-puq+Gf35oI24FeN11LkoUQFqv9uwNeWpxXZi/Ji3rRIoKAzKnxRaZ+Gkj0vKS9ZCiTESfng1N9LyOyXvo+m+Gg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/parser": "^7.29.7",
        "@babel/types": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/traverse": {
      "version": "7.29.13",
      "resolved": "https://registry.npmjs.org/@babel/traverse/-/traverse-7.29.13.tgz",
      "integrity": "sha512-0ve0xMlFA73dgY1oyJRY6RoW+/bncdcOQqg6jjYcVfXBK90OdLXjm9R6lmRetdZVrPjXkKIoMVBqYFPjcAlZ4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/code-frame": "^7.29.7",
        "@babel/generator": "^7.29.13",
        "@babel/helper-globals": "^7.29.7",
        "@babel/parser": "^7.29.13",
        "@babel/template": "^7.29.7",
        "@babel/types": "^7.29.11",
        "debug": "^4.3.1"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@babel/types": {
      "version": "7.29.11",
      "resolved": "https://registry.npmjs.org/@babel/types/-/types-7.29.11.tgz",
      "integrity": "sha512-WCsemW40Cpc6gouC1SrY6PBaZ+oLRlEVY9XBvZBI7il/HyUrb2nJ505wE1MHEFyDZNnrWDEuy4jL50WVHfTTSQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/helper-string-parser": "^7.29.11",
        "@babel/helper-validator-identifier": "^7.29.7"
      },
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/@csstools/color-helpers": {
      "version": "5.1.0",
      "resolved": "https://registry.npmjs.org/@csstools/color-helpers/-/color-helpers-5.1.0.tgz",
      "integrity": "sha512-S11EXWJyy0Mz5SYvRmY8nJYTFFd1LCNV+7cXyAgQtOOuzb4EsgfqDufL+9esx72/eLhsRdGZwaldu/h+E4t4BA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/csstools"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/csstools"
        }
      ],
      "license": "MIT-0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@csstools/css-calc": {
      "version": "2.1.4",
      "resolved": "https://registry.npmjs.org/@csstools/css-calc/-/css-calc-2.1.4.tgz",
      "integrity": "sha512-3N8oaj+0juUw/1H3YwmDDJXCgTB1gKU6Hc/bB502u9zR0q2vd786XJH9QfrKIEgFlZmhZiq6epXl4rHqhzsIgQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/csstools"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/csstools"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@csstools/css-parser-algorithms": "^3.0.5",
        "@csstools/css-tokenizer": "^3.0.4"
      }
    },
    "node_modules/@csstools/css-color-parser": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/@csstools/css-color-parser/-/css-color-parser-3.1.0.tgz",
      "integrity": "sha512-nbtKwh3a6xNVIp/VRuXV64yTKnb1IjTAEEh3irzS+HkKjAOYLTGNb9pmVNntZ8iVBHcWDA2Dof0QtPgFI1BaTA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/csstools"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/csstools"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "@csstools/color-helpers": "^5.1.0",
        "@csstools/css-calc": "^2.1.4"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@csstools/css-parser-algorithms": "^3.0.5",
        "@csstools/css-tokenizer": "^3.0.4"
      }
    },
    "node_modules/@csstools/css-parser-algorithms": {
      "version": "3.0.5",
      "resolved": "https://registry.npmjs.org/@csstools/css-parser-algorithms/-/css-parser-algorithms-3.0.5.tgz",
      "integrity": "sha512-DaDeUkXZKjdGhgYaHNJTV9pV7Y9B3b644jCLs9Upc3VeNGg6LWARAT6O+Q+/COo+2gg/bM5rhpMAtf70WqfBdQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/csstools"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/csstools"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@csstools/css-tokenizer": "^3.0.4"
      }
    },
    "node_modules/@csstools/css-tokenizer": {
      "version": "3.0.4",
      "resolved": "https://registry.npmjs.org/@csstools/css-tokenizer/-/css-tokenizer-3.0.4.tgz",
      "integrity": "sha512-Vd/9EVDiu6PPJt9yAh6roZP6El1xHrdvIVGjyBsHR0RYwNHgL7FJPyIIW4fANJNG6FtyZfvlRPpFI4ZM/lubvw==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/csstools"
        },
        {
          "type": "opencollective",
          "url": "https://opencollective.com/csstools"
        }
      ],
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/aix-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/aix-ppc64/-/aix-ppc64-0.28.2.tgz",
      "integrity": "sha512-XExcO+dvLKvVtNTibSTBej1NCAbaGhWn9Ww1ZPx80qsahhPFe/8jgWP0IchNe0F3HwkU7n8ejhH8bjonqht8mQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "aix"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm/-/android-arm-0.28.2.tgz",
      "integrity": "sha512-kXXoiPVVGQcnIYGOeaovwOURpniDBpSq4A03qkQ+BMQqtGG6HYap3xne9C1O1yo4TR3qxlCX5IqqmX6fFo2Lqg==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-arm64/-/android-arm64-0.28.2.tgz",
      "integrity": "sha512-5YfKeeI8qWfBZIX+u2xZC3Zlb3Os/gLS2sbEKM+I4ZOcsWmHS2WLysCcQZDAFRslDUU5Oiq44gf6PYN1vGwG5A==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/android-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/android-x64/-/android-x64-0.28.2.tgz",
      "integrity": "sha512-O387ite7SzUyCcy3JQX4P4bLtEA7bLLkx+esve5JHnyYfNTxcVpXZo9jhdB0lTKN44gztELTdU7nS8Nr16Fs1Q==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-arm64/-/darwin-arm64-0.28.2.tgz",
      "integrity": "sha512-n4KqkOQrraxHJcgjM1RvwbigfQKIKJVpM7xp+KsxiyUSrRdIXnt73VhrPAx0fV44hgfmIVKjxMN9J1t5jySVkw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/darwin-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/darwin-x64/-/darwin-x64-0.28.2.tgz",
      "integrity": "sha512-uq6suIWYP37qzGddBKPw5QEQPi6HiLGsO7UmkpfyaYNQ3D+rN6w6WfwH+nuqcGXWvawGwxOEroO4YGnFh95azw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-arm64/-/freebsd-arm64-0.28.2.tgz",
      "integrity": "sha512-n+I0BTSRIoy+d6RPKnEVwql5UwBJolytvY4mAOIEJorKlqgPII8ix6slVVrfZ5Tnj7glIZvloylbB/EJPMWEXw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/freebsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/freebsd-x64/-/freebsd-x64-0.28.2.tgz",
      "integrity": "sha512-78XJTJkvPs0kz2w61301PJjXl4g7q3JqiYMZ/M/yVI73EHBrCRTgkhu9oqG7vPqq+a/yadEW8aD+agKlk5xrmg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm/-/linux-arm-0.28.2.tgz",
      "integrity": "sha512-XlDnu2q5yoqems+xay6wSAcg9DDD7K9RLKZEBOMZm3ckNpJBvOX20tSfby8KfrrhINDyv9V2YVZKY/SpoGJI8w==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-arm64/-/linux-arm64-0.28.2.tgz",
      "integrity": "sha512-pW4AC0P3it8c7do9MVM4p51FzHzdM/TZrerurgRcHJ2WTa1VQ1CIq18xncfpBJw4ojkiZZrKW2yIBWBP92j6Ug==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ia32/-/linux-ia32-0.28.2.tgz",
      "integrity": "sha512-CYbnj78HsIeA+DhgUKgFCfvNsTHFhMMrinUrMZpDXJXKN8T3XViTZ/+wtHeVxEWY8ewSzTFN+nRmSwO2tZaLUQ==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-loong64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-loong64/-/linux-loong64-0.28.2.tgz",
      "integrity": "sha512-buwkd8nsph4R+ajRvw0qM5Hja/TXQow3ptzWO2EbG/cqcIkHloRrdlBtQlshyYGTNFvfkfJ5tpPLVkY4DtsPfQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-mips64el": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-mips64el/-/linux-mips64el-0.28.2.tgz",
      "integrity": "sha512-ZVykbDyk7519VwiNb9Lcj9m8XM6v5V9uKPvrEMkkEedVewf+0itkhahp4HDpgERXhwLRpWFypsGbG/J8s0QjJA==",
      "cpu": [
        "mips64el"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-ppc64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-ppc64/-/linux-ppc64-0.28.2.tgz",
      "integrity": "sha512-CAXl+Dtd9UUuJd8pKKdwh6MLm3MUMiqMPmhZ3tTSXPqfyQ3vDl6R5hZdZ/kYojK4ofXtdfSv1tFq8XzWx3heNQ==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-riscv64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-riscv64/-/linux-riscv64-0.28.2.tgz",
      "integrity": "sha512-GeXCej4IQtU1B+QlDV8W/RRvbzI3O/Stss+/bCXv4lZls5WGRtu2a+3JkA3i4qIUlMXpcHebWpF8AkJhATowuA==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-s390x": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-s390x/-/linux-s390x-0.28.2.tgz",
      "integrity": "sha512-3H1weTYZPxt/WOhByszQZybS9w5lKzUn1FDMsgEChbHWQwHYQQRfBxgCcZvPhjHfKyJjIievvMmEUawJrdY9Dg==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/linux-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/linux-x64/-/linux-x64-0.28.2.tgz",
      "integrity": "sha512-4xTZr1FUmSoQW4XIWmit3tzQrUTZM+N3P0XV8xROKYF50XfI7xeO90+1bZvNwxIufQ9hDQVRJH5YhgPVF8A/HQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-arm64/-/netbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-sSATRjPeDBg3pdgHoQfoYBob11Kk1FGa9lui5RIHZCoCkJa9QKlvl3/vKz2usCmYYjs7ymJR/2Nnsqe+Hjt5nw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/netbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/netbsd-x64/-/netbsd-x64-0.28.2.tgz",
      "integrity": "sha512-lqnzCV+mM0gIADaKihiCg6ifgfU2L3h5E33rNQBN1Y4MaVGnzryzmvvf7UHxprpQdE8hpqLolJ9Rl+SkIRDpyw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "netbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-arm64/-/openbsd-arm64-0.28.2.tgz",
      "integrity": "sha512-AL2qJILH7lNjrDmCQDvdxMfAUIv8KMNZOvrwAQ8i8//ntL9FflhOyMJ8OZSMBb8/AWXe3/5v5S20y3zCoZWKoQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openbsd-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openbsd-x64/-/openbsd-x64-0.28.2.tgz",
      "integrity": "sha512-QtiuPytchRyC4rwUKhexJdQKvDuZ6hWloi3igqPQNUJCS1/v9EiO3UTOXR6A3FoMo4fnAKbWJdqaIwhOzh8qEw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/openharmony-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/openharmony-arm64/-/openharmony-arm64-0.28.2.tgz",
      "integrity": "sha512-WkhYDmpTjLvGlScA1rwjRUmhl4k8oXR3cIbtqWmELgU/dFeHHlEllxDvdWcNJV9rbzCexB5vz8gtNewWLgCT7Q==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/sunos-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/sunos-x64/-/sunos-x64-0.28.2.tgz",
      "integrity": "sha512-GPMSkTOtMnv2U2F8gxe4Io6qmVs+YKyp832Etqqxr0hFngmXQ3rzwytelm3GIn7T4VviRUlf3sOgBOiTdvaf7g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "sunos"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-arm64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-arm64/-/win32-arm64-0.28.2.tgz",
      "integrity": "sha512-PIhhEkE9uPBleRBrQEJpUn7MBnibZzbGzYWPmY3x+YoVg/95zbjB4CxPPOQ8l5tYYM4mMaCthF8/1DIfBQQyWQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-ia32": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-ia32/-/win32-ia32-0.28.2.tgz",
      "integrity": "sha512-YmJbfTlvU7Sdn9BB+4PRES4oB6pxgS37MAONj+hBr/cpXS1aBPKXxNnDbu+QCWPj0o9dgyxeq79g6c5P8KeuYA==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@esbuild/win32-x64": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/@esbuild/win32-x64/-/win32-x64-0.28.2.tgz",
      "integrity": "sha512-5ebpxr3nWMzrL/rnUI755Jkuee0bHL/Gq0WTF9lvcpv73wAp5eu8MfBUgWK9bhWvZjj7yX8etf/8tI8Ney695g==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ],
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@jridgewell/gen-mapping": {
      "version": "0.3.13",
      "resolved": "https://registry.npmjs.org/@jridgewell/gen-mapping/-/gen-mapping-0.3.13.tgz",
      "integrity": "sha512-2kkt/7niJ6MgEPxF0bYdQ6etZaA+fQvDcLKckhy1yIQOzaoKjBBjSj63/aLVjYE3qhRt5dvM+uUyfCg6UKCBbA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.0",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/remapping": {
      "version": "2.3.5",
      "resolved": "https://registry.npmjs.org/@jridgewell/remapping/-/remapping-2.3.5.tgz",
      "integrity": "sha512-LI9u/+laYG4Ds1TDKSJW2YPrIlcVYOwi2fUC6xB43lueCjgxV4lffOCZCtYFiH6TNOX+tQKXx97T4IKHbhyHEQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.5",
        "@jridgewell/trace-mapping": "^0.3.24"
      }
    },
    "node_modules/@jridgewell/resolve-uri": {
      "version": "3.1.2",
      "resolved": "https://registry.npmjs.org/@jridgewell/resolve-uri/-/resolve-uri-3.1.2.tgz",
      "integrity": "sha512-bRISgCIjP20/tbWSPWMEi54QVPRZExkuD9lJL+UIxUKtwVJA8wW1Trb1jMs1RFXo1CBTNZ/5hpC9QvmKWdopKw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/@jridgewell/sourcemap-codec": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/@jridgewell/sourcemap-codec/-/sourcemap-codec-1.6.0.tgz",
      "integrity": "sha512-T7jf+5zgsZHwNJ4lvQ7/aezbyk0nNX+zJVWpmHA7VYsEx7a7qr5Rg5IbtJFqkgze5Y2sruq1RUY8Q837Od7iFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@jridgewell/trace-mapping": {
      "version": "0.3.31",
      "resolved": "https://registry.npmjs.org/@jridgewell/trace-mapping/-/trace-mapping-0.3.31.tgz",
      "integrity": "sha512-zzNR+SdQSDJzc8joaeP8QQoCQr8NuYx2dIIytl1QeBEZHJ9uW6hebsrYgbz8hJwUQao3TWCMtmfV8Nu1twOLAw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/resolve-uri": "^3.1.0",
        "@jridgewell/sourcemap-codec": "^1.4.14"
      }
    },
    "node_modules/@nodelib/fs.scandir": {
      "version": "2.1.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.scandir/-/fs.scandir-2.1.5.tgz",
      "integrity": "sha512-vq24Bq3ym5HEQm2NKCr3yXDwjc7vTsEThRDnkp2DK9p1uqLR+DHurm/NOTo0KG7HYHU7eppKZj3MyqYuMBf62g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "2.0.5",
        "run-parallel": "^1.1.9"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.stat": {
      "version": "2.0.5",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.stat/-/fs.stat-2.0.5.tgz",
      "integrity": "sha512-RkhPPp2zrqDAQA/2jNhnztcPAlv64XdhIp7a7454A5ovI7Bukxgt7MX7udwAu3zg1DcpPU0rz3VV1SeaqvY4+A==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@nodelib/fs.walk": {
      "version": "1.2.8",
      "resolved": "https://registry.npmjs.org/@nodelib/fs.walk/-/fs.walk-1.2.8.tgz",
      "integrity": "sha512-oGB+UxlgWcgQkgwo8GcEGwemoTFt3FIO9ababBmaGwXIoBKZ+GTy0pP185beGg7Llih/NSHSV2XAs1lnznocSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.scandir": "2.1.5",
        "fastq": "^1.6.0"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/@rolldown/pluginutils": {
      "version": "1.0.0-rc.3",
      "resolved": "https://registry.npmjs.org/@rolldown/pluginutils/-/pluginutils-1.0.0-rc.3.tgz",
      "integrity": "sha512-eybk3TjzzzV97Dlj5c+XrBFW57eTNhzod66y9HrBlzJ6NsCrWCp/2kaPS3K9wJmurBC0Tdw4yPjXKZqlznim3Q==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@rollup/rollup-android-arm-eabi": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm-eabi/-/rollup-android-arm-eabi-4.68.2.tgz",
      "integrity": "sha512-ItKrNMkEL3hy85kLBXwB0+M6CWWVI8vr7RV+Eb7oDlQIMXLaiEhGfdaj5jAUadYn2v3nwzAhIRl/nLyjAqV9vQ==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-arm64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-arm64/-/rollup-android-arm64-4.68.2.tgz",
      "integrity": "sha512-dCkT8BMPLo6X6GCFVtuzrnr981PpJSeK4ZO/d/mZdJ/ao61Qa1Usd/OHIQ69MQgw4qQclR/X6uRRUONiWwD8cw==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-android-x64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-android-x64/-/rollup-android-x64-4.68.2.tgz",
      "integrity": "sha512-p2jkKiscqQOGmyL6qu+KvJctvBc3SQTd+Xi2lQYn5QvFLEWz+QI8Z9iI+xcIjez6vKRsSnWP56Y3Ep7g3Stiug==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "android"
      ]
    },
    "node_modules/@rollup/rollup-darwin-arm64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-arm64/-/rollup-darwin-arm64-4.68.2.tgz",
      "integrity": "sha512-aVIfOteo5zoX8aL742H/S3QsyN6aokNYjdzrLnQBKxgRVoh4cibTErpi61RzSmrv2hBzDB1i751hwwdc8QK0vQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-darwin-x64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-darwin-x64/-/rollup-darwin-x64-4.68.2.tgz",
      "integrity": "sha512-+Wuf4TFTHiE/WnjKgH1SkNf/9D5ddoed1UR0p3jxjNAGemdeeQRL+r1bJ1LlZyha0VKDBYLB2U/a9a9KlSw4Kw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-arm64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-arm64/-/rollup-freebsd-arm64-4.68.2.tgz",
      "integrity": "sha512-feKK2dc13j/6D9mAp7XKhBM/VUqn0N/xRgP6rT7/mdRVVJUaeZ4lsJ9hN90aTi0k3OD+mkjlcN01vQ96Ac9VzQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-freebsd-x64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-freebsd-x64/-/rollup-freebsd-x64-4.68.2.tgz",
      "integrity": "sha512-s1oGXPGX1PNqdi9TLWD+RwtPEYf/BOTbCcq4anJBqNbzyjucti86ldYH37eKvsyTP7Bl5/Hf8XmbIxCz/iafTA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "freebsd"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-gnueabihf": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-gnueabihf/-/rollup-linux-arm-gnueabihf-4.68.2.tgz",
      "integrity": "sha512-ksR3ZmzHrm6HOUP8UlDBy5hNTcG9cEIa3EyGnxn5BjorLRjBh4ucxhwjwwVEm0dqcIN4Egc/XjDUiPQwN1ic9A==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm-musleabihf": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm-musleabihf/-/rollup-linux-arm-musleabihf-4.68.2.tgz",
      "integrity": "sha512-STZVVBM35wULVsQah0xKfCBQMPpHliOfjnRaUNT35jrbpfapUrD8ix6Yhl7tLHW0xQSWotXSSghjUi/DclwRSw==",
      "cpu": [
        "arm"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-gnu/-/rollup-linux-arm64-gnu-4.68.2.tgz",
      "integrity": "sha512-Fm/GPC2R0zlJYQIp9aY9L1lO2z+P+UrcvXG6fhubfo/BbMOLZlLXshnbECOTqr3pxfZFb6nNn0QgDETDtrX7TQ==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-arm64-musl": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-arm64-musl/-/rollup-linux-arm64-musl-4.68.2.tgz",
      "integrity": "sha512-VoqlckWcwNF3WqsUkLZg91zYFgBvrC37Lc5e8AU+BKdCUFDMPoN0Rsin/LvF+rBVF527gWo5KT0oHkaAZaL1GA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-gnu/-/rollup-linux-loong64-gnu-4.68.2.tgz",
      "integrity": "sha512-Zr8X/SUf7Jjwxt99BqPDF/Wq+sz4oUBIP6HBaFQWwb8wO1nV6LBIpD6jB9cMybLho93Z+B8rrN0uXEL6oNOUJQ==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-loong64-musl": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-loong64-musl/-/rollup-linux-loong64-musl-4.68.2.tgz",
      "integrity": "sha512-2EhrYEJNXIyhSZESwm/kCke1tiH7QAPOU3v3MsLM9J+Nfn2QCDe/pGROUAvYFK0BL2MEbzNgfrqrbnE5CFXkLw==",
      "cpu": [
        "loong64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-gnu/-/rollup-linux-ppc64-gnu-4.68.2.tgz",
      "integrity": "sha512-IC0dYuEQknw0m2FYBNBKlbrgBJBH5OMRiaRfCc4CFSpYnmDnqTpNSv+TgX+loezGTdRjBNZuYZi3t+Oc5NxNYg==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-ppc64-musl": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-ppc64-musl/-/rollup-linux-ppc64-musl-4.68.2.tgz",
      "integrity": "sha512-Zlzm6fGuDvtAqMEl071/g17vxq6u2Y2v/rON/gDY4NvzWLJ41BGAlwhF3QuAzwq05zIPo4LYzdqwhx3oisYCUw==",
      "cpu": [
        "ppc64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-gnu/-/rollup-linux-riscv64-gnu-4.68.2.tgz",
      "integrity": "sha512-KhEpYRtHZ3Kj4shavjXeH+K1bQlA6UbP6MJ45rMPF/11JlZb1SRNLeuWCdigUEoMMaFO4+LwwcS+ew1SoLJu/g==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-riscv64-musl": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-riscv64-musl/-/rollup-linux-riscv64-musl-4.68.2.tgz",
      "integrity": "sha512-LPn9qvPsM/Ofd6Ekq3im6nB8Tk1ruJhTd3x/2bJkTR8m/XTsfxA+EU0RJ23WJqgJg123kitHAqbEK7B4cL1uPg==",
      "cpu": [
        "riscv64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-s390x-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-s390x-gnu/-/rollup-linux-s390x-gnu-4.68.2.tgz",
      "integrity": "sha512-Q1+E+pzSP+FiXuIZtxKR+pK7l2KQ9gsM+VaFPv1LR277kp7l61crG46WGLKLLay3Js5cvyU9Keqdzxa1EcFO+g==",
      "cpu": [
        "s390x"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-gnu/-/rollup-linux-x64-gnu-4.68.2.tgz",
      "integrity": "sha512-3Btp4Lca/WzsmbaKu9Lh9d/XwyRDIegd/5khRBusHGw/Ll6SoF5Shn63OrjPdkLcpNi2PGDApXzNmxriRxGYjA==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-linux-x64-musl": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-linux-x64-musl/-/rollup-linux-x64-musl-4.68.2.tgz",
      "integrity": "sha512-5SKVaUiVs18+DGBnpg0mORGxgq/0udczngGxV/vf2nvK1djqpOKIxY/+8rBWxAbWGRE4RnnwxWabDwJN3pCwIQ==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "linux"
      ]
    },
    "node_modules/@rollup/rollup-openbsd-x64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openbsd-x64/-/rollup-openbsd-x64-4.68.2.tgz",
      "integrity": "sha512-KBpm48/lESsHgWd+dRlcy18APBYhXU4Jb6VlJoqbpWNwfpztFXwP22qVv9aHd3k1quSrmLeJwYLc7rpQ+BFZrw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openbsd"
      ]
    },
    "node_modules/@rollup/rollup-openharmony-arm64": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-openharmony-arm64/-/rollup-openharmony-arm64-4.68.2.tgz",
      "integrity": "sha512-o0D0bfRW8QGA1Ph6OzqVHMq5LRu1xkr1iM7qQIXUSFuR60ddXeDhN9UR4bUBPLYsrT46sZwwgQa51TWtBV3r5g==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "openharmony"
      ]
    },
    "node_modules/@rollup/rollup-win32-arm64-msvc": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-arm64-msvc/-/rollup-win32-arm64-msvc-4.68.2.tgz",
      "integrity": "sha512-r17kcu5kmd6WQwokYmfBnfwM/icureCWCPjpJVALcrSv5Lfy6Ggk9azxXor6hILhCHbc/4IfEiv+L5RXaOHinA==",
      "cpu": [
        "arm64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-ia32-msvc": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-ia32-msvc/-/rollup-win32-ia32-msvc-4.68.2.tgz",
      "integrity": "sha512-yUtOqq7ZrQoZ3WiHSR6QGTdOl4YgMHqXIYSBYU6siIcC0YF0pEwx7aGsPTm2mRwrmW6SMJkxzEdFm6wqXpmbNw==",
      "cpu": [
        "ia32"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-gnu": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-gnu/-/rollup-win32-x64-gnu-4.68.2.tgz",
      "integrity": "sha512-5IYoWxQGo5WECbJbImIf2w33uCHJNLv4o/FQtSyeYDed7AC6zx84NsEcGYccoI2geDEYkrxUXcsYK/6EhwVSIg==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@rollup/rollup-win32-x64-msvc": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/@rollup/rollup-win32-x64-msvc/-/rollup-win32-x64-msvc-4.68.2.tgz",
      "integrity": "sha512-ee+c14ggUiM7lg4PtCjSBYU9O9dHp4FFespRnd5yj7SilUBJCL3x3aHlB+sIqbGjcPo3pEyODASnfKJuZ26YBw==",
      "cpu": [
        "x64"
      ],
      "dev": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "win32"
      ]
    },
    "node_modules/@testing-library/dom": {
      "version": "10.4.2",
      "resolved": "https://registry.npmjs.org/@testing-library/dom/-/dom-10.4.2.tgz",
      "integrity": "sha512-yzr2S9HyAIdhz2/6qHgbs665Q7PKVcDF05vsOlHPxG1mo36gKVesdYVeDLnXgfjJ03CrKRk08knc6+E/9m8v2Q==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "@babel/code-frame": "^7.10.4",
        "@babel/runtime": "^7.12.5",
        "@types/aria-query": "^5.0.1",
        "aria-query": "5.3.0",
        "dom-accessibility-api": "^0.5.9",
        "lz-string": "^1.5.0",
        "picocolors": "1.1.1",
        "pretty-format": "^27.0.2"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/@testing-library/jest-dom": {
      "version": "6.9.1",
      "resolved": "https://registry.npmjs.org/@testing-library/jest-dom/-/jest-dom-6.9.1.tgz",
      "integrity": "sha512-zIcONa+hVtVSSep9UT3jZ5rizo2BsxgyDYU7WFD5eICBE7no3881HGeb/QkGfsJs6JTkY1aQhT7rIPC7e+0nnA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@adobe/css-tools": "^4.4.0",
        "aria-query": "^5.0.0",
        "css.escape": "^1.5.1",
        "dom-accessibility-api": "^0.6.3",
        "picocolors": "^1.1.1",
        "redent": "^3.0.0"
      },
      "engines": {
        "node": ">=14",
        "npm": ">=6",
        "yarn": ">=1"
      }
    },
    "node_modules/@testing-library/jest-dom/node_modules/dom-accessibility-api": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/dom-accessibility-api/-/dom-accessibility-api-0.6.3.tgz",
      "integrity": "sha512-7ZgogeTnjuHbo+ct10G9Ffp0mif17idi0IyWNVA/wcwcm7NPOD/WEHVP3n7n3MhXqxoIYm8d6MuZohYWIZ4T3w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@testing-library/react": {
      "version": "16.3.3",
      "resolved": "https://registry.npmjs.org/@testing-library/react/-/react-16.3.3.tgz",
      "integrity": "sha512-Uo193NgQbPMz6lrrhtRQQFcMC6Re/ELLFbbuVL30WDlZxlpZf9/lMHTAVxPRLw1q1iu9OJmR1c2BLiENRstdBg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/runtime": "^7.12.5"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "@testing-library/dom": "^10.0.0",
        "@types/react": "^18.0.0 || ^19.0.0",
        "@types/react-dom": "^18.0.0 || ^19.0.0",
        "react": "^18.0.0 || ^19.0.0",
        "react-dom": "^18.0.0 || ^19.0.0"
      },
      "peerDependenciesMeta": {
        "@types/react": {
          "optional": true
        },
        "@types/react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/@testing-library/user-event": {
      "version": "14.6.9",
      "resolved": "https://registry.npmjs.org/@testing-library/user-event/-/user-event-14.6.9.tgz",
      "integrity": "sha512-/8boTjZHNXFi8JGUI2Ev05cq0Szh0OX35Bamkq6CK1ne+l1Xm8BKE3+nGgsnFgaYk0MX67Vh59cZDsNz5lJJEg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12",
        "npm": ">=6"
      },
      "peerDependencies": {
        "@testing-library/dom": ">=7.21.4"
      }
    },
    "node_modules/@types/aria-query": {
      "version": "5.0.4",
      "resolved": "https://registry.npmjs.org/@types/aria-query/-/aria-query-5.0.4.tgz",
      "integrity": "sha512-rfT93uj5s0PRL7EzccGMs3brplhcrghnDoV26NqKhCAS1hVo+WdNsPvE/yb6ilfr5hi2MEk6d5EWJTKdxg8jVw==",
      "dev": true,
      "license": "MIT",
      "peer": true
    },
    "node_modules/@types/babel__core": {
      "version": "7.20.5",
      "resolved": "https://registry.npmjs.org/@types/babel__core/-/babel__core-7.20.5.tgz",
      "integrity": "sha512-qoQprZvz5wQFJwMDqeseRXWv3rqMvhgpbXFfVyWhbx9X47POIA6i/+dXefEmZKoAgOaTdaIgNSMqMIU61yRyzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.20.7",
        "@babel/types": "^7.20.7",
        "@types/babel__generator": "*",
        "@types/babel__template": "*",
        "@types/babel__traverse": "*"
      }
    },
    "node_modules/@types/babel__generator": {
      "version": "7.27.0",
      "resolved": "https://registry.npmjs.org/@types/babel__generator/-/babel__generator-7.27.0.tgz",
      "integrity": "sha512-ufFd2Xi92OAVPYsy+P4n7/U7e68fex0+Ee8gSG9KX7eo084CWiQ4sdxktvdl0bOPupXtVJPY19zk6EwWqUQ8lg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__template": {
      "version": "7.4.4",
      "resolved": "https://registry.npmjs.org/@types/babel__template/-/babel__template-7.4.4.tgz",
      "integrity": "sha512-h/NUaSyG5EyxBIp8YRxo4RMe2/qQgvyowRwVMzhYhBCONbW8PUsg4lkFMrhgZhUe5z3L3MiLDuvyJ/CaPa2A8A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/parser": "^7.1.0",
        "@babel/types": "^7.0.0"
      }
    },
    "node_modules/@types/babel__traverse": {
      "version": "7.28.0",
      "resolved": "https://registry.npmjs.org/@types/babel__traverse/-/babel__traverse-7.28.0.tgz",
      "integrity": "sha512-8PvcXf70gTDZBgt9ptxJ8elBeBjcLOAcOtoO/mPJjtji1+CdGbHgm77om1GrsPxsiE+uXIpNSK64UYaIwQXd4Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/types": "^7.28.2"
      }
    },
    "node_modules/@types/chai": {
      "version": "5.2.3",
      "resolved": "https://registry.npmjs.org/@types/chai/-/chai-5.2.3.tgz",
      "integrity": "sha512-Mw558oeA9fFbv65/y4mHtXDs9bPnFMZAL/jxdPFUpOHHIXX91mcgEHbS5Lahr+pwZFR8A7GQleRWeI6cGFC2UA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/deep-eql": "*",
        "assertion-error": "^2.0.1"
      }
    },
    "node_modules/@types/deep-eql": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/@types/deep-eql/-/deep-eql-4.0.2.tgz",
      "integrity": "sha512-c9h9dVVMigMPc4bwTvC5dxqtqJZwQPePsWjPlpSOnojbor6pGqdk541lfA7AqFQr5pB1BRdq0juY9db81BwyFw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@types/estree": {
      "version": "1.0.10",
      "resolved": "https://registry.npmjs.org/@types/estree/-/estree-1.0.10.tgz",
      "integrity": "sha512-lTyOMnOcmRBzdCv6/4zUZCrEhV0xrqQiUZBZtVcbmLHBXKLnN8q89v/wKRF/Q0HbwVsqbIG3o5HDoFl9sduM+g==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/@vitejs/plugin-react": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/@vitejs/plugin-react/-/plugin-react-5.2.0.tgz",
      "integrity": "sha512-YmKkfhOAi3wsB1PhJq5Scj3GXMn3WvtQ/JC0xoopuHoXSdmtdStOpFrYaT1kie2YgFBcIe64ROzMYRjCrYOdYw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@babel/core": "^7.29.0",
        "@babel/plugin-transform-react-jsx-self": "^7.27.1",
        "@babel/plugin-transform-react-jsx-source": "^7.27.1",
        "@rolldown/pluginutils": "1.0.0-rc.3",
        "@types/babel__core": "^7.20.5",
        "react-refresh": "^0.18.0"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "peerDependencies": {
        "vite": "^4.2.0 || ^5.0.0 || ^6.0.0 || ^7.0.0 || ^8.0.0"
      }
    },
    "node_modules/@vitest/expect": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/expect/-/expect-3.2.7.tgz",
      "integrity": "sha512-E8eBXaKibuvH2pSZErOjdVb5vF4PbKYcrnluBTYxEk1l/VhhwZg1kZQsdtjq+CsF5CFydf2Rdkz7jDHKSisi3w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/chai": "^5.2.2",
        "@vitest/spy": "3.2.7",
        "@vitest/utils": "3.2.7",
        "chai": "^5.2.0",
        "tinyrainbow": "^2.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/mocker": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/mocker/-/mocker-3.2.7.tgz",
      "integrity": "sha512-Trr0hYO9CM3Wj6ksWHRhK9IZpIY6wTMO5u/MqXurMxT57sWBaOPEtP3Oq60ihZuh5JsiagKfz95OcxdEP6dBrA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/spy": "3.2.7",
        "estree-walker": "^3.0.3",
        "magic-string": "^0.30.17"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      },
      "peerDependencies": {
        "msw": "^2.4.9",
        "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0"
      },
      "peerDependenciesMeta": {
        "msw": {
          "optional": true
        },
        "vite": {
          "optional": true
        }
      }
    },
    "node_modules/@vitest/pretty-format": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/pretty-format/-/pretty-format-3.2.7.tgz",
      "integrity": "sha512-KUHlwqVu0sRlhCdyPdQ/wBoTfRahjUky1MubOmYw9fWfIZy1gNoHpuaaQBPAaMaVYdQYHJLurzj8ECCj5OwTqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "tinyrainbow": "^2.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/runner": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/runner/-/runner-3.2.7.tgz",
      "integrity": "sha512-sB9y4ovltoQP+WaUPwmSxO9WIg9Ig694Di5PalVPsYHklAdE027mehpWF2SQSVq+k6sFgaivbTjTJwZLSHbedA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/utils": "3.2.7",
        "pathe": "^2.0.3",
        "strip-literal": "^3.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/snapshot": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/snapshot/-/snapshot-3.2.7.tgz",
      "integrity": "sha512-7C+MwShwtBSI5Buwoyg3s/iY1eHL9PKAf+O1wVh/TdnjXUtkoL/9YQtre90i4MtNXM6edP1wJ2zOBpfCyhIS7g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/pretty-format": "3.2.7",
        "magic-string": "^0.30.17",
        "pathe": "^2.0.3"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/spy": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/spy/-/spy-3.2.7.tgz",
      "integrity": "sha512-Q2eQGI6d2L/hBtZ0qNuKcAGid68XK6cv1xsoaIma6PaJhHPoqcEJhYpXZ/5myCMqkNgtP6UKuBhbc0nHKnrkuQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "tinyspy": "^4.0.3"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/@vitest/utils": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/@vitest/utils/-/utils-3.2.7.tgz",
      "integrity": "sha512-x6BDOd7dyo3PFLY3I9/HJ25X/6OurhGXk2/B9gOZNPF7XDVjeBK4k01lQE5uvDpbuheErh91qYuE1E2OEjK3Rw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@vitest/pretty-format": "3.2.7",
        "loupe": "^3.1.4",
        "tinyrainbow": "^2.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/agent-base": {
      "version": "7.1.4",
      "resolved": "https://registry.npmjs.org/agent-base/-/agent-base-7.1.4.tgz",
      "integrity": "sha512-MnA+YT8fwfJPgBx3m60MNqakm30XOkyIoH1y6huTQvC0PwZG7ki8NacLBcrPbNoo8vEZy7Jpuk7+jMO+CUovTQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/ansi-regex": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/ansi-regex/-/ansi-regex-5.0.1.tgz",
      "integrity": "sha512-quJQXlTSUGL2LH9SUXo8VwsY4soanhgo6LNSm84E1LBcE8s3O0wpdiRzyR9z/ZZJMlMWv37qOOb9pdJlMUEKFQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ansi-styles": {
      "version": "5.2.0",
      "resolved": "https://registry.npmjs.org/ansi-styles/-/ansi-styles-5.2.0.tgz",
      "integrity": "sha512-Cxwpt2SfTzTtXcfOlzGEee8O+c+MmUgGrNiBcXnuWxuFJHe6a5Hz7qwhwe5OgaSYI0IJvkLqWX1ASG+cJOkEiA==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "engines": {
        "node": ">=10"
      },
      "funding": {
        "url": "https://github.com/chalk/ansi-styles?sponsor=1"
      }
    },
    "node_modules/any-promise": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/any-promise/-/any-promise-1.3.0.tgz",
      "integrity": "sha512-7UvmKalWRt1wgjL1RrGxoSJW/0QZFIegpeGvZG9kjp8vrRu55XTHbwnqq2GpXm9uLbcuhxm3IqX9OB4MZR1b2A==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/anymatch": {
      "version": "3.1.3",
      "resolved": "https://registry.npmjs.org/anymatch/-/anymatch-3.1.3.tgz",
      "integrity": "sha512-KMReFUr0B4t+D+OBkjR3KYqvocp2XaSzO55UcB6mgQMd3KbcE+mWTyvVV7D/zsdEbNnV6acZUutkiHQXvTr1Rw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "normalize-path": "^3.0.0",
        "picomatch": "^2.0.4"
      },
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/arg": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/arg/-/arg-5.0.2.tgz",
      "integrity": "sha512-PYjyFOLKQ9y57JvQ6QLo8dAgNqswh8M1RMJYdQduT6xbWSgK36P/Z/v+p888pM69jMMfS8Xd8F6I1kQ/I9HUGg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/aria-query": {
      "version": "5.3.0",
      "resolved": "https://registry.npmjs.org/aria-query/-/aria-query-5.3.0.tgz",
      "integrity": "sha512-b0P0sZPKtyu8HkeRAfCq0IfURZK+SuwMjY1UXGBU27wpAiTwQAIlq56IbIO+ytk/JjS1fMR14ee5WBBfKi5J6A==",
      "dev": true,
      "license": "Apache-2.0",
      "dependencies": {
        "dequal": "^2.0.3"
      }
    },
    "node_modules/assertion-error": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/assertion-error/-/assertion-error-2.0.1.tgz",
      "integrity": "sha512-Izi8RQcffqCeNVgFigKli1ssklIbpHnCYc6AknXGYoB6grJqyeby7jv12JUQgmTAnIDnbck1uxksT4dzN3PWBA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/autoprefixer": {
      "version": "10.6.2",
      "resolved": "https://registry.npmjs.org/autoprefixer/-/autoprefixer-10.6.2.tgz",
      "integrity": "sha512-VOw9/yGTGwPPgzFcODtcv6zhEPIeIWkRSe10L2ri2f5vZ7ID7lCt6jZzRF5/ubgOZ+szYydmEF5AYsA5jxX1tA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/autoprefixer"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "browserslist": "^4.28.9",
        "caniuse-lite": "^1.0.30001810",
        "fraction.js": "^5.3.4",
        "picocolors": "^1.1.1",
        "postcss-value-parser": "^4.2.0"
      },
      "bin": {
        "autoprefixer": "bin/autoprefixer"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      },
      "peerDependencies": {
        "postcss": "^8.1.0"
      }
    },
    "node_modules/baseline-browser-mapping": {
      "version": "2.11.35",
      "resolved": "https://registry.npmjs.org/baseline-browser-mapping/-/baseline-browser-mapping-2.11.35.tgz",
      "integrity": "sha512-GNk8KX52CHqeNKGk8+7tZnQab/2k1t/BgrUHPKNdijzpEhF1saPQZHVKb6m5loSAxB39gyrTYw34Qf9CQ3u1qQ==",
      "dev": true,
      "license": "Apache-2.0",
      "bin": {
        "baseline-browser-mapping": "dist/cli.cjs"
      },
      "engines": {
        "node": ">=6.0.0"
      }
    },
    "node_modules/binary-extensions": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/binary-extensions/-/binary-extensions-2.3.0.tgz",
      "integrity": "sha512-Ceh+7ox5qe7LJuLHoY0feh3pHuUDHAcRUeyL2VYghZwfpkNIy/+8Ocg0a3UuSoYzavmylwuLWQOf3hl0jjMMIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      },
      "funding": {
        "url": "https://github.com/sponsors/sindresorhus"
      }
    },
    "node_modules/braces": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/braces/-/braces-3.0.3.tgz",
      "integrity": "sha512-yQbXgO/OSZVD2IsiLlro+7Hf6Q18EJrKSEsdoMzKePKXct3gvD8oLcOQdIzGupr5Fj+EDe8gO/lxc1BzfMpxvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fill-range": "^7.1.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/browserslist": {
      "version": "4.29.5",
      "resolved": "https://registry.npmjs.org/browserslist/-/browserslist-4.29.5.tgz",
      "integrity": "sha512-khTmKu5NGYTotqcYo8Bew2k4RAE9PuXRSFRXG2lQBrCEQHyeQ/vX6gKMxfokwywBsLiXZMnHsmWMG1pnO8J7uQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "baseline-browser-mapping": "^2.11.33",
        "caniuse-lite": "^1.0.30001819",
        "electron-to-chromium": "^1.5.464",
        "node-releases": "^2.0.60",
        "update-browserslist-db": "^1.3.4"
      },
      "bin": {
        "browserslist": "cli.js"
      },
      "engines": {
        "node": "^6 || ^7 || ^8 || ^9 || ^10 || ^11 || ^12 || >=13.7"
      }
    },
    "node_modules/cac": {
      "version": "6.7.14",
      "resolved": "https://registry.npmjs.org/cac/-/cac-6.7.14.tgz",
      "integrity": "sha512-b6Ilus+c3RrdDk+JhLKUAQfzzgLEPy6wcXqS7f/xe1EETvsDP6GORG7SFuOs6cID5YkqchW/LXZbX5bc8j7ZcQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/camelcase-css": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/camelcase-css/-/camelcase-css-2.0.1.tgz",
      "integrity": "sha512-QOSvevhslijgYwRx6Rv7zKdMF8lbRmx+uQGx2+vDc+KI/eBnsy9kit5aj23AgGu3pa4t9AgwbnXWqS+iOY+2aA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/caniuse-lite": {
      "version": "1.0.30001826",
      "resolved": "https://registry.npmjs.org/caniuse-lite/-/caniuse-lite-1.0.30001826.tgz",
      "integrity": "sha512-wTB+9tIbLro/BCXwLuNV1meHE4L9dS6dArMDwgYfNBPMYScqClHyGunhkCSDtHhe/69Xl0sHlKgBVZ+fNsYtWA==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/caniuse-lite"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "CC-BY-4.0"
    },
    "node_modules/chai": {
      "version": "5.3.3",
      "resolved": "https://registry.npmjs.org/chai/-/chai-5.3.3.tgz",
      "integrity": "sha512-4zNhdJD/iOjSH0A05ea+Ke6MU5mmpQcbQsSOkgdaUMJ9zTlDTD/GYlwohmIE2u0gaxHYiVHEn1Fw9mZ/ktJWgw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "assertion-error": "^2.0.1",
        "check-error": "^2.1.1",
        "deep-eql": "^5.0.1",
        "loupe": "^3.1.0",
        "pathval": "^2.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/check-error": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/check-error/-/check-error-2.1.3.tgz",
      "integrity": "sha512-PAJdDJusoxnwm1VwW07VWwUN1sl7smmC3OKggvndJFadxxDRyFJBX/ggnu/KE4kQAB7a3Dp8f/YXC1FlUprWmA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 16"
      }
    },
    "node_modules/chokidar": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/chokidar/-/chokidar-3.6.0.tgz",
      "integrity": "sha512-7VT13fmjotKpGipCW9JEQAusEPE+Ei8nl6/g4FBAmIm0GOOLMua9NDDo/DWp0ZAxCr3cPq5ZpBqmPAQgDda2Pw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "anymatch": "~3.1.2",
        "braces": "~3.0.2",
        "glob-parent": "~5.1.2",
        "is-binary-path": "~2.1.0",
        "is-glob": "~4.0.1",
        "normalize-path": "~3.0.0",
        "readdirp": "~3.6.0"
      },
      "engines": {
        "node": ">= 8.10.0"
      },
      "funding": {
        "url": "https://paulmillr.com/funding/"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/chokidar/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/commander": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/commander/-/commander-4.1.1.tgz",
      "integrity": "sha512-NOKm8xhkzAjzFx8B2v5OAHT+u5pRQc2UCa2Vq9jYL/31o2wi9mxBA7LIFs3sV5VSC49z6pEhfbMULvShKj26WA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/convert-source-map": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/convert-source-map/-/convert-source-map-2.0.0.tgz",
      "integrity": "sha512-Kvp459HrV2FEJ1CAsi1Ku+MY3kasH19TFykTz2xWmMeq6bk2NU3XXvfJ+Q61m0xktWwt+1HSYf3JZsTms3aRJg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cookie": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/cookie/-/cookie-1.1.1.tgz",
      "integrity": "sha512-ei8Aos7ja0weRpFzJnEA9UHJ/7XQmqglbRwnf2ATjcB9Wq874VKH9kfjjirM6UhU2/E5fFYadylyhFldcqSidQ==",
      "license": "MIT",
      "engines": {
        "node": ">=18"
      },
      "funding": {
        "type": "opencollective",
        "url": "https://opencollective.com/express"
      }
    },
    "node_modules/css.escape": {
      "version": "1.5.1",
      "resolved": "https://registry.npmjs.org/css.escape/-/css.escape-1.5.1.tgz",
      "integrity": "sha512-YUifsXXuknHlUsmlgyY0PKzgPOr7/FjCePfHNt0jxm83wHZi44VDMQ7/fGNkjY3/jV1MC+1CmZbaHzugyeRtpg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/cssstyle": {
      "version": "4.6.0",
      "resolved": "https://registry.npmjs.org/cssstyle/-/cssstyle-4.6.0.tgz",
      "integrity": "sha512-2z+rWdzbbSZv6/rhtvzvqeZQHrBaqgogqt85sqFNbabZOuFbCVFb8kPeEtZjiKkbrm395irpNKiYeFeLiQnFPg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@asamuzakjp/css-color": "^3.2.0",
        "rrweb-cssom": "^0.8.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/data-urls": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/data-urls/-/data-urls-5.0.0.tgz",
      "integrity": "sha512-ZYP5VBHshaDAiVZxjbRVcFJpc+4xGgT0bK3vzy1HLN8jTO975HEbuYzZJcHoQEY5K1a0z8YayJkyVETa08eNTg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "whatwg-mimetype": "^4.0.0",
        "whatwg-url": "^14.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/debug": {
      "version": "4.4.3",
      "resolved": "https://registry.npmjs.org/debug/-/debug-4.4.3.tgz",
      "integrity": "sha512-RGwwWnwQvkVfavKVt22FGLw+xYSdzARwm0ru6DhTVA3umU5hZc28V3kO4stgYryrTlLpuvgI9GiijltAjNbcqA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "ms": "^2.1.3"
      },
      "engines": {
        "node": ">=6.0"
      },
      "peerDependenciesMeta": {
        "supports-color": {
          "optional": true
        }
      }
    },
    "node_modules/decimal.js": {
      "version": "10.6.0",
      "resolved": "https://registry.npmjs.org/decimal.js/-/decimal.js-10.6.0.tgz",
      "integrity": "sha512-YpgQiITW3JXGntzdUmyUR1V812Hn8T1YVXhCu+wO3OpS4eU9l4YdD3qjyiKdV6mvV29zapkMeD390UVEf2lkUg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/deep-eql": {
      "version": "5.0.2",
      "resolved": "https://registry.npmjs.org/deep-eql/-/deep-eql-5.0.2.tgz",
      "integrity": "sha512-h5k/5U50IJJFpzfL6nO9jaaumfjO/f2NjK/oYB2Djzm4p9L+3T9qWpZqZ2hAbLPuuYq9wrU08WQyBTL5GbPk5Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/dequal": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/dequal/-/dequal-2.0.3.tgz",
      "integrity": "sha512-0je+qPKHEMohvfRTCEo3CrPG6cAzAYgmzKyxRiYSSDkS6eGJdyVJm7WaYA5ECaAD9wLB2T4EEeymA5aFVcYXCA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/didyoumean": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/didyoumean/-/didyoumean-1.2.2.tgz",
      "integrity": "sha512-gxtyfqMg7GKyhQmb056K7M3xszy/myH8w+B4RT+QXBQsvAOdc3XymqDDPHx1BgPgsdAA5SIifona89YtRATDzw==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/dlv": {
      "version": "1.1.3",
      "resolved": "https://registry.npmjs.org/dlv/-/dlv-1.1.3.tgz",
      "integrity": "sha512-+HlytyjlPKnIG8XuRG8WvmBP8xs8P71y+SKKS6ZXWoEgLuePxtDoUEiH7WkdePWrQ5JBpE6aoVqfZfJUQkjXwA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/dom-accessibility-api": {
      "version": "0.5.16",
      "resolved": "https://registry.npmjs.org/dom-accessibility-api/-/dom-accessibility-api-0.5.16.tgz",
      "integrity": "sha512-X7BJ2yElsnOJ30pZF4uIIDfBEVgF4XEBxL9Bxhy6dnrm5hkzqmsWHGTiHqRiITNhMyFLyAiWndIJP7Z1NTteDg==",
      "dev": true,
      "license": "MIT",
      "peer": true
    },
    "node_modules/electron-to-chromium": {
      "version": "1.5.481",
      "resolved": "https://registry.npmjs.org/electron-to-chromium/-/electron-to-chromium-1.5.481.tgz",
      "integrity": "sha512-dNUsbAP6E2S1dHIYEuN3cQ0dViThjMtpVRheGdvv5HgHFtzLi4Cu4Mbzms85YggP3Eh2VVZTl5+XxEN8ofCbmQ==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/entities": {
      "version": "6.0.1",
      "resolved": "https://registry.npmjs.org/entities/-/entities-6.0.1.tgz",
      "integrity": "sha512-aN97NXWF6AWBTahfVOIrB/NShkzi5H7F9r1s9mD3cDj4Ko5f2qhhVoYMibXF7GlLveb/D2ioWay8lxI97Ven3g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=0.12"
      },
      "funding": {
        "url": "https://github.com/fb55/entities?sponsor=1"
      }
    },
    "node_modules/es-errors": {
      "version": "1.3.0",
      "resolved": "https://registry.npmjs.org/es-errors/-/es-errors-1.3.0.tgz",
      "integrity": "sha512-Zf5H2Kxt2xjTvbJvP2ZWLEICxA6j+hAmMzIlypy4xcBg1vKVnx89Wy0GbS+kf5cwCVFFzdCFh2XSCFNULS6csw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/es-module-lexer": {
      "version": "1.7.0",
      "resolved": "https://registry.npmjs.org/es-module-lexer/-/es-module-lexer-1.7.0.tgz",
      "integrity": "sha512-jEQoCwk8hyb2AZziIOLhDqpm5+2ww5uIE6lkO/6jcOCusfk6LhMHpXXfBLXTZ7Ydyt0j4VoUQv6uGNYbdW+kBA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/esbuild": {
      "version": "0.28.2",
      "resolved": "https://registry.npmjs.org/esbuild/-/esbuild-0.28.2.tgz",
      "integrity": "sha512-HKVLS8dvII+xoKW9kmqxbRKrnWEXfJJr/FZhhJmiqIB0e053QNYFqOBouTMO/k5sID4MvCiUCvv8b9M4h32wIA==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "bin": {
        "esbuild": "bin/esbuild"
      },
      "engines": {
        "node": ">=18"
      },
      "optionalDependencies": {
        "@esbuild/aix-ppc64": "0.28.2",
        "@esbuild/android-arm": "0.28.2",
        "@esbuild/android-arm64": "0.28.2",
        "@esbuild/android-x64": "0.28.2",
        "@esbuild/darwin-arm64": "0.28.2",
        "@esbuild/darwin-x64": "0.28.2",
        "@esbuild/freebsd-arm64": "0.28.2",
        "@esbuild/freebsd-x64": "0.28.2",
        "@esbuild/linux-arm": "0.28.2",
        "@esbuild/linux-arm64": "0.28.2",
        "@esbuild/linux-ia32": "0.28.2",
        "@esbuild/linux-loong64": "0.28.2",
        "@esbuild/linux-mips64el": "0.28.2",
        "@esbuild/linux-ppc64": "0.28.2",
        "@esbuild/linux-riscv64": "0.28.2",
        "@esbuild/linux-s390x": "0.28.2",
        "@esbuild/linux-x64": "0.28.2",
        "@esbuild/netbsd-arm64": "0.28.2",
        "@esbuild/netbsd-x64": "0.28.2",
        "@esbuild/openbsd-arm64": "0.28.2",
        "@esbuild/openbsd-x64": "0.28.2",
        "@esbuild/openharmony-arm64": "0.28.2",
        "@esbuild/sunos-x64": "0.28.2",
        "@esbuild/win32-arm64": "0.28.2",
        "@esbuild/win32-ia32": "0.28.2",
        "@esbuild/win32-x64": "0.28.2"
      }
    },
    "node_modules/escalade": {
      "version": "3.2.0",
      "resolved": "https://registry.npmjs.org/escalade/-/escalade-3.2.0.tgz",
      "integrity": "sha512-WUj2qlxaQtO4g6Pq5c29GTcWGDyd8itL8zTlipgECz3JesAiiOKotd8JU6otB3PACgG6xkJUyVhboMS+bje/jA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/estree-walker": {
      "version": "3.0.3",
      "resolved": "https://registry.npmjs.org/estree-walker/-/estree-walker-3.0.3.tgz",
      "integrity": "sha512-7RUKfXgSMMkzt6ZuXmqapOurLGPPfgj6l9uRZ7lRGolvk0y2yocc35LdcxKC5PQZdn2DMqioAQ2NoWcrTKmm6g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "^1.0.0"
      }
    },
    "node_modules/expect-type": {
      "version": "1.4.0",
      "resolved": "https://registry.npmjs.org/expect-type/-/expect-type-1.4.0.tgz",
      "integrity": "sha512-KfYbmpRm0VbLjEvVa9yGwCi9GI34xvi7A/HXYWQO65CSD2u3MczUJSuwXKFIxlGsgBQizV9q5J9NHj4VG0n+pA==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=12.0.0"
      }
    },
    "node_modules/fast-glob": {
      "version": "3.3.3",
      "resolved": "https://registry.npmjs.org/fast-glob/-/fast-glob-3.3.3.tgz",
      "integrity": "sha512-7MptL8U0cqcFdzIzwOTHoilX9x5BrNqye7Z/LuC7kCMRio1EMSyqRK3BEAUD7sXRq4iT4AzTVuZdhgQ2TCvYLg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@nodelib/fs.stat": "^2.0.2",
        "@nodelib/fs.walk": "^1.2.3",
        "glob-parent": "^5.1.2",
        "merge2": "^1.3.0",
        "micromatch": "^4.0.8"
      },
      "engines": {
        "node": ">=8.6.0"
      }
    },
    "node_modules/fast-glob/node_modules/glob-parent": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-5.1.2.tgz",
      "integrity": "sha512-AOIgSQCepiJYwP3ARnGx+5VnTu2HBYdzbGP45eLw1vr3zB3vZLeyed1sC9hnbcOc9/SrMyM5RPQrkGz4aS9Zow==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.1"
      },
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/fastq": {
      "version": "1.20.3",
      "resolved": "https://registry.npmjs.org/fastq/-/fastq-1.20.3.tgz",
      "integrity": "sha512-XKv5nnLs6nLF71NgiKJLIZFLkPyIEuOselLG7ujZnGrRfQK8HpvY+WqKhAJUAdLomwVHErVS4LfxFlPq0/FTAw==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "reusify": "^1.0.4"
      }
    },
    "node_modules/fill-range": {
      "version": "7.1.1",
      "resolved": "https://registry.npmjs.org/fill-range/-/fill-range-7.1.1.tgz",
      "integrity": "sha512-YsGpe3WHLK8ZYi4tWDg2Jy3ebRz2rXowDxnld4bkQB00cc/1Zw9AWnC0i9ztDJitivtQvaI9KaLyKrc+hBW0yg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "to-regex-range": "^5.0.1"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/fraction.js": {
      "version": "5.3.4",
      "resolved": "https://registry.npmjs.org/fraction.js/-/fraction.js-5.3.4.tgz",
      "integrity": "sha512-1X1NTtiJphryn/uLQz3whtY6jK3fTqoE3ohKs0tT+Ujr1W59oopxmoEh7Lu5p6vBaPbgoM0bzveAW4Qi5RyWDQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "*"
      },
      "funding": {
        "type": "github",
        "url": "https://github.com/sponsors/rawify"
      }
    },
    "node_modules/fsevents": {
      "version": "2.3.3",
      "resolved": "https://registry.npmjs.org/fsevents/-/fsevents-2.3.3.tgz",
      "integrity": "sha512-5xoDfX+fL7faATnagmWPpbFtwh/R77WmMMqqHGS65C3vvB0YHrgF+B1YmZ3441tMj5n63k0212XNoJwzlhffQw==",
      "dev": true,
      "hasInstallScript": true,
      "license": "MIT",
      "optional": true,
      "os": [
        "darwin"
      ],
      "engines": {
        "node": "^8.16.0 || ^10.6.0 || >=11.0.0"
      }
    },
    "node_modules/function-bind": {
      "version": "1.1.2",
      "resolved": "https://registry.npmjs.org/function-bind/-/function-bind-1.1.2.tgz",
      "integrity": "sha512-7XHNxH7qX9xG5mIwxkhumTox/MIRNcOgDrxWsMt2pAr23WHp6MrRlN7FBSFpCpr+oVO0F744iUgR82nJMfG2SA==",
      "dev": true,
      "license": "MIT",
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/gensync": {
      "version": "1.0.0-beta.2",
      "resolved": "https://registry.npmjs.org/gensync/-/gensync-1.0.0-beta.2.tgz",
      "integrity": "sha512-3hN7NaskYvMDLQY55gnW3NQ+mesEAepTqlg+VEbj7zzqEMBVNhzcGYYeqFo/TlYz6eQiFcp1HcsCZO+nGgS8zg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6.9.0"
      }
    },
    "node_modules/glob-parent": {
      "version": "6.0.2",
      "resolved": "https://registry.npmjs.org/glob-parent/-/glob-parent-6.0.2.tgz",
      "integrity": "sha512-XxwI8EOhVQgWp6iDL+3b0r86f4d6AX6zSU55HfB4ydCEuXLXc5FcYeOu+nnGftS4TEju/11rt4KJPTMgbfmv4A==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "is-glob": "^4.0.3"
      },
      "engines": {
        "node": ">=10.13.0"
      }
    },
    "node_modules/hasown": {
      "version": "2.0.4",
      "resolved": "https://registry.npmjs.org/hasown/-/hasown-2.0.4.tgz",
      "integrity": "sha512-T2UbfbBEF32wiepXIsMlTW9+dDYC6wMh/t/vYA4tuOMKqWz/n3vr1NFSxQiyP+zk2mXsoMA/i/7qV6LKut1t1A==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "function-bind": "^1.1.2"
      },
      "engines": {
        "node": ">= 0.4"
      }
    },
    "node_modules/html-encoding-sniffer": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/html-encoding-sniffer/-/html-encoding-sniffer-4.0.0.tgz",
      "integrity": "sha512-Y22oTqIU4uuPgEemfz7NDJz6OeKf12Lsu+QC+s3BVpda64lTiMYCyGwg5ki4vFxkMwQdeZDl2adZoqUgdFuTgQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "whatwg-encoding": "^3.1.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/http-proxy-agent": {
      "version": "7.0.2",
      "resolved": "https://registry.npmjs.org/http-proxy-agent/-/http-proxy-agent-7.0.2.tgz",
      "integrity": "sha512-T1gkAiYYDWYx3V5Bmyu7HcfcvL7mUrTWiM6yOfa3PIphViJ/gFPbvidQ+veqSOHci/PxBcDabeUNCzpOODJZig==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.0",
        "debug": "^4.3.4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/https-proxy-agent": {
      "version": "7.0.6",
      "resolved": "https://registry.npmjs.org/https-proxy-agent/-/https-proxy-agent-7.0.6.tgz",
      "integrity": "sha512-vK9P5/iUfdl95AI+JVyUuIcVtd4ofvtrOr3HNtM2yxC9bnMbEdp3x01OhQNnjb8IJYi38VlTE3mBXwcfvywuSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "agent-base": "^7.1.2",
        "debug": "4"
      },
      "engines": {
        "node": ">= 14"
      }
    },
    "node_modules/iconv-lite": {
      "version": "0.6.3",
      "resolved": "https://registry.npmjs.org/iconv-lite/-/iconv-lite-0.6.3.tgz",
      "integrity": "sha512-4fCk79wshMdzMp2rH06qWrJE4iolqLhCUH+OiuIgU++RB0+94NlDL81atO7GX55uUKueo0txHNtvEyI6D7WdMw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "safer-buffer": ">= 2.1.2 < 3.0.0"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/indent-string": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/indent-string/-/indent-string-4.0.0.tgz",
      "integrity": "sha512-EdDDZu4A2OyIK7Lr/2zG+w5jmbuk1DVBnEwREQvBzspBJkCEbRa8GxU1lghYcaGJCnRWibjDXlq779X1/y5xwg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-binary-path": {
      "version": "2.1.0",
      "resolved": "https://registry.npmjs.org/is-binary-path/-/is-binary-path-2.1.0.tgz",
      "integrity": "sha512-ZMERYes6pDydyuGidse7OsHxtbI7WVeUEozgR/g7rd0xUimYNlvZRE/K2MgZTjWy725IfelLeVcEM97mmtRGXw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "binary-extensions": "^2.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/is-core-module": {
      "version": "2.18.0",
      "resolved": "https://registry.npmjs.org/is-core-module/-/is-core-module-2.18.0.tgz",
      "integrity": "sha512-qyax9fgaKOEC4qK8WZn7Q4IcoZC9RC1O1fFxRcRTq/oMMkWT/uXpqpXa12kzWR409zAt1drYN9N9BO26UmBCmw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "hasown": "^2.0.4"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/is-extglob": {
      "version": "2.1.1",
      "resolved": "https://registry.npmjs.org/is-extglob/-/is-extglob-2.1.1.tgz",
      "integrity": "sha512-SbKbANkN603Vi4jEZv49LeVJMn4yGwsbzZworEoyEiutsN3nJYdbO36zfhGJ6QEDpOZIFkDtnq5JRxmvl3jsoQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-glob": {
      "version": "4.0.3",
      "resolved": "https://registry.npmjs.org/is-glob/-/is-glob-4.0.3.tgz",
      "integrity": "sha512-xelSayHH36ZgE7ZWhli7pW34hNbNl8Ojv5KVmkJD4hBdD3th8Tfk9vYasLM+mXWOZhFkgZfxhLSnrwRr4elSSg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-extglob": "^2.1.1"
      },
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/is-number": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/is-number/-/is-number-7.0.0.tgz",
      "integrity": "sha512-41Cifkg6e8TylSpdtTpeLVMqvSBEVzTttHvERD741+pnZ8ANv0004MRL43QKPDlK9cGvNp6NZWZUBlbGXYxxng==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.12.0"
      }
    },
    "node_modules/is-potential-custom-element-name": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/is-potential-custom-element-name/-/is-potential-custom-element-name-1.0.1.tgz",
      "integrity": "sha512-bCYeRA2rVibKZd+s2625gGnGF/t7DSqDs4dP7CrLA1m7jKWz6pps0LpYLJN8Q64HtmPKJ1hrN3nzPNKFEKOUiQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jiti": {
      "version": "1.21.7",
      "resolved": "https://registry.npmjs.org/jiti/-/jiti-1.21.7.tgz",
      "integrity": "sha512-/imKNG4EbWNrVjoNC/1H5/9GFy+tqjGBHCaSsN+P2RnPqjsLmv6UD3Ej+Kj8nBWaRAwyk7kK5ZUc+OEatnTR3A==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jiti": "bin/jiti.js"
      }
    },
    "node_modules/js-tokens": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-4.0.0.tgz",
      "integrity": "sha512-RdJUflcE3cUzKiMqQgsCu06FPu9UdIJO0beYbPhHN4k6apgJtifcoCtT9bcxOpYBtpD2kCM6Sbzg4CausW/PKQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/jsdom": {
      "version": "26.1.0",
      "resolved": "https://registry.npmjs.org/jsdom/-/jsdom-26.1.0.tgz",
      "integrity": "sha512-Cvc9WUhxSMEo4McES3P7oK3QaXldCfNWp7pl2NNeiIFlCoLr3kfq9kb1fxftiwk1FLV7CvpvDfonxtzUDeSOPg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cssstyle": "^4.2.1",
        "data-urls": "^5.0.0",
        "decimal.js": "^10.5.0",
        "html-encoding-sniffer": "^4.0.0",
        "http-proxy-agent": "^7.0.2",
        "https-proxy-agent": "^7.0.6",
        "is-potential-custom-element-name": "^1.0.1",
        "nwsapi": "^2.2.16",
        "parse5": "^7.2.1",
        "rrweb-cssom": "^0.8.0",
        "saxes": "^6.0.0",
        "symbol-tree": "^3.2.4",
        "tough-cookie": "^5.1.1",
        "w3c-xmlserializer": "^5.0.0",
        "webidl-conversions": "^7.0.0",
        "whatwg-encoding": "^3.1.1",
        "whatwg-mimetype": "^4.0.0",
        "whatwg-url": "^14.1.1",
        "ws": "^8.18.0",
        "xml-name-validator": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      },
      "peerDependencies": {
        "canvas": "^3.0.0"
      },
      "peerDependenciesMeta": {
        "canvas": {
          "optional": true
        }
      }
    },
    "node_modules/jsesc": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/jsesc/-/jsesc-3.1.0.tgz",
      "integrity": "sha512-/sM3dO2FOzXjKQhJuo0Q173wf2KOo8t4I8vHy6lF9poUp7bKT0/NHE8fPX23PwfhnykfqnC2xRxOnVw5XuGIaA==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "jsesc": "bin/jsesc"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/json5": {
      "version": "2.2.3",
      "resolved": "https://registry.npmjs.org/json5/-/json5-2.2.3.tgz",
      "integrity": "sha512-XmOWe7eyHYH14cLdVPoyg+GOH3rYX++KpzrylJwSW98t3Nk+U8XOl8FWKOgwtzdb8lXGf6zYwDUzeHMWfxasyg==",
      "dev": true,
      "license": "MIT",
      "bin": {
        "json5": "lib/cli.js"
      },
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/lilconfig": {
      "version": "3.1.5",
      "resolved": "https://registry.npmjs.org/lilconfig/-/lilconfig-3.1.5.tgz",
      "integrity": "sha512-aRAOI9Ia43ygL4o1EOmC/sc/0OFxrm7qcQngiIyWaqVnSnz932ybJ07zyCcgMNGSDP8Yxaf88Xj1zHEXmvQ4SA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14"
      },
      "funding": {
        "url": "https://github.com/sponsors/antonk52"
      }
    },
    "node_modules/lines-and-columns": {
      "version": "1.2.4",
      "resolved": "https://registry.npmjs.org/lines-and-columns/-/lines-and-columns-1.2.4.tgz",
      "integrity": "sha512-7ylylesZQ/PV29jhEDl3Ufjo6ZX7gCqJr5F7PKrqc93v7fzSymt1BpwEU8nAUXs8qzzvqhbjhK5QZg6Mt/HkBg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/loupe": {
      "version": "3.2.1",
      "resolved": "https://registry.npmjs.org/loupe/-/loupe-3.2.1.tgz",
      "integrity": "sha512-CdzqowRJCeLU72bHvWqwRBBlLcMEtIvGrlvef74kMnV2AolS9Y8xUv1I0U/MNAWMhBlKIoyuEgoJ0t/bbwHbLQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/lru-cache": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/lru-cache/-/lru-cache-5.1.1.tgz",
      "integrity": "sha512-KpNARQA3Iwv+jTA0utUVVbrh+Jlrr1Fv0e56GGzAFOXN7dk/FviaDW8LHmK52DlcH4WP2n6gI8vN1aesBFgo9w==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "yallist": "^3.0.2"
      }
    },
    "node_modules/lucide-react": {
      "version": "0.468.0",
      "resolved": "https://registry.npmjs.org/lucide-react/-/lucide-react-0.468.0.tgz",
      "integrity": "sha512-6koYRhnM2N0GGZIdXzSeiNwguv1gt/FAjZOiPl76roBi3xKEXa4WmfpxgQwTTL4KipXjefrnf3oV4IsYhi4JFA==",
      "license": "ISC",
      "peerDependencies": {
        "react": "^16.5.1 || ^17.0.0 || ^18.0.0 || ^19.0.0-rc"
      }
    },
    "node_modules/lz-string": {
      "version": "1.5.0",
      "resolved": "https://registry.npmjs.org/lz-string/-/lz-string-1.5.0.tgz",
      "integrity": "sha512-h5bgJWpxJNswbU7qCrV0tIKQCaS3blPDrqKWx+QxzuzL1zGUzij9XCWLrSLsJPu5t+eWA/ycetzYAO5IOMcWAQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "bin": {
        "lz-string": "bin/bin.js"
      }
    },
    "node_modules/magic-string": {
      "version": "0.30.21",
      "resolved": "https://registry.npmjs.org/magic-string/-/magic-string-0.30.21.tgz",
      "integrity": "sha512-vd2F4YUyEXKGcLHoq+TEyCjxueSeHnFxyyjNp80yg0XV4vUhnDer/lvvlqM/arB5bXQN5K2/3oinyCRyx8T2CQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/sourcemap-codec": "^1.5.5"
      }
    },
    "node_modules/merge2": {
      "version": "1.4.1",
      "resolved": "https://registry.npmjs.org/merge2/-/merge2-1.4.1.tgz",
      "integrity": "sha512-8q7VEgMJW4J8tcfVPy8g09NcQwZdbwFEqhe/WZkoIzjn/3TGDwtOCYtXGxA3O8tPzpczCCDgv+P2P5y00ZJOOg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 8"
      }
    },
    "node_modules/micromatch": {
      "version": "4.0.8",
      "resolved": "https://registry.npmjs.org/micromatch/-/micromatch-4.0.8.tgz",
      "integrity": "sha512-PXwfBhYu0hBCPw8Dn0E+WDYb7af3dSLVWKi3HGv84IdF4TyFoC0ysxFd0Goxw7nSv4T/PzEJQxsYsEiFCKo2BA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "braces": "^3.0.3",
        "picomatch": "^2.3.1"
      },
      "engines": {
        "node": ">=8.6"
      }
    },
    "node_modules/min-indent": {
      "version": "1.0.1",
      "resolved": "https://registry.npmjs.org/min-indent/-/min-indent-1.0.1.tgz",
      "integrity": "sha512-I9jwMn07Sy/IwOj3zVkVik2JTvgpaykDZEigL6Rx6N9LbMywwUSMtxET+7lVoDLLd3O3IXwJwvuuns8UB/HeAg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/ms": {
      "version": "2.1.3",
      "resolved": "https://registry.npmjs.org/ms/-/ms-2.1.3.tgz",
      "integrity": "sha512-6FlzubTLZG3J2a/NVCAleEhjzq5oxgHyaCU9yYXvcLsvoVaHJq/s5xXI6/XXP6tz7R9xAOtHnSO/tXtF3WRTlA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/mz": {
      "version": "2.7.0",
      "resolved": "https://registry.npmjs.org/mz/-/mz-2.7.0.tgz",
      "integrity": "sha512-z81GNO7nnYMEhrGh9LeymoE4+Yr0Wn5McHIZMK5cfQCl+NDX08sCZgUc9/6MHni9IWuFLm1Z3HTCXu2z9fN62Q==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0",
        "object-assign": "^4.0.1",
        "thenify-all": "^1.0.0"
      }
    },
    "node_modules/nanoid": {
      "version": "3.3.20",
      "resolved": "https://registry.npmjs.org/nanoid/-/nanoid-3.3.20.tgz",
      "integrity": "sha512-uKdg2G3GNCKQn9byYOpxbGqrT2fGO5KRt5J/8b3pok8rT6qxGWF6hxMyJiEYtAf+FVyYuD9hRaDqX5uPFYJ4ZQ==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "bin": {
        "nanoid": "bin/nanoid.cjs"
      },
      "engines": {
        "node": "^10 || ^12 || ^13.7 || ^14 || >=15.0.1"
      }
    },
    "node_modules/node-releases": {
      "version": "2.0.63",
      "resolved": "https://registry.npmjs.org/node-releases/-/node-releases-2.0.63.tgz",
      "integrity": "sha512-6li2QanLsAXpIH2R6j77MzRyvOyrvdTqlKtO4CgBdHGNvN99ZZfyxszHc5o5+IZBWD5u6Hzwg83JoGXmqZNG9Q==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/normalize-path": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/normalize-path/-/normalize-path-3.0.0.tgz",
      "integrity": "sha512-6eZs5Ls3WtCisHWp9S2GUy8dqkpGi4BVSz3GaqiE6ezub0512ESztXUwUB6C6IKbQkY2Pnb/mD4WYojCRwcwLA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/nwsapi": {
      "version": "2.2.28",
      "resolved": "https://registry.npmjs.org/nwsapi/-/nwsapi-2.2.28.tgz",
      "integrity": "sha512-IlVB7OS7qrOsVYlpnFIkETjMwT9jwvmocJmmM+GZU/PAB3uGi9Ezd7vcWhWBUnSc0ya4ppmQITOyP1ez9gg8cg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/object-assign": {
      "version": "4.1.1",
      "resolved": "https://registry.npmjs.org/object-assign/-/object-assign-4.1.1.tgz",
      "integrity": "sha512-rJgTQnkUnH1sFw8yT6VSU3zD3sWmu6sZhIseY8VX+GRu3P6F7Fu+JNDoXfklElbLJSnc3FUQHVe4cU5hj+BcUg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/object-hash": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/object-hash/-/object-hash-3.0.0.tgz",
      "integrity": "sha512-RSn9F68PjH9HqtltsSnqYC1XXoWe9Bju5+213R98cNGttag9q9yAOTzdbsqvIa7aNm5WffBZFpWYr2aWrklWAw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/parse5": {
      "version": "7.3.0",
      "resolved": "https://registry.npmjs.org/parse5/-/parse5-7.3.0.tgz",
      "integrity": "sha512-IInvU7fabl34qmi9gY8XOVxhYyMyuH2xUNpb2q8/Y+7552KlejkRvqvD19nMoUW/uQGGbqNpA6Tufu5FL5BZgw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "entities": "^6.0.0"
      },
      "funding": {
        "url": "https://github.com/inikulin/parse5?sponsor=1"
      }
    },
    "node_modules/path-parse": {
      "version": "1.0.7",
      "resolved": "https://registry.npmjs.org/path-parse/-/path-parse-1.0.7.tgz",
      "integrity": "sha512-LDJzPVEEEPR+y48z93A0Ed0yXb8pAByGWo/k5YYdYgpY2/2EsOsksJrq7lOHxryrVOn1ejG6oAp8ahvOIQD8sw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/pathe": {
      "version": "2.0.3",
      "resolved": "https://registry.npmjs.org/pathe/-/pathe-2.0.3.tgz",
      "integrity": "sha512-WUjGcAqP1gQacoQe+OBJsFA7Ld4DyXuUIjZ5cc75cLHvJ7dtNsTugphxIADwspS+AraAUePCKrSVtPLFj/F88w==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/pathval": {
      "version": "2.0.1",
      "resolved": "https://registry.npmjs.org/pathval/-/pathval-2.0.1.tgz",
      "integrity": "sha512-//nshmD55c46FuFw26xV/xFAaB5HF9Xdap7HJBBnrKdAd6/GxDBaNA1870O79+9ueg61cZLSVc+OaFlfmObYVQ==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 14.16"
      }
    },
    "node_modules/picocolors": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/picocolors/-/picocolors-1.1.1.tgz",
      "integrity": "sha512-xceH2snhtb5M9liqDsmEw56le376mTZkEX/jEb/RxNFyegNul7eNslCXP9FDj/Lcu0X8KEyMceP2ntpaHrDEVA==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/picomatch": {
      "version": "2.3.2",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-2.3.2.tgz",
      "integrity": "sha512-V7+vQEJ06Z+c5tSye8S+nHUfI51xoXIXjHQ99cQtKUkQqqO1kO/KCJUfZXuB47h/YBlDhah2H3hdUGXn8ie0oA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=8.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/pirates": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/pirates/-/pirates-4.0.7.tgz",
      "integrity": "sha512-TfySrs/5nm8fQJDcBDuUng3VOUKsd7S+zqvbOTiGXHfxX4wK31ard+hoNuvkicM/2YFzlpDgABOevKSsB4G/FA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 6"
      }
    },
    "node_modules/postcss": {
      "version": "8.5.32",
      "resolved": "https://registry.npmjs.org/postcss/-/postcss-8.5.32.tgz",
      "integrity": "sha512-LJlKCCAUFKOuZxipUdYw1NzIITEsPcgyOG9LkvRJvuKj/bRzbuRY0ARXvL0pWGpsZvn8jku+LMep2eU0seHp8g==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/postcss"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "nanoid": "^3.3.20",
        "picocolors": "^1.1.1",
        "source-map-js": "^1.2.2"
      },
      "engines": {
        "node": "^10 || ^12 || >=14"
      }
    },
    "node_modules/postcss-import": {
      "version": "15.1.0",
      "resolved": "https://registry.npmjs.org/postcss-import/-/postcss-import-15.1.0.tgz",
      "integrity": "sha512-hpr+J05B2FVYUAXHeK1YyI267J/dDDhMU6B6civm8hSY1jYJnBXxzKDKDswzJmtLHryrjhnDjqqp/49t8FALew==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "postcss-value-parser": "^4.0.0",
        "read-cache": "^1.0.0",
        "resolve": "^1.1.7"
      },
      "engines": {
        "node": ">=14.0.0"
      },
      "peerDependencies": {
        "postcss": "^8.0.0"
      }
    },
    "node_modules/postcss-js": {
      "version": "4.1.0",
      "resolved": "https://registry.npmjs.org/postcss-js/-/postcss-js-4.1.0.tgz",
      "integrity": "sha512-oIAOTqgIo7q2EOwbhb8UalYePMvYoIeRY2YKntdpFQXNosSu3vLrniGgmH9OKs/qAkfoj5oB3le/7mINW1LCfw==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "camelcase-css": "^2.0.1"
      },
      "engines": {
        "node": "^12 || ^14 || >= 16"
      },
      "peerDependencies": {
        "postcss": "^8.4.21"
      }
    },
    "node_modules/postcss-load-config": {
      "version": "4.0.2",
      "resolved": "https://registry.npmjs.org/postcss-load-config/-/postcss-load-config-4.0.2.tgz",
      "integrity": "sha512-bSVhyJGL00wMVoPUzAVAnbEoWyqRxkjv64tUl427SKnPrENtq6hJwUojroMz2VB+Q1edmi4IfrAPpami5VVgMQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "lilconfig": "^3.0.0",
        "yaml": "^2.3.4"
      },
      "engines": {
        "node": ">= 14"
      },
      "peerDependencies": {
        "postcss": ">=8.0.9",
        "ts-node": ">=9.0.0"
      },
      "peerDependenciesMeta": {
        "postcss": {
          "optional": true
        },
        "ts-node": {
          "optional": true
        }
      }
    },
    "node_modules/postcss-nested": {
      "version": "6.2.0",
      "resolved": "https://registry.npmjs.org/postcss-nested/-/postcss-nested-6.2.0.tgz",
      "integrity": "sha512-HQbt28KulC5AJzG+cZtj9kvKB93CFCdLvog1WFLf1D+xmMvPGlBstkpTEZfK5+AN9hfJocyBFCNiqyS48bpgzQ==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/postcss/"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "postcss-selector-parser": "^6.1.1"
      },
      "engines": {
        "node": ">=12.0"
      },
      "peerDependencies": {
        "postcss": "^8.2.14"
      }
    },
    "node_modules/postcss-selector-parser": {
      "version": "6.1.6",
      "resolved": "https://registry.npmjs.org/postcss-selector-parser/-/postcss-selector-parser-6.1.6.tgz",
      "integrity": "sha512-BK87/Qgti3DIcgS2PaCVoteFIkjIFvCJBizZDIVSjdlFNg4Jv+SRqbN2JONb/qQUH4ZFqfXYF+izg15W2HVRvA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "util-deprecate": "^1.0.2"
      },
      "engines": {
        "node": ">=4"
      }
    },
    "node_modules/postcss-value-parser": {
      "version": "4.2.0",
      "resolved": "https://registry.npmjs.org/postcss-value-parser/-/postcss-value-parser-4.2.0.tgz",
      "integrity": "sha512-1NNCs6uurfkVbeXG4S8JFT9t19m45ICnif8zWLd5oPSZ50QnwMfK+H3jv408d4jw/7Bttv5axS5IiHoLaVNHeQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/pretty-format": {
      "version": "27.5.1",
      "resolved": "https://registry.npmjs.org/pretty-format/-/pretty-format-27.5.1.tgz",
      "integrity": "sha512-Qb1gy5OrP5+zDf2Bvnzdl3jsTf1qXVMazbvCoKhtKqVs4/YK4ozX4gKQJJVyNe+cajNPn0KoC0MC3FUmaHWEmQ==",
      "dev": true,
      "license": "MIT",
      "peer": true,
      "dependencies": {
        "ansi-regex": "^5.0.1",
        "ansi-styles": "^5.0.0",
        "react-is": "^17.0.1"
      },
      "engines": {
        "node": "^10.13.0 || ^12.13.0 || ^14.15.0 || >=15.0.0"
      }
    },
    "node_modules/punycode": {
      "version": "2.3.1",
      "resolved": "https://registry.npmjs.org/punycode/-/punycode-2.3.1.tgz",
      "integrity": "sha512-vYt7UD1U9Wg6138shLtLOvdAu+8DsC/ilFtEVHcH+wydcSpNE20AfSOduf6MkRFahL5FY7X1oU7nKVZFtfq8Fg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=6"
      }
    },
    "node_modules/queue-microtask": {
      "version": "1.2.3",
      "resolved": "https://registry.npmjs.org/queue-microtask/-/queue-microtask-1.2.3.tgz",
      "integrity": "sha512-NuaNSa6flKT5JaSYQzJok04JzTL1CA6aGhv5rfLW3PgqA+M2ChpZQnAC8h8i4ZFkBS8X5RqkDBHA7r4hej3K9A==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT"
    },
    "node_modules/react": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react/-/react-19.3.1.tgz",
      "integrity": "sha512-QNhWdt7nrgVWWQG58QuGsAR3jv3Hbe4mb4vz7w2csnHavciZJgda1CPNaldF6eVxv90ud3jUXpKlHL69gO38yw==",
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-dom": {
      "version": "19.3.1",
      "resolved": "https://registry.npmjs.org/react-dom/-/react-dom-19.3.1.tgz",
      "integrity": "sha512-Y0bARz53lhEC1NMCASs0/j+faB/zqt3R8hpvg1e8+61ZVJ4UL0UdC4cBbXfZMcIuhrfgeILTLe+ZeBCavQPtKQ==",
      "license": "MIT",
      "dependencies": {
        "scheduler": "^0.28.0"
      },
      "peerDependencies": {
        "react": "^19.3.1"
      }
    },
    "node_modules/react-is": {
      "version": "17.0.2",
      "resolved": "https://registry.npmjs.org/react-is/-/react-is-17.0.2.tgz",
      "integrity": "sha512-w2GsyukL62IJnlaff/nRegPQR94C/XXamvMWmSHRJ4y7Ts/4ocGRmTHvOs8PSE6pB3dWOrD/nueuU5sduBsQ4w==",
      "dev": true,
      "license": "MIT",
      "peer": true
    },
    "node_modules/react-refresh": {
      "version": "0.18.0",
      "resolved": "https://registry.npmjs.org/react-refresh/-/react-refresh-0.18.0.tgz",
      "integrity": "sha512-QgT5//D3jfjJb6Gsjxv0Slpj23ip+HtOpnNgnb2S5zU3CB26G/IDPGoy4RJB42wzFE46DRsstbW6tKHoKbhAxw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/react-router": {
      "version": "7.18.5",
      "resolved": "https://registry.npmjs.org/react-router/-/react-router-7.18.5.tgz",
      "integrity": "sha512-dTgvcXDOrLPrlLHrcZAqWveiK1hMSqN+rGAJzegP8HtmNkfRxOoshGWBNX3ZJ0cZjOHkRdlUJtaIhZMLLyGyPw==",
      "license": "MIT",
      "dependencies": {
        "cookie": "^1.0.1",
        "set-cookie-parser": "^2.6.0"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      },
      "peerDependenciesMeta": {
        "react-dom": {
          "optional": true
        }
      }
    },
    "node_modules/react-router-dom": {
      "version": "7.18.5",
      "resolved": "https://registry.npmjs.org/react-router-dom/-/react-router-dom-7.18.5.tgz",
      "integrity": "sha512-9HcfDMU6JJ/fp6gJZYGwNE6RknVGS4kBjH1HkNw959mCJi70TVwdipQWv2FEol9uGpi+SZTFtVpJPtEQfayeOw==",
      "license": "MIT",
      "dependencies": {
        "react-router": "7.18.5"
      },
      "engines": {
        "node": ">=20.0.0"
      },
      "peerDependencies": {
        "react": ">=18",
        "react-dom": ">=18"
      }
    },
    "node_modules/read-cache": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/read-cache/-/read-cache-1.0.2.tgz",
      "integrity": "sha512-/peqiBB/n07gQGLsWaHho3WfvUyRscw0gYTsEFMhrIe/nWLkYaf5SbKYjGYqtRV3aPwykJgF2VEMo1ac4bnsGA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/readdirp": {
      "version": "3.6.0",
      "resolved": "https://registry.npmjs.org/readdirp/-/readdirp-3.6.0.tgz",
      "integrity": "sha512-hOS089on8RduqdbhvQ5Z37A0ESjsqz6qnRcffsMU3495FuTdqSm+7bhJ29JvIOsBDEEnan5DPu9t3To9VRlMzA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "picomatch": "^2.2.1"
      },
      "engines": {
        "node": ">=8.10.0"
      }
    },
    "node_modules/redent": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/redent/-/redent-3.0.0.tgz",
      "integrity": "sha512-6tDA8g98We0zd0GvVeMT9arEOnTw9qM03L9cJXaCjrip1OO764RDBLBfrB4cwzNGDj5OA5ioymC9GkizgWJDUg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "indent-string": "^4.0.0",
        "strip-indent": "^3.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/resolve": {
      "version": "1.22.14",
      "resolved": "https://registry.npmjs.org/resolve/-/resolve-1.22.14.tgz",
      "integrity": "sha512-1ZjYvR9sbkiwC5+9QHetqW5HmA2pHRMaoupD01t2HlYnV/vydC2zPwLixhsMieSWVZt0JJRg5LVIk0Ow1D/TrA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "es-errors": "^1.3.0",
        "is-core-module": "^2.18.0",
        "path-parse": "^1.0.7",
        "supports-preserve-symlinks-flag": "^1.0.0"
      },
      "bin": {
        "resolve": "bin/resolve"
      },
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/reusify": {
      "version": "1.1.0",
      "resolved": "https://registry.npmjs.org/reusify/-/reusify-1.1.0.tgz",
      "integrity": "sha512-g6QUff04oZpHs0eG5p83rFLhHeV00ug/Yf9nZM6fLeUrPguBTkTQOdpAWWspMh55TZfVQDPaN3NQJfbVRAxdIw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "iojs": ">=1.0.0",
        "node": ">=0.10.0"
      }
    },
    "node_modules/rollup": {
      "version": "4.68.2",
      "resolved": "https://registry.npmjs.org/rollup/-/rollup-4.68.2.tgz",
      "integrity": "sha512-xzt45rKOxzEuqjTdkGTIEaePcq9xRELlFI1uoazlKap8T6bENJkONSCfhK51P6XFTixa4rosPcDHihSdduXndQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/estree": "^1.0.10"
      },
      "bin": {
        "rollup": "dist/bin/rollup"
      },
      "engines": {
        "node": ">=18.0.0",
        "npm": ">=8.0.0"
      },
      "optionalDependencies": {
        "@rollup/rollup-android-arm-eabi": "4.68.2",
        "@rollup/rollup-android-arm64": "4.68.2",
        "@rollup/rollup-android-x64": "4.68.2",
        "@rollup/rollup-darwin-arm64": "4.68.2",
        "@rollup/rollup-darwin-x64": "4.68.2",
        "@rollup/rollup-freebsd-arm64": "4.68.2",
        "@rollup/rollup-freebsd-x64": "4.68.2",
        "@rollup/rollup-linux-arm-gnueabihf": "4.68.2",
        "@rollup/rollup-linux-arm-musleabihf": "4.68.2",
        "@rollup/rollup-linux-arm64-gnu": "4.68.2",
        "@rollup/rollup-linux-arm64-musl": "4.68.2",
        "@rollup/rollup-linux-loong64-gnu": "4.68.2",
        "@rollup/rollup-linux-loong64-musl": "4.68.2",
        "@rollup/rollup-linux-ppc64-gnu": "4.68.2",
        "@rollup/rollup-linux-ppc64-musl": "4.68.2",
        "@rollup/rollup-linux-riscv64-gnu": "4.68.2",
        "@rollup/rollup-linux-riscv64-musl": "4.68.2",
        "@rollup/rollup-linux-s390x-gnu": "4.68.2",
        "@rollup/rollup-linux-x64-gnu": "4.68.2",
        "@rollup/rollup-linux-x64-musl": "4.68.2",
        "@rollup/rollup-openbsd-x64": "4.68.2",
        "@rollup/rollup-openharmony-arm64": "4.68.2",
        "@rollup/rollup-win32-arm64-msvc": "4.68.2",
        "@rollup/rollup-win32-ia32-msvc": "4.68.2",
        "@rollup/rollup-win32-x64-gnu": "4.68.2",
        "@rollup/rollup-win32-x64-msvc": "4.68.2",
        "fsevents": "~2.3.2"
      }
    },
    "node_modules/rrweb-cssom": {
      "version": "0.8.0",
      "resolved": "https://registry.npmjs.org/rrweb-cssom/-/rrweb-cssom-0.8.0.tgz",
      "integrity": "sha512-guoltQEx+9aMf2gDZ0s62EcV8lsXR+0w8915TC3ITdn2YueuNjdAYh/levpU9nFaoChh9RUS5ZdQMrKfVEN9tw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/run-parallel": {
      "version": "1.2.0",
      "resolved": "https://registry.npmjs.org/run-parallel/-/run-parallel-1.2.0.tgz",
      "integrity": "sha512-5l4VyZR86LZ/lDxZTR6jqL8AFE2S0IFLMP26AbjsLVADxHdhB/c0GUsH+y39UfCi3dzz8OlQuPmnaJOMoDHQBA==",
      "dev": true,
      "funding": [
        {
          "type": "github",
          "url": "https://github.com/sponsors/feross"
        },
        {
          "type": "patreon",
          "url": "https://www.patreon.com/feross"
        },
        {
          "type": "consulting",
          "url": "https://feross.org/support"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "queue-microtask": "^1.2.2"
      }
    },
    "node_modules/safer-buffer": {
      "version": "2.1.2",
      "resolved": "https://registry.npmjs.org/safer-buffer/-/safer-buffer-2.1.2.tgz",
      "integrity": "sha512-YZo3K82SD7Riyi0E1EQPojLz7kpepnSQI9IyPbHHg1XXXevb5dJI7tpyN2ADxGcQbHG7vcyRHk0cbwqcQriUtg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/saxes": {
      "version": "6.0.0",
      "resolved": "https://registry.npmjs.org/saxes/-/saxes-6.0.0.tgz",
      "integrity": "sha512-xAg7SOnEhrm5zI3puOOKyy1OMcMlIJZYNJY7xLBwSze0UjhPLnWfj2GF2EpT0jmzaJKIWKHLsaSSajf35bcYnA==",
      "dev": true,
      "license": "ISC",
      "dependencies": {
        "xmlchars": "^2.2.0"
      },
      "engines": {
        "node": ">=v12.22.7"
      }
    },
    "node_modules/scheduler": {
      "version": "0.28.0",
      "resolved": "https://registry.npmjs.org/scheduler/-/scheduler-0.28.0.tgz",
      "integrity": "sha512-juorfCmIkIw8tT+p5BXSm6PJjQF/ycEYmKyzURCIt/RaZIhL+PulbQ9Yu2z1HdOJDdqDTlxA1+xKBmHXJsczAw==",
      "license": "MIT"
    },
    "node_modules/semver": {
      "version": "6.3.2",
      "resolved": "https://registry.npmjs.org/semver/-/semver-6.3.2.tgz",
      "integrity": "sha512-GYrCADwpu6yV5OAvchkQ27Z5wwMxWAEMg5NNWjyHh/5DboFFqbdbvYNIvZouQpxXyeMPoTOh0vdPYKlf0ZswdQ==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "semver": "bin/semver.js"
      }
    },
    "node_modules/set-cookie-parser": {
      "version": "2.7.3",
      "resolved": "https://registry.npmjs.org/set-cookie-parser/-/set-cookie-parser-2.7.3.tgz",
      "integrity": "sha512-irZHtTqurLna57KQG/s+fzOwv/J6XSH4cs8M/vsrY3uCaQ3S6+QJguAH0WdN47SXlk82voMZ4naWMQf8fdEoIg==",
      "license": "MIT"
    },
    "node_modules/siginfo": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/siginfo/-/siginfo-2.0.0.tgz",
      "integrity": "sha512-ybx0WO1/8bSBLEWXZvEd7gMW3Sn3JFlW3TvX1nREbDLRNQNaeNN8WK0meBwPdAaOI7TtRRRJn/Es1zhrrCHu7g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/source-map-js": {
      "version": "1.2.2",
      "resolved": "https://registry.npmjs.org/source-map-js/-/source-map-js-1.2.2.tgz",
      "integrity": "sha512-KGj/8Y43x35aZVDtt+J4mK1hoLGHULMYfSkODJNQjNDC3oW1PqPoxMwo0pLUsWM/UEGzON/NxeHywEfNXNP3Vw==",
      "dev": true,
      "license": "BSD-3-Clause",
      "engines": {
        "node": ">=0.10.0"
      }
    },
    "node_modules/stackback": {
      "version": "0.0.2",
      "resolved": "https://registry.npmjs.org/stackback/-/stackback-0.0.2.tgz",
      "integrity": "sha512-1XMJE5fQo1jGH6Y/7ebnwPOBEkIEnT4QF32d5R1+VXdXveM0IBMJt8zfaxX1P3QhVwrYe+576+jkANtSS2mBbw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/std-env": {
      "version": "3.10.0",
      "resolved": "https://registry.npmjs.org/std-env/-/std-env-3.10.0.tgz",
      "integrity": "sha512-5GS12FdOZNliM5mAOxFRg7Ir0pWz8MdpYm6AY6VPkGpbA7ZzmbzNcBJQ0GPvvyWgcY7QAhCgf9Uy89I03faLkg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/strip-indent": {
      "version": "3.0.0",
      "resolved": "https://registry.npmjs.org/strip-indent/-/strip-indent-3.0.0.tgz",
      "integrity": "sha512-laJTa3Jb+VQpaC6DseHhF7dXVqHTfJPCRDaEbid/drOhgitgYku/letMUqOXFoWV0zIIUbjpdH2t+tYj4bQMRQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "min-indent": "^1.0.0"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/strip-literal": {
      "version": "3.1.0",
      "resolved": "https://registry.npmjs.org/strip-literal/-/strip-literal-3.1.0.tgz",
      "integrity": "sha512-8r3mkIM/2+PpjHoOtiAW8Rg3jJLHaV7xPwG+YRGrv6FP0wwk/toTpATxWYOW0BKdWwl82VT2tFYi5DlROa0Mxg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "js-tokens": "^9.0.1"
      },
      "funding": {
        "url": "https://github.com/sponsors/antfu"
      }
    },
    "node_modules/strip-literal/node_modules/js-tokens": {
      "version": "9.0.1",
      "resolved": "https://registry.npmjs.org/js-tokens/-/js-tokens-9.0.1.tgz",
      "integrity": "sha512-mxa9E9ITFOt0ban3j6L5MpjwegGz6lBQmM1IJkWeBZGcMxto50+eWdjC/52xDbS2vy0k7vIMK0Fe2wfL9OQSpQ==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/sucrase": {
      "version": "3.35.1",
      "resolved": "https://registry.npmjs.org/sucrase/-/sucrase-3.35.1.tgz",
      "integrity": "sha512-DhuTmvZWux4H1UOnWMB3sk0sbaCVOoQZjv8u1rDoTV0HTdGem9hkAZtl4JZy8P2z4Bg0nT+YMeOFyVr4zcG5Tw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@jridgewell/gen-mapping": "^0.3.2",
        "commander": "^4.0.0",
        "lines-and-columns": "^1.1.6",
        "mz": "^2.7.0",
        "pirates": "^4.0.1",
        "tinyglobby": "^0.2.11",
        "ts-interface-checker": "^0.1.9"
      },
      "bin": {
        "sucrase": "bin/sucrase",
        "sucrase-node": "bin/sucrase-node"
      },
      "engines": {
        "node": ">=16 || 14 >=14.17"
      }
    },
    "node_modules/supports-preserve-symlinks-flag": {
      "version": "1.0.0",
      "resolved": "https://registry.npmjs.org/supports-preserve-symlinks-flag/-/supports-preserve-symlinks-flag-1.0.0.tgz",
      "integrity": "sha512-ot0WnXS9fgdkgIcePe6RHNk1WA8+muPa6cSjeR3V8K27q9BB1rTE3R1p7Hv0z1ZyAc8s6Vvv8DIyWf681MAt0w==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">= 0.4"
      },
      "funding": {
        "url": "https://github.com/sponsors/ljharb"
      }
    },
    "node_modules/symbol-tree": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/symbol-tree/-/symbol-tree-3.2.4.tgz",
      "integrity": "sha512-9QNk5KwDF+Bvz+PyObkmSYjI5ksVUYtjW7AU22r2NKcfLJcXp96hkDWU3+XndOsUb+AQ9QhfzfCT2O+CNWT5Tw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tailwindcss": {
      "version": "3.4.17",
      "resolved": "https://registry.npmjs.org/tailwindcss/-/tailwindcss-3.4.17.tgz",
      "integrity": "sha512-w33E2aCvSDP0tW9RZuNXadXlkHXqFzSkQew/aIa2i/Sj8fThxwovwlXHSPXTbAHwEIhBFXAedUhP2tueAKP8Og==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@alloc/quick-lru": "^5.2.0",
        "arg": "^5.0.2",
        "chokidar": "^3.6.0",
        "didyoumean": "^1.2.2",
        "dlv": "^1.1.3",
        "fast-glob": "^3.3.2",
        "glob-parent": "^6.0.2",
        "is-glob": "^4.0.3",
        "jiti": "^1.21.6",
        "lilconfig": "^3.1.3",
        "micromatch": "^4.0.8",
        "normalize-path": "^3.0.0",
        "object-hash": "^3.0.0",
        "picocolors": "^1.1.1",
        "postcss": "^8.4.47",
        "postcss-import": "^15.1.0",
        "postcss-js": "^4.0.1",
        "postcss-load-config": "^4.0.2",
        "postcss-nested": "^6.2.0",
        "postcss-selector-parser": "^6.1.2",
        "resolve": "^1.22.8",
        "sucrase": "^3.35.0"
      },
      "bin": {
        "tailwind": "lib/cli.js",
        "tailwindcss": "lib/cli.js"
      },
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/thenify": {
      "version": "3.3.1",
      "resolved": "https://registry.npmjs.org/thenify/-/thenify-3.3.1.tgz",
      "integrity": "sha512-RVZSIV5IG10Hk3enotrhvz0T9em6cyHBLkH/YAZuKqd8hRkKhSfCGIcP2KUY0EPxndzANBmNllzWPwak+bheSw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "any-promise": "^1.0.0"
      }
    },
    "node_modules/thenify-all": {
      "version": "1.6.0",
      "resolved": "https://registry.npmjs.org/thenify-all/-/thenify-all-1.6.0.tgz",
      "integrity": "sha512-RNxQH/qI8/t3thXJDwcstUO4zeqo64+Uy/+sNVRBx4Xn2OX+OZ9oP+iJnNFqplFra2ZUVeKCSa2oVWi3T4uVmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "thenify": ">= 3.1.0 < 4"
      },
      "engines": {
        "node": ">=0.8"
      }
    },
    "node_modules/tinybench": {
      "version": "2.9.0",
      "resolved": "https://registry.npmjs.org/tinybench/-/tinybench-2.9.0.tgz",
      "integrity": "sha512-0+DUvqWMValLmha6lr4kD8iAMK1HzV0/aKnCtWb9v9641TnP/MFb7Pc2bxoxQjTXAErryXVgUOfv2YqNllqGeg==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tinyexec": {
      "version": "0.3.2",
      "resolved": "https://registry.npmjs.org/tinyexec/-/tinyexec-0.3.2.tgz",
      "integrity": "sha512-KQQR9yN7R5+OSwaK0XQoj22pwHoTlgYqmUscPYoknOoWCWfj/5/ABTMRi69FrKU5ffPVh5QcFikpWJI/P1ocHA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/tinyglobby": {
      "version": "0.2.17",
      "resolved": "https://registry.npmjs.org/tinyglobby/-/tinyglobby-0.2.17.tgz",
      "integrity": "sha512-wXR/dYpcqKmfWpEdZjiKJOwCNFndD0DMnrW/cYjVGttEkBfVgcLFHoNrlj47mjOVic9yyNu65alsgF4NQyTa2g==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "fdir": "^6.5.0",
        "picomatch": "^4.0.4"
      },
      "engines": {
        "node": ">=12.0.0"
      },
      "funding": {
        "url": "https://github.com/sponsors/SuperchupuDev"
      }
    },
    "node_modules/tinyglobby/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/tinyglobby/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/tinypool": {
      "version": "1.1.1",
      "resolved": "https://registry.npmjs.org/tinypool/-/tinypool-1.1.1.tgz",
      "integrity": "sha512-Zba82s87IFq9A9XmjiX5uZA/ARWDrB03OHlq+Vw1fSdt0I+4/Kutwy8BP4Y/y/aORMo61FQ0vIb5j44vSo5Pkg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": "^18.0.0 || >=20.0.0"
      }
    },
    "node_modules/tinyrainbow": {
      "version": "2.0.0",
      "resolved": "https://registry.npmjs.org/tinyrainbow/-/tinyrainbow-2.0.0.tgz",
      "integrity": "sha512-op4nsTR47R6p0vMUUoYl/a+ljLFVtlfaXkLQmqfLR1qHma1h/ysYk4hEXZ880bf2CYgTskvTa/e196Vd5dDQXw==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tinyspy": {
      "version": "4.0.6",
      "resolved": "https://registry.npmjs.org/tinyspy/-/tinyspy-4.0.6.tgz",
      "integrity": "sha512-u8KszXvGfU68hVcZpRHKG28T0krMuv2G5nDhiHaMLen/gIuFEgIJhaJuO69qjnXg5paSrbPMFfx3brNuN8eVSg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=14.0.0"
      }
    },
    "node_modules/tldts": {
      "version": "6.1.86",
      "resolved": "https://registry.npmjs.org/tldts/-/tldts-6.1.86.tgz",
      "integrity": "sha512-WMi/OQ2axVTf/ykqCQgXiIct+mSQDFdH2fkwhPwgEwvJ1kSzZRiinb0zF2Xb8u4+OqPChmyI6MEu4EezNJz+FQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "tldts-core": "^6.1.86"
      },
      "bin": {
        "tldts": "bin/cli.js"
      }
    },
    "node_modules/tldts-core": {
      "version": "6.1.86",
      "resolved": "https://registry.npmjs.org/tldts-core/-/tldts-core-6.1.86.tgz",
      "integrity": "sha512-Je6p7pkk+KMzMv2XXKmAE3McmolOQFdxkKw0R8EYNr7sELW46JqnNeTX8ybPiQgvg1ymCoF8LXs5fzFaZvJPTA==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/to-regex-range": {
      "version": "5.0.1",
      "resolved": "https://registry.npmjs.org/to-regex-range/-/to-regex-range-5.0.1.tgz",
      "integrity": "sha512-65P7iz6X5yEr1cwcgvQxbbIw7Uk3gOy5dIdtZ4rDveLqhrdJP+Li/Hx6tyK0NEb+2GCyneCMJiGqrADCSNk8sQ==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "is-number": "^7.0.0"
      },
      "engines": {
        "node": ">=8.0"
      }
    },
    "node_modules/tough-cookie": {
      "version": "5.1.2",
      "resolved": "https://registry.npmjs.org/tough-cookie/-/tough-cookie-5.1.2.tgz",
      "integrity": "sha512-FVDYdxtnj0G6Qm/DhNPSb8Ju59ULcup3tuJxkFb5K8Bv2pUXILbf0xZWU8PX8Ov19OXljbUyveOFwRMwkXzO+A==",
      "dev": true,
      "license": "BSD-3-Clause",
      "dependencies": {
        "tldts": "^6.1.32"
      },
      "engines": {
        "node": ">=16"
      }
    },
    "node_modules/tr46": {
      "version": "5.1.1",
      "resolved": "https://registry.npmjs.org/tr46/-/tr46-5.1.1.tgz",
      "integrity": "sha512-hdF5ZgjTqgAntKkklYw0R03MG2x/bSzTtkxmIRw/sTNV8YXsCJ1tfLAX23lhxhHJlEf3CRCOCGGWw3vI3GaSPw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "punycode": "^2.3.1"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/ts-interface-checker": {
      "version": "0.1.13",
      "resolved": "https://registry.npmjs.org/ts-interface-checker/-/ts-interface-checker-0.1.13.tgz",
      "integrity": "sha512-Y/arvbn+rrz3JCKl9C4kVNfTfSm2/mEp5FSz5EsZSANGPSlQrpRI5M4PKF+mJnE52jOO90PnPSc3Ur3bTQw0gA==",
      "dev": true,
      "license": "Apache-2.0"
    },
    "node_modules/update-browserslist-db": {
      "version": "1.3.4",
      "resolved": "https://registry.npmjs.org/update-browserslist-db/-/update-browserslist-db-1.3.4.tgz",
      "integrity": "sha512-t8wonIOdQyOjtPd2VktlBu6QjTVTks6v8bSi7kd0r2Vll8TK1JYDZtRRdbmCHOAMphkZgrzK+L+vXK4pyZ8t4A==",
      "dev": true,
      "funding": [
        {
          "type": "opencollective",
          "url": "https://opencollective.com/browserslist"
        },
        {
          "type": "tidelift",
          "url": "https://tidelift.com/funding/github/npm/browserslist"
        },
        {
          "type": "github",
          "url": "https://github.com/sponsors/ai"
        }
      ],
      "license": "MIT",
      "dependencies": {
        "escalade": "^3.2.0",
        "picocolors": "^1.1.1"
      },
      "bin": {
        "update-browserslist-db": "cli.js"
      },
      "peerDependencies": {
        "browserslist": ">= 4.21.0"
      }
    },
    "node_modules/util-deprecate": {
      "version": "1.0.2",
      "resolved": "https://registry.npmjs.org/util-deprecate/-/util-deprecate-1.0.2.tgz",
      "integrity": "sha512-EPD5q1uXyFxJpCrLnCc1nHnq3gOa6DZBocAIiI2TaSCA7VCJ1UJDMagCzIkXNsUYfD1daK//LTEQ8xiIbrHtcw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/vite": {
      "version": "7.3.8",
      "resolved": "https://registry.npmjs.org/vite/-/vite-7.3.8.tgz",
      "integrity": "sha512-3tTi78MAKhVk9h+YZVXMQ8POmneJuE97QUPAWtJghHzhH7BAyiqQOC2KZh1DWOsu/USB2cRXhznPByaabvYXfw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "esbuild": "^0.27.0 || ^0.28.0",
        "fdir": "^6.5.0",
        "picomatch": "^4.0.3",
        "postcss": "^8.5.6",
        "rollup": "^4.43.0",
        "tinyglobby": "^0.2.15"
      },
      "bin": {
        "vite": "bin/vite.js"
      },
      "engines": {
        "node": "^20.19.0 || >=22.12.0"
      },
      "funding": {
        "url": "https://github.com/vitejs/vite?sponsor=1"
      },
      "optionalDependencies": {
        "fsevents": "~2.3.3"
      },
      "peerDependencies": {
        "@types/node": "^20.19.0 || >=22.12.0",
        "jiti": ">=1.21.0",
        "less": "^4.0.0",
        "lightningcss": "^1.21.0",
        "sass": "^1.70.0",
        "sass-embedded": "^1.70.0",
        "stylus": ">=0.54.8",
        "sugarss": "^5.0.0",
        "terser": "^5.16.0",
        "tsx": "^4.8.1",
        "yaml": "^2.4.2"
      },
      "peerDependenciesMeta": {
        "@types/node": {
          "optional": true
        },
        "jiti": {
          "optional": true
        },
        "less": {
          "optional": true
        },
        "lightningcss": {
          "optional": true
        },
        "sass": {
          "optional": true
        },
        "sass-embedded": {
          "optional": true
        },
        "stylus": {
          "optional": true
        },
        "sugarss": {
          "optional": true
        },
        "terser": {
          "optional": true
        },
        "tsx": {
          "optional": true
        },
        "yaml": {
          "optional": true
        }
      }
    },
    "node_modules/vite-node": {
      "version": "3.2.4",
      "resolved": "https://registry.npmjs.org/vite-node/-/vite-node-3.2.4.tgz",
      "integrity": "sha512-EbKSKh+bh1E1IFxeO0pg1n4dvoOTt0UDiXMd/qn++r98+jPO1xtJilvXldeuQ8giIB5IkpjCgMleHMNEsGH6pg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "cac": "^6.7.14",
        "debug": "^4.4.1",
        "es-module-lexer": "^1.7.0",
        "pathe": "^2.0.3",
        "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0"
      },
      "bin": {
        "vite-node": "vite-node.mjs"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      }
    },
    "node_modules/vite/node_modules/fdir": {
      "version": "6.5.0",
      "resolved": "https://registry.npmjs.org/fdir/-/fdir-6.5.0.tgz",
      "integrity": "sha512-tIbYtZbucOs0BRGqPJkshJUYdL+SDH7dVM8gjy+ERp3WAUjLEFJE+02kanyHtwjWOnwrKYBiwAmM0p4kLJAnXg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12.0.0"
      },
      "peerDependencies": {
        "picomatch": "^3 || ^4"
      },
      "peerDependenciesMeta": {
        "picomatch": {
          "optional": true
        }
      }
    },
    "node_modules/vite/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/vitest": {
      "version": "3.2.7",
      "resolved": "https://registry.npmjs.org/vitest/-/vitest-3.2.7.tgz",
      "integrity": "sha512-KrxIJ62Fd89gfysR4WotlgZABiz2dqFPgqGzX7s+CwsqLFomRH7777ZcrOD6+WVAh7khPQP41A+BKbpcJFrdEg==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "@types/chai": "^5.2.2",
        "@vitest/expect": "3.2.7",
        "@vitest/mocker": "3.2.7",
        "@vitest/pretty-format": "^3.2.7",
        "@vitest/runner": "3.2.7",
        "@vitest/snapshot": "3.2.7",
        "@vitest/spy": "3.2.7",
        "@vitest/utils": "3.2.7",
        "chai": "^5.2.0",
        "debug": "^4.4.1",
        "expect-type": "^1.2.1",
        "magic-string": "^0.30.17",
        "pathe": "^2.0.3",
        "picomatch": "^4.0.2",
        "std-env": "^3.9.0",
        "tinybench": "^2.9.0",
        "tinyexec": "^0.3.2",
        "tinyglobby": "^0.2.14",
        "tinypool": "^1.1.1",
        "tinyrainbow": "^2.0.0",
        "vite": "^5.0.0 || ^6.0.0 || ^7.0.0-0",
        "vite-node": "3.2.4",
        "why-is-node-running": "^2.3.0"
      },
      "bin": {
        "vitest": "vitest.mjs"
      },
      "engines": {
        "node": "^18.0.0 || ^20.0.0 || >=22.0.0"
      },
      "funding": {
        "url": "https://opencollective.com/vitest"
      },
      "peerDependencies": {
        "@edge-runtime/vm": "*",
        "@types/debug": "^4.1.12",
        "@types/node": "^18.0.0 || ^20.0.0 || >=22.0.0",
        "@vitest/browser": "3.2.7",
        "@vitest/ui": "3.2.7",
        "happy-dom": "*",
        "jsdom": "*"
      },
      "peerDependenciesMeta": {
        "@edge-runtime/vm": {
          "optional": true
        },
        "@types/debug": {
          "optional": true
        },
        "@types/node": {
          "optional": true
        },
        "@vitest/browser": {
          "optional": true
        },
        "@vitest/ui": {
          "optional": true
        },
        "happy-dom": {
          "optional": true
        },
        "jsdom": {
          "optional": true
        }
      }
    },
    "node_modules/vitest/node_modules/picomatch": {
      "version": "4.0.7",
      "resolved": "https://registry.npmjs.org/picomatch/-/picomatch-4.0.7.tgz",
      "integrity": "sha512-qcJu88Q2IWqJsDD529JKMdwGm/dvInW4HvQnRwiH9JtihJvzGOscDtHE3x1pBKeUOTysQ8kVmLnJ2kJu7yhcGA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=12"
      },
      "funding": {
        "url": "https://github.com/sponsors/jonschlinkert"
      }
    },
    "node_modules/w3c-xmlserializer": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/w3c-xmlserializer/-/w3c-xmlserializer-5.0.0.tgz",
      "integrity": "sha512-o8qghlI8NZHU1lLPrpi2+Uq7abh4GGPpYANlalzWxyWteJOCsr/P+oPBA49TOLu5FTZO4d3F9MnWJfiMo4BkmA==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "xml-name-validator": "^5.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/webidl-conversions": {
      "version": "7.0.0",
      "resolved": "https://registry.npmjs.org/webidl-conversions/-/webidl-conversions-7.0.0.tgz",
      "integrity": "sha512-VwddBukDzu71offAQR975unBIGqfKZpM+8ZX6ySk8nYhVoo5CYaZyzt3YBvYtRtO+aoGlqxPg/B87NGVZ/fu6g==",
      "dev": true,
      "license": "BSD-2-Clause",
      "engines": {
        "node": ">=12"
      }
    },
    "node_modules/whatwg-encoding": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/whatwg-encoding/-/whatwg-encoding-3.1.1.tgz",
      "integrity": "sha512-6qN4hJdMwfYBtE3YBTTHhoeuUrDBPZmbQaxWAqSALV/MeEnR5z1xd8UKud2RAkFoPkmB+hli1TZSnyi84xz1vQ==",
      "deprecated": "Use @exodus/bytes instead for a more spec-conformant and faster implementation",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "iconv-lite": "0.6.3"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/whatwg-mimetype": {
      "version": "4.0.0",
      "resolved": "https://registry.npmjs.org/whatwg-mimetype/-/whatwg-mimetype-4.0.0.tgz",
      "integrity": "sha512-QaKxh0eNIi2mE9p2vEdzfagOKHCcj1pJ56EEHGQOVxp8r9/iszLUUV7v89x9O1p/T+NlTM5W7jW6+cz4Fq1YVg==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/whatwg-url": {
      "version": "14.2.0",
      "resolved": "https://registry.npmjs.org/whatwg-url/-/whatwg-url-14.2.0.tgz",
      "integrity": "sha512-De72GdQZzNTUBBChsXueQUnPKDkg/5A5zp7pFDuQAj5UFoENpiACU0wlCvzpAGnTkj++ihpKwKyYewn/XNUbKw==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "tr46": "^5.1.0",
        "webidl-conversions": "^7.0.0"
      },
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/why-is-node-running": {
      "version": "2.3.0",
      "resolved": "https://registry.npmjs.org/why-is-node-running/-/why-is-node-running-2.3.0.tgz",
      "integrity": "sha512-hUrmaWBdVDcxvYqnyh09zunKzROWjbZTiNy8dBEjkS7ehEDQibXJ7XvlmtbwuTclUiIyN+CyXQD4Vmko8fNm8w==",
      "dev": true,
      "license": "MIT",
      "dependencies": {
        "siginfo": "^2.0.0",
        "stackback": "0.0.2"
      },
      "bin": {
        "why-is-node-running": "cli.js"
      },
      "engines": {
        "node": ">=8"
      }
    },
    "node_modules/ws": {
      "version": "8.22.2",
      "resolved": "https://registry.npmjs.org/ws/-/ws-8.22.2.tgz",
      "integrity": "sha512-/rEZ2ejown2N5gxVTHUu9bVVC7ttu0/Tgzf5hbTOixR3Fs7mbbXgn2DbdbcKgJOmpQMtrIUWivtYuVMnp/W/yA==",
      "dev": true,
      "license": "MIT",
      "engines": {
        "node": ">=10.0.0"
      },
      "peerDependencies": {
        "bufferutil": "^4.0.1",
        "utf-8-validate": ">=5.0.2"
      },
      "peerDependenciesMeta": {
        "bufferutil": {
          "optional": true
        },
        "utf-8-validate": {
          "optional": true
        }
      }
    },
    "node_modules/xml-name-validator": {
      "version": "5.0.0",
      "resolved": "https://registry.npmjs.org/xml-name-validator/-/xml-name-validator-5.0.0.tgz",
      "integrity": "sha512-EvGK8EJ3DhaHfbRlETOWAS5pO9MZITeauHKJyb8wyajUfQUenkIg2MvLDTZ4T/TgIcm3HU0TFBgWWboAZ30UHg==",
      "dev": true,
      "license": "Apache-2.0",
      "engines": {
        "node": ">=18"
      }
    },
    "node_modules/xmlchars": {
      "version": "2.2.0",
      "resolved": "https://registry.npmjs.org/xmlchars/-/xmlchars-2.2.0.tgz",
      "integrity": "sha512-JZnDKK8B0RCDw84FNdDAIpZK+JuJw+s7Lz8nksI7SIuU3UXJJslUthsi+uWBUYOwPFwW7W7PRLRfUKpxjtjFCw==",
      "dev": true,
      "license": "MIT"
    },
    "node_modules/yallist": {
      "version": "3.1.1",
      "resolved": "https://registry.npmjs.org/yallist/-/yallist-3.1.1.tgz",
      "integrity": "sha512-a4UGQaWPH59mOXUYnAG2ewncQS4i4F43Tv3JoAM+s2VDAmS9NsK8GpDMLrCHPksFT7h3K6TOoUNn2pb7RoXx4g==",
      "dev": true,
      "license": "ISC"
    },
    "node_modules/yaml": {
      "version": "2.9.1",
      "resolved": "https://registry.npmjs.org/yaml/-/yaml-2.9.1.tgz",
      "integrity": "sha512-3NxN8+78OdzbT7C/WjGsyfPAtJaN3FNDsWxv7Y7mcDsT/oOmgW8BpyQQFFBnvZE3j9Y2Sdz1ULFLezL7Eb2yFw==",
      "dev": true,
      "license": "ISC",
      "bin": {
        "yaml": "bin.mjs"
      },
      "engines": {
        "node": ">= 14.6"
      },
      "funding": {
        "url": "https://github.com/sponsors/eemeli"
      }
    }
  }
}

````

## package.json

````json
{
  "name": "bankbondhu", "private": true, "version": "1.0.0", "type": "module",
  "engines": {"node": ">=22.12.0"},
  "scripts": {"dev":"vite", "build":"vite build", "preview":"vite preview", "test":"vitest run"},
  "dependencies": {"react":"^19.2.0", "react-dom":"^19.2.0", "react-router-dom":"^7.9.0", "lucide-react":"^0.468.0"},
  "devDependencies": {"@vitejs/plugin-react":"^5.0.4", "vite":"^7.1.9", "tailwindcss":"3.4.17", "postcss":"^8.5.6", "autoprefixer":"^10.4.21", "vitest":"^3.2.4", "jsdom":"^26.1.0", "@testing-library/react":"^16.3.0", "@testing-library/jest-dom":"^6.9.1", "@testing-library/user-event":"^14.6.1"}
}

````

## postcss.config.js

````javascript
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };

````

## src/App.jsx

````jsx
import { Component, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Banks from './pages/Banks';
import Compare from './pages/Compare';
import Learn from './pages/Learn';
import About from './pages/About';
import { ActionLink, PageHeading } from './components/UI';
import { schemes } from './data/catalog';

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div role="alert" className="mx-auto max-w-xl p-10"><h1 className="text-2xl font-semibold">We couldn’t load this page.</h1><p className="my-4">Please reload. If you edited the demo JSON, check that its structure matches the README.</p><button className="rounded bg-forest px-4 py-3 text-white" onClick={() => window.location.reload()}>Reload BankBondhu</button></div>;
    return this.props.children;
  }
}
export default function App() {
  const [selected, setSelected] = useState([]);
  // Keep selections across client-side routes, capped at three distinct schemes.
  const toggle = (id) => setSelected((current) => {
    if (!schemes.some((scheme) => scheme.id === id)) return current;
    return current.includes(id) ? current.filter((value) => value !== id) : current.length < 3 ? [...current, id] : current;
  });
  return <ErrorBoundary><Layout compareCount={selected.length}><Routes>
    <Route path="/" element={<Home selected={selected} toggle={toggle} />} />
    <Route path="/banks" element={<Banks selected={selected} toggle={toggle} />} />
    <Route path="/compare" element={<Compare selected={selected} toggle={toggle} clear={() => setSelected([])} />} />
    <Route path="/learn" element={<Learn />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<><PageHeading eyebrow="404" title="Let’s get you back on track.">This page doesn’t exist. Your savings journey can continue from home.</PageHeading><ActionLink to="/">Back to home</ActionLink></>} />
  </Routes></Layout></ErrorBoundary>;
}

````

## src/components/Calculator.jsx

````jsx
import { useId, useState } from 'react';
import { ArrowUpRight, Calculator as CalculatorIcon } from 'lucide-react';
import { calculateMaturity, money } from '../utils/finance';
import { inputClass } from './UI';
export default function Calculator({ initialType = 'DPS' }) {
  const id = useId();
  const [type, setType] = useState(initialType);
  const [amounts, setAmounts] = useState({ DPS: '5000', FDR: '100000' });
  const [rate, setRate] = useState('8');
  const [months, setMonths] = useState('60');
  const [timing, setTiming] = useState('end');
  const [frequency, setFrequency] = useState('simple');
  let result, error;
  try {
    if ([amounts[type], rate, months].some((value) => value.trim() === '')) throw new Error('Complete all three fields to see your estimate.');
    result = calculateMaturity({ type, amount: Number(amounts[type]), rate: Number(rate), months: Number(months), timing, frequency });
  } catch (caught) { error = caught.message; }
  const fields = [
    { key: 'amount', label: type === 'DPS' ? 'Monthly deposit (৳)' : 'One-time deposit (৳)', value: amounts[type], change: (value) => setAmounts({ ...amounts, [type]: value }), min: 1, max: 100000000, step: 'any' },
    { key: 'rate', label: 'Annual interest rate (%)', value: rate, change: setRate, min: 0, max: 30, step: 'any' },
    { key: 'months', label: 'Tenure (months)', value: months, change: setMonths, min: 1, max: 360, step: 1 },
  ];
  return <section id="calculator" aria-labelledby={`${id}-title`} className="scroll-mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
    <div className="grid lg:grid-cols-[1.1fr_0.9fr]"><div className="p-6 md:p-9"><div className="mb-5 flex items-center gap-2 text-emerald-800"><CalculatorIcon size={19} /><span className="text-xs font-bold uppercase tracking-widest">Make the numbers yours</span></div><h2 id={`${id}-title`} className="text-2xl font-semibold tracking-tight text-forest">A small habit. A bigger tomorrow.</h2><p className="mt-3 text-sm leading-6 text-slate-600">Explore what your savings could become.</p>
      <div className="my-6 inline-flex gap-1 rounded-full bg-paper p-1" role="group" aria-label="Calculator type">{['DPS', 'FDR'].map((item) => <button type="button" key={item} onClick={() => setType(item)} aria-pressed={type === item} className={`rounded-full px-6 py-2 text-sm font-semibold ${type === item ? 'bg-forest text-white' : 'text-slate-600 hover:bg-emerald-50'}`}>{item} calculator</button>)}</div>
      <div className="grid gap-4 sm:grid-cols-2">{fields.map((field) => <label key={field.key} htmlFor={`${id}-${field.key}`} className={`text-sm font-medium ${field.key === 'amount' ? 'sm:col-span-2' : ''}`}>{field.label}<input id={`${id}-${field.key}`} className={inputClass} inputMode="decimal" type="number" min={field.min} max={field.max} step={field.step} value={field.value} onChange={(event) => field.change(event.target.value)} aria-describedby={error ? `${id}-error` : `${id}-assumptions`} /></label>)}
      {type === 'DPS' ? <label className="text-sm font-medium sm:col-span-2">Monthly deposit timing<select className={inputClass} value={timing} onChange={(event) => setTiming(event.target.value)}><option value="end">End of each month</option><option value="start">Start of each month</option></select></label> : <label className="text-sm font-medium sm:col-span-2">Interest method<select className={inputClass} value={frequency} onChange={(event) => setFrequency(event.target.value)}><option value="simple">Simple interest</option><option value="annual">Compounded annually</option><option value="quarterly">Compounded quarterly</option><option value="monthly">Compounded monthly</option></select></label>}
      </div>{error && <p id={`${id}-error`} role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
    </div><div className="flex flex-col justify-center bg-forest p-6 text-white md:p-9"><div className="mb-6 flex items-center justify-between"><span className="rounded-full border border-white/30 px-3 py-1 text-xs text-emerald-50">YOUR SAVINGS SNAPSHOT</span><ArrowUpRight size={22} className="text-mint" /></div><div aria-live="polite" aria-atomic="true"><p className="text-sm text-emerald-100">Estimated maturity value</p><p className="mt-3 break-words text-4xl font-semibold tracking-tight text-mint md:text-5xl">{result ? money(result.total) : '—'}</p><p className="mt-2 text-xs text-emerald-100">Before taxes and fees · rounded to the nearest taka</p>
      <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-white/20 py-6"><div><dt className="text-xs text-emerald-100">You contribute</dt><dd className="mt-2 break-words text-xl font-semibold">{result ? money(result.principal) : '—'}</dd></div><div><dt className="text-xs text-emerald-100">Estimated interest</dt><dd className="mt-2 break-words text-xl font-semibold text-mint">{result ? money(result.interest) : '—'}</dd></div></dl></div>
      <p id={`${id}-assumptions`} className="mt-6 text-xs leading-6 text-emerald-50">{type === 'DPS' ? `Assumes equal deposits at the ${timing} of each month, a constant nominal annual rate and monthly compounding. No missed payments.` : `Assumes a single deposit and a constant nominal annual rate. ${frequency === 'simple' ? 'Simple interest accrues proportionally to months.' : 'Compound periods use months ÷ 12; fractional periods are a mathematical approximation.'}`} Actual bank methods and payouts can differ. No taxes, fees or early withdrawals are modeled.</p>
    </div></div>
  </section>;
}

````

## src/components/Layout.jsx

````jsx
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Brand, Disclaimer } from './UI';
const links = [['/', 'Home'], ['/banks', 'Banks'], ['/compare', 'Compare'], ['/learn', 'Learn'], ['/about', 'About']];
export default function Layout({ children, compareCount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    const title = links.find(([path]) => path === location.pathname)?.[1] || 'Not found';
    document.title = `${title} | BankBondhu`;
  }, [location.pathname]);
  const navItems = links.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `rounded-full px-4 py-2 text-sm font-medium ${isActive ? 'bg-emerald-50 text-forest' : 'text-slate-600 hover:text-forest'}`}>{label}{label === 'Compare' && compareCount > 0 && <span className="ml-1 text-xs">({compareCount})</span>}</NavLink>);
  return <>
    <a href="#main" className="sr-only z-50 rounded bg-white p-3 focus:not-sr-only focus:absolute">Skip to content</a>
    <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 lg:px-8"><Brand /><nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">{navItems}</nav><NavLink to="/learn#calculator" className="hidden items-center gap-2 text-sm font-semibold text-forest lg:flex">Try the calculators <ArrowUpRight size={16} /></NavLink><button type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)} className="rounded-lg p-2 md:hidden">{open ? <X /> : <Menu />}</button></div>{open && <nav id="mobile-nav" aria-label="Mobile navigation" className="flex flex-wrap gap-2 border-t p-4 md:hidden">{navItems}</nav>}</header>
    <main id="main" tabIndex={-1} className="mx-auto min-h-[65vh] max-w-7xl px-5 py-10 outline-none lg:px-8 lg:py-14">{children}</main>
    <footer className="mt-8 border-t border-slate-200 bg-white"><div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:grid-cols-2 lg:px-8"><div><Brand /><p className="mt-4 max-w-sm text-sm leading-6 text-slate-600">Your friendly starting point for understanding savings in Bangladesh.</p></div><div><Disclaimer compact /><p className="mt-4 text-xs text-slate-500">BankBondhu · Educational MVP · BDT / ৳</p></div></div></footer>
  </>;
}

````

## src/components/SchemeCard.jsx

````jsx
import { Check, Plus } from 'lucide-react';
import { money } from '../utils/finance';
import { tenureLabel } from '../data/catalog';
export default function SchemeCard({ scheme, selected, toggle, disabled }) {
  return <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-emerald-400">
    <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper font-bold text-forest">{scheme.initials}</span><div><p className="text-sm font-semibold">{scheme.bankName}</p><p className="text-xs text-slate-500">Fictional bank</p></div><span className="ml-auto rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">{scheme.type}</span></div>
    <h3 className="mt-5 text-lg font-semibold text-forest">{scheme.name}</h3><div className="mt-3 flex items-baseline gap-2"><strong className="text-4xl font-semibold tracking-tight text-forest">{scheme.rate.toFixed(2)}%</strong><span className="text-xs text-slate-600">p.a. · sample</span></div>
    <dl className="my-5 space-y-3 border-y border-slate-100 py-4 text-sm"><div className="flex justify-between gap-3"><dt className="text-slate-600">Minimum {scheme.type === 'DPS' ? '/ month' : 'deposit'}</dt><dd className="font-semibold">{money(scheme.minimumDeposit)}</dd></div><div><dt className="text-slate-600">Available tenure</dt><dd className="mt-1 font-medium">{scheme.tenures.map(tenureLabel).join(' · ')}</dd></div></dl>
    <details className="mb-5 text-sm"><summary className="cursor-pointer font-medium text-forest">Eligibility & terms</summary><div className="mt-3 space-y-3 text-xs leading-6 text-slate-600"><p>{scheme.interestMethod}.</p><p>{scheme.eligibility}</p><p>{scheme.withdrawal}</p><p>{scheme.branch} {scheme.contact}</p><p>{scheme.rateNote}</p></div></details>
    <button type="button" aria-pressed={selected} aria-label={`${selected ? 'Remove' : 'Compare'} ${scheme.bankName} ${scheme.name}`} disabled={!selected && disabled} onClick={() => toggle(scheme.id)} className={`mt-auto flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-sm font-semibold ${selected ? 'border-forest bg-forest text-white' : 'border-slate-300 text-forest hover:bg-emerald-50'}`}>{selected ? <Check size={16} /> : <Plus size={16} />}{selected ? 'Added to comparison' : 'Add to compare'}</button>
  </article>;
}

````

## src/components/UI.jsx

````jsx
import { ArrowUpRight, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';
export const buttonClass = 'inline-flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900';
export const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900';
export function ActionLink({ to, children, secondary = false }) {
  return <Link to={to} className={secondary ? 'inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-forest hover:bg-emerald-50' : buttonClass}>{children}<ArrowUpRight size={16} aria-hidden="true" /></Link>;
}
export function Brand() {
  return <Link to="/" aria-label="BankBondhu home" className="flex items-center gap-2 text-xl font-bold tracking-tight text-forest"><span className="rounded-xl bg-forest p-2 text-mint"><Landmark size={22} aria-hidden="true" /></span>BankBondhu<span className="text-emerald-700">.</span></Link>;
}
export function PageHeading({ eyebrow, title, children }) {
  return <div className="mb-9 max-w-3xl"><p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-800">{eyebrow}</p><h1 className="text-4xl font-semibold tracking-tight text-forest md:text-5xl">{title}</h1>{children && <p className="mt-4 text-base leading-7 text-slate-600">{children}</p>}</div>;
}
export function Disclaimer({ compact = false }) {
  return <p className={compact ? 'text-xs leading-6 text-slate-600' : 'rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm leading-6 text-amber-950'}><strong>Illustrative data only.</strong> {compact ? 'Educational estimates, not financial advice. Verify rates and terms with your bank.' : 'All banks, schemes and rates in this prototype are fictional examples, not current offers. Estimates exclude tax, excise duty, fees and early-closure adjustments. Verify current rates and terms directly with a real bank before deciding.'}</p>;
}

````

## src/data/banks.json

````json
{
  "dataStatus": "Illustrative only; all banks, schemes and rates are fictional.",
  "currency": "BDT",
  "banks": [
    {
      "id": "bank-1",
      "name": "Shobuj Bank",
      "initials": "SB",
      "description": "Simple savings for everyday ambitions.",
      "fictional": true,
      "eligibility": "Illustrative: Bangladesh residents aged 18+, valid NID, photograph and nominee details.",
      "branch": "Demo branch: Dhaka. No real branch address is provided.",
      "contact": "Fictional institution \u2014 no real contact number.",
      "schemes": [
        {
          "id": "bank-1-dps",
          "type": "DPS",
          "name": "Monthly Builder",
          "rate": 7.5,
          "minimumDeposit": 500,
          "tenures": [
            12,
            24,
            36,
            60
          ],
          "interestMethod": "Monthly compounding; deposits at month end",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-1-fdr",
          "type": "FDR",
          "name": "Fixed Growth",
          "rate": 9,
          "minimumDeposit": 10000,
          "tenures": [
            3,
            6,
            12,
            24,
            36
          ],
          "interestMethod": "Simple annual interest; paid at maturity",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-1-savings",
          "type": "Savings",
          "name": "Everyday Savings",
          "rate": 3.5,
          "minimumDeposit": 1000,
          "tenures": [
            0
          ],
          "interestMethod": "Illustrative annual rate; actual balance and crediting rules vary",
          "withdrawal": "Flexible access; transaction limits and fees may apply.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        }
      ]
    },
    {
      "id": "bank-2",
      "name": "Disha Bank",
      "initials": "DB",
      "description": "Make room for your next big milestone.",
      "fictional": true,
      "eligibility": "Illustrative: Bangladesh residents aged 18+, valid NID, photograph and nominee details.",
      "branch": "Demo branch: Dhaka. No real branch address is provided.",
      "contact": "Fictional institution \u2014 no real contact number.",
      "schemes": [
        {
          "id": "bank-2-dps",
          "type": "DPS",
          "name": "Monthly Builder",
          "rate": 8,
          "minimumDeposit": 1000,
          "tenures": [
            12,
            24,
            36,
            60
          ],
          "interestMethod": "Monthly compounding; deposits at month end",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-2-fdr",
          "type": "FDR",
          "name": "Fixed Growth",
          "rate": 9.5,
          "minimumDeposit": 20000,
          "tenures": [
            3,
            6,
            12,
            24,
            36
          ],
          "interestMethod": "Simple annual interest; paid at maturity",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-2-savings",
          "type": "Savings",
          "name": "Everyday Savings",
          "rate": 4,
          "minimumDeposit": 2000,
          "tenures": [
            0
          ],
          "interestMethod": "Illustrative annual rate; actual balance and crediting rules vary",
          "withdrawal": "Flexible access; transaction limits and fees may apply.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        }
      ]
    },
    {
      "id": "bank-3",
      "name": "Nodi Bank",
      "initials": "NB",
      "description": "Steady habits. A stronger financial future.",
      "fictional": true,
      "eligibility": "Illustrative: Bangladesh residents aged 18+, valid NID, photograph and nominee details.",
      "branch": "Demo branch: Dhaka. No real branch address is provided.",
      "contact": "Fictional institution \u2014 no real contact number.",
      "schemes": [
        {
          "id": "bank-3-dps",
          "type": "DPS",
          "name": "Monthly Builder",
          "rate": 7.75,
          "minimumDeposit": 500,
          "tenures": [
            12,
            24,
            36,
            60
          ],
          "interestMethod": "Monthly compounding; deposits at month end",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-3-fdr",
          "type": "FDR",
          "name": "Fixed Growth",
          "rate": 8.75,
          "minimumDeposit": 10000,
          "tenures": [
            3,
            6,
            12,
            24,
            36
          ],
          "interestMethod": "Simple annual interest; paid at maturity",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-3-savings",
          "type": "Savings",
          "name": "Everyday Savings",
          "rate": 3.75,
          "minimumDeposit": 1000,
          "tenures": [
            0
          ],
          "interestMethod": "Illustrative annual rate; actual balance and crediting rules vary",
          "withdrawal": "Flexible access; transaction limits and fees may apply.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        }
      ]
    },
    {
      "id": "bank-4",
      "name": "Uday Bank",
      "initials": "UB",
      "description": "A fresh start for your savings journey.",
      "fictional": true,
      "eligibility": "Illustrative: Bangladesh residents aged 18+, valid NID, photograph and nominee details.",
      "branch": "Demo branch: Dhaka. No real branch address is provided.",
      "contact": "Fictional institution \u2014 no real contact number.",
      "schemes": [
        {
          "id": "bank-4-dps",
          "type": "DPS",
          "name": "Monthly Builder",
          "rate": 8.25,
          "minimumDeposit": 500,
          "tenures": [
            12,
            24,
            36,
            60
          ],
          "interestMethod": "Monthly compounding; deposits at month end",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-4-fdr",
          "type": "FDR",
          "name": "Fixed Growth",
          "rate": 9.25,
          "minimumDeposit": 10000,
          "tenures": [
            3,
            6,
            12,
            24,
            36
          ],
          "interestMethod": "Simple annual interest; paid at maturity",
          "withdrawal": "Early closure may reduce interest and incur fees; verify terms.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        },
        {
          "id": "bank-4-savings",
          "type": "Savings",
          "name": "Everyday Savings",
          "rate": 4.25,
          "minimumDeposit": 1000,
          "tenures": [
            0
          ],
          "interestMethod": "Illustrative annual rate; actual balance and crediting rules vary",
          "withdrawal": "Flexible access; transaction limits and fees may apply.",
          "rateNote": "Sample nominal annual rate, assumed constant across listed tenures. Not a live offer."
        }
      ]
    }
  ]
}

````

## src/data/catalog.js

````javascript
import data from './banks.json';
export const banks = data.banks;
export const schemes = banks.flatMap((bank) => bank.schemes.map((scheme) => ({
  ...scheme, bankId: bank.id, bankName: bank.name, initials: bank.initials,
  eligibility: bank.eligibility, branch: bank.branch, contact: bank.contact,
})));
export const tenures = [...new Set(schemes.flatMap((scheme) => scheme.tenures))].sort((a, b) => a - b);
export const tenureLabel = (months) => months === 0 ? 'Flexible' : months < 12 ? `${months} months` : `${months / 12} year${months === 12 ? '' : 's'}`;

````

## src/data/lessons.json

````json
[
  {
    "id": "dps",
    "title": "DPS: small steps, steady savings",
    "body": "A recurring deposit builds a savings habit. You put in the same amount every month for an agreed term. Interest depends on the bank\u2019s rate, deposit dates and calculation rules.",
    "example": "Deposit \u09f31,000 at the end of each month for 12 months at 6% nominal annual interest, compounded monthly. You contribute \u09f312,000 and finish with about \u09f312,336, including \u09f3336 interest.",
    "takeaway": "Check missed-payment charges and early-closure terms before committing.",
    "calculator": "DPS"
  },
  {
    "id": "fdr",
    "title": "FDR: give a lump sum a timeline",
    "body": "A Fixed Deposit Receipt represents money placed with a bank for a fixed term. You deposit once and agree on a maturity date. Interest may be paid periodically or at maturity.",
    "example": "Place \u09f3100,000 for 12 months at 8% simple annual interest. Interest = 100,000 \u00d7 0.08 \u00d7 1 = \u09f38,000. Estimated maturity = \u09f3108,000 before deductions.",
    "takeaway": "Choose a term that matches when you need the money.",
    "calculator": "FDR"
  },
  {
    "id": "compound",
    "title": "Compound interest: growth on growth",
    "body": "Compounding adds earned interest to your balance. Future interest then applies to both your deposit and the interest already earned. Frequency and time both matter.",
    "example": "\u09f310,000 at 8%, compounded annually: after year 1, \u09f310,800; after year 2, \u09f310,800 \u00d7 1.08 = \u09f311,664. The second year earns \u09f3864.",
    "takeaway": "Compare compounding frequency as well as the quoted annual rate.",
    "calculator": null
  },
  {
    "id": "simple",
    "title": "Simple vs. compound interest",
    "body": "Simple interest uses only the original deposit. Compound interest also earns returns on accumulated interest. The same quoted rate can produce different maturity values.",
    "example": "For \u09f310,000 at 8% over 2 years: simple interest gives \u09f311,600; annual compounding gives \u09f311,664. That is a \u09f364 difference before deductions.",
    "takeaway": "Use the FDR calculator to switch between simple and compound methods.",
    "calculator": "FDR"
  },
  {
    "id": "emergency",
    "title": "An emergency fund buys breathing room",
    "body": "An emergency fund is money reserved for unexpected essential costs. Keep it accessible and separate from everyday spending. The appropriate target depends on expenses, income stability and responsibilities.",
    "example": "If essential expenses are \u09f325,000 per month, an illustrative 3-month buffer is \u09f375,000. Saving \u09f35,000 monthly reaches that target in 15 months, ignoring interest.",
    "takeaway": "Start with a small buffer and build a target suited to your situation.",
    "calculator": null
  },
  {
    "id": "rates",
    "title": "What a higher rate really changes",
    "body": "A higher interest rate can increase earnings for the same deposit and period. Also compare fees, access to money and inflation: a bigger balance may not buy more.",
    "example": "On \u09f3100,000 for 1 year, 7% simple interest earns \u09f37,000; 9% earns \u09f39,000. Difference: \u09f32,000 before taxes and fees. If prices rise 10%, 9% growth still loses purchasing power.",
    "takeaway": "Compare like-for-like terms. A higher rate alone does not establish suitability.",
    "calculator": null
  }
]

````

## src/main.jsx

````jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode>,
);

````

## src/pages/About.jsx

````jsx
import { PageHeading, Disclaimer, ActionLink } from '../components/UI';
export default function About() {
  return <><PageHeading eyebrow="Meet BankBondhu" title="A friend for your financial first steps.">BankBondhu helps beginners in Bangladesh understand savings, compare illustrative schemes and explore the numbers before asking a bank the right questions.</PageHeading><div className="mb-8 grid gap-6 md:grid-cols-2">{[
    ['Education comes first.', 'This is an independent educational prototype, not a bank, broker or financial adviser. It does not open accounts, collect deposits or make personalized recommendations.'],
    ['The sample data is transparent.', 'All four bank names, twelve schemes, eligibility details and rates are fictional. No current bank offers are represented. Branch and contact fields are explicitly marked as demo information.'],
    ['Understand the calculation.', 'DPS uses an annuity model with monthly compounding and selectable deposit timing. FDR supports simple interest or annual, quarterly and monthly compounding. Rates remain constant for the selected term.'],
    ['Your exploration stays here.', 'No login, analytics, external fonts or backend is included. Comparison selections and calculator inputs are held in memory for the current session and reset on a full refresh. No personal financial information is requested.'],
  ].map(([title, body]) => <section key={title} className="rounded-2xl border border-slate-200 bg-white p-7"><h2 className="text-xl font-semibold text-forest">{title}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{body}</p></section>)}</div><Disclaimer /><div className="mt-8"><ActionLink to="/learn">Start with your first lesson</ActionLink></div></>;
}

````

## src/pages/Banks.jsx

````jsx
import { useState } from 'react';
import { Search } from 'lucide-react';
import { banks, schemes, tenures, tenureLabel } from '../data/catalog';
import { filterSchemes } from '../utils/finance';
import { PageHeading, Disclaimer, inputClass, ActionLink } from '../components/UI';
import SchemeCard from '../components/SchemeCard';
const initialFilters = { bank: '', type: '', tenure: '', minRate: '', query: '' };
export default function Banks({ selected, toggle }) {
  const [filters, setFilters] = useState(initialFilters);
  const [sort, setSort] = useState('bank');
  const update = (key, value) => setFilters({ ...filters, [key]: value });
  const results = filterSchemes(schemes, filters).sort((a, b) => sort === 'rate' ? b.rate - a.rate : sort === 'minimum' ? a.minimumDeposit - b.minimumDeposit : a.bankName.localeCompare(b.bankName));
  return <><PageHeading eyebrow="Savings, made clearer" title="Meet your options.">Browse sample DPS, fixed deposits and savings accounts. Compare the details that matter to your plans.</PageHeading><Disclaimer />
    <section aria-label="Scheme filters" className="my-8 rounded-2xl border border-slate-200 bg-white p-5"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"><label className="text-sm font-medium">Bank<select className={inputClass} value={filters.bank} onChange={(e) => update('bank', e.target.value)}><option value="">All banks</option>{banks.map((bank) => <option key={bank.id} value={bank.id}>{bank.name}</option>)}</select></label><label className="text-sm font-medium">Scheme type<select className={inputClass} value={filters.type} onChange={(e) => update('type', e.target.value)}><option value="">All types</option>{['DPS', 'FDR', 'Savings'].map((type) => <option key={type}>{type}</option>)}</select></label><label className="text-sm font-medium">Tenure<select className={inputClass} value={filters.tenure} onChange={(e) => update('tenure', e.target.value)}><option value="">All tenures</option>{tenures.map((tenure) => <option key={tenure} value={tenure}>{tenureLabel(tenure)}</option>)}</select></label><label className="text-sm font-medium">Minimum rate<select className={inputClass} value={filters.minRate} onChange={(e) => update('minRate', e.target.value)}><option value="">Any rate</option>{[4, 7, 8, 9].map((rate) => <option key={rate} value={rate}>{rate}% p.a. or above</option>)}</select></label><label className="text-sm font-medium">Sort by<select className={inputClass} value={sort} onChange={(e) => setSort(e.target.value)}><option value="bank">Bank name</option><option value="rate">Highest sample rate</option><option value="minimum">Lowest minimum deposit</option></select></label></div><label className="mt-5 block text-sm font-medium">Search banks or schemes<div className="relative"><Search size={18} aria-hidden="true" className="absolute left-3 top-6 text-slate-500" /><input type="search" className={`${inputClass} pl-10`} placeholder="Try Monthly Builder or Nodi" value={filters.query} onChange={(e) => update('query', e.target.value)} /></div></label></section>
    <div className="mb-5 flex items-center justify-between gap-3"><p role="status" className="text-sm text-slate-600">{results.length} schemes found · {selected.length}/3 selected</p><button className="rounded text-sm font-semibold text-emerald-800 underline underline-offset-4" onClick={() => { setFilters(initialFilters); setSort('bank'); }}>Reset filters</button></div>
    {results.length ? <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{results.map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} selected={selected.includes(scheme.id)} disabled={selected.length >= 3} toggle={toggle} />)}</div> : <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center"><h2 className="text-xl font-semibold text-forest">No matching schemes</h2><p className="mt-3 text-sm text-slate-600">Try a different tenure or lower the minimum rate.</p></div>}
    {selected.length > 0 && <div className="sticky bottom-4 mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-white p-4 shadow-lg"><p className="text-sm font-semibold text-forest">{selected.length} of 3 schemes selected{selected.length === 3 ? ' · Remove one to change your selection.' : ''}</p><ActionLink to="/compare">Compare your selection</ActionLink></div>}
  </>;
}

````

## src/pages/Compare.jsx

````jsx
import { schemes, tenureLabel } from '../data/catalog';
import { money } from '../utils/finance';
import { PageHeading, Disclaimer, ActionLink } from '../components/UI';
export default function Compare({ selected, toggle, clear }) {
  const items = selected.map((id) => schemes.find((scheme) => scheme.id === id)).filter(Boolean);
  const rows = [
    ['Scheme type', (s) => s.type], ['Sample annual rate', (s) => `${s.rate.toFixed(2)}% p.a.`],
    ['Minimum deposit', (s) => `${money(s.minimumDeposit)}${s.type === 'DPS' ? ' / month' : ''}`],
    ['Tenure options', (s) => s.tenures.map(tenureLabel).join(' · ')], ['Interest method', (s) => s.interestMethod],
    ['Eligibility', (s) => s.eligibility], ['Access & early closure', (s) => s.withdrawal],
    ['Branch information', (s) => s.branch], ['Contact information', (s) => s.contact],
  ];
  return <><PageHeading eyebrow="Side by side" title="See the whole picture.">Compare up to three schemes. A rate is only one part of the decision — consider access, tenure and how interest is calculated.</PageHeading><Disclaimer />
    {items.length < 2 && <div className="my-8 rounded-2xl border border-slate-200 bg-white p-8"><h2 className="text-xl font-semibold text-forest">{items.length ? 'Add one more to compare.' : 'Your comparison starts here.'}</h2><p className="mb-5 mt-3 text-sm text-slate-600">Choose two or three schemes from the bank directory.</p><ActionLink to="/banks">Browse schemes</ActionLink></div>}
    {items.length > 0 && <><div className="my-6 flex items-center justify-between"><p className="text-sm text-slate-600">{items.length}/3 schemes selected</p><button onClick={clear} className="rounded text-sm font-semibold text-emerald-800 underline">Clear selection</button></div><div role="region" aria-label="Scheme comparison, scroll horizontally on small screens" tabIndex={0} className="overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="w-full min-w-[640px] table-fixed text-left text-sm"><caption className="sr-only">Illustrative scheme comparison</caption><thead className="bg-emerald-50"><tr><th scope="col" className="w-44 p-5 text-forest">At a glance</th>{items.map((scheme) => <th scope="col" key={scheme.id} className="p-5 align-top"><p className="text-xs font-medium text-emerald-800">{scheme.bankName}</p><p className="mt-2 text-lg font-semibold text-forest">{scheme.name}</p><button aria-label={`Remove ${scheme.bankName} ${scheme.name}`} onClick={() => toggle(scheme.id)} className="mt-3 rounded text-xs font-medium text-slate-600 underline">Remove</button></th>)}</tr></thead><tbody>{rows.map(([label, getValue]) => <tr key={label} className="border-t border-slate-200"><th scope="row" className="p-5 align-top font-medium text-slate-600">{label}</th>{items.map((scheme) => <td key={scheme.id} className={`break-words p-5 align-top leading-6 ${label === 'Sample annual rate' ? 'text-xl font-semibold text-forest' : ''}`}>{getValue(scheme)}</td>)}</tr>)}</tbody></table></div><p className="mt-4 text-xs leading-6 text-slate-600">Different product types are not directly equivalent. Sample rates assume the same rate across listed tenures. No scheme is ranked or recommended.</p><div className="mt-6"><ActionLink secondary to="/banks">Change your selection</ActionLink></div></>}
  </>;
}

````

## src/pages/Home.jsx

````jsx
import { ArrowUpRight, ShieldCheck, Sprout, BookOpen, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActionLink, Disclaimer } from '../components/UI';
import Calculator from '../components/Calculator';
import SchemeCard from '../components/SchemeCard';
import { banks, schemes } from '../data/catalog';
export default function Home({ selected, toggle }) {
  return <>
    <section className="grid items-center gap-10 pb-12 lg:grid-cols-[1.15fr_0.85fr] lg:pb-16"><div><p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-900"><span className="h-1.5 w-1.5 rounded-full bg-emerald-700" /> A little clarity. A better tomorrow.</p><h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.045em] text-forest sm:text-6xl lg:text-7xl">Your money.<br />Your future.<br /><span className="font-serif italic font-normal text-emerald-700">Let’s make it grow.</span></h1><p className="mt-6 max-w-lg text-base leading-7 text-slate-600">Banking doesn’t have to feel complicated. Explore savings options, understand the numbers, and take your next step with confidence.</p><div className="mt-8 flex flex-wrap gap-3"><ActionLink to="/banks">Explore savings</ActionLink><ActionLink to="/learn" secondary>Start learning</ActionLink></div><p className="mt-6 flex items-center gap-2 text-xs text-slate-600"><ShieldCheck size={16} /> No sign-up. No selling. Just clarity.</p></div>
    <div className="relative overflow-hidden rounded-[2rem] bg-[#E8EEDD] p-7 sm:p-10"><div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.18em] text-forest">The everyday advantage</span><Sprout size={30} className="text-forest" /></div><p className="mt-9 max-w-xs text-3xl font-medium leading-tight tracking-tight text-forest">Big plans start<br />with small steps.</p><div className="mt-8 rounded-2xl bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><span className="text-xs text-slate-600">Your monthly habit</span><span className="rounded-full bg-mint p-2 text-forest"><ArrowUpRight size={18} /></span></div><p className="mt-1 text-3xl font-semibold tracking-tight text-forest">৳5,000 <span className="text-sm font-normal text-slate-500">/ month</span></p><div className="mt-7 grid h-28 grid-cols-6 items-end gap-3" aria-hidden="true">{['h-6','h-10','h-14','h-20','h-24','h-28'].map((height, index) => <div key={height} className={`${height} rounded-t-lg ${index === 5 ? 'bg-forest' : 'bg-[#C5DBB6]'}`} />)}</div><div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-slate-500"><span>Start today</span><span>Build the habit</span></div></div><p className="mt-5 text-xs leading-5 text-slate-600">A visual reminder of consistent saving.<br />Concept illustration, not a return projection.</p></div></section>
    <div className="grid gap-6 border-y border-slate-200 py-7 sm:grid-cols-3">{[[SlidersHorizontal, 'Compare with clarity', `${banks.length} demo banks. ${schemes.length} sample schemes.`], [BookOpen, 'Learn at your pace', 'Six short lessons. Everyday language.'], [ShieldCheck, 'Know the assumptions', 'Transparent estimates, without the guesswork.']].map(([Icon, title, text]) => <div key={title} className="flex gap-3"><Icon size={21} className="mt-1 shrink-0 text-emerald-800" /><div><h2 className="text-sm font-semibold text-forest">{title}</h2><p className="mt-1 text-xs leading-5 text-slate-600">{text}</p></div></div>)}</div>
    <section className="py-12"><div className="mb-6 flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">A place to begin</p><h2 className="mt-3 text-3xl font-semibold tracking-tight text-forest">Find a fit for your future.</h2></div><Link to="/banks" className="flex items-center gap-2 text-sm font-semibold text-forest">View all schemes <ArrowUpRight size={16} /></Link></div><div className="grid gap-5 md:grid-cols-3">{[schemes[0], schemes[4], schemes[8]].map((scheme) => <SchemeCard key={scheme.id} scheme={scheme} selected={selected.includes(scheme.id)} toggle={toggle} disabled={selected.length >= 3} />)}</div><div className="mt-4"><Disclaimer compact /></div></section>
    <Calculator /><section className="mt-12 flex flex-col justify-between gap-5 rounded-2xl border border-slate-200 p-7 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Your next chapter</p><h2 className="mt-2 text-2xl font-semibold text-forest">Good decisions start with understanding.</h2><p className="mt-2 text-sm text-slate-600">DPS, FDR, compound interest — one clear lesson at a time.</p></div><ActionLink to="/learn">Explore the learning center</ActionLink></section>
  </>;
}

````

## src/pages/Learn.jsx

````jsx
import { useEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';
import lessons from '../data/lessons.json';
import { PageHeading, buttonClass } from '../components/UI';
import Calculator from '../components/Calculator';
export default function Learn() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const found = lessons.findIndex((lesson) => lesson.id === params.get('lesson'));
  const active = found < 0 ? 0 : found;
  const lesson = lessons[active];
  const [calculatorType, setCalculatorType] = useState('DPS');
  const select = (index) => setParams({ lesson: lessons[index].id }, { preventScrollReset: true });
  useEffect(() => { if (location.hash === '#calculator') document.getElementById('calculator')?.scrollIntoView(); }, [location.hash]);
  return <><PageHeading eyebrow="The learning center" title="A little knowledge goes a long way.">Six short lessons to help you understand your money. Start at the beginning, or explore a question you’ve always wanted to ask.</PageHeading>
    <div className="mb-12 grid gap-6 lg:grid-cols-[300px_1fr]"><nav aria-label="Learning path" className="self-start rounded-2xl border border-slate-200 bg-white p-3"><p className="px-3 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Your first six steps</p>{lessons.map((item, index) => <button key={item.id} onClick={() => select(index)} aria-current={active === index ? 'step' : undefined} className={`mb-1 flex w-full items-start gap-3 rounded-xl px-3 py-4 text-left text-sm leading-6 ${active === index ? 'bg-forest text-white' : 'text-slate-600 hover:bg-paper'}`}><span className={active === index ? 'text-mint' : 'text-emerald-800'}>0{index + 1}</span>{item.title}</button>)}</nav>
    <article className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-9" aria-labelledby="lesson-title"><p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">Lesson {active + 1} of {lessons.length} · Beginner</p><h2 id="lesson-title" className="mt-5 text-3xl font-semibold tracking-tight text-forest">{lesson.title}</h2><p className="mt-6 leading-8 text-slate-600">{lesson.body}</p><div className="mt-7 rounded-xl bg-paper p-6"><p className="text-xs font-bold uppercase tracking-widest text-emerald-800">Let’s put numbers to it</p><p className="mt-3 leading-7">{lesson.example}</p><p className="mt-3 text-xs text-slate-500">Illustrative example. No taxes or fees included.</p></div><p className="mt-6 flex gap-3 text-sm leading-6 text-emerald-900"><Lightbulb className="shrink-0" size={20} />{lesson.takeaway}</p>
    {lesson.calculator && <a href="#calculator" className="mt-6 inline-block rounded text-sm font-semibold text-emerald-800 underline underline-offset-4" onClick={() => setCalculatorType(lesson.calculator)}>Try this in the {lesson.calculator} calculator ↓</a>}
    <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-200 pt-6"><button disabled={active === 0} onClick={() => select(active - 1)} className="flex items-center gap-2 rounded px-2 py-3 text-sm font-medium"><ArrowLeft size={16} />Previous</button><button onClick={() => select(active === lessons.length - 1 ? 0 : active + 1)} className={buttonClass}>{active === lessons.length - 1 ? 'Start again' : 'Next lesson'}<ArrowRight size={16} /></button></div></article></div>
    <Calculator key={calculatorType} initialType={calculatorType} /><p className="mt-5 text-xs leading-6 text-slate-600">Further reading: <a href="https://www.investor.gov/introduction-investing/investing-basics/glossary/compound-interest" target="_blank" rel="noreferrer" className="rounded underline">Investor.gov: compound interest</a>. Lessons use original BDT examples, not bank quotations.</p>
  </>;
}

````

## src/styles/index.css

````css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body { @apply m-0 bg-paper font-sans text-slate-800 antialiased; }
  button, a, input, select, summary { @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4; }
  button { @apply disabled:cursor-not-allowed disabled:opacity-50; }
  ::selection { @apply bg-mint text-forest; }
}

````

## src/utils/finance.js

````javascript
// Pure functions keep calculation assumptions visible and independently testable.
export const money = (value) => new Intl.NumberFormat('en-BD', {
  style: 'currency', currency: 'BDT', maximumFractionDigits: 0,
}).format(value);

export function calculateMaturity({ type, amount, rate, months, timing = 'end', frequency = 'simple' }) {
  if (!['DPS', 'FDR'].includes(type)) throw new Error('Choose DPS or FDR.');
  if (![amount, rate, months].every(Number.isFinite) || amount < 1 || amount > 100000000 || rate < 0 || rate > 30 || !Number.isInteger(months) || months < 1 || months > 360) {
    throw new Error('Enter an amount from ৳1 to ৳100,000,000, a rate from 0–30%, and 1–360 whole months.');
  }
  let total;
  const principal = type === 'DPS' ? amount * months : amount;
  if (type === 'DPS') {
    if (!['start', 'end'].includes(timing)) throw new Error('Choose a valid deposit timing.');
    const monthlyRate = rate / 100 / 12;
    // expm1/log1p avoid cancellation error for rates close to zero.
    total = monthlyRate === 0 ? principal : amount * Math.expm1(months * Math.log1p(monthlyRate)) / monthlyRate;
    if (timing === 'start') total *= 1 + monthlyRate;
  } else {
    const periods = { annual: 1, quarterly: 4, monthly: 12 }[frequency];
    if (frequency !== 'simple' && !periods) throw new Error('Choose a valid interest method.');
    total = frequency === 'simple' ? amount * (1 + rate / 100 * months / 12)
      : amount * (1 + rate / 100 / periods) ** (periods * months / 12);
  }
  return { principal, total, interest: total - principal };
}

export function filterSchemes(schemes, { bank = '', type = '', tenure = '', minRate = '', query = '' }) {
  return schemes.filter((scheme) => (!bank || scheme.bankId === bank)
    && (!type || scheme.type === type)
    && (!tenure || scheme.tenures.includes(Number(tenure)))
    && (minRate === '' || scheme.rate >= Number(minRate))
    && `${scheme.name} ${scheme.bankName}`.toLowerCase().includes(query.toLowerCase()));
}

````

## tailwind.config.js

````javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: { colors: { forest: '#153F35', mint: '#D9EEBA', paper: '#F7F8F2' }, fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] } } },
  plugins: [],
};

````

## tests/app.test.jsx

````jsx
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import App from '../src/App';
const mount = (route = '/') => render(<MemoryRouter initialEntries={[route]}><App /></MemoryRouter>);
it('renders the homepage and switches calculator type', async () => {
  const user = userEvent.setup(); mount();
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Your money.');
  await user.click(screen.getByRole('button', { name: 'FDR calculator' }));
  expect(screen.getByLabelText('One-time deposit (৳)')).toHaveValue(100000);
  await user.clear(screen.getByLabelText('Annual interest rate (%)'));
  expect(screen.getByRole('alert')).toHaveTextContent('Complete all three fields');
  await user.type(screen.getByLabelText('Annual interest rate (%)'), '0');
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
});
it('filters schemes, compares across routes, removes and clears', async () => {
  const user = userEvent.setup(); mount('/banks');
  await user.selectOptions(screen.getByLabelText('Scheme type'), 'DPS');
  expect(screen.getByRole('status')).toHaveTextContent('4 schemes found');
  const buttons = screen.getAllByRole('button', { name: /^Compare .*Monthly Builder/ });
  await user.click(buttons[0]); await user.click(buttons[1]); await user.click(buttons[2]);
  expect(buttons[3]).toBeDisabled();
  await user.click(screen.getByRole('link', { name: 'Compare your selection' }));
  expect(screen.getByRole('table')).toBeInTheDocument();
  await user.click(screen.getAllByRole('button', { name: /^Remove / })[0]);
  expect(screen.getByText('2/3 schemes selected')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Clear selection' }));
  expect(screen.getByText('Your comparison starts here.')).toBeInTheDocument();
});
it('shows an empty filter state and resets it', async () => {
  const user = userEvent.setup(); mount('/banks');
  await user.type(screen.getByRole('searchbox'), 'nonexistent bank');
  expect(screen.getByText('No matching schemes')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Reset filters' }));
  expect(screen.getByRole('status')).toHaveTextContent('12 schemes found');
});
it('moves through lessons and opens the FDR calculator', async () => {
  const user = userEvent.setup(); mount('/learn');
  await user.click(screen.getByRole('button', { name: 'Next lesson' }));
  expect(screen.getByRole('heading', { name: 'FDR: give a lump sum a timeline' })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: /Try this in the FDR/ }));
  expect(screen.getByLabelText('One-time deposit (৳)')).toBeInTheDocument();
});
it('supports mobile navigation and unknown routes', async () => {
  const user = userEvent.setup(); mount('/missing');
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('back on track');
  await user.click(screen.getByRole('button', { name: 'Open navigation' }));
  await user.click(within(screen.getByRole('navigation', { name: 'Mobile navigation' })).getByRole('link', { name: 'About' }));
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('financial first steps');
  expect(screen.queryByRole('navigation', { name: 'Mobile navigation' })).not.toBeInTheDocument();
});

````

## tests/finance.test.js

````javascript
import { describe, expect, it } from 'vitest';
import { calculateMaturity, filterSchemes } from '../src/utils/finance';
import { schemes, banks } from '../src/data/catalog';
const base = { type: 'DPS', amount: 1000, rate: 6, months: 12 };
describe('maturity estimates', () => {
  it('matches a monthly deposit ledger, not only the formula', () => {
    let balance = 0;
    for (let month = 0; month < 12; month++) balance = balance * 1.005 + 1000;
    expect(calculateMaturity(base).total).toBeCloseTo(balance, 8);
    expect(balance).toBeCloseTo(12335.56, 2);
  });
  it('handles zero interest and start-of-month deposits', () => {
    expect(calculateMaturity({ ...base, rate: 0 }).total).toBe(12000);
    expect(calculateMaturity({ ...base, timing: 'start' }).total).toBeCloseTo(calculateMaturity(base).total * 1.005, 8);
  });
  it('calculates simple and compound FDR with partial years', () => {
    const deposit = { type: 'FDR', amount: 100000, rate: 8, months: 12 };
    expect(calculateMaturity(deposit).total).toBe(108000);
    expect(calculateMaturity({ ...deposit, months: 6 }).total).toBe(104000);
    expect(calculateMaturity({ ...deposit, months: 24, frequency: 'annual' }).total).toBeCloseTo(116640, 8);
    expect(calculateMaturity({ ...deposit, frequency: 'monthly' }).total).toBeCloseTo(100000 * (1 + .08 / 12) ** 12, 8);
    expect(calculateMaturity({ ...deposit, frequency: 'quarterly' }).total).toBeCloseTo(108243.216, 6);
  });
  it.each([{ amount: 0.5 }, { amount: -1 }, { amount: 0 }, { rate: -1 }, { rate: 31 }, { months: 0 }, { months: 1.5 }, { months: 361 }, { amount: Infinity }, { rate: NaN }])('rejects invalid input %j', (override) => {
    expect(() => calculateMaturity({ ...base, ...override })).toThrow();
  });
});
describe('data and filtering', () => {
  it('has unique ids and valid schemes', () => {
    expect(new Set(schemes.map((scheme) => scheme.id)).size).toBe(schemes.length);
    expect(new Set(banks.map((bank) => bank.id)).size).toBe(banks.length);
    schemes.forEach((scheme) => { expect(scheme.rate).toBeGreaterThanOrEqual(0); expect(scheme.tenures.length).toBeGreaterThan(0); expect(scheme.minimumDeposit).toBeGreaterThan(0); });
  });
  it('combines filters and supports flexible savings tenure', () => {
    expect(filterSchemes(schemes, { bank: 'bank-2', type: 'FDR', tenure: '12', minRate: '9', query: 'fixed' })).toHaveLength(1);
    expect(filterSchemes(schemes, { tenure: '0' })).toHaveLength(4);
    expect(filterSchemes(schemes, { minRate: '30' })).toHaveLength(0);
  });
});

````

## tests/setup.js

````javascript
import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(cleanup);
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();

````

## vite.config.js

````javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', setupFiles: './tests/setup.js', css: false },
});

````
