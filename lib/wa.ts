export const WHATSAPP_PHONE = "6281259015626";

export function waUrl(message: string) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}
