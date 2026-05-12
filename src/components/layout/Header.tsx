"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";

// 사진 레퍼런스와 완벽하게 일치하는 메가 메뉴 구조체 정의
const megaMenuItems = [
  {
    name: "ABOUT",
    path: "/about",
    subItems: [
      { name: "풀빌라소개", path: "/about" },
      { name: "외경보기", path: "/about#exterior" },
      { name: "오시는길", path: "/about#location" },
    ],
  },
  {
    name: "ROOMS",
    path: "/rooms",
    subItems: [
      { name: "미리보기", path: "/rooms" },
      { name: "1층 산책(풀빌라)", path: "/rooms?type=walk" },
      { name: "2층 하늘(풀빌라)", path: "/rooms?type=sky" },
      { name: "신축 101", path: "/rooms" },
      { name: "신축 102", path: "/rooms" },
      { name: "신축 201", path: "/rooms" },
      { name: "신축 202", path: "/rooms" },
    ],
  },
  {
    name: "SPECIAL",
    path: "/special",
    subItems: [
      { name: "개별수영장", path: "/special#private-pool" },
      { name: "야외수영장", path: "/special#outdoor-pool" },
      { name: "정원", path: "/special#garden" },
      { name: "개별바베큐", path: "/special#bbq" },
      { name: "서비스", path: "/special#service" },
    ],
  },
  {
    name: "RESERVE",
    path: "/rooms",
    subItems: [
      { name: "예약하기", path: "/rooms" },
      { name: "이용안내", path: "/about#guide" },
    ],
  },
  {
    name: "TRAVEL",
    path: "/travel",
    subItems: [
      { name: "주변여행지", path: "/travel" },
    ],
  },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHovered
          ? "bg-[#1B3525]/95 backdrop-blur-md text-white shadow-xl border-b border-[#D4AF37]/20"
          : isScrolled
          ? "bg-[#FBF9F4]/90 backdrop-blur-md shadow-sm border-b border-[#1B3525]/5 text-[#1B3525]"
          : isHome
          ? "bg-transparent text-white"
          : "bg-[#FBF9F4] border-b border-[#1B3525]/5 text-[#1B3525]"
      }`}
    >
      {/* 상단 메인 바 및 하위 확장 패널 통합 래퍼 */}
      <div className="max-w-7xl mx-auto px-4 transition-all duration-300">
        {/* 상단 메인 바 */}
        <div className={`flex items-center justify-between ${isHovered ? "py-5" : "py-6"}`}>
          {/* 로고 영역 (고정 너비 w-48로 좌우 대칭 기준점 확립) */}
          <div className="w-48 flex items-center justify-start">
            <Link href="/" className="group flex flex-col relative z-10">
              <span className="font-serif text-2xl tracking-widest font-bold group-hover:opacity-80 transition-opacity whitespace-nowrap">
                Sky Stairs
              </span>
              <span
                className={`text-[10px] tracking-widest uppercase font-light -mt-1 transition-colors whitespace-nowrap ${
                  isHovered
                    ? "text-[#D4AF37]"
                    : isScrolled || !isHome
                    ? "text-[#D4AF37]"
                    : "text-white/80"
                }`}
              >
                Pool Villa & Pension
              </span>
            </Link>
          </div>

          {/* 데스크톱 상단 대메뉴 (5개의 균등 Grid 구조 적용으로 하단 메뉴와 수직 축 완벽 동기화) */}
          <nav className="hidden md:grid grid-cols-5 flex-1 max-w-4xl mx-4">
            {megaMenuItems.map((item) => {
              const isActive = pathname.startsWith(item.path);
              return (
                <div key={item.name} className="flex flex-col items-center justify-center group/nav">
                  <Link
                    href={item.path}
                    className={`text-base tracking-wider font-medium transition-colors relative py-1 flex items-center gap-1 ${
                      isHovered
                        ? "text-white hover:text-[#D4AF37]"
                        : isActive
                        ? isScrolled || !isHome
                          ? "text-[#D4AF37] font-semibold"
                          : "text-amber-300 font-semibold"
                        : isScrolled || !isHome
                        ? "hover:text-[#D4AF37]"
                        : "hover:text-amber-200"
                    }`}
                  >
                    {item.name}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 opacity-0 group-hover/nav:opacity-100 ${
                        isHovered ? "opacity-60" : ""
                      }`}
                    />
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* 우측 예약 버튼 영역 (로고와 동일한 고정 너비 w-48 지정으로 완벽한 대칭성 확보) */}
          <div className="w-48 justify-end hidden md:flex relative z-10">
            <Link
              href="/rooms"
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold transition-all duration-300 whitespace-nowrap ${
                isHovered
                  ? "bg-[#D4AF37] text-white hover:bg-white hover:text-[#1B3525] shadow-lg"
                  : isScrolled || !isHome
                  ? "bg-[#1B3525] text-white hover:bg-[#D4AF37] shadow-sm hover:shadow"
                  : "bg-white text-[#1B3525] hover:bg-amber-300 hover:text-white"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              예약하기
            </Link>
          </div>

          {/* 모바일 햄버거 토글 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none relative z-10"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* 데스크톱 메가 드롭다운 하위 영역 (상단 메뉴와 100% 일치하는 수직 격자 정렬 구현) */}
        <div
          className={`hidden md:block w-full overflow-hidden transition-all duration-500 ease-in-out ${
            isHovered ? "max-h-[450px] opacity-100 pb-8 pt-2" : "max-h-0 opacity-0 pb-0 pt-0"
          }`}
        >
          {/* 가로 구분선 (상단 메뉴 그리드 영역 너비에 완벽히 매핑) */}
          <div className="flex items-center justify-between mb-6">
            <div className="w-48" />
            <div className="flex-1 max-w-4xl mx-4 h-[1px] bg-white/15" />
            <div className="w-48" />
          </div>

          {/* 하위 메뉴 리스트 (상단 nav와 동일한 좌우 스페이서 및 grid-cols-5 적용) */}
          <div className="flex justify-between">
            {/* 좌측 로고 대응 여백 */}
            <div className="w-48" />

            {/* 5개 하위 메뉴 열 (상단 대메뉴 텍스트의 중심축과 정확하게 수직 정렬 일치) */}
            <div className="grid grid-cols-5 flex-1 max-w-4xl mx-4">
              {megaMenuItems.map((col) => (
                <div key={col.name} className="flex flex-col items-center">
                  <div className="flex flex-col gap-3 items-center text-center w-full">
                    {col.subItems.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.path}
                        onClick={() => setIsHovered(false)}
                        className="text-[14px] text-white/80 hover:text-[#D4AF37] tracking-wider transition-all duration-200 hover:scale-105 py-0.5 font-light block whitespace-nowrap"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 우측 버튼 대응 여백 */}
            <div className="w-48" />
          </div>
        </div>
      </div>

      {/* 모바일 드롭다운 메뉴 (아코디언 구조 포함) */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#FBF9F4] border-b border-[#1B3525]/10 overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[85vh] py-6" : "max-h-0 py-0 border-transparent"
        }`}
      >
        <div className="flex flex-col px-6 gap-6 text-[#1B3525]">
          {megaMenuItems.map((item) => (
            <div key={item.name} className="flex flex-col border-b border-[#1B3525]/5 pb-4">
              <Link
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold tracking-widest text-[#1B3525] hover:text-[#D4AF37] transition-colors py-1"
              >
                {item.name}
              </Link>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 mt-3 pl-2">
                {item.subItems.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-xs text-[#1B3525]/70 hover:text-[#D4AF37] tracking-wider py-1 font-light flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="/rooms"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 rounded-full bg-[#1B3525] text-white text-xs uppercase tracking-widest font-semibold shadow-md"
          >
            <Calendar className="w-4 h-4" />
            실시간 예약하기
          </Link>
        </div>
      </div>
    </header>
  );
}
