import type { Metadata } from 'next';
import { Bricolage_Grotesque, Hanken_Grotesk } from 'next/font/google';
import Footer from '@/components/footer';
import Header, { UtilityBar } from '@/components/header';
import { FAVICON } from '@/components/icons';
import { StoreProvider } from '@/components/store';
import { getCampaigns, getCategories, getProducts, getSubcategories } from '@/lib/api';
import './globals.css';

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  weight: ['500', '600', '700'],
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Aziz Mart — Shopping for the whole family',
  description:
    'Clothing for men, women and kids, plus toys, gifts and seasonal collections, delivered across Dhaka. Cash on Delivery available.',
  icons: { icon: FAVICON },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [categories, subcategories, campaigns, products] = await Promise.all([
    getCategories(),
    getSubcategories(),
    getCampaigns(),
    getProducts(),
  ]);

  return (
    <html lang="en" className={`${bricolage.variable} ${hanken.variable}`}>
      <body>
        <StoreProvider>
          <UtilityBar />
          <Header categories={categories} subcategories={subcategories} campaigns={campaigns} products={products} />
          <main>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
