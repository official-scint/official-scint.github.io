# SCINT Official Website
## 簡介

這是 SCINT 官方網站的原始碼，使用原生 HTML、CSS、JavaScript 開發

https://scint-tw.github.io/

## `config.json` 配置說明

```json
{
  "about-us": [
    "寫一些關於我們的資訊",
    "寫一些關於我們的資訊",
    "寫一些關於我們的資訊"
  ],
  "clubs": [
    {
      "name": "社團名稱",
      "school": "學校名稱",
      "image": "社團圖片 url (可以使用相對路徑)",
      "socials": [
        {
          "name": "社群媒體名稱(e.g. instagram)",
          "url": "社群媒體連結"
        }
      ]
    },
    {
      "name": "社團名稱2 (可以新增多個社團)",
      "school": "學校名稱2",
      "image": "社團圖片 url (可以使用相對路徑)",
      "socials": [
        {
          "name": "社群媒體名稱(e.g. instagram)",
          "url": "社群媒體連結"
        }
      ]
    },
  ],
  "sponsors": [
    {
      "image": "贊助商圖片 url (可以使用相對路徑)",
      "url": "贊助商連結"
    },
    {
      "image": "贊助商圖片 url (可以放更多贊助商)",
      "url": "贊助商連結"
    },
  ]
}

```

## Component 使用說明

在 `components` 資料夾中，有一些可以重複使用的元件，可以使用 `<template>` 標籤來引入
```html
<!-- 載入 components/navbar.html 元件 -->
<template id="navbar"></template>
```
當需要對 `component` 使用 `JavaScript` 時（例如監聽事件），可以把邏輯寫在 `home.js` 的 `onMounted` 函式中，以確保元件載入後才執行
```js
function onMounted() {
  document.querySelectorAll(".navbar-item").forEach((element) => {
    // to something
  });
}
```
另外，`component` 載入、渲染的邏輯寫在 `global.js` 中，如果有需要可以再做修改
```js
const fetchComponents = [...templates].map(async (template) => {
    const templateID = template.id;
    const response = await fetch(
      `${"../".repeat(depth)}/components/${templateID}.html`
    );
    const component = await response.text();
    template.outerHTML = component;
});

// load all components, then run onMounted callback
Promise.all(fetchComponents).then(() => {
    onMounted();
});
```

## CSS 結構 
`css` 資料夾中，每個子目錄都是代表一個頁面或者類別，例如 `home` 資料夾中就是首頁的樣式，`global` 資料夾中是全域的樣式，而每個資料夾中的 `style.css` 引入了該目錄內所有 `css` 檔案，以便於管理

```css
// css/global/style.css
@import "./container.css";
@import "./root.css";
@import "./title.css";
@import "./scrollbar.css";
@import "./utils.css";
@import "./navbar.css";
@import "./footer.css";
@import "./button.css";
@import "./icons.css";
```
