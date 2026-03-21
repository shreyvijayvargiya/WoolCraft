import { WoolcraftProductPage } from "../../components/woolcraft-marketing";
import { getProductBySlug, PRODUCTS } from "../../lib/woolcraft-data";

export default function ProductPage({ product }) {
	return <WoolcraftProductPage product={product} />;
}

export async function getStaticPaths() {
	return {
		paths: PRODUCTS.map((p) => ({ params: { slug: p.slug } })),
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	const product = getProductBySlug(params.slug);
	if (!product) return { notFound: true };
	return { props: { product } };
}
