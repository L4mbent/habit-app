@echo off
echo ========================================
echo    增肌打卡 App - APK 构建脚本
echo ========================================
echo.

echo 设置 npm 缓存路径...
set NPM_CONFIG_CACHE=%TEMP%\npm-cache
set APPDATA=%TEMP%\.appdata_tmp

echo 检查 Expo 登录状态...
npx eas whoami >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠ 未登录 Expo，请先注册 https://expo.dev/signup
    echo 然后在 https://expo.dev/accounts/_/settings/access-tokens 生成 Token
    echo.
    set /p TOKEN="请输入你的 EXPO_TOKEN: "
    set EXPO_TOKEN=%TOKEN%
)

echo.
echo ========================================
echo  方式1: EAS 云端构建（推荐）
echo  方式2: 退出
echo ========================================
set /p CHOICE="请选择 (1 或 2): "

if "%CHOICE%"=="1" (
    echo 开始云端构建 APK...
    call npx eas build --platform android --profile preview --clear-cache
    echo.
    echo ✅ 构建完成后会显示下载链接
) else (
    echo 已退出
)

pause
