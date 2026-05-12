import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "양평 하늘계단 풀빌라 - 프라이빗 휴식의 기준",
  description: "자연 속 개별 수영장과 바베큐를 갖춘 최상급 럭셔리 풀빌라에서 완벽한 하루를 예약하세요.",
  openGraph: {
    title: "양평 하늘계단 풀빌라",
    description: "프라이빗 풀빌라, 개별바베큐, 최상급 컨디션",
    url: "https://skystairs.kr",
    siteName: "하늘계단 풀빌라",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FBF9F4] text-[#1B3525] font-sans flex flex-col selection:bg-[#1B3525] selection:text-[#FBF9F4]">
        <Header />
        <div className="flex-1 flex flex-col pt-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
