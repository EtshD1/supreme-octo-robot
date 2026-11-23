/** The table of contents. The sidebar and the /learn index both read this. */
export const lessons = [
  { group: "Routing", slug: "pages-and-layouts", title: "Pages, Layouts & Templates" },
  { group: "Routing", slug: "linking-and-navigating", title: "Linking & Navigating" },
  { group: "Routing", slug: "dynamic-routes", title: "Dynamic Routes" },
  { group: "Routing", slug: "route-groups", title: "Route Groups & Private Folders" },
  { group: "Routing", slug: "parallel-routes", title: "Parallel Routes" },
  { group: "Routing", slug: "intercepting-routes", title: "Intercepting Routes (Modal)" },
  { group: "Rendering", slug: "server-and-client-components", title: "Server & Client Components" },
  { group: "Rendering", slug: "rendering", title: "Static, Dynamic & Streaming" },
  { group: "Data", slug: "data-fetching", title: "Data Fetching" },
  { group: "Data", slug: "caching", title: "Caching (use cache)" },
  { group: "Data", slug: "server-actions", title: "Server Actions & Forms" },
  { group: "Data", slug: "search-params", title: "Search Params" },
  { group: "Data", slug: "cookies-and-headers", title: "Cookies & Headers" },
  { group: "Handling", slug: "error-handling", title: "Errors & Not Found" },
  { group: "Backend", slug: "route-handlers", title: "Route Handlers (API)" },
  { group: "Backend", slug: "proxy", title: "Proxy (Middleware)" },
  { group: "Optimizing", slug: "metadata", title: "Metadata & SEO" },
  { group: "Optimizing", slug: "images-and-fonts", title: "Images & Fonts" },
] as const;

export const groups = [...new Set(lessons.map((l) => l.group))];
