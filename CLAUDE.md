# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SCINT（北臺灣學生資訊社群）官方網站。純靜態站點，使用原生 HTML、CSS、JavaScript，無建置工具或框架。透過 GitHub Pages 部署至 `scint.org`（見 CNAME）。

## Development

無需建置步驟。直接用瀏覽器開啟 `index.html` 或用任意靜態伺服器（如 `python3 -m http.server`）即可本地開發。沒有 linter、測試框架或 CI。

## Architecture

### 資料驅動的內容

網站內容主要由兩個 JSON 檔驅動：

- **`config.json`** — 核心資料來源：`about-us` 文字、`clubs`（合作社團列表，含名稱/學校/圖片/社群連結）、`sponsors`（合作單位）。新增或修改社團與贊助商只需編輯此檔。
- **`messages.json`** — Discord 按鈕 hover 時的對話序列（彩蛋），每則訊息有 `content` 和 `delay`。

### 自製 Component 系統

`components/` 中的 HTML 片段（`navbar.html`、`footer.html`）透過 `<template id="navbar">` 標籤載入。`js/global.js` 在頁面載入時 fetch 所有 `<template>` 並替換為對應 HTML，完成後呼叫 `onMounted()` 回呼。需要操作 component DOM 的邏輯必須寫在 `onMounted()` 內（定義於 `js/home.js`）。

### JavaScript 檔案職責

- **`js/global.js`** — component 載入系統、標題動畫（IntersectionObserver）
- **`js/home.js`** — `onMounted()` 定義、navbar 互動、從 `config.json` 載入動態內容（about-us、clubs slider、sponsors）、從 `https://api.scint.org/events` 載入活動資料、fade-up 動畫
- **`js/hehe.js`** — 彩蛋：點擊 banner 中間 logo 30 次觸發 temmie 動畫
- **`js/helpme.js`** — 彩蛋：Discord 按鈕 hover 對話序列（讀取 `messages.json`）

### CSS 結構

`css/` 下每個子目錄代表一個頁面或範疇（`global/`、`home/`、`branding/`、`contact/`），各目錄的 `style.css` 透過 `@import` 彙整該目錄所有樣式檔。

### 合作社團 Slider

`clubCardsSlider()` 每 5 秒自動輪播，一次顯示 3 張社團卡片，帶有淡入淡出動畫。卡片資料來自 `config.json` 的 `clubs` 陣列。
