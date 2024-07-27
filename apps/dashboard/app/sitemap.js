import { dashboardConfig } from "@nyxia/config";

export default async function sitemap() {
 const routes = ["", "/commands"].map((route) => ({
  url: `${dashboardConfig.url}${route}`,
  lastModified: new Date().toISOString().split("T")[0],
 }));

 return [...routes];
}
