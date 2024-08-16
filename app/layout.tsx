// import "./globals.css";



// export default function RootLayout({
// 	children,
// }: Readonly<{
// 	children: React.ReactNode;
// }>) {
// 	return (
// 		<html lang="en">
// 			<body >{children}</body>
// 		</html>
// 	);
// }


import type { AppProps } from 'next/app';
import './styles/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
