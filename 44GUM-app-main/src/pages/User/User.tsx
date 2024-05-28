import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import QRcodesvg from "../../images/navbar/QRcode.svg";
import MenuIcon from "@mui/icons-material/Menu";
import Design from "../../images/navbar/Design.png";
import Info from "../../images/navbar/info.svg";
import Card from "../../images/user/Card.png";
import click from "../../images/user/click.svg";
import add from "../../images/user/add.svg";
import update from "../../images/user/update.svg";
import account from "../../images/user/account.svg";
import items from "../../images/user/item.svg";
import question from "../../images/user/question.svg";
import setting from "../../images/user/setting.svg";
import Restartsvg from "../../images/home/Restart.svg";
import Eye_opensvg from "../../images/home/Eye open.svg";
import { useHistory } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import "../../css/user.css";
import axios from "axios";

/// leona写的静态页面
// interface UserProps {
//     onLogout: () => void;
//     setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
// }

// const User: React.FC<UserProps> = ({ onLogout, setSelectedTab }) => {
//     const history = useHistory();

//     const [isMoneyVisible, setIsMoneyVisible] = useState(true);
//     const [lastRefreshTime, setLastRefreshTime] = useState('2025/5/12 16:04');
//     const [showConfirmation, setShowConfirmation] = useState(false);
//     const userStr = localStorage.getItem('user');
//     const user = userStr ? JSON.parse(userStr) : null;
//     const userName = user ? user.name : '';
//     const userEmail = user ? user.email : '';
//     const userVipCard = user ? user.vipCard : '';
//     const handleMoneyClick = () => {
//         setIsMoneyVisible(!isMoneyVisible);
//     };

//     const handleRefreshClick = () => {
//         const newRefreshTime = new Date().toLocaleString().split(':').slice(0, 2).join(':');
//         setLastRefreshTime(newRefreshTime);
//     };

//     const handleUpdateClick = () => {
//         alert('点击推荐码升级' + userEmail)
//     }

//     const handleUpdateInfoClick = () => {
//         history.push('/update');
//     }

//     const handleLogout = () => {
//         setShowConfirmation(true);
//     };
//     const confirmLogout = () => {
//         setShowConfirmation(false); // 首先关闭退出确认对话框
//         // 延迟一段时间后执行页面跳转
//         console.log("handleLogout!!!!!")
//         //清除用户数据
//         localStorage.clear(); // 清除所有存储的数据
//         onLogout();

//     };
//     const cancelLogout = () => {
//         setShowConfirmation(false);

//     };
//     const handleScanClick = () => {
//         history.push('/qrCodeScan', { from: 'user' });
//     };
//     const handleTCClick = () => {
//         history.push('/tc');
//     };

//     return (
//         <Box sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             minHeight: '100vh',
//             backgroundImage: `url(${Design})`,
//             backgroundSize: '100% 45%',
//             backgroundRepeat: 'no-repeat'
//         }}>
//             <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: '10', backgroundColor: 'transparent' }}>
//                 <Toolbar >
//                     <IconButton
//                         size="large"
//                         edge="start"
//                         color="inherit"
//                         aria-label="menu"
//                         sx={{ mr: 2 }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Box sx={{ flexGrow: 1 }}>
//                         <Typography variant="h6" component="div">
//                             我的帳戶
//                         </Typography>
//                     </Box>
//                     <Button color="inherit" sx={{ position: 'relative', left: '45px' }}>
//                         <img src={Info} alt="Info" className='h-14' />
//                     </Button>
//                     <Button onClick={handleScanClick} color="inherit" sx={{ position: 'relative', left: '25px' }}>
//                         <img src={QRcodesvg} alt="HeaderRight" className='h-14' />
//                     </Button>
//                 </Toolbar>
//             </AppBar>
//             <Box component="main" sx={{
//                 flexGrow: 1,
//                 overflowY: 'auto', // 允许内容区域垂直滚动
//                 padding: '0px',
//                 height: 'calc(100vh - 64px)', // 减去 AppBar 的高度

