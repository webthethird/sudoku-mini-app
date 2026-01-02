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
    subtitle: "Daily logic puzzles", 
    description: "A calm daily sudoku variant puzzle. No accounts, no pressure.",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/blue-icon.png`,
    splashImageUrl: `${ROOT_URL}/blue-hero.png`,
    splashBackgroundColor: "#0000ff",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "games",
    tags: ["puzzle", "sudoku", "game", "fun"],
    heroImageUrl: `${ROOT_URL}/blue-hero.png`, 
    tagline: "Pure logic, daily.",
    ogTitle: "",
    ogDescription: "",
    ogImageUrl: `${ROOT_URL}/blue-hero.png`,
  },
} as const;

