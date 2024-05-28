import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Redirect, useHistory } from "react-router-dom";
import Home from "./Home/Home";
import Wallet from "./Wallet/Wallet";
import Cart from "./Cart/Cart";
import CartMerchant from "./Cart/CartMerchant";
import CartSearch from "./Cart/CartSearch";
import CartCategory from "./Cart/CartCategory";
import User from "./User/User";
import Update from "./User/Update";
import Setting from "./User/Setting";
import TC from "./User/TC";
import "../css/main.css"; // 导入自定义样式文件
import QRCodePage from "./QRcode/QRcode";
import QRcodeScan from "./QRcode/QRcodeScan";
import TransactionHistory from "./QRcode/TransactionHistory";
import Collection from "./QRcode/Collection";
import HomeSelectedIcon from "../images/navbar/Home.svg";
import HomeUnselectedIcon from "../images/navbar/Home0.svg";
import WalletSelectedIcon from "../images/navbar/Wallet.svg";
import WalletUnselectedIcon from "../images/navbar/Wallet0.svg";
import CartSelectedIcon from "../images/navbar/Card.svg";
import CartUnselectedIcon from "../images/navbar/Card0.svg";
import UserSelectedIcon from "../images/navbar/Primary.svg";
import UserUnselectedIcon from "../images/navbar/Primary0.svg";
import QRcode from "../images/navbar/QRcodeNav.svg";
import { useSwipeable } from "react-swipeable";

const Main: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const [selectedTab, setSelectedTab] = useState<string>("home");
    const [showQRCode, setShowQRCode] = useState<boolean>(false);
    const history = useHistory();
    const [showNavbar, setShowNavbar] = useState<boolean>(true);

    const getIcon = (tab: string) => {
        switch (tab) {
            case "home":
                return selectedTab === "home" ? HomeSelectedIcon : HomeUnselectedIcon;
            case "wallet":
                return selectedTab === "wallet" ? WalletSelectedIcon : WalletUnselectedIcon;
            case "cart":
                return selectedTab === "cart" ? CartSelectedIcon : CartUnselectedIcon;
            case "user":
                return selectedTab === "user" ? UserSelectedIcon : UserUnselectedIcon;
            default:
                return "";
        }
    };

    const handleQRCodeClick = () => {
        setShowQRCode(!showQRCode); // 切换 QR code 页面的显示和隐藏
    };
    const handleLogout = () => {
        console.log("用户退出");
        history.push("/default");
    };

    return (
        <Router>
            <div className="page-container">
                {showNavbar && (
                    <div className="tab-container">
                        <div className="tab fixed bottom-0 w-full bg-white flex border-t border-gray-100 justify-between items-center z-30">
                            <Link
                                to="/main/home"
                                onClick={() => {
                                    setSelectedTab("home");
                                    setCurrentPage(0);
                                }}
                                className="focus:outline-none tab_icon"
                            >
                                <img src={getIcon("home")} alt="Home" className="w-full h-full" />
                            </Link>
                            <Link
                                to="/main/cart"
                                onClick={() => {
                                    setSelectedTab("cart");
                                    setCurrentPage(1);
                                }}
                                className="focus:outline-none tab_icon tab_cart"
                            >
                                <img src={getIcon("cart")} alt="Cart" className="w-full h-full" />
                            </Link>
                            <div onClick={handleQRCodeClick} className="focus:outline-none flex relative tab_code">
                                {" "}
                                {/* 点击时显示 QR code 页面 */}
                                <img src={QRcode} alt="QR Code" className="w-full h-full" />
                            </div>
                            <Link
                                to="/main/wallet"
                                onClick={() => {
                                    setSelectedTab("wallet");
                                    setCurrentPage(2);
                                }}
                                className="focus:outline-none tab_icon tab_wallet"
                            >
                                <img src={getIcon("wallet")} alt="Wallet" className="w-full h-full" />
                            </Link>
                            <Link
                                to="/main/user"
                                onClick={() => {
                                    setSelectedTab("user");
                                    setCurrentPage(3);
                                }}
                                className="focus:outline-none tab_icon"
                            >
                                <img src={getIcon("user")} alt="User" className="w-full h-full" />
                            </Link>
                        </div>
                        {/* 显示 QRCodePage 组件 */}
                        {showQRCode && (
                            <div className="fixed top-0 left-0 w-full h-full z-20">
                                <div className="w-full h-full flex items-center justify-center">
                                    <QRCodePage />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Route path="/main/home" exact={true} render={() => <Home setSelectedTab={setSelectedTab} />} />
            <Route path="/main/wallet" exact={true} render={() => <Wallet setSelectedTab={setSelectedTab} />} />
            <Route path="/main/cart" exact={true} render={() => <Cart setSelectedTab={setSelectedTab} />} />
            <Route path="/main/user" exact={true} render={() => <User onLogout={handleLogout} setSelectedTab={setSelectedTab} />} />
            <Route path="/cartMerchant/:shopId" exact={true} render={() => <CartMerchant setShowNavbar={setShowNavbar} />} />
            <Route path="/cartCategory/:categoryName" exact={true} render={() => <CartCategory setShowNavbar={setShowNavbar} />} />
            <Route path="/cartSearch" exact={true} render={() => <CartSearch setShowNavbar={setShowNavbar} />} />
            <Route path="/update" exact={true} render={() => <Update setShowNavbar={setShowNavbar} />} />
            <Route path="/setting" exact={true} render={() => <Setting onLogout={handleLogout} setShowNavbar={setShowNavbar} />} />
            <Route path="/tc" exact={true} render={() => <TC setShowNavbar={setShowNavbar} />} />
            <Route path="/qrCodeScan" exact={true} render={() => <QRcodeScan setShowNavbar={setShowNavbar} />} />
            <Route path="/transactionHistory" exact={true} render={() => <TransactionHistory setShowNavbar={setShowNavbar} />} />
            <Route path="/collection" exact={true} render={() => <Collection setShowNavbar={setShowNavbar} />} />
            <Redirect from="/main" to="/main/home" />
        </Router>
    );
};

export default Main;
