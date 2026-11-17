import Image from "next/image";
import type { CSSProperties } from "react";
import { assetPath } from "@/lib/asset-path";

const PRODUCTS = [
  { img: assetPath("/sorgtime/vest.webp"), name: "Sorgteam Vest", price: "Rp 250.000", buy: true },
  { img: assetPath("/sorgtime/sorgmeal.webp"), name: "Meal Replacement", price: "Rp 150.000", buy: true },
  { img: assetPath("/sorgtime/tumbler.webp"), name: "Sorgtime Tumbler", price: "Rp 230.000", buy: false },
  // { img: "/tuku/toserba/t-12.png", name: "Kaos Kaki #TetanggaTuku Kecil", price: "Rp 88.000", buy: true },
  // { img: "/tuku/toserba/t-11.png", name: "Kaus Kaki #TetanggaTuku Donat", price: "Rp 111.000", buy: true },
  // { img: "/tuku/toserba/t-10.png", name: "Pulpen Tetangga Tuku", price: "Rp 14.000", buy: true },
  // { img: "/tuku/toserba/t-9.png", name: "Payung Hitam Lipat Sablon TUKU", price: "Rp 90.000", buy: true },
  // { img: "/tuku/toserba/t-8.png", name: "Sedotan Stainless TUKU", price: "Rp 22.000", buy: true },
  // { img: "/tuku/toserba/t-7.png", name: "Jas Hujan TUKU", price: "Rp 55.000", buy: false },
  // { img: "/tuku/toserba/t-6.png", name: "Lesom Handsanitizer", price: "Rp 30.000", buy: false },
  // { img: "/tuku/toserba/t-5.png", name: "Toples Kaca TUKU Bening", price: "Rp 12.000", buy: true },
  // { img: "/tuku/toserba/t-4.png", name: "Kantong Hitam TUKU", price: "Rp 22.000", buy: false },
  // { img: "/tuku/toserba/t-3.png", name: "Cangkir Stainless TUKU", price: "Rp 175.000", buy: true },
  // { img: "/tuku/toserba/t-2.png", name: "Mug Stainless TUKU", price: "Rp 85.000", buy: true },
  // { img: "/tuku/toserba/t-1.png", name: "Tas Tetangga TUKU", price: "Rp 84.000", buy: true },
];

export function Toserba() {
  return (
    <section id="toserba" className="scroll-mt-14">
      <div className="grid w-full grid-cols-1 lg:h-[calc(100svh-57px)] lg:grid-cols-2">
        {/* Left: product grid (green bg) */}
        <div className="order-last w-full bg-conifer lg:order-first">
          {/* Heading */}
          <div className="pl-5 pt-16 font-hand text-3xl lg:pl-16" data-reveal>
            <h4 className="uppercase text-white">
              Lini Produk
              <br />
              Toserba Sorgtime
            </h4>
          </div>

          {/* Product grid */}
          <div className="no-scrollbar max-h-[calc(100svh-136px)] overflow-x-auto overflow-y-auto lg:h-[calc(100svh-193px)] lg:overflow-x-hidden">
            <div className="flex w-max flex-row gap-4 px-[10px] lg:grid lg:w-auto lg:grid-cols-3 lg:px-[69px]">
              {PRODUCTS.map((p, index) => (
                <div
                  key={p.img}
                  className="group flex min-w-48 flex-col divide-y divide-horizon border border-conifer bg-horizon transition-all duration-300 ease-out hover:divide-black hover:border-black lg:min-w-28"
                  data-reveal
                  style={{ "--reveal-delay": `${Math.min(index, 5) * 55}ms` } as CSSProperties}
                >
                  <div>
                    <div className="h-[192px] w-full">
                      <Image
                        src={p.img}
                        alt={p.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <div className="flex min-h-[110px] flex-col gap-[10px] p-[10px]">
                      <p className="text-xs font-semibold uppercase text-ink">{p.name}</p>
                      <p className="text-sm font-medium text-conifer">{p.price}</p>
                    </div>
                  </div>
                  {p.buy && (
                    <a
                      href="#"
                      className="flex px-[10px] py-[22px] text-[10px] font-semibold text-ink transition-colors duration-300 ease-in group-hover:bg-conifer group-hover:text-white"
                    >
                      <div className="border-b border-dotted pb-[6px]">
                        Beli sekarang
                      </div>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Katalog link */}
          <div className="hidden justify-center py-5 lg:flex">
            <a
              href="#"
              className="border border-black bg-janna p-3 pb-0 font-hand text-xs uppercase text-black"
            >
              Katalog Selengkapnya
            </a>
          </div>
        </div>

        {/* Right: store image */}
        <div data-reveal="right">
          <Image
            src={assetPath("/sorgtime/bottle.jpg")}
            alt="Product Sorgtime"
            width={800}
            height={1000}
            className="hidden h-full w-full object-cover lg:block"
          />
          <Image
            src={assetPath("/sorgtime/bottle.jpg")}
            alt="Product Sorgtime"
            width={600}
            height={800}
            className="block h-[64vw] min-h-[240px] max-h-[340px] w-full object-cover object-center lg:hidden"
          />
        </div>
      </div>
      <div className="flex w-full justify-center bg-conifer py-5 lg:hidden">
        <a href="#" className="border border-black bg-janna p-3 pb-0 font-hand text-xs uppercase text-black">
          Katalog Selengkapnya
        </a>
      </div>
    </section>
  );
}
