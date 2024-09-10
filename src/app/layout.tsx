import '../styles/globals.css';
import Header from '../components/Header/Header';
import Avatar from '../components/Avatar/Avatar';
import Settings from '../components/Settings/Settings';

export const metadata = {
  title: 'DoodlePlay',
  description: 'Generated by Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="flex justify-center w-screen mt-32">
          <Avatar src="/images/avatars/man-1.svg" size="w-[175px] h-[175px]" />
        </div>
        <div className="flex justify-center w-screen mt-32 bg-white">
          <Settings />
        </div>
        {children}
      </body>
    </html>
  );
}
