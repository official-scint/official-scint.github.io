# SCINT Website Restructure Plan

## 目標

這份文件整理目前網站的色彩系統、資料來源架構、主要風險，以及重構後的網站資訊架構。目標是讓 SCINT 官方網站從單頁資訊展示，升級成更完整、現代、簡潔且易懂的社群入口。

## 現況摘要

目前網站是純靜態 GitHub Pages 專案，無框架、無建置流程、無測試或 CI。主要頁面是 `index.html`，另有 `branding/index.html` 子頁。共用導覽與 footer 透過 `components/` HTML 片段和 `js/global.js` 的 template fetch 機制載入。

主要內容來源：

- `config.json`: 關於我們、合作社團、合作單位。
- `messages.json`: Discord hover 彩蛋訊息。
- `https://api.scint.org/events`: 近期活動資料。
- `assets/`: Logo、社團圖片、贊助商圖、OG 圖、彩蛋素材。

目前首頁區塊：

- Hero
- 關於我們
- 目前服務
- 近期活動
- 近期計畫
- 合作社團
- 合作申請
- 合作單位

## 色彩與視覺分析

### 目前色彩

核心色票集中在 `css/global/root.css`：

- `--bg-main: #02041F`: 深海軍藍背景。
- `--bg-secondary: #0E1133`: 卡片與 navbar 深藍。
- `--bg-secondary-hover: #11153d`: hover surface。
- `--bg-primary: #5F8AC9`: 主要藍色強調。
- `--bg-primary-light: #87a5d3`: 淺藍 hover。
- `--bg-primary-opacity-30: #5f89c93f`: 半透明藍。
- `--font-color: #D9DEED`: 淺色文字。

整體視覺語言是「深色科技社群 + 淺藍重點色」。這與資訊社群品牌相容，建議保留深色基底、Logo 的藍色辨識度，以及首頁 Logo 拆件動畫。

### 目前問題

- 色彩 token 不完整，仍有許多元件硬編碼色彩，例如 Discord 按鈕、活動卡按鈕、計畫狀態標籤。
- 卡片大量使用實色深藍背景與 `1rem` 圓角，視覺偏厚重。
- 桌機容器最大寬度用百分比控制，內容有時偏窄，較不像現代 landing/content site。
- navbar 是雙層 fixed 背景，視覺較重。
- `plans-contaniner` 拼字錯誤，資產命名也有 `club_1.jpg` 與 `club1.jpg` 混用。

### 建議色彩系統

保留現有深藍與 SCINT 藍，但改成語意化 token：

```css
:root {
  --color-bg: #02041f;
  --color-surface: #0b1029;
  --color-surface-raised: #101735;
  --color-surface-soft: rgba(95, 138, 201, 0.08);
  --color-border: rgba(135, 165, 211, 0.18);
  --color-text: #eef3ff;
  --color-text-muted: #aeb9d4;
  --color-accent: #6ea2ee;
  --color-accent-strong: #8db8ff;
  --color-discord: #5865f2;
  --color-success: #4ade80;
  --color-warning: #facc15;
  --color-danger: #fb7185;
}
```

設計方向：

- 背景保持深色，但 surface 改成更細緻的層次。
- 卡片改成細邊框、低透明填色、較少大面積實色。
- 主要 CTA 使用 accent；Discord CTA 可保留 Discord 色，但納入 token。
- 狀態標籤使用語意色，不再直接寫 `rgb(0, 128, 0)` 這類硬編碼。
- 圓角收斂到 8-12px，讓畫面更俐落。

## 資料來源架構分析

### 目前資料流

1. HTML 載入 `js/hehe.js`、`js/home.js`、`js/helpme.js`、`js/global.js`。
2. `global.js` 掃描 `<template>`，fetch `components/{id}.html` 並替換。
3. components 載入完成後呼叫全域 `onMounted()`。
4. `home.js` fetch `config.json`，渲染關於我們、社團、贊助商並啟動社團 slider。
5. `home.js` fetch events API，組活動卡片。
6. `helpme.js` fetch `messages.json`，綁 Discord hover 彩蛋。

### 主要風險

- `innerHTML` 和 HTML 字串模板直接使用 JSON/API 內容，有 XSS / HTML 注入風險。
- fetch 沒有集中錯誤處理，API 失敗時會留下 loading 或誤顯示空狀態。
- `global.js` 假設每頁都有 `onMounted()`，但 branding 頁沒有定義。
- `hehe.js` 假設每頁都有 `.banner-image-middle`，branding 頁會有 null runtime error。
- 活動資料、計畫資料、服務資料散落在 HTML 和 JS 中，不利於維護。
- 社團 slider 沒有重設社群 icon 狀態，未來資料變多後可能殘留舊連結。
- `target="_blank"` 缺 `rel="noopener noreferrer"`。

