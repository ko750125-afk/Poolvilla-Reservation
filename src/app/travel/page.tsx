import { MapPin } from "lucide-react";

export default function TravelPage() {
  const travels = [
    {
      name: "두물머리",
      subtitle: "남한강과 북한강이 만나는 아름다운 나루터",
      desc: "사계절 내내 운치 있는 풍경을 자랑하는 양평의 대표적인 명소입니다. 이른 아침 피어오르는 물안개와 수양버들이 어우러진 풍경 속에서 낭만적인 산책을 즐겨보세요.",
      dist: "차량 약 15분 소요",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "세미원",
      subtitle: "물과 꽃의 정원",
      desc: "여름철 연꽃이 만개하는 대표적인 수생식물원입니다. 징검다리를 건너며 다채로운 연꽃과 수련을 감상하고 자연이 주는 차분한 힐링을 경험하세요.",
      dist: "차량 약 18분 소요",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "용문산 관광단지",
      subtitle: "천년 은행나무가 숨 쉬는 곳",
      desc: "웅장한 산세와 시원한 계곡이 어우러진 휴양지입니다. 가을이면 황금빛으로 물드는 동양 최대 크기의 용문사 은행나무를 만나보실 수 있습니다.",
      dist: "차량 약 25분 소요",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "더그림 (The Greem)",
      subtitle: "한 폭의 수채화 같은 미니 식물원 카페",
      desc: "유럽풍의 예쁜 건물과 아기자기하게 꾸며진 정원이 돋보이는 공간입니다. 수많은 드라마와 영화 촬영지로 사랑받는 포토 스팟에서 인생 사진을 남겨보세요.",
      dist: "차량 약 20분 소요",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4">
      {/* 타이틀 */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Around Places</p>
        <h1 className="text-4xl font-serif text-[#1B3525]">
          주변 여행지
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          하늘계단 풀빌라와 함께 양평의 다채로운 매력을 경험하세요.
        </p>
      </div>

      {/* 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {travels.map((place, idx) => (
          <div 
            key={idx}
            className="group rounded-2xl overflow-hidden bg-white border border-[#1B3525]/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col sm:flex-row"
          >
            {/* 이미지 */}
            <div className="w-full sm:w-1/2 h-60 sm:h-auto overflow-hidden bg-gray-100 relative">
              <img 
                src={place.image} 
                alt={place.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-3 left-3 bg-[#1B3525]/80 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#D4AF37]" /> {place.dist}
              </div>
            </div>

            {/* 설명 */}
            <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-serif text-[#1B3525] group-hover:text-[#D4AF37] transition-colors">
                  {place.name}
                </h3>
                <p className="text-xs font-semibold text-[#D4AF37] mt-1">
                  {place.subtitle}
                </p>
                <p className="text-xs text-gray-600 font-light mt-3 line-clamp-4 leading-relaxed">
                  {place.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 text-right">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold group-hover:text-[#1B3525] transition-colors">
                  Explore More →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
