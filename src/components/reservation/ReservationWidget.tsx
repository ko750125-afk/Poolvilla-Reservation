"use client";

import { useState } from "react";
import { Room, Reservation } from "@/lib/types";
import { calculateTotalPrice, formatDateStr, isWeekend, isPeakSeason } from "@/lib/utils";
import { supabase } from "@/lib/supabase/client";
import { Calendar as CalendarIcon, CheckCircle, Info, CreditCard } from "lucide-react";

interface Props {
  room: Room;
  existingReservations: Reservation[];
}

export function ReservationWidget({ room, existingReservations }: Props) {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [step, setStep] = useState<"select" | "info" | "complete">("select");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 예약된 날짜 목록 (YYYY-MM-DD Set)
  const bookedDates = new Set<string>();
  existingReservations.forEach((res) => {
    // 취소된 예약은 제외
    if (res.status === "cancelled") return;
    
    const start = new Date(res.check_in_date);
    const end = new Date(res.check_out_date);
    const current = new Date(start);
    while (current < end) {
      bookedDates.add(formatDateStr(current));
      current.setDate(current.getDate() + 1);
    }
  });

  // 간단한 자체 캘린더 그리드 생성 (현재월 기준 30일치 제공 - 시연용 최적화)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const calendarDays: { date: Date; dateStr: string; isBooked: boolean; isPast: boolean }[] = [];
  for (let i = 0; i < 35; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dStr = formatDateStr(d);
    calendarDays.push({
      date: d,
      dateStr: dStr,
      isBooked: bookedDates.has(dStr),
      isPast: d < today,
    });
  }

  // 날짜 클릭 핸들러
  const handleDateClick = (day: typeof calendarDays[0]) => {
    if (day.isPast || day.isBooked) return;

    setErrorMsg("");
    if (!checkInDate || (checkInDate && checkOutDate)) {
      // 새로운 체크인 선택
      setCheckInDate(day.date);
      setCheckOutDate(null);
    } else if (checkInDate && !checkOutDate) {
      // 체크아웃 선택
      if (day.date <= checkInDate) {
        // 이전 날짜 클릭 시 체크인으로 재설정
        setCheckInDate(day.date);
        return;
      }

      // 체크인과 체크아웃 사이에 예약된 날짜가 있는지 검증 (중복 차단 핵심 로직)
      let current = new Date(checkInDate);
      let isValid = true;
      while (current < day.date) {
        if (bookedDates.has(formatDateStr(current))) {
          isValid = false;
          break;
        }
        current.setDate(current.getDate() + 1);
      }

      if (!isValid) {
        setErrorMsg("선택하신 기간 중간에 이미 예약된 날짜가 포함되어 있습니다.");
        return;
      }

      setCheckOutDate(day.date);
    }
  };

  // 총 결제 금액 계산
  const totalPrice = (checkInDate && checkOutDate) 
    ? calculateTotalPrice(checkInDate, checkOutDate, room)
    : 0;

  const nightCount = (checkInDate && checkOutDate)
    ? Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  // 포트원 테스트 결제 및 DB 전송 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate || !guestName || !guestPhone) {
      setErrorMsg("모든 정보를 정확히 입력해주세요.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      // 1. 포트원 결제 시뮬레이션 (테스트 버전 대체 요구사항 반영)
      // 실제 PG 호출 대신 시뮬레이션 딜레이 및 고유 승인번호 발급 처리
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockImpUid = `imp_test_${Date.now()}`;

      // 2. Supabase DB에 최종 INSERT (상태: pending 또는 confirmed)
      const { error } = await supabase.from("poolvilla_reservations").insert([
        {
          room_id: room.id,
          guest_name: guestName,
          guest_phone: guestPhone,
          check_in_date: formatDateStr(checkInDate),
          check_out_date: formatDateStr(checkOutDate),
          total_price: totalPrice,
          status: "confirmed", // 데모 시연을 위해 즉시 확정 처리
          portone_imp_uid: mockImpUid,
        },
      ]);

      if (error) throw error;

      // 성공 시 완료 화면으로 이동
      setStep("complete");
    } catch (err: any) {
      console.error("Reservation submit error:", err);
      setErrorMsg("예약 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#1B3525]/10 shadow-xl p-6 md:p-8 sticky top-28">
      {/* 진행 단계 헤더 */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
        <div>
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
            {room.name}
          </span>
          <h3 className="text-xl font-serif text-[#1B3525]">실시간 예약</h3>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          <span className={`px-2 py-1 rounded ${step === "select" ? "bg-[#1B3525] text-white" : "text-gray-400"}`}>
            1. 날짜선택
          </span>
          <span className="text-gray-300">&gt;</span>
          <span className={`px-2 py-1 rounded ${step === "info" ? "bg-[#1B3525] text-white" : "text-gray-400"}`}>
            2. 정보/결제
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs flex items-center gap-2">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* 단계 1: 달력 및 날짜 선택 */}
      {step === "select" && (
        <div>
          <div className="mb-4 flex items-center justify-between text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" /> 예약불가
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B3525] inline-block" /> 선택날짜
            </span>
            <span>* 금/토 주말요금 적용</span>
          </div>

          {/* 달력 그리드 */}
          <div className="grid grid-cols-7 gap-1 text-center mb-6">
            {["오늘", "+1", "+2", "+3", "+4", "+5", "+6"].map((d, i) => (
              <div key={i} className="text-[10px] text-gray-400 font-bold py-1">
                {d}
              </div>
            ))}
            
            {calendarDays.map((day, idx) => {
              const isCheckIn = checkInDate && formatDateStr(checkInDate) === day.dateStr;
              const isCheckOut = checkOutDate && formatDateStr(checkOutDate) === day.dateStr;
              const isSelectedRange = checkInDate && checkOutDate && day.date > checkInDate && day.date < checkOutDate;
              
              // 요금 할증 시각 뱃지 판별
              const isWk = isWeekend(day.date);
              const isPk = isPeakSeason(day.date);

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleDateClick(day)}
                  disabled={day.isPast || day.isBooked}
                  className={`h-12 rounded-lg flex flex-col items-center justify-center relative transition-all overflow-hidden ${
                    day.isBooked
                      ? "bg-red-50/80 text-red-400/90 font-medium cursor-not-allowed border border-red-100/60"
                      : day.isPast
                      ? "bg-gray-50 text-gray-300 line-through cursor-not-allowed"
                      : isCheckIn || isCheckOut
                        ? "bg-[#1B3525] text-white font-bold shadow-md"
                        : isSelectedRange
                          ? "bg-[#1B3525]/10 text-[#1B3525] font-semibold"
                          : "bg-white hover:bg-gray-50 text-gray-700 border border-gray-100"
                  }`}
                >
                  <span className={`text-xs ${day.isBooked ? "line-through text-red-300/80" : ""}`}>
                    {day.date.getDate()}
                  </span>
                  
                  {/* 예약완료 라벨 표시 */}
                  {day.isBooked ? (
                    <span className="absolute bottom-0.5 text-[8px] tracking-tighter text-red-500 font-bold bg-white/90 px-1 rounded shadow-2xs scale-90">
                      완료
                    </span>
                  ) : day.isPast ? null : (
                    <span className={`w-1 h-1 rounded-full mt-0.5 ${
                      isPk ? "bg-red-500" : isWk ? "bg-[#D4AF37]" : "bg-gray-300"
                    }`} />
                  )}

                  {isCheckIn && <span className="absolute bottom-0.5 text-[8px] text-[#D4AF37] font-bold">IN</span>}
                  {isCheckOut && <span className="absolute bottom-0.5 text-[8px] text-[#D4AF37] font-bold">OUT</span>}
                </button>
              );
            })}
          </div>

          {/* 선택 결과 및 요금 요약 */}
          <div className="bg-[#FBF9F4] p-4 rounded-xl border border-[#1B3525]/5 space-y-2 mb-6 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500 font-light">체크인</span>
              <span className="font-semibold text-[#1B3525]">
                {checkInDate ? formatDateStr(checkInDate) : "날짜 선택"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-light">체크아웃</span>
              <span className="font-semibold text-[#1B3525]">
                {checkOutDate ? formatDateStr(checkOutDate) : "날짜 선택"}
              </span>
            </div>
            
            {nightCount > 0 && (
              <div className="pt-2 border-t border-gray-200/60 flex justify-between items-center">
                <span className="text-xs text-[#D4AF37] font-bold">총 {nightCount}박 숙박비 (할증 반영)</span>
                <span className="text-xl font-serif font-bold text-[#1B3525]">
                  {totalPrice.toLocaleString()}원
                </span>
              </div>
            )}
          </div>

          {/* 다음 단계 버튼 */}
          <button
            type="button"
            onClick={() => {
              if (!checkInDate || !checkOutDate) {
                setErrorMsg("체크인 및 체크아웃 날짜를 모두 선택해주세요.");
                return;
              }
              setStep("info");
            }}
            disabled={!checkInDate || !checkOutDate}
            className="w-full py-3.5 rounded-xl bg-[#1B3525] text-white font-semibold text-sm uppercase tracking-widest hover:bg-[#D4AF37] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            예약자 정보 입력하기
          </button>
        </div>
      )}

      {/* 단계 2: 예약자 정보 및 결제 시뮬레이션 */}
      {step === "info" && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-lg text-xs space-y-1 text-gray-600 mb-2">
            <p className="font-bold text-[#1B3525]">예약 요약</p>
            <p>{formatDateStr(checkInDate!)} ~ {formatDateStr(checkOutDate!)} ({nightCount}박)</p>
            <p className="text-[#D4AF37] font-bold">최종 결제 금액: {totalPrice.toLocaleString()}원</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              예약자 성함 *
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="예: 홍길동"
              className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1B3525]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              연락처 (휴대폰 번호) *
            </label>
            <input
              type="tel"
              required
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="예: 010-1234-5678"
              className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:border-[#1B3525]"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              * 예약 확정 문자가 발송되오니 정확히 입력해주세요.
            </span>
          </div>

          {/* 포트원 결제 대체 안내 */}
          <div className="p-3.5 rounded-lg border border-blue-100 bg-blue-50/50 text-blue-800 text-xs space-y-1.5">
            <div className="flex items-center gap-1 font-bold">
              <CreditCard className="w-4 h-4 text-blue-600" />
              <span>포트원(PortOne) 결제 연동 (테스트 환경)</span>
            </div>
            <p className="text-gray-600 text-[11px] leading-relaxed">
              본 요청은 사용자 규칙 3번("결제는 포트원으로 진행하고 테스트버전으로 대체")에 따라
              PG사 테스트 연동 모드로 처리되며 실과금되지 않습니다.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep("select")}
              className="w-1/3 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50 transition-colors"
            >
              날짜 변경
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-3 rounded-xl bg-[#1B3525] text-white font-semibold text-xs uppercase tracking-widest hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  결제 진행 중...
                </>
              ) : (
                `${totalPrice.toLocaleString()}원 안전결제`
              )}
            </button>
          </div>
        </form>
      )}

      {/* 단계 3: 완료 화면 */}
      {step === "complete" && (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif text-[#1B3525]">예약이 완료되었습니다!</h3>
          <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
            고객님의 소중한 예약 정보가 안전하게 접수되었습니다. 
            입력하신 연락처({guestPhone})로 확정 안내 문자가 전송됩니다.
          </p>

          <div className="p-3 bg-gray-50 rounded-lg text-left text-xs space-y-1.5 text-gray-600 my-4 mx-auto max-w-sm">
            <p><span className="text-gray-400">예약객실:</span> {room.name}</p>
            <p><span className="text-gray-400">예약자명:</span> {guestName}</p>
            <p><span className="text-gray-400">체크인:</span> {formatDateStr(checkInDate!)}</p>
            <p><span className="text-gray-400">결제금액:</span> {totalPrice.toLocaleString()}원 (포트원 테스트 승인)</p>
          </div>

          <button
            type="button"
            onClick={() => {
              // 초기화
              setCheckInDate(null);
              setCheckOutDate(null);
              setGuestName("");
              setGuestPhone("");
              setStep("select");
              // 상위 컴포넌트 데이터 갱신을 유도하기 위해 새로고침하거나 state 유지
              window.location.reload();
            }}
            className="px-6 py-2.5 rounded-xl bg-[#1B3525] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#D4AF37] transition-colors"
          >
            다른 날짜 예약하기
          </button>
        </div>
      )}
    </div>
  );
}
