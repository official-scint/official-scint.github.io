# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SCINT（北臺灣學生資訊社群）官方網站。Astro 5 靜態站點，React 只用於動畫 island。中英雙語、白底為預設並可切暗版。透過 GitHub Actions build 後部署至 GitHub Pages（`scint.org`，見 `public/CNAME`）。

## Development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 靜態輸出到 dist/
npm run preview
```

沒有 linter、測試框架。`npm run build` 是唯一的把關，改完務必跑過。

## 專案結構

```
src/
  components/
    home/          首頁七個區塊，一個區塊一個檔
    islands/       React island（Network 自製，originkit/ 為外部來源）
    Nav / Footer / Events / Bolt / EasterEggs / BrandingPage
  data/            clubs.json、site.js、regions.js、accents.js、messages.json
  i18n/            index.js（API）+ locales/zh.js、locales/en.js
  layouts/         Base.astro
  pages/           薄殼，只決定 lang 與 meta
  scripts/         所有 DOM 行為，一個功能一個模組
  styles/          global.css 只有 @import，實際樣式在分檔
```

**慣例**

- 程式碼不寫註解。要解釋的事寫在這份文件裡。
- 一個區塊要新增樣式，寫在該區塊元件的 `<style>` 裡；跨區塊共用的才進 `src/styles/`。
- `<script>` 內不直接寫邏輯，只 import `src/scripts/` 的 init 函式。
- 元件透過 props 拿資料，不自己 import i18n。只有 `Home.astro`、`Base.astro`、`Nav`、`Footer`、`Events`、`BrandingPage` 會呼叫 `getContent()`。

## 樣式分層

`src/styles/global.css` 只是 import 清單，順序有意義：

| 檔案 | 內容 |
| --- | --- |
| `tokens.css` | CSS 變數、日夜版色票 |
| `typography.css` | 字級、`.bracket`、品牌光譜 |
| `layout.css` | 容器、表面 |
| `controls.css` | 按鈕、連結、標籤 |
| `animation.css` | `.rise`、`prefers-reduced-motion` |
| `islands.css` | island 用的全域 class（`.net-*`、`.gravity-*`、`.odo-*`） |
| `sections.css` | 首頁共用的 `.band`、`.wrap`、`.pin`、`.ghost` |

**陷阱：**

- **JS 建立的元素不能用 Astro scoped style。** 沒有 `data-astro-cid-*` 屬性，scoped 選擇器不會命中。`.odo-*`（翻牌數字）、`.gravity-*`、`.net-*` 因此必須放在 `islands.css`。
- **`tokens.css` 的 `:root` 有一組與主題無關的變數**（圓角、字體、`--gutter`、`--page`、`--nav-h`、`--spine-x`）。換色票時只能動顏色，把這些搬進 `[data-theme]` 會讓整個版面塌掉。
- **`.net` 有 `height: 100%`。** 想用 `inset` 的 `top`/`bottom` 控制網絡圖高度時，必須同時寫 `height: auto`，否則 `bottom` 會被忽略、閃電會落在版面正中央壓到標題。
- `astro-island` 預設 `display: inline`，百分比高度會塌。需要撐高時要自己補 `display: block; height: 100%`（見 `Clubs.astro` 的 `.wall`）。

## 首頁

一頁式捲動，七個區塊由 `Home.astro` 組合。`Home.astro` 只做資料準備與組裝，不含樣式。

各區塊套一個 `.accent-*` class，該區塊內的 `--accent` 就跟著換。編號 01–06 的巨大數字是 `.ghost`，靠 `scripts/parallax.ts` 做視差。

### 首屏（Hero）

首屏是絕對定位的三層：網絡圖 canvas、`.hero-veil` 遮罩、`.hero-copy` 文字，數字列 `.hero-stats` 釘在底部。因為文字與數字都是絕對定位，**改字級或間距時很容易讓兩者重疊**，尤其英文版文案比中文長兩到三行。

已針對這點分出四組斷點：`max-width: 1024px`、`max-width: 640px`、加上 `max-height: 720px` / `600px` 的矮螢幕組，以及桌機的 `max-height: 900px` / `760px`。改動首屏後請在 320×568 到 1920×1080、中英兩版都確認 `.hero-copy` 沒有壓到 `.hero-stats`，也沒有被導覽列蓋住。

## 設計語言：特色來自標誌

標誌是 `<SCI⚡T>`——角括號、藍→青→綠漸層字母、金色閃電、標語 "Create Your Future."。全站識別都是從這裡長出來的，改樣式時請維持：

- **角括號**：所有小標用 `.bracket`，會自動加上 `< >`
- **品牌光譜**：`--blue / --sky / --teal / --green`
- **金色閃電**：`--gold` 是全站唯一的暖色，只用在主要按鈕、狀態、閃電記號（`Bolt.astro`）。用多就失效
- **白底是預設**：`:root` 是亮版，`[data-theme="dark"]` 才是暗版。新增顏色時兩版都要給值
- 單色素材（例如 HackMD logo）在兩種底色下不會同時成立，需備深淺兩版並依主題切換

`Bolt.astro` 用真實素材當 CSS mask，不要改回手繪 SVG。

主題由 `Base.astro` head 裡的 inline script 在首次繪製前決定，避免閃白——**不要改成外部 script**。切換動畫在 `scripts/theme.ts`。

## 雙語

`src/i18n/locales/zh.js` 與 `en.js` 結構完全對稱，`index.js` 只提供 `getContent()` 與 `path()`。**新增文案必須同時補兩種語言**，缺一邊頁面會顯示 `undefined`。

路由：中文在根（`/`、`/branding/`），英文在 `/en/` 之下。`src/pages/*` 只是薄殼。

學校與社團名稱不翻譯（專有名詞），地區譯名在 `src/data/regions.js`。

文案語氣：正式但像人寫的。具體、短句、有立場，不要公文腔，也不要行銷詞。

## 活動資料

`Events.astro` 在瀏覽器端 fetch `https://api.scint.org/events`（Discord 排程活動）。渲染一律走 `<template>` + `textContent`，**不要改用 innerHTML 拼字串**——舊站就是這樣才有 XSS 風險。空陣列與 fetch 失敗各有 fallback。

## 動畫

- `islands/Network.jsx` — 首屏蜘蛛網（自製）。12 條輻線 × 4 圈，整張網旋轉，進場有織網動畫。顏色讀 CSS 變數並用 MutationObserver 跟隨主題。中央閃電點擊會旋轉並廣播 `scint:bolt`
- `islands/originkit/ClubGravity.jsx` — 社團重力牆（matter-js）。節點刻意不是連結：有 `href` 就拖不動，點擊改成踢一腳
- `islands/originkit/ReactiveGrid.jsx` — 品牌手冊頁頭

後兩者來自 [Originkit](https://originkit.dev)，已從 TSX 轉 JSX 並調整過。

`src/scripts/` 內的模組由 `Base.astro` 與 `Home.astro` 呼叫，全部尊重 `prefers-reduced-motion`。

## 彩蛋

`EasterEggs.astro`：首屏網絡中央的閃電點 30 下召喚 temmie、hover Discord 按鈕觸發對話。從舊站搬過來的，維護時保留。
