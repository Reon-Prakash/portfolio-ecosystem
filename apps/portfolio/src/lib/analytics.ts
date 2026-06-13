import UAParser from "ua-parser-js";

export interface AnalyticsData {
  browser: string;
  operatingSystem: string;
  deviceType: string;
  screenResolution: string;
  referrer: string;
}

export function collectAnalytics(): AnalyticsData {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    browser: `${result.browser.name || "Unknown"} ${result.browser.version || ""}`.trim(),
    operatingSystem: `${result.os.name || "Unknown"} ${result.os.version || ""}`.trim(),
    deviceType: result.device.type || "desktop",
    screenResolution:
      typeof window !== "undefined"
        ? `${window.screen.width}x${window.screen.height}`
        : "Unknown",
    referrer:
      typeof document !== "undefined" ? document.referrer || "Direct" : "Unknown",
  };
}
