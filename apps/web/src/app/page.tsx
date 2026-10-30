import Image from 'next/image';
import Link from 'next/link';
import { CURATED, TONES, fmt, productImg } from '@aziz-mart/shared';
import Hero from '@/components/hero';
import Newsletter from '@/components/newsletter';
import OffersBand from '@/components/offers-band';
import ProductCard from '@/components/product-card';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import { CashIcon, HeadsetIcon, SwapIcon, TruckIcon } from '@/components/icons';
import { getCampaigns, getCategories, getCoupons, getProducts } from '@/lib/api';

function SectionHead({ title, eyebrow, href, link }: { title: string; eyebrow?: string; href?: string; link?: string }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.08em] text-green-700">{eyebrow}</p>}
        <h2 className="font-display text-[32px] font-semibold tracking-[-0.02em]">{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-sm font-semibold text-green-700 hover:underline">
          {link ?? 'View all'} →
        </Link>
      )}
    </div>
  );
}

export default async function Home() {
  const [products, categories, campaigns, coupons] = await Promise.all([
    getProducts(),
    getCategories(),
    getCampaigns(),
    getCoupons(),
  ]);

  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bundles = products.filter((p) => p.cat === 'bundles');
  const picks = CURATED.map((id) => products.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => !!p,
  );

  return (
    <>
      <Hero />

      {/* Shop by category */}
      <section className="mx-auto mt-16 max-w-[1280px] px-6">
        <Reveal>
          <SectionHead title="Shop by category" />
        </Reveal>
        <RevealGroup className="mt-7 grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(170px,1fr))]">
          {categories
            .filter((c) => c.key !== 'bundles')
            .map((c) => (
              <RevealItem key={c.key}>
                <Link href={`/c/${c.key}`} className="group block">
                  <span
                    className="relative block aspect-square overflow-hidden rounded-[18px]"
                    style={{ background: c.tone ? TONES[c.tone] : '#f3f1ea' }}
                  >
                    {c.img && (
                      <Image
                        src={c.img}
                        alt={c.title}
                        fill
                        sizes="(max-width: 768px) 45vw, 200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                      />
                    )}
                  </span>
                  <span className="mt-3 block text-[15px] font-semibold">{c.title}</span>
                  <span className="block text-[13px] text-muted">{c.count} items</span>
                </Link>
              </RevealItem>
            ))}
        </RevealGroup>
      </section>

      {/* New arrivals */}
      <section className="mx-auto mt-16 max-w-[1280px] px-6">
        <Reveal>
          <SectionHead title="New arrivals" href="/c/all" />
        </Reveal>
        <RevealGroup className="mt-7 grid gap-x-5 gap-y-7 [grid-template-columns:repeat(auto-fill,minmax(210px,1fr))]">
          {newArrivals.map((p) => (
            <RevealItem key={p.id}>
              <ProductCard product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Seasonal collections */}
      <section className="mx-auto mt-16 max-w-[1280px] px-6">
        <Reveal>
          <SectionHead title="Seasonal collections" eyebrow="Curated by the Aziz Mart team" />
        </Reveal>
        <div className="mt-7 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
          {campaigns.map((c, i) => (
            <Reveal key={c.key} delay={i * 0.08}>
              <div
                className="grid min-h-[280px] overflow-hidden rounded-3xl border border-line bg-white md:grid-cols-2"
              >
                <div className="flex flex-col items-start justify-center gap-3 p-8">
                  <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-muted">{c.when}</span>
                  <h3 className="font-display text-[28px] font-semibold leading-[1.05] tracking-[-0.02em]">{c.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-2">{c.line}</p>
                  <Link
                    href={`/c/seasonal?sub=${c.key}`}
                    className="mt-2 rounded-full border border-green-700 px-5 py-2.5 text-sm font-bold text-green-700 transition-colors hover:bg-green-700 hover:text-white"
                  >
                    Shop the collection
                  </Link>
                </div>
                <div className="relative min-h-[220px]" style={{ background: TONES[c.tone] }}>
                  <Image src={c.img} alt={c.title} fill sizes="(max-width: 768px) 100vw, 440px" className="object-cover" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Staff picks */}
      <section className="mx-auto mt-16 max-w-[1280px] px-6">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-[32px] font-semibold tracking-[-0.02em]">Staff picks</h2>
            <span className="rounded-full bg-green-50 px-3.5 py-1.5 text-[12px] font-semibold text-green-700">
              Curated selection · bestseller rankings appear once we have sales history
            </span>
          </div>
        </Reveal>
        <RevealGroup className="mt-7 grid gap-x-5 gap-y-7 [grid-template-columns:repeat(auto-fill,minmax(210px,1fr))]">
          {picks.map((p) => (
            <RevealItem key={p.id}>
              <ProductCard product={p} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Family bundles */}
      <section className="mx-auto mt-16 max-w-[1280px] px-6">
        <Reveal>
          <SectionHead title="Family bundles" eyebrow="Better together" href="/c/bundles" />
        </Reveal>
        <RevealGroup className="mt-7 grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
          {bundles.map((b) => {
            const parts = (b.includes ?? []).map((id) => products.find((p) => p.id === id)?.name).filter(Boolean);
            const save = (b.was ?? b.price) - b.price;
            return (
              <RevealItem key={b.id}>
                <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-[22px] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(23,36,29,.3)]">
                  <div className="flex gap-2.5">
                    {(b.includes ?? []).map((id) => (
                      <span key={id} className="relative block h-[72px] w-[58px] overflow-hidden rounded-lg bg-surface-2">
                        <Image src={productImg(id, 120, 150)} alt="" fill sizes="58px" className="object-cover" />
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-4 font-display text-[21px] font-semibold leading-[1.05] tracking-[-0.02em]">{b.name}</h3>
                  <p className="mt-1.5 text-[13px] text-muted">{parts.join(' + ')}</p>
                  <div className="mt-auto pt-4">
                    <p className="text-[17px] font-bold">{fmt(b.price)}</p>
                    <p className="mt-0.5 text-[13px] text-muted">
                      Separately <s>{fmt(b.was ?? b.price)}</s> · <span className="font-semibold text-green-700">Save {fmt(save)}</span>
                    </p>
                    <Link
                      href={`/p/${b.id}`}
                      className="mt-4 inline-block rounded-full border border-green-700 px-5 py-2.5 text-sm font-bold text-green-700 transition-colors hover:bg-green-700 hover:text-white"
                    >
                      View bundle
                    </Link>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      <OffersBand coupons={coupons} />

      {/* Trust strip */}
      <section className="mx-auto mt-16 max-w-[1280px] px-6">
        <div className="grid overflow-hidden rounded-[20px] border border-line bg-white md:grid-cols-4">
          {(
            [
              [TruckIcon, 'Delivery', 'Dhaka City in 1–2 days, suburbs in 2–3. Nationwide coming soon.'],
              [CashIcon, 'Payment', 'Cash on Delivery today — mobile banking and cards on the way.'],
              [SwapIcon, 'Returns & exchange', '7 days, unused with tags. Gift wrap and personalised items excluded.'],
              [HeadsetIcon, 'Support', 'Real people, 9am–9pm, for orders, sizes and bulk enquiries.'],
            ] as const
          ).map(([Icon, title, line], i) => (
            <div key={title} className={`p-7 ${i > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''}`}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-green-50 text-green-700">
                <Icon />
              </span>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{line}</p>
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