### 建議資料模型

將目前 `config.json` 拆成更明確的內容 schema，初期仍可維持純靜態 JSON：

```text
data/
  site.json
  navigation.json
  about.json
  services.json
  events-fallback.json
  programs.json
  clubs.json
  partners.json
  faq.json
  brand.json
```

建議內容責任：

- `site.json`: site title、description、OG、social links、CTA。
- `navigation.json`: navbar/footer 導覽項目。
- `about.json`: 理念、目標、成員組成、成果數字。
- `services.json`: 活動協辦、雲端服務、社群推廣等服務內容。
- `events-fallback.json`: events API 失敗時的備援活動或空狀態文案。
- `programs.json`: 年度計畫、進行中、已完成成果。
- `clubs.json`: 合作社團名錄。
- `partners.json`: 合作單位、合作類型、Logo。
- `faq.json`: 常見問題。
- `brand.json`: Logo、色票、品牌使用規範。

### 建議 JS 分層

不一定要立刻導入框架，可以先整理原生 JS：

```text
js/
  core/
    fetch-json.js
    dom.js
    components.js
  data/
    site.js
    events.js
  sections/
    hero.js
    events.js
    clubs.js
    services.js
    partners.js
    faq.js
  effects/
    reveal.js
    easter-eggs.js
  main.js
```

重構原則：

- 所有 fetch 由 `fetchJson()` 統一處理 HTTP status、JSON parse、fallback。
- DOM 渲染預設用 `textContent`、`createElement`、`setAttribute`。
- 若一定要允許 HTML，例如段落換行，使用白名單 sanitizer 或改成陣列段落資料。
- events Google Calendar URL 使用 `URLSearchParams`。
- section render function 接收資料並回傳 DOM，不直接混用資料取得與 DOM 寫入。

## 利害關係人與使用者旅程

### 學生 / 新訪客

需求：

- 快速知道 SCINT 是什麼。
- 找活動、加入社群、找到學習資源。

目前缺口：

- Hero 只有「北臺灣學生資訊社群」，缺明確價值主張與 CTA。
- 活動區只有近期活動，沒有報名、活動分類、過往成果。

建議：

- Hero 加入一句清楚說明：「串連高中職資訊社群，提供活動、資源、交流與合作支援。」
- CTA: 加入 Discord、查看近期活動、追蹤 Instagram。
- 增加「適合誰參與」入口卡。

### 社團幹部 / 社群主辦者

需求：

- 知道能申請哪些合作。
- 知道申請條件、流程、回覆時間。
- 看到合作案例與可信度。

目前缺口：

- 合作申請在頁面後段，且 id 與近期活動重複。
- 服務內容只有簡述，缺申請決策資訊。

建議：

- 將合作申請獨立為 `#join` 或 `/join/`。
- 服務卡加入「適合對象、提供內容、申請方式」。
- 增加合作流程：填表、初步聯繫、確認需求、執行合作、成果回饋。

### 合作單位 / 贊助者

需求：

- 看見 SCINT 的影響力、合作方式、聯絡窗口。
- 確認品牌形象與活動品質。

目前缺口：

- 合作單位只有 Logo，缺合作類型與合作價值。
- 缺成果數字、歷年活動紀錄。

建議：

- 增加成果數據：合作社團數、活動數、參與人次、服務地區。
- 增加合作方式：資源支持、場地、技術、宣傳、贊助。
- footer 與合作頁提供清楚信箱與社群入口。

### SCINT 維護者

需求：

- 快速更新活動、社團、合作單位。
- 不因小改內容破壞 HTML/JS。

目前缺口：

- 計畫與服務硬寫在 HTML。
- JSON schema 沒有驗證。
- 沒有 smoke test。

建議：

- 把內容移到 data JSON。
- 加入最小驗證腳本，檢查 JSON、圖片路徑、重複 id、必要欄位。
- 保留純靜態部署，降低維護成本。

## 建議資訊架構

### 短期：仍採單頁式首頁

首頁區塊順序：

1. Hero
   - 品牌 Logo
   - 一句價值主張
   - CTA: 加入 Discord、查看活動、申請合作
2. 參與入口
   - 學生
   - 社團 / 社群
   - 合作單位
3. 近期活動
   - API 活動卡
   - 空狀態導向 Discord 或 Instagram
4. 我們提供什麼
   - 活動協辦
   - 雲端服務
   - 社群推廣
   - 每張卡包含適合對象、內容、申請方式
