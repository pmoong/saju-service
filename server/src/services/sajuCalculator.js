const { calculateFourPillars } = require("manseryeok");

/**

사주 계산

사주 계산 자체는 manseryeok 라이브러리가 담당하고,

이 함수에서는 계산 결과를 서비스에서 사용하기 좋은

데이터 구조로 정리한다.
*/
function calculateSaju(userData) {
  const {
    birthDate,
    birthHour,
    birthMinute,
    calendarType,
    isLeapMonth,
    birthTimeUnknown,
    gender,
  } = userData;

  if (!birthDate) {
    throw new Error("생년월일이 필요합니다.");
  }

  // YYYY-MM-DD
  const [year, month, day] = birthDate.split("-").map(Number);

  if (!year || !month || !day) {
    throw new Error("생년월일 형식이 올바르지 않습니다.");
  }

  const isLunar = calendarType === "lunar";

  /*

출생시간을 모르는 경우

현재는 라이브러리 계산을 위해 임시로 12:00을 사용한다.

반환 결과에서는 시주를 알 수 없음으로 처리한다.
*/
  const hour = birthTimeUnknown ? 12 : Number(birthHour);
  const minute = birthTimeUnknown ? 0 : Number(birthMinute || 0);

  const birthInfo = {
    year,
    month,
    day,
    hour,
    minute,
    isLunar,
    isLeapMonth: isLunar ? Boolean(isLeapMonth) : false,
    gender,
  };

  console.log("만세력 계산 입력:", birthInfo);

  // 만세력 계산
  const result = calculateFourPillars(birthInfo);

  const data = result.toObject();

  console.log("만세력 계산 결과:", data);

  /*

기본 사주 원국
*/
  const pillars = {
    year: result.year,
    month: result.month,
    day: result.day,
    hour: birthTimeUnknown ? null : result.hour,
  };

  /*

오행
*/
  const elements = {
    year: result.yearElement,
    month: result.monthElement,
    day: result.dayElement,
    hour: birthTimeUnknown ? null : result.hourElement,
  };

  /*

음양
*/
  const yinYang = {
    year: result.yearYinYang,
    month: result.monthYinYang,
    day: result.dayYinYang,
    hour: birthTimeUnknown ? null : result.hourYinYang,
  };

  /*

십신
*/
  const tenGods = {
    year: result.tenGods.year,
    month: result.tenGods.month,
    day: result.tenGods.day,
    hour: birthTimeUnknown ? null : result.tenGods.hour,
  };

  /*

공망
*/
  const voidBranches = result.voidBranches;

  /*

대운

luckPillars는 toObject()에 포함되지 않으므로

계산 결과 객체에서 직접 가져온다.
*/
  const luckPillars = result.luckPillars
    ? {
        forward: result.luckPillars.forward,
        startAge: result.luckPillars.startAge,
        startYears: result.luckPillars.startYears,
        startMonths: result.luckPillars.startMonths,
        startDays: result.luckPillars.startDays,

        pillars: result.luckPillars.pillars,
      }
    : null;

  const sajuResult = {
    birth: {
      year,
      month,
      day,
      hour: birthTimeUnknown ? null : hour,
      minute: birthTimeUnknown ? null : minute,
      calendarType,
      isLeapMonth: isLunar ? Boolean(isLeapMonth) : false,
    },

    gender,

    birthTimeUnknown: Boolean(birthTimeUnknown),

    pillars,

    elements,

    yinYang,

    tenGods,

    voidBranches,

    luckPillars,
  };

  console.log("사주 계산 완료:", sajuResult);

  return sajuResult;
}

module.exports = {
  calculateSaju,
};
