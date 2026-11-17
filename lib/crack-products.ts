export type CrackGroup = "bakeries" | "cookiecup" | "cookies";

export type CrackProduct = {
  slug: string;
  name: string;
  price: number;
  image: string;
  group: CrackGroup;
};

export const CRACK_GROUPS: { key: CrackGroup; label: string; note?: string }[] = [
  { key: "bakeries", label: "Bakeries & Pastries" },
  { key: "cookiecup", label: "Cookiecup Shot", note: "Kolaborasi dengan BeccoThree Coffee Shop" },
  { key: "cookies", label: "Cookies Variant" },
];

export const CRACK_PRODUCTS: CrackProduct[] = [
  // Bakeries & Pastries
  { slug: "salt-bread-original", name: "Salt Bread Original", price: 18000, image: "/menucrackpng/saltbreadoriginal.webp", group: "bakeries" },
  { slug: "salt-bun-original", name: "Salt Bun Original", price: 20000, image: "/menucrackpng/saltbunoriginal.webp", group: "bakeries" },
  { slug: "egg-mayo", name: "Egg Mayo", price: 25000, image: "/menucrackpng/eggmayo.webp", group: "bakeries" },
  { slug: "choco-crunchy", name: "Choco Crunchy", price: 30000, image: "/menucrackpng/chococrunchy.webp", group: "bakeries" },
  { slug: "ganache", name: "Ganache", price: 30000, image: "/menucrackpng/ganache.webp", group: "bakeries" },
  { slug: "salted-caramel-regal", name: "Salted Caramel Regal", price: 30000, image: "/menucrackpng/saltedcaramelregal.webp", group: "bakeries" },
  { slug: "garlic-cheese", name: "Garlic Cheese", price: 35000, image: "/menucrackpng/garliccheese.webp", group: "bakeries" },
  { slug: "cheese-sausage", name: "Cheese Sausage", price: 35000, image: "/menucrackpng/cheesesausage.webp", group: "bakeries" },
  // Cookiecup Shot — kolaborasi BeccoThree Coffee Shop
  { slug: "tencha", name: "Tencha", price: 30000, image: "/menucrackpng/tencha.webp", group: "cookiecup" },
  { slug: "blue-cloud-tencha", name: "Blue Cloud Tencha", price: 35000, image: "/menucrackpng/bluecloudtencha.webp", group: "cookiecup" },
  { slug: "biscoff-fudge-choco", name: "Biscoff Fudge Choco", price: 35000, image: "/menucrackpng/biscofffudgechoco.webp", group: "cookiecup" },
  // Cookies Variant
  { slug: "choco-mellow", name: "Choco Mellow", price: 18000, image: "/menucrackpng/chocomellow.webp", group: "cookies" },
  { slug: "red-velvet", name: "Red Velvet", price: 18000, image: "/menucrackpng/redvelvet.webp", group: "cookies" },
  { slug: "og-lotus", name: "OG Lotus", price: 18000, image: "/menucrackpng/oglotus.webp", group: "cookies" },
  { slug: "monster-cookie", name: "Monster Cookie", price: 18000, image: "/menucrackpng/monstercookie.webp", group: "cookies" },
  { slug: "matcha", name: "Matcha", price: 18000, image: "/menucrackpng/matcha.webp", group: "cookies" },
];

export function getCrackProduct(slug: string | null) {
  return CRACK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function groupLabel(group: CrackGroup) {
  return CRACK_GROUPS.find((g) => g.key === group)?.label ?? group;
}
