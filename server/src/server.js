const express = require("express");
const cors = require("cors");
const { calculateToday } = require("./services/todayCalculator");

require("dotenv").config();

const { calculateSaju } = require("./services/sajuCalculator");
const { interpretSaju } = require("./services/openaiService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/today", (req, res) => {
  try {
    const today = calculateToday();

    res.json({
      success: true,
      data: today,
    });
  } catch (error) {
    console.error("오늘 날짜 계산 오류:", error);

    res.status(500).json({
      success: false,
      message: "오늘 날짜를 계산하는 중 오류가 발생했습니다.",
    });
  }
});

// 서버 상태 확인
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "사주 서비스 서버가 정상적으로 실행되고 있습니다.",
  });
});

// 사주 계산 API
app.post("/api/saju", async (req, res) => {
  try {
    const userData = req.body;

    console.log("사주 계산 요청");

    // 1. 출생 사주 계산
    const sajuResult = calculateSaju(userData);

    // 2. 오늘의 날짜 및 일주 계산
    const todayResult = calculateToday();

    // 3. 사주 + 오늘 데이터 결합
    const analysisData = {
      saju: sajuResult,
      today: todayResult,
    };

    console.log("사주 + 오늘 데이터 준비 완료");

    // 4. OpenAI 해석
    const interpretation = await interpretSaju(analysisData);

    console.log("AI 사주 해석 완료");

    res.json({
      success: true,
      data: {
        saju: sajuResult,
        today: todayResult,
        interpretation,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "사주를 계산하거나 해석하는 중 오류가 발생했습니다.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
