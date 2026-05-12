import { MapPin, Phone, Car, Train } from "lucide-react";

export default function AboutPage() {
  const galleryImages = [
    { url: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80", title: "프라이빗 독채 전경" },
    { url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80", title: "자연과 호흡하는 외경" },
    { url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80", title: "정제된 모던 스위트" },
    { url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80", title: "달빛이 머무는 밤의 정원" },
  ];

  return (
    <main className="flex-1 pt-24 pb-20">
      {/* 상단 타이틀 */}
      <section className="text-center py-12 px-4 max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-3">About Sky Stairs</p>
        <h1 className="text-4xl md:text-5xl font-serif text-[#1B3525] mb-6">
          하늘로 이어지는 계단, 그 끝에서 마주하는 온전한 여백
        </h1>
        <div className="w-12 h-[1px] bg-[#D4AF37] mx-auto mb-8" />
        <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
          양평 하늘계단 풀빌라는 번잡한 도시의 리듬을 잠시 멈추고, 
          청정한 숲과 강의 고요한 에너지를 오롯이 흡수할 수 있도록 설계된 하이엔드 럭셔리 스테이입니다.
        </p>
      </section>

      {/* 브랜드 철학 2단 레이아웃 */}
      <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80" 
            alt="풀빌라 감성"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-serif text-[#1B3525]">
            계절의 변화를 담아내는<br />
            완벽한 공간과 세심한 환대
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
            하늘계단 풀빌라는 건축적 절제미와 자연의 생명력이 조화를 이루는 고품격 휴식처를 지향합니다.
            외부의 방해를 원천 차단한 독립된 동선 속에서 사계절 내내 최적의 온도를 유지하는 시크릿 미온수 풀과 
            감각적인 개별 다이닝 공간을 제공하여, 머무시는 모든 순간이 예술적인 쉼으로 기억되도록 정성을 다합니다.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200/60">
            <div>
              <p className="font-serif text-2xl text-[#D4AF37] font-bold">Heritage</p>
              <p className="text-xs text-gray-500 mt-1">시간이 멈춘 듯한 평온함</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#D4AF37] font-bold">Exclusive</p>
              <p className="text-xs text-gray-500 mt-1">완벽하게 보장되는 프라이버시</p>
            </div>
          </div>
        </div>
      </section>

      {/* 외경 갤러리 */}
      <section className="bg-white/60 py-16 mt-12 border-y border-[#1B3525]/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-serif text-[#1B3525]">풀빌라 외경 및 시설 보기</h3>
            <p className="text-xs text-gray-500 mt-1">하늘계단 풀빌라가 품은 다채로운 매력의 공간들을 둘러보세요</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((img, idx) => (
              <div key={idx} className="group overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={img.url} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-medium tracking-wide drop-shadow">
                      {img.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 오시는 길 (Traffic) */}
      <section className="max-w-7xl mx-auto px-4 py-16 mt-6">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-serif text-[#1B3525]">오시는 길</h3>
          <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> 경기도 양평군 북가좌면 152
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 안전한 CSS 기반 자체 약도 뷰포트 (크로스 도메인 iframe 차단 완벽 회피) */}
          <div className="lg:col-span-2 h-80 bg-[#1B3525]/5 rounded-2xl p-6 flex flex-col items-center justify-center relative border border-[#1B3525]/10 text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-3 text-[#1B3525]">
              <MapPin className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <span className="font-serif font-bold text-lg text-[#1B3525]">양평 하늘계단 풀빌라 펜션</span>
            <p className="text-xs text-gray-500 mt-1 max-w-sm">
              경기도 양평군 북가좌면 152<br />
              (자연의 쾌적한 숨결을 따라 이어지는 진입로)
            </p>
            <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 bg-white/80 px-2 py-0.5 rounded border border-gray-100">
              안전 약도 모드 가동 중
            </div>
          </div>

          {/* 대중교통 및 자가용 안내 */}
          <div className="space-y-6 flex flex-col justify-center">
            <div className="flex gap-4 items-start">
              <div className="p-2.5 rounded-lg bg-white shadow-sm border border-gray-100 text-[#1B3525]">
                <Car className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1B3525]">자가용 이용 시</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  수도권제1순환고속도로 또는 서울양양고속도로 서종IC 진출 후 쾌적한 국도를 따라 진입.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="p-2.5 rounded-lg bg-white shadow-sm border border-gray-100 text-[#1B3525]">
                <Train className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1B3525]">대중교통 이용 시</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  경의중앙선 지하철 탑승 후 **양수역** 하차. 
                  역사 앞 지정 택시 승강장 이용.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">길안내 문의</span>
              <span className="text-sm font-bold text-[#1B3525] flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" /> 010-2578-1126
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
