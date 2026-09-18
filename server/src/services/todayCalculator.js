const { calculateFourPillars } = require("manseryeok");

/**

한국 시간 기준 오늘 날짜를 YYYY-MM-DD로 반환
*/
function getTodayKST() {
  const now = new Date();

  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(now);
}

/**

오늘의 일주(오늘의 간지)를 계산

오늘의 운세에서는 오늘 날짜의 일주만 사용한다.

시주는 필요하지 않기 때문에 계산 편의를 위해 12:00을 사용한다.
*/
function calculateToday() {
  const today = getTodayKST();

  const [year, month, day] = today.split("-").map(Number);

  const result = calculateFourPillars({
    year,
    month,
    day,
    hour: 12,
    minute: 0,
  });

  const todayData = {
    date: today,

    dayPillar: result.day,

    dayString: `${result.day.heavenlyStem}${result.day.earthlyBranch}`,

    dayElement: result.dayElement,

    dayYinYang: result.dayYinYang,
  };

  console.log("오늘 날짜:", todayData.date);
  console.log("오늘의 일주:", todayData.dayString);

  return todayData;
}

module.exports = {
  calculateToday,
};
