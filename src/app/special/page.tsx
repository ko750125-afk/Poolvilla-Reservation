import { Waves, Utensils, TreePine, Smile, Compass } from "lucide-react";

export default function SpecialPage() {
  const specials = [
    {
      id: "private-pool",
      title: "Secret Infinity Pool",
      subtitle: "수평선과 맞닿은 귀하만의 독립된 유영 공간",
      desc: "외부의 시선이 완벽하게 차단된 프라이빗 구조 속에서 사계절 내내 최적의 수온을 유지하는 시크릿 풀입니다. 물안개가 피어오르는 아침부터 별빛이 내려앉는 밤까지, 시간에 구애받지 않는 자유로운 힐링을 선사합니다.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      icon: Waves,
    },
    {
      id: "outdoor-pool",
      title: "Forest Blue Pool",
      subtitle: "청정한 숲의 숨결을 품은 야외 라운지 수영장",
      desc: "탁 트인 하늘과 웅장한 산세를 배경으로 펼쳐진 대형 야외 풀입니다. 이국적인 선베드와 카바나에서 달콤한 휴식을 취하며 청정 자연이 뿜어내는 상쾌한 에너지를 오롯이 만끽하실 수 있습니다.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      icon: Compass,
    },
    {
      id: "garden",
      title: "Vertical Green Meadow",
      subtitle: "자연의 쾌적한 숨결을 따라 걷는 산책로",
      desc: "수직적으로 이어지는 단지 내 동선을 따라 정성스레 가꿔진 잔디 정원과 조경 공간입니다. 계절마다 다채로운 색감으로 피어나는 야생화와 짙은 나무 향기를 맡으며 사색에 잠기기에 최적의 장소입니다.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      icon: TreePine,
    },
    {
      id: "private-bbq",
      title: "Exclusive Dining",
      subtitle: "미식의 즐거움을 배가시키는 전용 바베큐 라운지",
      desc: "객실별로 완벽히 분리되어 날씨의 영향을 받지 않는 프라이빗 다이닝 스페이스입니다. 최고급 무연 로스터 그릴과 쾌적한 공조 시스템을 갖추어 사랑하는 이들과의 만찬을 더욱 품격 있게 완성합니다.",
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=80",
      icon: Utensils,
    },
    {
      id: "service",
      title: "Bespoke Hospitality",
      subtitle: "머무름의 가치를 높이는 섬세한 맞춤 서비스",
      desc: "도착 순간 제공되는 향긋한 웰컴 티 서비스부터 프리미엄 친환경 어메니티, 구름 위에 누운 듯한 포근함을 주는 헝가리산 구스 침구류까지 귀하의 완벽한 여정을 돕는 최상의 환대를 약속합니다.",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      icon: Smile,
    },
  ];

  return (
    <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4">
      {/* 타이틀 */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Special Points</p>
        <h1 className="text-4xl font-serif text-[#1B3525]">
          하늘계단만의 특별함
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          자연과 건축이 빚어내는 독창적인 프라이빗 부대시설을 소개합니다.
        </p>
      </div>

      {/* 리스트 (지그재그형 교차 레이아웃으로 역동성 극대화) */}
      <div className="space-y-20">
        {specials.map((item, index) => {
          const Icon = item.icon;
          const isEven = index % 2 === 0;

          return (
            <section 
              key={item.id}
              id={item.id}
              className={`flex flex-col gap-8 items-center ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* 이미지 */}
              <div className="w-full md:w-3/5 h-80 md:h-[450px] rounded-2xl overflow-hidden shadow-md relative group bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-3 rounded-xl shadow-sm text-[#1B3525]">
                  <Icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
              </div>

              {/* 텍스트 콘텐츠 */}
              <div className="w-full md:w-2/5 space-y-4 px-4">
                <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                  Point 0{index + 1}
                </span>
                <h2 className="text-3xl font-serif text-[#1B3525]">
                  {item.title}
                </h2>
                <p className="text-sm font-semibold text-gray-700">
                  {item.subtitle}
                </p>
                <p className="text-sm text-gray-600 font-light leading-relaxed pt-2 border-t border-gray-100">
                  {item.desc}
                </p>
                <div className="pt-2">
                  <a 
                    href="/rooms" 
                    className="inline-block text-xs font-bold text-[#1B3525] border-b border-[#1B3525] pb-0.5 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all"
                  >
                    관련 객실 예약하기 →
                  </a>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
