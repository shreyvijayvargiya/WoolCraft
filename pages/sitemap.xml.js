import { PRODUCTS, getSiteUrl } from "../lib/woolcraft-data";

function SitemapXml() {
	return null;
}

export async function getServerSideProps({ res }) {
	const base = getSiteUrl();
	const urls = [
		{ loc: `${base}/`, changefreq: "weekly", priority: "1.0" },
		...PRODUCTS.map((p) => ({
			loc: `${base}/product/${p.slug}`,
			changefreq: "weekly",
			priority: "0.8",
		})),
	];
	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
	)
	.join("\n")}
</urlset>`;
	res.setHeader("Content-Type", "text/xml; charset=utf-8");
	res.setHeader(
		"Cache-Control",
		"public, s-maxage=86400, stale-while-revalidate",
	);
	res.write(xml);
	res.end();
	return { props: {} };
}

function escapeXml(s) {
	return String(s)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

export default SitemapXml;
