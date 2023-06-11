import NavBar from './components/NavBar';
import AuthContextApi from './contex/AuthContexApi';
import "react-datepicker/dist/react-datepicker.css"
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'OpenTable',
  description: 'Easy booking by OpenTable',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="bg-gray-100 min-h-screen w-screen">
          <AuthContextApi>
            <main className="max-w-screen-2xl m-auto bg-white">
              <NavBar />
              {children}
            </main>
          </AuthContextApi>
        </main>
      </body>
    </html>
  );
}