//             }}>
//                 <Toolbar />
//                 <div  className='user_body relative h-full ' >
//                     {/* 会员信息 */}
//                     <div className='user_info flex flex-col justify-center'>
//                         <h2 className="text-white  text-center user_name">{userName}</h2>
//                         <div className='flex justify-center text-white user_vip'>
//                             <p>會員號碼：</p>
//                             <p>{userVipCard}</p>
//                         </div>
//                     </div>
//                     {/* 卡 */}
//                     <div className='flex justify-center w-full mb-10'>
//                         <img src={Card} alt="Card" className='user_card absolute' />
//                         <div className=' user_card_content '>
//                             <div className=' float-right  user_card_titles w-[60%]'>
//                                 <div >
//                                     <Button onClick={handleRefreshClick} className=' user_CachedIcon relative'>
//                                         <img src={Restartsvg} alt="" className='h-full' />
//                                     </Button>
//                                 </div>
//                                 <p className=' text-gray-500 user_card_title'>44GUM餘額</p>
//                                 <div className='flex items-center  user_card_money '>
//                                     <p className=' font-bold'>$</p>
//                                     <p className=' font-bold ml-3'>{isMoneyVisible ? '1, 425.61' : '—————'}</p>
//                                     <button
//                                         onClick={handleMoneyClick}
//                                         className='ml-2'
//                                     >
//                                         {isMoneyVisible ? (
//                                             <img src={Eye_opensvg} alt="" className='user_VisibilityIcon' />
//                                         ) : (
//                                             <img src={Eye_opensvg} alt="" className='user_VisibilityIcon' /> // 调整图标大小
//                                         )}
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className='flex justify-center w-full  user_card_time'>
//                                 <p className='text-gray-300 '>最後一次刷新於:</p>
//                                 <p className='text-gray-300 ml-2'>{lastRefreshTime}</p>
//                             </div>
//                             <div className='flex justify-center'>
//                                 <button onClick={handleUpdateClick} className='bg-[#D84343] rounded-full user_update  text-center text-white'>推荐码升级</button>
//                             </div>
//                         </div>
//                     </div>
//                     {/* 退出登录 */}
//                     {/* <div className="flex justify-center">
//                         <button onClick={handleLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
//                             退出登录
//                         </button>
//                     </div> */}
//                     {/* 用户功能 */}
//                     <div className='w-full p-0 mt-5 bg-gray-100/50  user_functions'>
//                         <div className='bg-gray-100/50 w-full flex user_function items-center shadow-sm ' onClick={handleUpdateInfoClick}>
//                             <img src={update} alt="" className='h-full' />
//                             <p className='user_function_item'>更新用戶資料</p>
//                             <img src={click} alt="" className="ml-auto h-full" />
//                         </div>
//                         <div className='bg-gray-100/50 w-full flex user_function items-center shadow-inner '>
//                             <img src={account} alt="" className='h-full' />
//                             <p className='user_function_item'>帳戶綁定</p>
//                             <img src={click} alt="" className="ml-auto h-full" />
//                         </div>
//                         <div className='bg-gray-100/50 w-full flex user_function items-center shadow-inner '>
//                             <img src={question} alt="" className='h-full' />
//                             <p className='user_function_item'>常見問題</p>
//                             <img src={click} alt="" className="ml-auto h-full" />
//                         </div>
//                         <div className='bg-gray-100/50 w-full flex user_function items-center shadow-inner ' onClick={handleTCClick}>
//                             <img src={items} alt="" className='h-full' />
//                             <p className='user_function_item'>用戶協議及隱私政策</p>
//                             <img src={click} alt="" className="ml-auto h-full" />
//                         </div>

//                         <div className='bg-gray-100/50 w-full flex user_function items-center shadow-inner '>
//                             <img src={setting} alt="" className='h-full' />
//                             <p className='user_function_item'>設置</p>
//                             <img src={click} alt="" className="ml-auto h-full" />
//                         </div>
//                     </div>

//                     {showConfirmation && (
//                         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center z-50 justify-center">
//                             <div className="bg-white p-6 rounded-lg shadow-md">
//                                 <p className="text-lg text-gray-800 mb-4">确定要退出登录吗？</p>
//                                 <div className="flex justify-between">
//                                     <button onClick={confirmLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
//                                         确定
//                                     </button>
//                                     <button onClick={cancelLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
//                                         取消
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//             </Box>
//         </Box>

//     );
// }

// export default User;

