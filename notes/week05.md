# 第五週：AI 怎麼記得前面說過什麼

- 影片：https://www.youtube.com/live/vmQzpZvVqaI
- 投影片：https://yenlung.me/1151GenAI
- 作品：記憶翻牌遊戲 https://steve92971.github.io/memory-game/

---

## 1. RNN（循環神經網路）
- 一般神經網路：輸入 → 輸出，沒有記憶。
- RNN：**上一步的輸出會再傳回來**，當作下一步的輸入之一，所以能「記得前面」。
- 缺點：句子太長時，前面的內容會越記越模糊。

## 2. 線性代數基礎
- 矩陣是「**先列後行**」：m × n 代表 m 列、n 行。
- **內積**：兩個向量對應位置相乘再加總，可以用來看兩個向量有多相似。
- 矩陣乘法 C = AB：C 的第 i 列第 j 行 = A 的第 i 列 和 B 的第 j 行 做內積。

## 3. Attention（注意力機制）
來自 2017 年論文《Attention Is All You Need》，用來取代 RNN。

每個字都會變出三個向量：

| 名稱 | 意思 | 比喻 |
|---|---|---|
| Q（Query） | 我要找什麼 | 搜尋關鍵字 |
| K（Key） | 我有什麼標籤 | 書的標題 |
| V（Value） | 我真正的內容 | 書的內容 |

計算步驟：
1. Q 和每個 K 做內積 → 得到「注意力分數」
2. 除以 √dk（縮放），避免分數太大
3. 經過 Softmax → 變成加起來等於 1 的權重
4. 用權重把所有 V 加起來 → 得到結果

公式：**Attention(Q, K, V) = softmax(QKᵀ / √dk) V**

- Q、K、V 都是輸入 X 乘上學出來的矩陣：Q = XW_Q、K = XW_K、V = XW_V
- 用矩陣可以**一次算完所有字**，比 RNN 一個一個算快很多。

## 4. Softmax「贏者通吃」
Softmax 會讓最大的分數權重特別大、其他特別小。除以 √dk 可以讓分數不要差太多。

## 5. 多頭注意力（Multi-head Attention）
同時做好幾組 Attention，每組看不同的重點（例如文法、語意），最後合在一起。

## 6. Transformer 和 GPT
- Transformer = 編碼器（Encoder）＋ 解碼器（Decoder），只靠注意力，不用 RNN。
- **GPT 只用解碼器**，任務是預測下一個字。

## 7. 位置編碼
Attention 本身不知道字的先後順序，所以要**額外加上位置資訊**，模型才分得出「我愛你」和「你愛我」。

---

## 8. 本週作業：用 Vibe Coding 做互動網頁

**Vibe Coding**：不自己寫程式，用說的讓 AI 幫你寫。

### 三個步驟
1. **跟 AI 討論出規格書**：可以這樣問 AI：
   > 我想做一個＿＿＿的網頁，希望是單一 HTML 檔。先不要寫程式，問我一些問題，幫我把需求釐清，或提供一些建議。

   來回討論幾次後，再請 AI 把規格書寫出來。
2. **讓 AI 照規格書寫出 `index.html`**：檔名一定要叫 `index.html`，直接拖進瀏覽器就能看到。
3. **上傳到 GitHub Pages 公開**（見下方）

### Prompt 的兩個重點
- **正確的資訊**：AI 不知道你腦中的想法，要把條件講清楚。
- **清楚的指引**：要它做什麼、輸出成什麼樣子、給誰看。

### GitHub Pages 上傳步驟（約 15 分鐘，只用瀏覽器）
1. 到 github.com 註冊帳號（帳號名稱會出現在網址裡）
2. 右上角 **+ → New repository**
   - 名稱用英文小寫，例如 `memory-game`
   - 選 **Public**
   - 勾選 **Add a README file**
   - 按 **Create repository**
3. 按 **Add file → Upload files**，把 `index.html` 拖進去（**拖檔案，不是拖資料夾**）
4. 按綠色 **Commit changes**（沒按就沒存到）
5. **Settings → Pages**
   - Source：**Deploy from a branch**
   - Branch：**main**、**/ (root)** → **Save**
6. 等 1～3 分鐘，網址是：`https://你的帳號.github.io/memory-game/`

### 常見問題
| 狀況 | 解法 |
|---|---|
| 打開出現 404 | 等 3 分鐘再試；確認 repo 首頁直接看得到 index.html |
| repo 裡多了一層資料夾 | 上傳時拖錯了，要拖檔案本身 |
| 改了程式網頁還是舊的 | 按 Ctrl + Shift + R 強制重新整理 |
| Settings 裡找不到 Pages | repo 要設成 Public |

老師的範例：https://yenlung.github.io/vibe-tools/
