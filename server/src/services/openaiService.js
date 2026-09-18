const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**

사주와 오늘의 운세 해석

사주 계산과 오늘의 날짜 계산은 서버에서 완료한다.

OpenAI는 계산 결과를 바탕으로 해석만 담당한다.
*/
async function interpretSaju(analysisData) {
  const { saju, today } = analysisData;

  const inputData = {
    saju,
    today,
  };

  const response = await client.responses.create({
    model: "gpt-5-mini",

    input: [
      {
        role: "system",
        content: `


너는 사주 명리학 해석 서비스를 위한 AI 해석자다.

가장 중요한 원칙은 다음과 같다.

1.사주를 직접 계산하지 않는다.

2.오늘의 간지를 직접 계산하지 않는다.

3.서버가 제공한 만세력 계산 결과를 그대로 사용한다.

4.천간, 지지, 오행, 음양, 십신, 공망, 대운 등의 값을 임의로 수정하거나 계산하지 않는다.

5.계산 결과에 없는 내용을 사실처럼 만들어내지 않는다.

6.전통적인 사주 명리학의 관점에서 해석한다.

7.사주 해석은 과학적으로 검증된 사실이나 의학적 진단으로 표현하지 않는다.

8.미래의 사건을 확정적으로 예언하지 않는다.

9."반드시", "무조건", "확실히 일어난다" 등의 단정적인 표현을 피한다.

10.건강과 관련해서는 질병을 진단하거나 치료 방법을 제시하지 않는다.

11.사용자가 이해하기 쉬운 한국어로 작성한다.

12.명리학 전문용어를 사용할 경우 간단한 설명을 덧붙인다.

특히 "오늘의 운세"는 서버에서 제공한
오늘 날짜와 오늘의 일주를 기준으로
사용자의 사주 원국과의 관계를 해석한다.

사주 원국과 오늘의 운세를 혼동하지 않는다.
`.trim(),
      },

      {
        role: "user",
        content: `


다음은 서버에서 계산한 데이터다.

이 데이터는 이미 만세력 계산이 완료된 결과다.
절대로 다시 계산하지 말고 이 데이터를 기준으로 해석하라.

====================
[사주 데이터]

${JSON.stringify(saju, null, 2)}

====================
[오늘의 데이터]

${JSON.stringify(today, null, 2)}

====================
[사주 해석]

다음 항목을 작성하라.

1.summary
전체적인 사주의 특징과 핵심적인 성향을 설명한다.

2.personality
성격과 기질을 설명한다.
강점과 주의할 점을 함께 설명한다.

3.career
직업 및 업무 성향을 설명한다.
특정 직업을 반드시 선택해야 한다고 단정하지 않는다.

4.wealth
재물과 경제활동에 대한 전통적인 사주 관점의 해석을 제공한다.

5.love
연애 및 인간관계에서 나타날 수 있는 성향을 설명한다.

6.health
오행 관점에서 생활 습관에 참고할 수 있는 내용을 설명한다.
질병이나 의학적 진단은 하지 않는다.

7.advice
전체적인 삶에서 참고할 수 있는 현실적인 조언을 제공한다.

====================
[오늘의 운세]

오늘의 날짜와 오늘의 일주를 사주 원국과 함께 고려하여
오늘 하루의 흐름을 해석한다.

1.overall
오늘의 전체적인 흐름을 설명한다.

2.career
오늘의 직장, 업무, 학업 또는 사업과 관련된 흐름을 설명한다.

3.wealth
오늘의 소비, 금전관리 및 재물과 관련된 참고점을 설명한다.

4.love
오늘의 연애 및 인간관계와 관련된 흐름을 설명한다.

5.relationship
오늘 사람들과 소통할 때 참고할 점을 설명한다.

6.caution
오늘 주의하면 좋은 부분을 설명한다.

7.advice
오늘 하루를 보내는 데 도움이 될 만한 현실적인 조언을 제공한다.

오늘의 운세 역시 미래의 사건을 확정적으로 예언하지 말고
참고용 해석으로 작성한다.
`.trim(),
      },
    ],

    text: {
      format: {
        type: "json_schema",
        name: "saju_and_today_interpretation",
        strict: true,

        schema: {
          type: "object",

          properties: {
            saju: {
              type: "object",

              properties: {
                summary: {
                  type: "string",
                },
                personality: {
                  type: "string",
                },
                career: {
                  type: "string",
                },
                wealth: {
                  type: "string",
                },
                love: {
                  type: "string",
                },
                health: {
                  type: "string",
                },
                advice: {
                  type: "string",
                },
              },

              required: [
                "summary",
                "personality",
                "career",
                "wealth",
                "love",
                "health",
                "advice",
              ],

              additionalProperties: false,
            },

            today: {
              type: "object",

              properties: {
                overall: {
                  type: "string",
                },
                career: {
                  type: "string",
                },
                wealth: {
                  type: "string",
                },
                love: {
                  type: "string",
                },
                relationship: {
                  type: "string",
                },
                caution: {
                  type: "string",
                },
                advice: {
                  type: "string",
                },
              },

              required: [
                "overall",
                "career",
                "wealth",
                "love",
                "relationship",
                "caution",
                "advice",
              ],

              additionalProperties: false,
            },
          },

          required: ["saju", "today"],

          additionalProperties: false,
        },
      },
    },
  });

  return JSON.parse(response.output_text);
}

module.exports = {
  interpretSaju,
};
