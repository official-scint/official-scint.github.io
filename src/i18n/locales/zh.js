export const zh = {
  htmlLang: "zh-Hant-TW",
  label: "中文",
  other: { code: "en", label: "EN", href: "/en/" },

  meta: {
    title: "SCINT 北臺灣學生資訊社群",
    brandingTitle: "品牌手冊 — SCINT",
    description:
      "SCINT 北臺灣學生資訊社群串連高中職資訊社團與學生，提供活動、課程、練習賽、社群交流與合作支援。",
    og: "串連學生資訊社群，讓跨校交流、共學資源與合作活動更容易發生。",
    brandingDescription: "SCINT 的標誌、色票與使用規範。",
    orgName: "SCINT 北臺灣學生資訊社群",
  },

  nav: [
    { id: "events", label: "活動" },
    { id: "services", label: "服務" },
    { id: "programs", label: "計畫" },
    { id: "clubs", label: "社團" },
    { id: "join", label: "合作" },
    { id: "about", label: "關於" },
  ],

  ui: {
    skip: "跳到主要內容",
    home: "首頁",
    menu: "選單",
    themeToggle: "切換日夜版",
    langToggle: "Switch to English",
    back: "回首頁",
    toTop: "回到頂端",
    masthead: "北臺灣學生資訊社群",
    loading: "正在讀取活動",
    empty: "近期沒有公開活動。",
    failed: "活動資料暫時讀不到。",
    goDiscord: "去 Discord 看公告",
    addCalendar: "加入行事曆",
    today: "就在今天",
    tomorrow: "就是明天",
    past: "已結束",
    tba: "待定",
  },

  hero: {
    title: ["SCINT 北臺灣", "資訊社群"],
    lede:
      "SCINT 串連北臺灣的高中職資訊社團，一起辦活動、開課程、辦競賽。讓想學資訊的人不必獨自摸索，社團幹部也不必每年從零開始。",
    ctaPrimary: "加入 Discord",
    ctaSecondary: "看近期活動",
    stats: [
      { k: "合作社團", v: "clubs" },
      { k: "合作範圍", v: "scope" },
      { k: "運作年數", v: "years" },
    ],
  },

  sections: {
    events: {
      n: "02",
      en: "Events",
      title: "近期活動",
      note: "活動資訊同步自 SCINT 的 Discord，這裡列出的都是目前開放的場次。",
      all: "所有活動連結",
      announce: "Discord 公告",
    },
    services: {
      n: "03",
      en: "Services",
      title: "我們能幫上什麼",
      note: "每項服務都列出適合的對象、我們提供的支援，以及提出申請前需要準備的資料。",
      cta: "提出需求",
      form: { title: "服務申請單", item: "項目", category: "類別" },
    },
    programs: {
      n: "04",
      en: "Programs",
      title: "正在跑的計畫",
      running: (n) => `${n} 個進行中`,
      doneHead: "已經跑完的",
    },
    clubs: {
      n: "05",
      en: "Clubs",
      title: (n) => `${n} 個合作社團`,
      note: "這些方塊可以拖曳丟擲，點一下會把它踢開。社團的社群連結在下方名錄。",
      reset: "再丟一次",
    },
    join: {
      n: "06",
      en: "Collaboration",
      title: "想和 SCINT 一起做點什麼？",
      lede: "不論位於哪一區，社團、社群與各類單位都歡迎提出合作。流程並不複雜，大致是這四個步驟。",
      ctaPrimary: "填寫合作申請",
      ctaSecondary: "寄信給我們",
      partners: "合作單位",
    },
    about: {
      n: "07",
      en: "About",
      title: "資源不該只集中在少數幾間學校",
      lede:
        "SCINT 從北部幾個學生社團開始，透過線上與線下的活動、課程、競賽與社團合作，逐步把分散各處的資源接起來。",
      faqTitle: "還有疑問？",
    },
  },

  about: [
    {
      key: "社群理念",
      body: [
        "資訊領域的學習資源分布並不平均：有些學校什麼都有，有些學校連社課都難以維持。我們希望把這個落差縮小一些。",
        "獨自摸索很慢，一群人互相補位就快得多。",
      ],
    },
    {
      key: "社群目標",
      body: [
        "整合資源，籌辦線上講座、練習賽，以及社團之間的交流活動。",
        "降低入門門檻，也讓各校社團不必各自為政。",
      ],
    },
    {
      key: "成員組成",
      body: [
        "成員多來自北部的高中職社團，中南部的資訊社群也有夥伴參與。",
        "不同背景的人聚在一起，社群才有多樣性，也才有活力。",
      ],
    },
  ],


  services: [
    {
      tag: "活動與課程",
      title: "活動協辦",
      body: "協助活動企劃、人力調度、宣傳與贊助洽談，依實際缺口提供支援，活動當天也會到現場。",
      specs: [
        ["適合", "講座、工作坊、競賽、社群交流"],
        ["提供", "活動規劃、人力支援、跨校宣傳"],
        ["需準備", "活動目標、時程、需求說明"],
      ],
    },
    {
      tag: "運算資源",
      title: "雲端服務",
      body: "社課、活動或專案需要運算資源時，可以向 SCINT 申請虛擬機支援。",
      specs: [
        ["適合", "課程、活動、專案、短期服務"],
        ["提供", "虛擬機與相關運算資源"],
        ["需準備", "用途、使用期間、資源規格"],
      ],
    },
    {
      tag: "社群曝光",
      title: "社群推廣",
      body: "透過 SCINT 的社群管道協助曝光，讓活動在開始之前就被更多學生看見。",
      specs: [
        ["適合", "學生資訊活動與社群公告"],
        ["提供", "社群媒體與 Discord 宣傳"],
        ["需準備", "主視覺、文案、報名資訊"],
      ],
    },
  ],

  programs: [
    {
      title: "APCS 模擬測驗",
      status: "running",
      body: "每月一場模擬測驗，熟悉題型與作答節奏，正式應考時比較有底。",
    },
    {
      title: "一日資訊體驗營 2026",
      status: "running",
      body: "北、中、南、東四區巡迴，從入門課程帶到實際操作，讓學生先了解資訊領域在做什麼。",
      href: "https://reurl.cc/R2kA4G",
      hrefLabel: "報名連結",
    },
    {
      title: "Stage 論壇",
      status: "running",
      body: "邀請不同領域的講者分享自己正在做的事，讓聽眾看見資訊領域更廣的樣貌。",
    },
    {
      title: "THJCC 資安競賽",
      status: "running",
      body: "面向高中職學生的資安競賽，攻防與解題都由參賽者親自動手。",
    },
    {
      title: "聯合程式競賽與公開課程",
      status: "done",
      body: "以競賽、課程與工作坊，讓學生接觸程式、資安、網路與硬體等主題。",
    },
    {
      title: "CVE 工作坊",
      status: "done",
      body: "從漏洞成因一路讀到實際案例，呈現資安研究真正的進行方式。",
    },
  ],

  joinSteps: [
    ["01", "填寫合作申請表", "說明想做什麼、預計時程、需要哪些支援，並留下聯絡方式。"],
    ["02", "初步聯繫", "我們會依你留的方式聯絡，確認需求細節與可行性。"],
    ["03", "確認合作內容", "對齊分工、時程與資源，必要時安排線上會議。"],
    ["04", "執行與檢討", "活動結束後整理成果，作為下次合作的基礎。"],
  ],

  faq: [
    {
      q: "一定要是北部社團才能合作嗎？",
      a: "不用。名稱雖然寫「北臺灣」，全臺的社團、社群與單位都可以提出合作。",
    },
    {
      q: "活動宣傳需要準備什麼？",
      a: "活動名稱、時間地點、報名連結、主視覺、一段簡短文案，以及一位可聯絡的窗口。資料越完整，越容易安排檔期。",
    },
    {
      q: "沒有社團，個人可以參加嗎？",
      a: "可以。線上講座、模擬測驗與練習賽多半開放個人參加，加入 Discord 追蹤公告即可。",
    },
    {
      q: "我要去哪裡追蹤最新消息？",
      a: "Discord 最即時；Instagram、Facebook 與 Linktree 上的活動連結也會同步更新。",
    },
  ],

  branding: {
    title: "品牌手冊",
    lede: "SCINT 的標誌、色票與使用規範。製作社課海報、活動視覺或對外報導時，請依此使用。",
    surfaceLabel: "預覽底色",
    surfaces: { dark: "深底", light: "淺底", brand: "品牌藍" },
    logoHead: { n: "01", en: "Logo", title: "標誌" },
    logoNote:
      "提供名稱搭配標誌與純標誌版本。任何情況下都請不要針對標誌本身進行變形、重製、換色或加特效。",
    download: "下載 PNG",
    paletteHead: { n: "02", en: "Palette", title: "色票" },
    paletteNote: "顏色全部取自標誌：字母的藍→青→綠是光譜，那道閃電的金是唯一的暖色。金色用多了就不再是重點。",
    usageHead: { n: "03", en: "Usage", title: "書寫方式與禁止事項" },
    writing: "書寫方式",
    writingBody: [
      "在純文字下使用簡稱提及 SCINT 時，五個字母請全大寫；若版面許可，也可以使用全稱「SCINT 北臺灣學生資訊社群」。",
      "請務必注意英文與中文之間的空格。",
    ],
    dontHead: "請不要這樣做",
    logos: [
      { file: "/assets/logo.png", label: "主要標誌", note: "名稱搭配標誌，預設使用這個版本。" },
      { file: "/assets/logo-square.png", label: "方形版", note: "頭像、貼圖、需要固定比例時使用。" },
      { file: "/assets/logo-circle.png", label: "圓形版", note: "社群平台頭像。" },
      { file: "/assets/logo-middle.png", label: "純標誌", note: "空間不足或已有 SCINT 字樣時使用。" },
    ],
    examples: {
      ok: ["SCINT 北臺灣學生資訊社群"],
      no: ["Scint北臺灣學生資訊社群", "SCINT北台灣學生資訊社群"],
    },
    donts: [
      "不要變形、拉伸或旋轉標誌",
      "不要更換標誌顏色或加漸層",
      "不要加陰影、外框、光暈等特效",
      "不要把標誌放在對比不足的底色上",
      "不要重製或自行描繪標誌",
    ],
  },

  subscribe: {
    head: "訂閱",
    note: "活動開放報名時寄送通知信，不會有其他內容。",
    cta: "前往訂閱",
  },

  footer: {
    desc: "串連學生資訊社群，讓跨校交流與資源共享實際發生。",
    siteHead: "站內",
    contactHead: "聯絡",
    siteLinks: [
      { label: "近期活動", href: "#events" },
      { label: "服務內容", href: "#services" },
      { label: "合作社團", href: "#clubs" },
    ],
    brandingLink: "品牌手冊",
    joinLink: "合作申請",
  },
};
