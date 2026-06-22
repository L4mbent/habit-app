# 瘦子增肌健康饮食打卡 App 🏋️‍♂️

一个面向瘦子增肌人群的 Android 饮食打卡应用，基于 React Native (Expo) 构建。

## 功能

- **每餐打卡**：记录早/午/晚/加餐的食物、蛋白质、热量和胃口状态
- **增肌目标追踪**：每日热量与蛋白质完成进度条
- **身体数据**：记录体重和体脂率变化
- **历史记录**：查看过往打卡情况
- **本地存储**：SQLite 本地持久化，无需联网

## 技术栈

- React Native + Expo SDK 56
- SQLite (expo-sqlite)
- React Navigation (底部Tab + 堆栈导航)
- Ionicons 图标

## 快速开始

```bash
# 进入项目
cd habit-app

# 安装依赖
npm install

# 启动开发服务器
npx expo start
```

手机安装 Expo Go APP，扫码即可运行。

## 构建 APK

### 方式一：EAS 云端构建（推荐，无需本地环境）

1. 注册 Expo 账号: https://expo.dev/signup
2. 生成 Token: https://expo.dev/accounts/{你的账号}/settings/access-tokens
3. 在项目目录运行：

```powershell
$env:EXPO_TOKEN = "你的token"
$env:NPM_CONFIG_CACHE = "$env:TEMP\npm-cache"
$env:APPDATA = "$env:TEMP\.appdata_tmp"
npx eas build --platform android --profile preview --clear-cache
```

4. 构建完成后在终端会输出下载链接

### 方式二：本地构建（需要 Android SDK）

```bash
# 生成原生代码
npx expo prebuild

# 构建 APK
cd android
./gradlew assembleRelease
```

APK 文件位于 `android/app/build/outputs/apk/release/`

### 方式三：GitHub Actions 自动构建（推荐团队协作）

项目已包含 `.github/workflows` 配置，推送代码后自动触发构建。

## 项目结构

```
habit-app/
├── App.js                 # 主入口
├── index.js               # Expo 注册
├── app.json               # Expo 配置
├── eas.json               # EAS Build 配置
└── src/
    ├── context/           # 全局状态
    ├── database/          # SQLite 数据库
    ├── components/        # UI 组件
    ├── screens/           # 页面
    └── utils/             # 工具函数
```
