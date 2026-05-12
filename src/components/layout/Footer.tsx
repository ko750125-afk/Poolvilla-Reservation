import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#1B3525] text-white/80 py-16 mt-auto border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* 브랜딩 및 요약 */}
        <div className="md:col-span-2">
          <span className="font-serif text-2xl tracking-widest text-white font-bold block mb-2">
            Sky Stairs
          </span>
          <p className="text-xs text-[#D4AF37] uppercase tracking-widest mb-6">
            양평 하늘계단 풀빌라 펜션
          </p>
          <p className="text-sm text-white/60 font-light leading-relaxed max-w-sm">
            양평의 맑은 바람과 짙은 녹음이 머무는 하이엔드 프라이빗 풀빌라. 
            일상의 소음을 지우고 자연과 교감하는 고요한 공간에서, 귀하만의 감각적인 휴식과 잊지 못할 여정을 디자인합니다.
          </p>
        </div>

        {/* 퀵 링크 */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-6 pb-2 border-b border-white/10 inline-block">
            Navigation
          </h4>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <Link href="/about" className="hover:text-[#D4AF37] transition-colors">풀빌라 소개</Link>
            </li>
            <li>
              <Link href="/rooms" className="hover:text-[#D4AF37] transition-colors">객실 미리보기</Link>
            </li>
            <li>
              <Link href="/special" className="hover:text-[#D4AF37] transition-colors">스페셜 포인트</Link>
            </li>
            <li>
              <Link href="/travel" className="hover:text-[#D4AF37] transition-colors">주변 여행지</Link>
            </li>
          </ul>
        </div>

        {/* 고객센터 및 안내 */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-6 pb-2 border-b border-white/10 inline-block">
            Reservation & Info
          </h4>
          <p className="text-sm font-light text-white/60 mb-2">예약 문의</p>
          <p className="text-xl font-serif text-white font-bold mb-4">010-2578-1126</p>
          <p className="text-xs text-white/50 font-light leading-relaxed">
            상담 시간: 09:00 ~ 21:00<br />
            농협 351-2578-1126-00 (예금주: 고병일)
          </p>
        </div>
      </div>

      {/* 하단 저작권 및 사업자 고시 */}
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-white/10 text-xs text-white/50 font-light flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-1">
          <p>상호: 양평 하늘계단 풀빌라 펜션 | 대표자: 고병일 | 사업자등록번호: 010-44-56789</p>
          <p>주소: 경기도 양평군 북가좌면 152</p>
          <p className="mt-2 text-white/30">COPYRIGHT© Sky Stairs Pension. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="flex gap-4 text-white/60">
          <Link href="#" className="hover:underline">이용약관</Link>
          <span>|</span>
          <Link href="#" className="hover:underline text-[#D4AF37]">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  );
}
