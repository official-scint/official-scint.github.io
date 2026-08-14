# SCINT Official Website

SCINT（北臺灣學生資訊社群）官方網站，使用 [Astro](https://astro.build) 建置，靜態輸出後部署到 GitHub Pages（`scint.org`）。

中英雙語，白底為預設、可切換暗版。

## 開發

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # 輸出到 dist/
npm run preview  # 預覽 build 結果
```

## 頁面

| 路徑 | 內容 |
| --- | --- |
| `/` | 首頁（中文） |
| `/en/` | 首頁（英文） |
| `/branding/` | 品牌手冊（中文） |
| `/en/branding/` | 品牌手冊（英文） |

## 首頁怎麼運作

一頁式捲動，由七個區塊組成：首屏、活動、服務、計畫、社團、合作、關於。

- 首屏是滿版的**互動蜘蛛網**——中心是 SCINT 的閃電，網上分布 21 個社團節點。游標靠近會推亮鄰近節點，點閃電它會旋轉。
- 社團區有一面 **重力牆**，方塊可以拖曳丟擲，點一下會把它踢開。
- 導覽列的項目對應各區塊錨點，`scint.org/#events` 可以直接分享。
- 每個區塊有自己的主色，取自品牌光譜的一段。

## 改內容不用碰版面

| 檔案 | 內容 |
| --- | --- |
| `src/i18n/locales/zh.js` | **中文文案** |
| `src/i18n/locales/en.js` | **英文文案（結構與中文對稱）** |
| `src/data/clubs.json` | 合作社團名錄（含地區標籤） |
| `src/data/site.js` | 連結、社群帳號、合作單位 |
| `src/data/messages.json` | Discord 按鈕彩蛋的對話 |

> 兩個語言檔要一起改。只改一邊，另一種語言的頁面會顯示 `undefined`。

活動不在這裡：活動區塊在瀏覽器端直接打 `https://api.scint.org/events`，Discord 上開活動就會自己出現。API 掛掉或沒有活動時會顯示 fallback 文案。

### 新增一個合作社團

在 `src/data/clubs.json` 加一筆，圖片放 `public/assets/clubs/`：

```json
{
  "name": "資訊社",
  "school": "某某高中",
  "region": "臺北",
  "image": "/assets/clubs/club22.jpg",
  "socials": [{ "name": "instagram", "url": "https://..." }]
}
```

社團會自動出現在網絡圖、重力牆與名錄裡。`region` 影響名錄分組與首頁的「涵蓋縣市」數字；英文頁的地區譯名在 `src/data/regions.js`。

## 結構

```
public/          靜態資產，原樣輸出（assets/、favicon.ico、CNAME）
src/
  i18n/          index.js + locales/zh.js、locales/en.js
  data/          社團名錄、連結、地區、彩蛋訊息
  layouts/       Base.astro：head、meta、頁面外框
  components/
    home/        首頁七個區塊，一個區塊一個檔
    islands/     Network.jsx、originkit/（第三方動畫）
    ...          Nav、Footer、Events、Bolt、EasterEggs、BrandingPage
  pages/         四個薄殼路由
  scripts/       DOM 行為，一個功能一個模組
  styles/        global.css 只有 import，實際樣式在分檔
```

樣式分兩層：跨區塊共用的放 `src/styles/`，只屬於某個區塊的寫在該元件的 `<style>` 裡（Astro 會自動 scope）。

程式碼不寫註解；需要解釋的設計決定與已知陷阱都寫在 `CLAUDE.md`。

### 視覺識別

全部取自標誌 `<SCI⚡T>`：

- **角括號** — 所有小標都戴上，寫成 `<EVENTS>`
- **藍→青→綠光譜** — 每個區塊取光譜上的一段當主色
- **金色閃電** — 全站唯一的暖色，只用在重點

### 動畫元件

- `islands/Network.jsx` — 首屏蜘蛛網（自製）
- `islands/originkit/ClubGravity.jsx` — 社團重力牆（matter-js），可拖拉
- `islands/originkit/ReactiveGrid.jsx` — 品牌手冊頁頭的網點底紋

後兩者來自 [Originkit](https://originkit.dev)，已改成 JS 並依本站需求調整。

## 彩蛋

搬過來了，別拿掉：首屏中央的閃電點 30 下、滑鼠停在 Discord 按鈕上等一下。

## 部署

推上 `master` 由 `.github/workflows/deploy.yml` 自動 build 並部署。
GitHub Pages 的 Source 需設定為 **GitHub Actions**。