5. 計畫與成果
   - 進行中
   - 已完成
   - 避免「近期計畫」塞過期內容
6. 合作社團
   - 社團名錄
   - 地區/社團數摘要
   - 申請成為合作社團 CTA
7. 合作單位
   - Logo
   - 合作方式與價值
8. FAQ / 聯絡
   - 常見問題
   - 信箱、社群、回覆時間

建議錨點：

- `#home`
- `#audience`
- `#events`
- `#services`
- `#programs`
- `#clubs`
- `#join`
- `#partners`
- `#faq`

### 中期：分頁式網站

若內容會持續增加，建議改成多頁靜態網站：

```text
/
  首頁、主要 CTA、活動摘要、合作摘要
/events/
  活動列表、過往活動、活動詳情入口
/services/
  活動協辦、雲端服務、社群推廣
/join/
  合作申請、流程、FAQ、表單入口
/clubs/
  合作社團名錄、地區/類型篩選
/about/
  理念、團隊、歷史、成果數字、聯絡方式
/branding/
  Logo、色票、使用規範、下載資源
```

## 建議頁面內容

### 首頁

首頁負責回答三件事：

- SCINT 是什麼？
- 我可以做什麼？
- 為什麼可以信任？

首頁不應塞滿所有細節，而是提供清楚入口。

### 活動頁

內容：

- 即將舉辦活動。
- 已結束活動。
- 活動分類：講座、工作坊、競賽、社群交流。
- 報名/詳情 CTA。
- API 失敗 fallback。

### 服務頁

內容：

- 活動協辦: 企劃、人力、宣傳、贊助協調。
- 雲端服務: VM 申請條件、用途、限制、審核方式。
- 社群推廣: 宣傳管道、刊登需求、限制。
- 申請流程與聯絡方式。

### 合作申請頁

內容：

- 誰可以申請。
- 合作類型。
- 需要準備什麼資訊。
- 流程與回覆時間。
- 表單 CTA。
- FAQ。

### 合作社團頁

內容：

- 社團名錄。
- 學校、社團名稱、地區、社群連結。
- 申請加入。
- 未來可加搜尋與篩選。

### Branding 頁

目前已有 Logo 與書寫方式。建議補：

- 色票。
- 深/淺底 Logo 使用範例。
- Logo 留白與禁止事項。
- 下載連結。
- 社群貼文/活動視覺範本。

## 第一階段實作清單

1. 修 runtime 問題
   - `global.js` 呼叫 `onMounted` 前檢查函式存在。
   - `hehe.js` 找不到 banner logo 時直接 return。
   - 移除 navbar inline `onclick="toggleNavbar()"`。
2. 修 HTML / 安全基礎
   - `id="activity"` 拆成 `id="events"` 與 `id="join"`。
   - 所有 `_blank` 加上 `rel="noopener noreferrer"`。
   - OG meta 屬性補引號與 description。
3. 整理資料渲染
   - 活動卡改 DOM API 建立。
   - 用 `textContent` 渲染標題、描述、社團名稱。
   - fetch 加 `.catch()` 與空/錯誤狀態。
4. 建立設計 token
   - 擴充 `root.css` 色票。
   - 替換硬編碼色彩。
   - 統一卡片、按鈕、狀態標籤。
5. 內容結構調整
   - Hero 增加價值主張與 CTA。
   - 加入「參與入口」與 FAQ。
   - 「近期計畫」改成「計畫與成果」。

## 第二階段實作清單

1. 把內容拆成 `data/` JSON。
2. 建立 `js/core/`、`js/sections/` 模組化渲染。
3. 加入 JSON validation / smoke test。
4. 將 `/branding/` 補成完整 brand kit。
5. 評估是否改成多頁靜態架構。

## 建議技術方向

若想保持維護門檻低：

- 繼續使用原生 HTML/CSS/JS。
- 引入 ES modules，拆分資料與 section render。
- 不導入大型框架。
- 加一個簡單 Node 或 Python smoke test。

若未來內容規模變大：

- 可考慮 Astro。
- 優點是仍能輸出靜態頁、支援 component、content collections、SEO 比較好做。
- 但第一階段不需要急著換框架，先修資料安全與資訊架構比較划算。

## 驗收標準

重構後應達到：

- 首屏 5 秒內能理解 SCINT 是什麼、能做什麼。
- 學生能快速找到活動與 Discord。
- 社團幹部能快速找到合作申請與服務內容。
- 合作單位能看到成果、合作方式與聯絡窗口。
- 維護者能只改 JSON 更新主要內容。
- API 失敗時頁面仍有清楚 fallback。
- 主要頁面沒有 console runtime error。
- 色彩與元件使用 token，不再散落硬編碼。
