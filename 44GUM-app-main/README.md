# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).



<!-- 安装 Capacitor： -->

### `npx cap init`
### `npm i @capacitor/core npm i -D @capacitor/cli`
### `npm install @capacitor/android` `npm install @capacitor/ios`
### `npx cap add android ` `npx cap add android `
### npx cap open android  在 Android Studio 中打开您的项目
### npx cap run android   直接在vscode运行android模拟机
### npx cap open ios  要在 Xcode 中打开您的项目
### open ios/App/App.xcworkspace   手动启动 Xcode

<!-- 安装 Ionic： -->
### `npm install @ionic/react @ionic/react-router`

<!-- 安装 Tailwind CSS： -->
### `npm install tailwindcss`

<!-- 安装的插件 -->
@capacitor/live-updates: Capacitor 实时更新插件，用于实现应用程序的实时更新功能。
@capacitor/push-notifications: Capacitor 推送通知插件，用于管理推送通知。
@capacitor/splash-screen: 提供启动屏幕功能的 Capacitor 插件。

@testing-library/jest-dom: 用于在测试中与 Jest 结合使用的 DOM 断言库。
@testing-library/react: 用于在测试中与 React 结合使用的测试工具库。
@testing-library/user-event: 用于在测试中模拟用户事件的测试工具库。


ionicons: Ionicons 图标库。
react-country-flag: 用于在 React 应用程序中显示国家旗帜的组件库。
react-dom: React 的 DOM 渲染器。
react-phone-number-input: 用于在 React 应用程序中处理电话号码输入的组件库。
react-router-dom: 用于在 React 应用程序中实现路由的库。


<!-- 重新构建 -->
### npm run build
### npx cap sync android 
### npx cap sync ios
