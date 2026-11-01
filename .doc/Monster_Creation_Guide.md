# 怪獸圖鑑新增指南 (Monster Creation Guide)

本文件說明如何為《Vocabulary Master》的每日挑戰、文法挑戰與扭蛋圖鑑，新增並註冊全新的可愛小怪獸。

## 圖片規格

- 格式：**WebP（含透明）**，**512×512**，檔名 `public/monsters/<名稱>.webp`。
- 角色去背、四周留白約 6%，所有怪獸在格子裡大小一致。
- 單張約 45 KB。（原本 1024px PNG 一張約 3 MB，168 隻會到 140 MB 以上，所以統一用 WebP。）
- 風格：可愛 Q 版（kawaii chibi），圓滾滾、大眼睛、柔和色彩、粗線條。

---

## 批次流程（建議，新增一隻或多隻都適用）

全部用本機 GPU 的 SDXL，免費、無次數限制。以下指令都在專案根目錄、用 TTS 的 venv Python 執行：
`E:/Code/tools/tts-env/Scripts/python.exe`。

### 1. 寫企劃：`scripts/monster_batch_plan.json`

```json
{"monsters": [
  {"slot": "new", "key": "mon_n051", "name": "雷電松鼠", "prompt": "squirrel with lightning bolt tail and tiny storm cloud"},
  {"slot": 21, "key": "mon_b021", "name": "雷霆機關神", "prompt": "...", "boss": true}
]}
```

- `slot: "new"`：新增一隻，編號會接在目前最大編號之後。
- `slot: <數字>`：取代該編號現有怪獸的圖與名字（編號、Boss 標記、發光特效保留）。
- `key`：圖片檔名（不含副檔名），不可重複。
- `prompt`：**英文、短、主體在最前面**。SDXL 的文字編碼器只讀前 77 個 token，後面的字會被直接丟掉。腳本會自動加上可愛風格的結尾提示詞，不用自己寫。
- 避免 `anime`（會畫成動漫少女）、`scary`、`fangs` 這類字，會讓怪獸變兇。
- 這份企劃檔會被 `batch_sheet.py`、`finalize_monsters.py` 一起讀，新一批請直接替換內容；上一批的企劃可從 git 歷史找回。

### 2. 產圖並去背：`scripts/gen_monster_batch.py`

```bash
python scripts/gen_monster_batch.py          # 全部
python scripts/gen_monster_batch.py 0 20     # 只跑企劃的第 0 到 19 筆
```

- 每隻產生 A、B、C 三張候選，可以中斷後再跑（已存在的會跳過）。
- 原圖在 `scripts/monster_raw/batch7/<key>_a.png`，去背後在 `scripts/monster_raw/batch7/cut/`。
- `scripts/monster_raw/` 已被 gitignore，不會進版本庫。
- 新一批請先把 `batch7` 資料夾改名或搬走，否則舊的會被當成「已完成」跳過。
- 速度約 10–15 秒一張（RTX PRO 5000）。

### 3. 挑圖

```bash
python scripts/batch_sheet.py 0 122 out_dir   # 每 5 隻一張總覽圖，粉紅色是透明處
```

總覽圖用粉紅底，背景沒去乾淨、有白邊或孔洞會看得出來。若 AI 畫成整幅場景（沒有純色底），去背會失敗，整張都不透明：這種可以重跑，或決定保留場景當背景。

### 4. 轉檔並註冊：`scripts/finalize_monsters.py`

建立 `scripts/monster_choices.json`，內容是「企劃第幾筆 → 選哪張」，沒寫的預設 A：

```json
{"1": "B", "3": "C"}
```

先模擬再實際執行：

```bash
python scripts/finalize_monsters.py scripts/monster_choices.json --dry-run
python scripts/finalize_monsters.py scripts/monster_choices.json
```

它會：
- 裁掉多餘空白、置中、縮成 512，存成 `public/monsters/<key>.webp`。
- 修改 `services/monsterData.ts`（取代現有編號，或在最後新增）。
- 順手把 `public/monsters/` 裡還沒轉的 PNG 轉成 WebP 並更新路徑（舊 PNG 不會刪，確認後自己 `git rm`）。

最後跑 `npm test` 與 `npm run build`，在圖鑑裡看一眼。

> 轉 WebP 用 `method=4`。`method=6` 在某些透明圖上會卡住不動，不要改回去。

---

## 單張流程（已有現成圖片時）

1. 圖片先去背：`python scripts/cutout_monsters.py <檔名不含副檔名>`（白底圖；`--help` 看選項）。
2. 縮成 512×512 WebP 放進 `public/monsters/`。
3. 註冊：

   ```bash
   node scripts/addMonster.cjs <怪獸名稱> <圖片檔名> <是否為Boss(true/false)> [CSS濾鏡]
   ```

   例如：

   ```bash
   node scripts/addMonster.cjs "雷電松鼠" "mon_n051.webp" false
   node scripts/addMonster.cjs "暗影機械龍" "mon_n052.webp" true "drop-shadow(0 0 15px purple)"
   ```

   腳本會找出目前最大的編號，自動寫入 `services/monsterData.ts`。

`scripts/gen_monster_sdxl.py` 是舊的單張產圖腳本（只認白底、不是可愛風格），新怪獸請用上面的批次流程。

---

## 🎨 CSS 濾鏡（Filter）

目前怪獸都是各自獨立的圖，不再用換色濾鏡做「異色版」（那樣只是同一張圖換顏色）。Boss 只保留發光效果：

| 效果 | CSS 濾鏡 | 說明 |
| :--- | :--- | :--- |
| 傳奇 Boss 發光 | `drop-shadow(0 0 20px yellow)` | 外發光，顏色可改。 |
| 幽冥藍光 | `drop-shadow(0 0 20px cyan)` | 青藍色外發光。 |

---

## 🔍 手動維護

資料在 `services/monsterData.ts`，格式：

```typescript
26: { id: 26, name: '雷電松鼠', image: 'monsters/mon_n051.webp', filter: '' },
```

Boss 另外加 `isLegendary: true`。每日挑戰只會抽非 Boss，文法挑戰用 Boss，扭蛋會從全部抽。
