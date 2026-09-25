import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Bed M.B | Lits Coffre & Literie Haut de Gamme en Algérie',
  description: 'Fabricant de lits coffre en bois rouge massif, matelas orthopédiques, oreillers à mémoire de forme et mobilier de chambre en Algérie. Livraison 58 wilayas.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
