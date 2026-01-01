const ROOT_URL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

/**
 * MiniApp configuration object. Must follow the Farcaster MiniApp specification.
 *
 * @see {@link https://miniapps.farcaster.xyz/docs/guides/publishing}
 */
export const minikitConfig = {
  accountAssociation: {
    header: "eyJmaWQiOjM3NDU2NSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDNGRTI1ZDVjZGI4ZkVEMWMzNzY2MDFmOWJDMjE0RDEzMTdmQWIyNzIifQ",
    payload: "eyJkb21haW4iOiJzdWRva3UtbWluaS1hcHAudmVyY2VsLmFwcCJ9",
    signature: "lt70AljvPx1DI6HDtPW1zjdjXvAKBuJcwlhdP4ULT5cHCgF2MhhxsxbrFhbluH5mjrgHbHGDOqL9VVgxCodhHBw="
  },
  miniapp: {
    version: "1",
    name: "Based Sudoku", 
    subtitle: "Solve Sudoku puzzles on Base", 
    description: "Solve Sudoku puzzles on Base",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#000000",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["puzzle", "sudoku", "game", "fun"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

