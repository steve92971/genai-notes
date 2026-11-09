# 第六週：打造自己的對話機器人

- 影片：https://www.youtube.com/live/C92xN-ENYcM
- 投影片：https://yenlung.me/1151GenAI
- 老師範例程式：https://yenlung.me/AI04 （員瑛式思考生成器）

---

## 1. 怎麼選語言模型
- 比較模型的網站：**Arena AI**（arena.ai，兩兩對戰評分）、**Artificial Analysis**（artificialanalysis.ai）
- 開源模型例子：gpt-oss、Qwen、Gemma、GLM、Kimi
- 不一定要選最強的，要看自己的需求

## 2. 在自己電腦跑模型
- 工具：**Ollama**、**LM Studio**
- 關鍵是顯示卡記憶體 **VRAM**
- 估算方式（4-bit 量化）：**參數量（B）× 0.5 = 需要的 GB**
  - 例：gpt-oss 20B → 20 × 0.5 = 10 GB 以上
- Mac 的記憶體可以當 VRAM 用（統一記憶體）
- **MoE** 架構的模型跑起來比較快
- 不想在自己電腦跑：用 **Groq**（免費 API，速度很快）

## 3. 負責任地使用 AI
- **幻覺**：Karpathy 說 LLM 本來就是「作夢的機器」，生成的內容都要自己查核
- **AI 沒有意識**：它的反應像人，不代表它真的懂
- **責任在使用者**：有沒有侵權、資料對不對、品質夠不夠，都是使用者要負責
- **隱私**：個資、機密文件、考試題目不要丟給雲端 AI；就算不拿去訓練，帳號被盜也可能外洩
- **資料偏差**：訓練資料以簡體中文為主的模型，可能不知不覺影響價值觀
- **推理模型的風險**：有思考能力的模型，反而比較容易被「劫持思維鏈」攻擊
- **最重要的技巧：一定要讀 AI 寫了什麼。** 沒寫錯，不代表寫對了你的意思

## 4. 下好 Prompt
兩個重點：
1. **正確的資訊**：把需要的資料給 AI
2. **清楚的指引**：要什麼格式、什麼風格、回答給誰看

## 5. 對話的三種角色
| 角色 | 意思 |
|---|---|
| `system` | 機器人的**人設**（使用者看不到） |
| `user` | 使用者說的話 |
| `assistant` | AI 的回覆 |

對話歷史長這樣，每次都要**整段傳給模型**，它才記得前面說過什麼：
```python
messages = [
    {"role": "system", "content": "人設"},
    {"role": "user", "content": "使用者說"},
    {"role": "assistant", "content": "AI 回覆"},
    {"role": "user", "content": "使用者再說"},
]
```

## 6. 設計人設的流程（以員瑛式思考為例）
1. 先寫簡單版人設，試試看效果
2. 不滿意就**跟 AI 討論**，請它幫忙收集資料（例如員瑛的訪談、喜歡的書）
3. **檢查 AI 給的資料**（例如書名翻譯可能有錯）
4. 最後請 AI 用 Markdown **整理成完整的 system prompt**，自己再修改
- 其他例子：股票分析師、粉專小編、選系諮商師

## 7. 實作步驟（Colab）
1. 到 **console.groq.com** 申請 API 金鑰
2. Colab 左邊 🔑 **密鑰** → 新增，名稱 `Groq`，開啟筆記本存取權
3. 安裝與讀入：
```python
!pip install -q "aisuite[openai,groq] @ git+https://github.com/andrewyng/aisuite.git"
import os
import aisuite as ai
from google.colab import userdata
os.environ['GROQ_API_KEY'] = userdata.get('Groq')
```
4. 呼叫模型：
```python
client = ai.Client()
response = client.chat.completions.create(model="groq:openai/gpt-oss-120b", messages=messages)
print(response.choices[0].message.content)
```
5. 用 **Gradio** 做成網頁介面，`demo.launch(share=True)` 會給一個公開網址

**AISuite** 是吳恩達做的套件，用同一種寫法就能切換不同公司的模型（只要改 `model=` 那一行）。

---

## 8. 本週作業
1. 先和任何一個生成式 AI 討論，找出想做的人設
2. 申請 API 金鑰
3. 修改老師的 Colab 範例
4. 用 Gradio 展示

⚠️ 注意：
- 主題跟老師範例太像（例如員瑛式改成悲觀式）只有 6 分
- 有用 AI 幫忙的地方要說明，並附上 **Prompt 和生成結果的截圖**，不然會被當成抄襲
- 要放老師的固定套件，沒放扣 1 分
