import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Room } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 성수기 여부 판별 (예: 7월 15일 ~ 8월 15일)
 */
export function isPeakSeason(date: Date): boolean {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  if (month === 8 && day <= 15) return true;
  if (month === 7 && day >= 15) return true;
  return false;
}

/**
 * 주말 여부 판별 (금, 토요일을 펜션 주말 요금으로 적용)
 */
export function isWeekend(date: Date): boolean {
  const dayOfWeek = date.getDay(); // 0: 일, 5: 금, 6: 토
  return dayOfWeek === 5 || dayOfWeek === 6;
}

/**
 * 특정 날짜 1박의 책정 요금 계산 로직
 */
export function getNightlyPrice(date: Date, room: Room): number {
  if (isPeakSeason(date)) {
    return room.peak_price;
  }
  if (isWeekend(date)) {
    return room.weekend_price;
  }
  return room.base_price;
}

/**
 * 두 날짜 사이의 모든 날짜 배열 반환 (종료일 제외 - 숙박 기준)
 */
export function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  // 시간을 00:00:00으로 정규화
  currentDate.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  while (currentDate < end) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

/**
 * 총 숙박비 자동 계산기
 */
export function calculateTotalPrice(startDate: Date, endDate: Date, room: Room): number {
  const nights = getDatesInRange(startDate, endDate);
  return nights.reduce((total, night) => total + getNightlyPrice(night, room), 0);
}

/**
 * YYYY-MM-DD 포맷 변환기
 */
export function formatDateStr(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
