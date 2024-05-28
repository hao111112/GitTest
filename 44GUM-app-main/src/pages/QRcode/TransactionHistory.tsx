import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import Design from '../../images/QRcode/Sample Design.svg';
import Ellipse1 from '../../images/wallet/Ellipse1.png';
import Ellipse2 from '../../images/wallet/Ellipse2.png';
import Ellipse3 from '../../images/wallet/Ellipse3.png';
import { useHistory, useLocation } from 'react-router-dom';
import '../../css/transactionHistory.css'; // 导入自定义样式文件
const TransactionHistory: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const location = useLocation();
    const { from }: { from?: string } = location.state || {};
    // console.log('TransactionHistory'+from)
    //返回按钮
    const handleBackClick = () => {
        if (from === 'home') {
            history.push('/main/home');
        }
        else if (from === 'cart') {
            history.push('/main/cart');
        }
        else if (from === 'wallet') {
            history.push('/main/wallet');
        }
        else if (from === 'user') {
            history.push('/main/user');
        }
    };

    // 组件挂载时隐藏底部导航栏
    useEffect(() => {
        setShowNavbar(false);
        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, []);
    const ShopList = [
        {
            id: 1,
            title: 'Starbucks',
            time: '4月13日',
            payWay: '掃碼付款',
            payMoney: '-HK$',
            money: '100.00',
            logo: Ellipse1 // 店铺图片路径
        },
        {
            id: 2,
            title: '等等 HEA',
            time: '4月13日',
            payWay: '掃碼付款',
            payMoney: '-HK$',
            money: '100.00',
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 3,
            title: 'Starbucks',
            time: '4月13日',
            payWay: '掃碼付款',
            payMoney: '-HK$',
            money: '100.00',
            logo: Ellipse3 // 店铺图片路径
        },
        {
            id: 4,
            title: 'aga Restaurant & Bar',
            time: '4月13日',
            payWay: '掃碼付款',
            payMoney: '-HK$',
            money: '100.00',
            logo: Ellipse1 // 店铺图片路径
        },
        {
            id: 5,
            title: 'aga Restaurant & Bar',
            time: '4月13日',
            payWay: '掃碼付款',
            payMoney: '-HK$',
            money: '100.0048949498',
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 6,
            title: '等等 HEA',
            time: '4月13日',
            payWay: '掃碼付款',
            payMoney: '-HK$',
            money: '100.00',
            logo: Ellipse3 // 店铺图片路径
        },
        // 可以继续添加其他店铺信息
    ];

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundImage: `url(${Design})`,
            backgroundSize: '100%',
            backgroundRepeat: 'no-repeat'
        }}>

            <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: '10', backgroundColor: 'white' }}>
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
                        <div className='text-black text-[1.5rem]'>交易記錄</div>
                    </Box>
                    <div /> {/* 添加弹性空间 */}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                flexGrow: 1,
                overflowY: 'auto', // 允许内容区域垂直滚动
                padding: '0px',
                height: 'calc(100vh - 64px)', // 减去 AppBar 的高度

            }}>
                <Toolbar />
                <div >
                    {/* 店铺列表 */}
                    <div className='  mt-5'>
                        {ShopList.map((shop, index) => (
                            <div key={index} className='mb-1 relative w-full flex flex-col items-center'>
                                <div className='transactionHistory_card shadow-sm '>
                                    <Grid container className='h-full w-full'>
                                        <Grid item xs={3} className='flex justify-center ' >
                                            <img src={shop.logo} alt="" className='rounded-full shadow-md transactionHistory_logo' />
                                        </Grid>
                                        <Grid item xs={9} className='transactionHistory_content h-full'>
                                            <div className='h-full'>
                                                <div className=' h-1/2'>
                                                    <p className='transactionHistory_title truncate ...'>{shop.title}</p>
                                                    <p className='transactionHistory_time'>{shop.time}</p>
                                                </div>
                                                <div className='h-1/2 transactionHistory_pay  flex justify-end'>
                                                    <div className=' w-1/2 '>
                                                        <p className='transactionHistory_payWay truncate ...'>{shop.payWay}</p>
                                                        <div className='flex'>
                                                            <p className=' transactionHistory_money overflow-hidden whitespace-nowrap text-overflow-ellipsis truncate ... '>{shop.payMoney}{shop.money}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </Grid>
                                    </Grid>
                                </div>

                            </div>

                        ))}
                    </div>

                    <div className='mb-20'></div>
                    <div className='flex flex-col items-center w-full update_save_btns fixed bottom-0 bg-[#CD5151]'>

                    </div>
                </div>
            </Box>
        </Box>
    );
}
export default TransactionHistory;
