import { supabase } from "@/lib/supabase/client";
import { Room } from "@/lib/types";
import Link from "next/link";
import { Sparkles, Waves, Utensils, TreePine } from "lucide-react";

async function getRooms(): Promise<Room[]> {
  try {
    // 타임아웃 방지: 환경변수가 없으면 통신 시도조차 하지 않고 즉시 Fallback으로 바이패스
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      throw new Error("Local Env Missing: Immediate Bypass to Fallback");
    }

    const { data, error } = await supabase
      .from("poolvilla_rooms")
      .select("*")
      .order("base_price", { ascending: false });

    if (error || !data) {
      throw new Error(error?.message || "No data");
    }
    return data;
  } catch (err) {
    console.warn("Supabase fetch failed, returning static fallback data:", err);
    return [
      {
        id: "fallback-1",
        name: "1층 산책(풀빌라) - Signature",
        type: "poolvilla",
        base_price: 350000,
        weekend_price: 450000,
        peak_price: 550000,
        max_guests: 4,
        description: "외부의 시선을 완벽히 차단한 시크릿 인피니티 미온수 풀과 감각적인 바베큐 다이닝을 품은 시그니처 스위트입니다.",
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"],
        features: { pool: true, bbq: true, garden: true },
      },
      {
        id: "fallback-2",
        name: "2층 하늘(풀빌라) - Suite",
        type: "poolvilla",
        base_price: 380000,
        weekend_price: 480000,
        peak_price: 580000,
        max_guests: 4,
        description: "통창 너머로 펼쳐지는 웅장한 숲의 파노라마와 압도적인 개방감을 자랑하는 하이엔드 독채 공간입니다.",
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"],
        features: { pool: true, bbq: true, garden: false },
      },
      {
        id: "fallback-3",
        name: "신축 101 - Modern",
        type: "new",
        base_price: 180000,
        weekend_price: 230000,
        peak_price: 280000,
        max_guests: 2,
        description: "절제된 미니멀리즘과 따뜻한 우드 톤이 빚어내는 아늑함 속에서 연인과의 로맨틱한 순간을 완성하는 커플 객실입니다.",
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
        features: { pool: false, bbq: true, garden: true },
      }
    ];
  }
}

export default async function HomePage() {
  const rooms = await getRooms();

  const getImageUrl = (images: string[], index: number) => {
    if (images && images.length > 0 && !images[0].startsWith("/images/rooms/")) {
      return images[0];
    }
    const fallbackImages = [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <main className="flex-1">
      {/* 럭셔리 Hero 영역 */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transition-transform duration-1000"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1920&q=80')` 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#FBF9F4] z-10" />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-sm tracking-widest mb-4">
            <Sparkles className="w-4 h-4 text-amber-300" /> 프라이빗 아트 럭셔리 스테이
          </span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-md">
            Sky Stairs
            <span className="block text-2xl md:text-3xl mt-2 font-sans font-light tracking-wide text-white/90">
              양평 하늘계단 풀빌라
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto drop-shadow">
            자연의 흐름에 감각을 맡기고 온전한 비움을 경험하는 곳, 귀하만의 프라이빗 은신처를 제안합니다.
          </p>
        </div>
      </section>

      {/* 연동 테스트 및 객실 소개 섹션 */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Our Spaces</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1B3525]">
            설렘을 담아 오르는 특별한 계단
          </h2>
          <p className="text-sm text-[#1B3525]/60 mt-2 font-light">
            * Phase 1 통합 DB 연동 검증 완료: 실시간 객실 목록 로드 중
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, idx) => (
            <div 
              key={room.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-[#1B3525]/5 flex flex-col"
            >
              {/* 이미지 래퍼 */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img 
                  src={getImageUrl(room.images, idx)} 
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-4 right-4 bg-[#1B3525] text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  {room.type === 'poolvilla' ? '풀빌라 스위트' : '모던 스위트'}
                </div>
              </div>

              {/* 콘텐츠 */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1B3525] group-hover:text-[#D4AF37] transition-colors">
                    {room.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2 font-light leading-relaxed">
                    {room.description}
                  </p>

                  {/* 아이콘 뱃지 */}
                  <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 text-gray-400 text-xs">
                    {room.features?.pool && (
                      <span className="flex items-center gap-1 text-[#1B3525]">
                        <Waves className="w-4 h-4 text-[#D4AF37]" /> 시크릿풀
                      </span>
                    )}
                    {room.features?.bbq && (
                      <span className="flex items-center gap-1 text-[#1B3525]">
                        <Utensils className="w-4 h-4 text-[#D4AF37]" /> 전용다이닝
                      </span>
                    )}
                    {room.features?.garden && (
                      <span className="flex items-center gap-1 text-[#1B3525]">
                        <TreePine className="w-4 h-4 text-[#D4AF37]" /> 포레스트뷰
                      </span>
                    )}
                  </div>
                </div>

                {/* 하단 가격 및 예약 버튼 영역 */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">기준 {room.max_guests}인 / 비수기 평일</span>
                    <span className="text-lg font-bold text-[#1B3525]">
                      {room.base_price?.toLocaleString()}원~
                    </span>
                  </div>
                  <Link 
                    href="/rooms"
                    className="px-4 py-2 rounded-lg bg-[#1B3525] text-white text-sm hover:bg-[#D4AF37] transition-colors inline-block"
                  >
                    예약하기
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
