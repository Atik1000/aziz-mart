import {
  ArrowLeftRight,
  ArrowRight,
  Banknote,
  Check,
  Headset,
  Heart,
  Search,
  ShoppingBag,
  Truck,
  User,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/** Lucide icons tuned to the handoff spec: 1.8 stroke, 22px default, rounded joins. */
const tuned =
  (Icon: LucideIcon) =>
  // eslint-disable-next-line react/display-name
  (p: LucideProps) => <Icon size={22} strokeWidth={1.8} absoluteStrokeWidth {...p} />;

export const SearchIcon = tuned(Search);
export const HeadsetIcon = tuned(Headset);
export const UserIcon = tuned(User);
export const BagIcon = tuned(ShoppingBag);
export const CheckIcon = tuned(Check);
export const ArrowRightIcon = tuned(ArrowRight);
export const TruckIcon = tuned(Truck);
export const CashIcon = tuned(Banknote);
export const SwapIcon = tuned(ArrowLeftRight);

export const HeartIcon = ({ filled, ...p }: LucideProps & { filled?: boolean }) => (
  <Heart size={22} strokeWidth={1.8} absoluteStrokeWidth fill={filled ? 'currentColor' : 'none'} {...p} />
);

/** Brand mark: rounded green square with the cream "A" stroke, per the handoff. */
export const LogoMark = ({ size = 36 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" aria-hidden>
    <rect width="36" height="36" rx="9" fill="#1d5a3c" />
    <path
      d="M11 26l5.8-16h2.4L25 26m-11.2-6.5h8.4"
      stroke="#f8f6f0"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const FAVICON =
  'data:image/svg+xml,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect width="36" height="36" rx="9" fill="#1d5a3c"/><path d="M11 26l5.8-16h2.4L25 26m-11.2-6.5h8.4" stroke="#f8f6f0" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`,
  );
