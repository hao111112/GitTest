import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import '../../css/update.css'; // 导入自定义样式文件
import { useHistory } from 'react-router-dom';
interface UserProps {
    onLogout: () => void;
    setShowNavbar: React.Dispatch<boolean>;
}

const Setting: React.FC<UserProps> = ({ onLogout, setShowNavbar }) => {
    const history = useHistory();
    const [showConfirmation, setShowConfirmation] = useState(false);
    //返回按钮
    const handleBackClick = () => {
        history.push('/main/user');
    };

    // 组件挂载时隐藏底部导航栏
    useEffect(() => {
        setShowNavbar(false);
        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, []);


    const handleLogout = () => {
        setShowConfirmation(true);
    };
    const confirmLogout = () => {
        setShowConfirmation(false); // 首先关闭退出确认对话框
        // 延迟一段时间后执行页面跳转
        console.log("handleLogout!!!!!")
        //清除用户数据
        localStorage.clear(); // 清除所有存储的数据
        onLogout();

    };
    const cancelLogout = () => {
        setShowConfirmation(false);

    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <AppBar position="fixed" sx={{
                backgroundColor: 'white',
                boxShadow: 'none'
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon className='text-gray-400' style={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <div className='text-black text-[1.4rem]'>设置</div>
                    </Box>
                    <div /> {/* 添加弹性空间 */}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                flexGrow: 1,
                overflowY: 'auto', // 允许内容区域垂直滚动
                height: 'calc(100vh - 128px)', // 减去 AppBar 的高度

            }}>
                <Toolbar />
                <div>
                    <div className="flex justify-center">
                        <button onClick={handleLogout} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
                            退出登录
                        </button>
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
}
export default Setting;
