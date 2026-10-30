import { CashIcon, SwapIcon, TruckIcon } from '@/components/icons';
import { Reveal, RevealGroup, RevealItem } from '@/components/reveal';
import BulkForm from '@/components/bulk-form';

export const metadata = { title: 'Help & Support — Aziz Mart' };

const POLICIES = [
  {
    Icon: TruckIcon,
    title: 'Delivery',
    body: 'Dhaka City ৳60, delivered in 1–2 days. Dhaka suburbs (Savar, Gazipur, Narayanganj, Keraniganj) ৳100, in 2–3 days. Other districts coming soon.',
  },
  {
    Icon: SwapIcon,
    title: 'Returns & exchange',
    body: 'Return or exchange within 7 days, unused with tags attached. Gift-wrapped and personalised items are excluded.',
  },
  {
    Icon: CashIcon,
    title: 'Payment',
    body: 'Cash on Delivery on every order. Mobile banking and card payments are coming soon.',
  },
];

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 pb-18 pt-8">
      <h1 className="font-display text-[40px] font-semibold leading-[1.08] tracking-[-0.02em]">Help &amp; support</h1>
      <p className="mt-2 max-w-[560px] text-[15px] leading-relaxed text-ink-2">
        Policies, delivery details and bulk-order enquiries — and real people on the other end, 9am–9pm.
      </p>

      <RevealGroup className="mt-9 grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr))]">
        {POLICIES.map(({ Icon, title, body }) => (
          <RevealItem key={title}>
            <div className="h-full rounded-[18px] border border-line bg-white p-6">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-green-50 text-green-700">
                <Icon />
              </span>
              <h2 className="mt-4 text-[17px] font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-14">
        <BulkForm />
      </Reveal>
    </div>
  );
}
