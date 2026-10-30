'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { CheckIcon } from './icons';

const FIELDS = [
  ['org', 'Business / organisation', 'text'],
  ['contact', 'Contact person', 'text'],
  ['phone', 'Phone', 'tel'],
  ['email', 'Email', 'email'],
] as const;

export default function BulkForm() {
  const [v, setV] = useState<Record<string, string>>({});
  const [err, setErr] = useState('');
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const required = ['org', 'contact', 'phone', 'products', 'qty'];
    if (required.some((k) => !(v[k] ?? '').trim())) {
      setErr('Please fill in the organisation, contact, phone, products and quantities.');
      return;
    }
    if (v.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) {
      setErr('That email does not look right.');
      return;
    }
    setErr('');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-3xl bg-green-50 p-10">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-green-700 text-white">
          <CheckIcon />
        </span>
        <h2 className="mt-4 font-display text-[28px] font-semibold tracking-[-0.02em]">Enquiry received.</h2>
        <p className="mt-2 max-w-[480px] text-[15px] text-ink-2">
          Thanks, {v.contact?.split(' ')[0]} — our B2B team will call {v.phone} within one working day with pricing and availability.
        </p>
      </div>
    );
  }

  const input = (key: string, label: string, type = 'text') => (
    <label key={key} className="block text-sm font-semibold">
      {label}
      <input
        type={type}
        value={v[key] ?? ''}
        onChange={(e) => setV({ ...v, [key]: e.target.value })}
        className="mt-1.5 w-full rounded-xl border border-input bg-white px-4 py-3 text-[15px] font-normal outline-none focus:border-green-700"
      />
    </label>
  );

  return (
    <div className="rounded-3xl border border-line bg-white p-[clamp(24px,4vw,44px)]">
      <h2 className="font-display text-[28px] font-semibold tracking-[-0.02em]">Bulk and business orders</h2>
      <p className="mt-2 max-w-[560px] text-[15px] text-ink-2">
        Uniforms, corporate gifts, school or event orders — tell us what you need and we&apos;ll quote within a working day.
      </p>
      <form onSubmit={submit} className="mt-7 grid gap-3.5 md:grid-cols-2">
        {FIELDS.map(([k, label, type]) => input(k, label, type))}
        <label className="block text-sm font-semibold md:col-span-2">
          Products needed
          <textarea
            value={v.products ?? ''}
            onChange={(e) => setV({ ...v, products: e.target.value })}
            rows={2}
            className="mt-1.5 w-full rounded-xl border border-input bg-white px-4 py-3 text-[15px] font-normal outline-none focus:border-green-700"
          />
        </label>
        {input('qty', 'Quantities')}
        {input('notes', 'Additional requirements')}
        {err && <p className="text-[13px] font-semibold text-sale md:col-span-2">{err}</p>}
        <div className="md:col-span-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-green-700 px-7 py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-green-900"
          >
            Send enquiry
          </motion.button>
        </div>
      </form>
    </div>
  );
}
