# 怪獸圖鑑新增指南 (Monster Creation Guide)

本文件說明如何為《Vocabulary Master》的每日挑戰與文法挑戰中，新增並註冊全新的可愛小怪獸。

---

## 👾 新增怪獸二步驟

新增一隻怪獸只需要「產生圖片」與「執行腳本」兩個步驟即可完成。

### 步驟一：產生並準備怪獸圖片
1. **風格建議**：
   專案中的怪獸風格皆為 **可愛日系、2D 向量、類似寶可夢（Pokémon）的 Chibi（Q版）風格**。
   建議使用去背（透明背景）或純白背景的 PNG 圖檔。

2. **AI 繪圖推薦提示詞 (Prompts)**：
   您可以直接將以下提示詞提供給 AI 繪圖工具（如 Midjourney、DALL-E 3 等）或本專案的 AI 助手：
   ```text
   A cute [你想要的怪獸特徵，例如：fire dragon / lightning squirrel], 2D vector art, cute Japanese anime style, gaming monster character, stand-alone asset, white background, vibrant colors, high quality, chibi, simple shaded.
   ```

3. **存放位置**：
   將產生的圖片存放到專案的靜態資源資料夾：
   📁 `public/monsters/`
   *建議命名格式：`mon_xx.png`（例如：`mon_26.png`）*

---

### 步驟二：執行自動化腳本註冊怪獸
專案內建了 `addMonster.cjs` 腳本，會自動尋找目前最大的 ID，並自動將新怪獸寫入 `services/monsterData.ts`。

開啟終端機（Terminal）並確保在專案根目錄下，執行以下指令：

```bash
node scripts/addMonster.cjs <怪獸名稱> <圖片檔案名稱> <是否為Boss(true/false)> [CSS濾鏡]
```

#### 參數說明：
*   **怪獸名稱**：在圖鑑與戰鬥中顯示的名稱。
*   **圖片檔案名稱**：剛剛存放在 `public/monsters/` 裡的完整檔名（例：`mon_26.png`）。
*   **是否為Boss**：`true` 代表傳奇 Boss（會有大絕招、用於文法挑戰等），`false` 代表普通怪獸。
*   **CSS濾鏡 (選填)**：可用於快速產生異色版怪獸或 Boss 的炫光特效。

#### 實際執行範例：

*   **範例一：新增一隻普通怪獸**
    ```bash
    node scripts/addMonster.cjs "雷電松鼠" "mon_26.png" false
    ```

*   **範例二：新增一隻 Boss 怪獸（附帶紫色外發光特效）**
    ```bash
    node scripts/addMonster.cjs "暗影機械龍" "mon_27.png" true "drop-shadow(0 0 15px purple)"
    ```

---

## 🎨 實用 CSS 濾鏡（Filter）推薦
如果想要在不增加圖片檔案的前提下，快速製作「異色版」或「強化版」怪獸，可以在第四個參數傳入 CSS 濾鏡：

| 效果種類 | CSS 濾鏡語法 | 說明 |
| :--- | :--- | :--- |
| **異色版 (變色)** | `hue-rotate(120deg)` | 旋轉色相，120度通常會變綠/藍色，240度變紫/紅色。 |
| **暗黑版** | `brightness(0.5) grayscale(0.5)` | 降低亮並轉為灰階，呈現受詛咒的感覺。 |
| **狂暴/高飽和** | `saturate(2)` | 讓色彩更鮮艷。 |
| **傳奇 Boss 金光** | `hue-rotate(60deg) saturate(2) drop-shadow(0 0 30px gold)` | 變色、加飽和度、並加上耀眼的金色外發光。 |
| **幽冥藍光** | `drop-shadow(0 0 20px cyan)` | 加上青藍色的幽火外發光。 |

---

## 🔍 手動維護與確認
若您想要確認或手動微調怪獸數值，可以開啟以下檔案：
📄 `src/services/monsterData.ts`（或 `services/monsterData.ts`）

資料結構格式：
```typescript
{ 
  id: 26, 
  name: '雷電松鼠', 
  image: 'monsters/mon_26.png', 
  filter: '' 
}
```
