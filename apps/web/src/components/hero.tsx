'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { IMG } from '@aziz-mart/shared';
import { ArrowRightIcon } from './icons';

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
};

const tile = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-7">
      <div className="grid min-h-[480px] gap-5 [grid-template-columns:repeat(auto-fit,minmax(min(100%,440px),1fr))]">
        {/* Green panel */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative flex flex-col items-start justify-center overflow-hidden rounded-3xl bg-green-700 p-[clamp(28px,5vw,56px)] text-white"
        >
          {/* drifting light sheen */}
          <div
            aria-hidden
            className="animate-sheen pointer-events-none absolute -left-1/4 -top-1/4 h-[80%] w-[80%] rounded-full"
            style={{ background: 'radial-gradient(closest-side, rgba(233,176,74,.18), transparent 70%)' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{ background: 'radial-gradient(120% 90% at 85% 110%, #123d29 0%, transparent 55%)' }}
          />
          <HeroScene />
          <motion.span
            variants={item}
            className="relative rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold"
          >
            Winter 2026 collection now in
          </motion.span>
          <h1 className="relative mt-5 font-display text-[clamp(40px,5.4vw,68px)] font-semibold leading-[1.0] tracking-[-0.03em] [text-wrap:balance]">
            {'Shopping for the whole family, sorted.'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                className="inline-block will-change-transform"
                initial={{ opacity: 0, y: '0.6em', rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                {' '}
              </motion.span>
            ))}
          </h1>
          <motion.p variants={item} className="relative mt-5 max-w-[480px] text-lg leading-relaxed text-white/85">
            Clothing for men, women and kids, plus toys, gifts and seasonal collections, all in one
            place and delivered across Dhaka.
          </motion.p>
          <motion.div variants={item} className="relative mt-8 flex flex-wrap gap-3">
            <Link
              href="/c/all"
              className="group flex items-center gap-2 rounded-full bg-cream px-6 py-3.5 text-[15px] font-bold text-green-700 transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Shop now
              <ArrowRightIcon size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/c/seasonal"
              className="rounded-full border border-white/40 px-6 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-white/10"
            >
              Explore collections
            </Link>
          </motion.div>
        </motion.div>

        {/* Mosaic */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid min-h-[480px] grid-rows-2 gap-5 [grid-template-columns:1.3fr_1fr]"
        >
          <motion.div variants={tile} className="relative row-span-2 overflow-hidden rounded-3xl bg-surface-2">
            <Image
              src={IMG('1601924994987-69e26d50dc26', 700, 1000)}
              alt="Family lifestyle"
              fill
              priority
              sizes="(max-width: 768px) 60vw, 420px"
              className="object-cover"
            />
          </motion.div>
          {(
            [
              ['Kids’ clothing →', '/c/kids', IMG('1518831959646-742c3a14ebf7', 500, 500)],
              ['Toys by age →', '/c/toys', IMG('1587654780291-39c9404d746b', 500, 500)],
            ] as const
          ).map(([label, href, src]) => (
            <motion.div key={href} variants={tile} className="group relative overflow-hidden rounded-3xl bg-surface-2">
              <Link href={href} className="absolute inset-0 z-10" aria-label={label} />
              <Image
                src={src}
                alt=""
                fill
                sizes="240px"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-sm font-bold text-ink">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="mt-6 overflow-hidden rounded-full border border-line bg-white py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap pl-10 text-[13px] font-semibold text-ink-2">
          {[0, 1].map((half) => (
            <span key={half} aria-hidden={half === 1} className="flex gap-10">
              {[
                'Cash on Delivery across Dhaka',
                'Delivery in 1–2 days in the city',
                '7-day returns & exchange',
                'WINTER10 — 10% off over ৳2,000',
                'Family bundles save up to ৳340',
                'Gift wrapping with handwritten cards',
              ].map((t) => (
                <span key={t} className="flex items-center gap-10">
                  {t} <span className="text-saffron">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
