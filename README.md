# 📦 schedule-planner-cxf 技能包

> 全能出行管家 - 您的专属出行规划助手

## ✅ 自包含设计

本技能已设计为**完全自包含**，可在任意电脑运行，无需额外配置（除 API Keys 外）。

---

## 📁 技能包结构

```
schedule-planner-cxf/
├── SKILL.md                 # 完整技能说明文档
├── README.md                # 本文件
├── package.json             # Node.js 依赖配置
├── package-lock.json        # 依赖锁定文件
├── .env                     # API Keys 和乘客信息（敏感！）
├── .env.example             # 配置模板
├── scripts/
│   ├── generate-trip-page.js   # 生成行程网页（带支付二维码）
│   ├── qrcode.js               # 二维码生成器（内置）
│   ├── trip-planner.py         # 行程规划辅助（可选）
│   └── setup-config.py         # 配置脚本（可选）
└── references/
    ├── transport-comparison.md # 交通方式对比
    └── city-guides.md          # 城市出行指南
```

---

## 🚀 快速开始（新电脑）

### 步骤 1：复制技能目录

将整个 `schedule-planner-cxf` 目录复制到新电脑的 OpenClaw 技能目录：

```bash
# Windows (PowerShell)
Copy-Item -Recurse "C:\path\to\schedule-planner-cxf" "C:\Users\YourName\.openclaw\workspace\skills\"

# macOS / Linux
cp -r /path/to/schedule-planning-cxf ~/.openclaw/workspace/skills/
```

### 步骤 2：安装依赖

```bash
cd ~/.openclaw/workspace/skills/schedule-planner-cxf
npm install
```

### 步骤 3：配置 API Keys

编辑 `.env` 文件，填入您的配置：

```bash
# 高德地图 API Key
AMAP_API_KEY=your_amap_api_key

# 途牛旅行 API Key
TUNIU_API_KEY=your_tuniu_api_key

# 默认乘客信息
PASSENGER_NAME=您的姓名
PASSENGER_ID=您的身份证号
PASSENGER_MOBILE=您的手机号
```

### 步骤 4：安装全局工具（可选）

如需使用机票/酒店预订功能，需安装途牛 CLI：

```bash
npm install -g tuniu-cli
```

### 步骤 5：测试运行

```bash
node scripts/generate-trip-page.js
```

✅ 完成！技能已就绪。

---

## 📋 功能清单

### ✅ 已内置功能

| 功能 | 状态 | 说明 |
|------|------|------|
| 行程规划框架 | ✅ | 出差/旅游场景识别 |
| 机票搜索/预订 | ✅ | 依赖 tuniu-cli |
| 酒店搜索/预订 | ✅ | 依赖 tuniu-cli |
| 火车票搜索/预订 | ✅ | 依赖 tuniu-cli |
| 行程网页生成 | ✅ | 自动生成 HTML 行程单 |
| 支付二维码生成 | ✅ | 内置 qrcode.js |
| 高德地图集成 | ✅ | 路线/天气/周边 |
| 504 超时处理 | ✅ | 成功经验已内置 |

### ⚠️ 外部依赖

| 依赖 | 用途 | 安装方式 |
|------|------|---------|
| `tuniu-cli` | 机票/酒店/火车票 API | `npm install -g tuniu-cli` |
| `qrcode` | 二维码生成 | `npm install`（自动） |
| Node.js | 运行环境 | 需预装（v14+） |

---

## 💡 使用示例

### 生成行程网页

```bash
node scripts/generate-trip-page.js
```

自动：
1. 生成 HTML 行程单（左侧行程 + 右侧二维码）
2. 生成支付二维码（链接到途牛待付款页面）
3. 用默认浏览器打开网页

### 调用途牛 API

```bash
# 搜索机票
tuniu call flight searchLowestPriceFlight -a '{"from":"北京","to":"杭州","date":"2026-04-19"}'

# 搜索酒店
tuniu call hotel tuniu_hotel_search -a '{"cityName":"杭州","checkIn":"2026-04-19","checkOut":"2026-04-21"}'

# 创建酒店订单
tuniu call hotel tuniu_hotel_create_order -a '{...}'
```

---

## 🔒 安全提示

### 敏感文件

- `.env` - 包含 API Keys 和身份证号，**切勿上传到 Git**
- `package-lock.json` - 可安全共享

### Git 忽略配置

如使用 Git 管理，请创建 `.gitignore`：

```gitignore
# 敏感信息
.env

# 依赖目录
node_modules/

# 临时文件
*.log
.DS_Store
Thumbs.db
```

---

## 📞 常见问题

### Q: 504 超时怎么办？

A: 途牛酒店 API 常返回 504，但订单可能已创建。请检查途牛 App"待付款"页面。

### Q: 如何在新电脑上使用？

A: 复制整个目录 → `npm install` → 配置 `.env` → 完成！

### Q: 二维码不显示？

A: 检查 `qrcode.js` 是否在 `scripts/` 目录，确认已运行 `npm install`。

### Q: 如何修改默认乘客？

A: 编辑 `.env` 文件中的 `PASSENGER_NAME`、`PASSENGER_ID`、`PASSENGER_MOBILE`。

---

## 📝 版本历史

- **v1.0.0** (2026-04-17)
  - 初始版本
  - 内置二维码生成器
  - 完整的移植文档
  - 504 超时处理经验

---

## 👤 作者

您的姓名  
联系方式：your_mobile

---

## 📄 许可证

MIT License