interface UserProps {
    onLogout: () => void;
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const User: React.FC<UserProps> = ({ onLogout, setSelectedTab }) => {
    const history = useHistory();

    const [isMoneyVisible, setIsMoneyVisible] = useState(true);
    const [balance, setBalance] = useState("—————");
    const [lastRefreshTime, setLastRefreshTime] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const userName = user ? user.name : "";
    const userEmail = user ? user.email : "";
    const userVipCard = user ? user.vipCard : "";

    const handleMoneyClick = () => {
        setIsMoneyVisible(!isMoneyVisible);
    };

    const handleRefreshClick = async () => {
        try {
            const response = await axios.post("http://kocu.cswallet.co/api/wallet/asset");
            if (response.status === 200) {
                setBalance(response.data.balance.toLocaleString());
                const newRefreshTime = new Date().toLocaleString();
                setLastRefreshTime(newRefreshTime);
            }
        } catch (error) {
            console.error("Failed to fetch balance:", error);
            const newRefreshTime = new Date().toLocaleString();
            setLastRefreshTime(newRefreshTime);
        }
    };

    const handleUpdateClick = () => {
        alert("点击推荐码升级" + userEmail);
    };

    const handleUpdateInfoClick = () => {
        history.push("/update");
    };

    const handleLogout = () => {
        setShowConfirmation(true);
    };

    const confirmLogout = () => {
        setShowConfirmation(false); // 首先关闭退出确认对话框
        // 延迟一段时间后执行页面跳转
        console.log("handleLogout!!!!!");
        //清除用户数据
        localStorage.clear(); // 清除所有存储的数据
        onLogout();
    };

    const cancelLogout = () => {
        setShowConfirmation(false);
    };

    const handleScanClick = () => {
        history.push("/qrCodeScan", { from: "user" });
    };

    const handleTCClick = () => {
        history.push("/tc");
    };
    const handleSettingClick = () => {
        history.push("/setting");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundImage: `url(${Design})`,
                backgroundSize: "100% 45%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <AppBar position="fixed" sx={{ boxShadow: "none", zIndex: "10", backgroundColor: "transparent" }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            我的帳戶
                        </Typography>
                    </Box>
                    <Button color="inherit" sx={{ position: "relative", left: "45px" }}>
                        <img src={Info} alt="Info" className="h-14" />
                    </Button>
                    <Button onClick={handleScanClick} color="inherit" sx={{ position: "relative", left: "25px" }}>
                        <img src={QRcodesvg} alt="HeaderRight" className="h-14" />
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflowY: "auto", // 允许内容区域垂直滚动
                    padding: "0px",
                    height: "calc(100vh - 64px)", // 减去 AppBar 的高度
                }}
            >
                <Toolbar />
                <div className="user_body relative h-full">
                    {/* 会员信息 */}
                    <div className="user_info flex flex-col justify-center">
                        <h2 className="text-white text-center user_name">{userName}</h2>
                        <div className="flex justify-center text-white user_vip">
                            <p>會員號碼：</p>
                            <p>{userVipCard}</p>
                        </div>
                    </div>
                    {/* 卡 */}
                    <div className="flex justify-center w-full mb-10">
                        <img src={Card} alt="Card" className="user_card absolute" />
                        <div className="user_card_content">
                            <div className="float-right user_card_titles w-[60%]">
                                <div>
                                    <Button onClick={handleRefreshClick} className="user_CachedIcon relative">
                                        <img src={Restartsvg} alt="" className="h-full" />
                                    </Button>
                                </div>
                                <p className="text-gray-500 user_card_title">44GUM餘額</p>
                                <div className="flex items-center user_card_money">
                                    <p className="font-bold">$</p>
                                    <p className="font-bold ml-3">{isMoneyVisible ? balance : "—————"}</p>
                                    <button onClick={handleMoneyClick} className="ml-2">
                                        {isMoneyVisible ? (
                                            <img src={Eye_opensvg} alt="" className="user_VisibilityIcon" />
                                        ) : (
                                            <img src={Eye_opensvg} alt="" className="user_VisibilityIcon" />
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center w-full user_card_time">
                                <p className="text-gray-300">最後一次刷新於:</p>
                                <p className="text-gray-300 ml-2">{lastRefreshTime}</p>
                            </div>
                            <div className="flex justify-center">
                                <button onClick={handleUpdateClick} className="bg-[#D84343] rounded-full user_update text-center text-white">
                                    推荐码升级
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 登出 */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                        >
                            登出
                        </button>
                    </div>

                    {/* 用户功能 */}
                    <div className="w-full p-0 mt-5 bg-gray-100/50 user_functions">
                        <div className="bg-gray-100/50 w-full flex user_function items-center shadow-sm" onClick={handleUpdateInfoClick}>
                            <img src={update} alt="" className="h-full" />
                            <p className="user_function_item">更新用戶資料</p>
                            <img src={click} alt="" className="ml-auto h-full" />
                        </div>
                        <div className="bg-gray-100/50 w-full flex user_function items-center shadow-inner">
                            <img src={account} alt="" className="h-full" />
                            <p className="user_function_item">帳戶綁定</p>
                            <img src={click} alt="" className="ml-auto h-full" />
                        </div>
                        <div className="bg-gray-100/50 w-full flex user_function items-center shadow-inner">
                            <img src={question} alt="" className="h-full" />
                            <p className="user_function_item">常見問題</p>
                            <img src={click} alt="" className="ml-auto h-full" />
                        </div>
                        <div className="bg-gray-100/50 w-full flex user_function items-center shadow-inner" onClick={handleTCClick}>
                            <img src={items} alt="" className="h-full" />
                            <p className="user_function_item">用戶協議及隱私政策</p>
                            <img src={click} alt="" className="ml-auto h-full" />
                        </div>

                        <div className="bg-gray-100/50 w-full flex user_function items-center shadow-inner " onClick={handleSettingClick}>
                            <img src={setting} alt="" className="h-full" />
                            <p className="user_function_item">設置</p>
                            <img src={click} alt="" className="ml-auto h-full" />
                        </div>
                    </div>

                    {showConfirmation && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center z-50 justify-center">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <p className="text-lg text-gray-800 mb-4">确定要退出登录吗？</p>
                                <div className="flex justify-between">
                                    <button onClick={confirmLogout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                        确定
                                    </button>
                                    <button onClick={cancelLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                        取消
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </Box>
        </Box>
    );
};

export default User;
