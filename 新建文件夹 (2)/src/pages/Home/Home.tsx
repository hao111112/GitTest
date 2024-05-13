
import { AppBar, Box, Button, Card, CardMedia, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Background from '../../images/navbar/Background3.png';
import Banner from '../../images/home/Banner.png';
import A from '../../images/home/A.png';
import B from '../../images/home/B.png';
import A1 from '../../images/home/A1.png';
import B1 from '../../images/home/B1.png';
import C1 from '../../images/home/C1.png';
import D1 from '../../images/home/D1.png';
import Add from '../../images/home/Add.png';
import QRcodesvg from '../../images/navbar/QRcode.svg';
import Restartsvg from '../../images/home/Restart.svg';
import Eye_opensvg from '../../images/home/Eye open.svg';
import Sample from '../../images/home/Sample Design.png';
import QRcodeHome from '../../images/home/QRcodeHome.svg';
import '../../css/home.css'; // 导入自定义样式文件
import { useSwipeable } from 'react-swipeable';
import { useHistory } from 'react-router-dom';
// Home 组件中声明 setSelectedTab 属性
interface HomeProps {
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const Home: React.FC<HomeProps> = ({ setSelectedTab }) => {
    const images = [
        Banner,
        'https://via.placeholder.com/600x400/3361FF/FFFFFF',
    ];
    const history = useHistory();
    const [index, setIndex] = useState(0);
    const [isMoneyVisible, setIsMoneyVisible] = useState(true);
    const [lastRefreshTime, setLastRefreshTime] = useState('2025/5/12 16:04');


    const handleMoneyClick = () => {
        setIsMoneyVisible(!isMoneyVisible);
    };

    const handleRefreshClick = () => {
        const newRefreshTime = new Date().toLocaleString().split(':').slice(0, 2).join(':');
        setLastRefreshTime(newRefreshTime);
    };

    const handleDiscounts = () => {
        setSelectedTab('cart')
        history.push('/main/cart');
    };

    const handleScanClick = () => {
        history.push('/qrCodeScan', { from: 'home' });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 2000); // 3秒自动切换一次

        return () => clearInterval(interval);
    }, []); // 在组件挂载和卸载时启动和清除定时器
    const populars = [
        { id: 1, selectedSvg: A1 },
        { id: 2, selectedSvg: B1 },
        { id: 3, selectedSvg: C1 },
        { id: 4, selectedSvg: D1 },
        { id: 5, selectedSvg: B1 },
        { id: 6, selectedSvg: D1 }
    ]; // 分类按钮数组
    const mys = [
        { selectedSvg: A },
        { selectedSvg: B },
        { selectedSvg: B },
    ]; // 分类按钮数组
    const handleBuyClick = (shopId: number) => {
        // 在这里添加图标点击事件的处理逻辑
        history.push(`/cartMerchant/${shopId}`, { from: 'home' });
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>

            <AppBar position="fixed" sx={{
                backgroundImage: `url(${Background})`, // 添加背景图片
                backgroundSize: 'cover',
                zIndex: '10',
                boxShadow: 'none'
            }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', position: 'relative', left: '15px' }}>
                        <Typography variant="h6" component="div">
                            最新優惠
                        </Typography>
                    </Box>
                    <div /> {/* 添加弹性空间 */}
                    <Button  onClick={handleScanClick} color="inherit" sx={{ position: 'relative', left: '25px' }}><img src={QRcodesvg} alt='HeaderRight' className='h-14'></img></Button>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                flexGrow: 1,
                overflowY: 'auto', // 允许内容区域垂直滚动
                padding: '24px',
                marginBottom: '80px',
                height: 'calc(100vh - 64px)', // 减去 AppBar 的高度
            }}>
                <Toolbar />
                <div >
                    {/* 卡 */}
                    <div>
                        <Grid container>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                <div className='border-gray-100 border shadow-md rounded-[15px] w-[95%] Sample' style={{
                                    backgroundImage: `url(${Sample})`,
                                    backgroundSize: 'cover'
                                }}>
                                    <div className='flex justify-between items-center Sample_titles '>
                                        <p className='relative left-16 top-3 Sample_title'>44GUM餘額</p>
                                        <Button onClick={handleRefreshClick} >
                                            <img src={Restartsvg} alt="" className='CachedIcon' />
                                        </Button>
                                    </div>
                                    <div className='flex items-center ml-5 Sample_money mt-7'>
                                        <p className=' font-bold'>$</p>
                                        <p className=' font-bold ml-3'>{isMoneyVisible ? '1, 425.61' : '—————'}</p>
                                        <button
                                            onClick={handleMoneyClick}
                                            className=' ml-2'
                                        >
                                            {isMoneyVisible ? (
                                                <img src={Eye_opensvg} alt="" className='VisibilityIcon' />
                                            ) : (
                                                <img src={Eye_opensvg} alt="" className='VisibilityIcon' /> // 调整图标大小
                                            )}
                                        </button>
                                    </div>
                                    <div className='Sample_time flex flex-col justify-between w-full items-end'>
                                        <Button className='w-full' onClick={handleScanClick}>
                                            <img src={QRcodeHome} alt="" className='QRcodeHome absolute' />
                                        </Button>
                                        <div className='flex justify-center w-full items-end '>
                                            <p className='text-gray-400 '>最後一次刷新於:</p>
                                            <p className='text-gray-400 ml-2'>{lastRefreshTime}</p>
                                        </div>

                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    {/* 人气品牌 */}
                    <div className='mt-2' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <p className='title mb-2'>类别</p>
                        <div className='flex ' >
                            {populars.map((popular, index) => (
                                <div key={index} className='popular' style={{ flexShrink: 0 }} onClick={() => handleBuyClick(popular.id)}>
                                    <img src={popular.selectedSvg} alt='' className=" rounded-[30px] shadow-md h-[95%] w-[95%]" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 我的优惠 */}
                    <div className='mt-5'>
                        <div className='title'>我的優惠</div>
                        <Grid container className='discounts '>
                            <Grid item xs={2} >
                                <div onClick={handleDiscounts}>
                                    <img src={Add} alt="" className='discounts_img pb-1' />
                                </div>
                            </Grid>
                            <Grid item xs={10} >
                                <div className='mt-2' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                                    <div className='flex' >
                                        {mys.map((my, index) => (
                                            <div key={index} className='mr-3' style={{ flexShrink: 0 }}>
                                                <img src={my.selectedSvg} alt='' className=" discounts_img object-cover rounded-[20px]" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                    </div>
                    {/* 最新优惠 */}
                    <div className='mt-5'>
                        <div className='title'>最新優惠</div>
                        <Grid container >
                            <Grid item xs={12} className='news'>
                                <Card>
                                    <CardMedia component="img" className='new_CardMedia' image={images[index]} alt={`Image ${index}`} />
                                </Card>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='mb-10'></div>
                </div>
            </Box>
        </Box>
    );
}
export default Home;