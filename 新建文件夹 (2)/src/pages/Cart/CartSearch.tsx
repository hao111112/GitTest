
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import '../../css/cartMerchant.css'; // 导入自定义样式文件
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useHistory } from 'react-router-dom';
import Background from '../../images/navbar/Background.png';
const CartSearch: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const [searchValue, setSearchValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    //返回按钮
    const handleBackClick = () => {
        history.push('/main/cart');
    };

    // 组件挂载时隐藏底部导航栏
    useEffect(() => {
        setShowNavbar(false);

        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, []);
    const handleIconClick = () => {
        // 在这里添加图标点击事件的处理逻辑
        alert('sousuo1'+searchValue)
    };
    const handleClearClick = () => {
        // 处理清空输入框内容事件
        setSearchValue('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // 处理输入框内容变化事件
        setSearchValue(event.target.value);
    };

    const handleInputFocus = () => {
        // 处理输入框获得焦点事件
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        // 处理输入框失去焦点事件
        setIsFocused(false);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',

        }}>
            <AppBar position="fixed" sx={{

                boxShadow: 'none',
                backgroundImage: `url(${Background})`, // 添加背景图片
                backgroundSize: 'cover',
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon className='text-white ' style={{ fontSize: '2rem' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', position: 'relative', left: '-1rem' }}>
                        {/* 搜索 */}
                        <div>
                            <div className="flex shadow-md bg-white rounded-[15px] h-9" >
                                <div className="p-1 bg-white rounded-l-[15px]">
                                    <SearchRoundedIcon className="w-5 h-5 text-gray-400" style={{ fontSize: '2rem' }} />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    onFocus={handleInputFocus}
                                    onBlur={handleInputBlur}
                                    className="py-1 flex-grow bg-white text-gray-500 outline-none focus:ring-0"
                                />
                                {isFocused && searchValue && (
                                    <div className="p-1 bg-white w-14 rounded-r-[15px]" onMouseDown={handleClearClick}>
                                        <ClearIcon className="w-5 h-5 text-gray-200" style={{ fontSize: '1.5rem' }} />
                                    </div>
                                )}
                                {!searchValue && isFocused &&(
                                    <div className="p-2 text-gray-400 bg-white w-14 rounded-r-[15px]">
                                    </div>
                                )}
                                {!isFocused && (
                                    <>
                                        <div className="bg-gray-300 my-2 w-[1px]"></div> {/* 左划线 */}
                                        <div className="py-2 text-gray-400 bg-white w-14 rounded-r-[15px] text-sm" onClick={handleIconClick}>搜索</div> {/* 搜索两字 */}
                                    </>
                                )}


                            </div>
                        </div>
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
                <div >
                 
                </div>
            </Box>

        </Box>
    );
}
export default CartSearch;