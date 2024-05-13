import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'my-ionic-app',
  webDir: 'build',
  server: {
    androidScheme: 'http'
  },
  plugins: {
    "BarcodeScanner": {
      "useMock": true
    },
    SplashScreen: {
      launchShowDuration: 3000,//启动屏幕显示的持续时间
      launchAutoHide: true,//指示启动屏幕是否应自动隐藏
      launchFadeOutDuration: 3000,//启动屏幕淡出动画的持续时间
      backgroundColor: "#ffffffff",//启动屏幕的背景颜色
      androidSplashResourceName: "splash",//Android 平台上使用的启动屏幕资源的名称
      androidScaleType: "CENTER_CROP",//Android 平台上启动屏幕图片的缩放类型 .CENTER_CROP 表示图片将会被放大或缩小以填充整个屏幕，同时保持图片的纵横比
      showSpinner: true,//是否在启动屏幕上显示一个加载旋转器（Spinner）
      androidSpinnerStyle: "large",//Android 平台上加载旋转器的样式
      iosSpinnerStyle: "small",// iOS 平台上加载旋转器的样式
      spinnerColor: "#999999",//载旋转器的颜色
      splashFullScreen: true,//启动屏幕是否应该全屏显示。
      splashImmersive: true,//启动屏幕是否应该使用沉浸式模式显示。沉浸式模式通常隐藏系统状态栏和导航栏，使启动屏幕占据整个屏幕。
      layoutName: "launch_screen",//启动屏幕布局的名称
      useDialog: true,//启动屏幕是否应该作为对话框显示
    },


  }
};

export default config;
