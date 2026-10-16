import packageJson from "../../package.json";

export const siteInfo = {
  deploymentVersion: packageJson.version,
} as const;
