import { supabase } from "@/lib/supabase/client";
import { Room } from "@/lib/types";
import { Waves, Utensils, TreePine, Users } from "lucide-react";

async function getRooms(): Promise<Room[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')) {
      throw new Error("Bypass Network Timeout");
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
    console.warn("Supabase fetch failed on /rooms, returning static fallback data:", err);
    return [
      {
        id: "fallback-1",
        name: "1층 산책(풀빌라) - Signature",
        type: "poolvilla",
        base_price: 350000,
        weekend_price: 450000,
        peak_price: 550000,
        max_guests: 4,
        description: "청량한 자연광과 은은한 달빛이 스며드는 시크릿 풀과 전용 테라스를 갖춘 최상급 시그니처 공간입니다.",
        images: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80"],
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
        description: "높은 층고를 통해 밀려오는 숲의 웅장함과 세련된 내부 인테리어가 돋보이는 럭셔리 스위트입니다.",
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"],
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
        description: "감각적인 간접 조명과 절제된 미학으로 두 사람만의 오붓한 시간을 빛내주는 커플 스튜디오입니다.",
        images: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"],
        features: { pool: false, bbq: true, garden: true },
      }
    ];
  }
}

export default async function RoomsPage() {
  const rooms = await getRooms();

  const getImageUrl = (images: string[], index: number) => {
    if (images && images.length > 0 && !images[0].startsWith("/images/rooms/")) {
      return images[0];
    }
    const fallbackImages = [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    ];
    return fallbackImages[index % fallbackImages.length];
  };

  return (
    <main className="flex-1 pt-24 pb-20 max-w-7xl mx-auto px-4">
      {/* 타이틀 */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">Our Suites</p>
        <h1 className="text-4xl font-serif text-[#1B3525]">
          객실 미리보기
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          귀하의 완벽한 쉼을 위해 다채로운 감각으로 준비된 풀빌라 및 스위트 라인업입니다.
        </p>
      </div>

      {/* 리스트 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {rooms.map((room, idx) => (
          <div 
            key={room.id}
            className="group bg-white rounded-2xl overflow-hidden border border-[#1B3525]/5 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            {/* 이미지 */}
            <div className="relative h-80 overflow-hidden bg-gray-100">
              <img 
                src={getImageUrl(room.images, idx)} 
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1B3525] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {room.type === 'poolvilla' ? '풀빌라 스위트' : '신축 모던 스위트'}
              </div>
            </div>

            {/* 상세 */}
            <div className="p-8 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                  <h3 className="text-2xl font-serif font-bold text-[#1B3525] group-hover:text-[#D4AF37] transition-colors">
                    {room.name}
                  </h3>
                  <span className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> 기준 {room.max_guests}인
                  </span>
                </div>

                <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                  {room.description}
                </p>

                {/* 부대시설 태그 */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {room.features?.pool && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1B3525]/5 text-[#1B3525] text-xs font-medium">
                      <Waves className="w-3.5 h-3.5 text-[#D4AF37]" /> 개별수영장
                    </span>
                  )}
                  {room.features?.bbq && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1B3525]/5 text-[#1B3525] text-xs font-medium">
                      <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> 개별바베큐
                    </span>
                  )}
                  {room.features?.garden && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#1B3525]/5 text-[#1B3525] text-xs font-medium">
                      <TreePine className="w-3.5 h-3.5 text-[#D4AF37]" /> 전용정원 뷰
                    </span>
                  )}
                </div>
              </div>

              {/* 하단 요금 및 버튼 (확장프로그램 프리징 방지용 네이티브 <a> 태그 하드 로딩 적용) */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">비수기 평일 기준</span>
                  <span className="text-xl font-bold text-[#1B3525]">
                    {room.base_price?.toLocaleString()}원
                  </span>
                </div>
                <a 
                  href={`/rooms/${room.id}`}
                  className="px-6 py-2.5 rounded-xl bg-[#1B3525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] transition-colors inline-block text-center"
                >
                  실시간 예약
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
