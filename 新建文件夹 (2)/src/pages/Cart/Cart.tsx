
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import HeaderRight from '../../images/navbar/headerCode.png';
import MenuIcon from '@mui/icons-material/Menu';
import Background from '../../images/navbar/Background.png';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import A from '../../images/cart/A.png';
import B from '../../images/cart/B.png';
import C from '../../images/cart/C.png';
import D from '../../images/cart/D.svg';
import MenuA from '../../images/cart/A.svg';
import MenuB from '../../images/cart/B.svg';
import MenuC from '../../images/cart/C.svg';
import MenuA1 from '../../images/cart/A1.svg';
import MenuB1 from '../../images/cart/B1.svg';
import MenuC1 from '../../images/cart/C1.svg';
import offsvg from '../../images/cart/off.svg';
import QRcodesvg from '../../images/navbar/QRcode.svg';
import Rectangle_90 from '../../images/cart/Rectangle 90.png';
import Rectangle_91 from '../../images/cart/Rectangle 91.png';
import '../../css/cart.css'; // 导入自定义样式文件
import { useSwipeable } from 'react-swipeable';
import { useHistory } from 'react-router-dom';
// Cart 组件中声明 setSelectedTab 属性
interface CartProps {
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}
const Cart: React.FC<CartProps> = ({ setSelectedTab }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');
    const handleIconClick = () => {
        // 在这里添加图标点击事件的处理逻辑
        history.push('/cartSearch');
    };
    const handleBuyClick = (shopId: number) => {
        // 在这里添加图标点击事件的处理逻辑
        history.push(`/cartMerchant/${shopId}`, { from: 'cart' });
    };
    const history = useHistory();

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };
    const handleScanClick = () => {
        history.push('/qrCodeScan', { from: 'cart' });
    };
    const categories = [
        { name: '全部', selectedSvg: MenuA, unselectedSvg: MenuA1 },
        { name: '餐飲', selectedSvg: MenuB, unselectedSvg: MenuB1 },
        { name: '其他', selectedSvg: MenuC, unselectedSvg: MenuC1 }
    ]; // 分类按钮数组

    const sorts = [
        { name: '餐飲', selectedSvg: A },
        { name: '娛樂', selectedSvg: B },
        { name: '生活日常', selectedSvg: C },
        { name: '其他', selectedSvg: D },
        { name: '娛樂', selectedSvg: B },
        { name: '其他', selectedSvg: D }
    ]; // 分类按钮数组

    const ShopList = [
        {
            id: 1,
            title: 'Aga Restaurant & Baraaaaaa',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui  Commercial Building, Haiphong Road, Tsim Sha Tsui',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            logo: Rectangle_90 // 店铺图片路径
        },
        {
            id: 2,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            logo: Rectangle_91 // 店铺图片路径
        },
        {
            id: 3,
            title: 'Aga Restaurant & Bar',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui ',
            category: '其他', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            logo: Rectangle_90 // 店铺图片路径
        },
        {
            id: 4,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            logo: Rectangle_91 // 店铺图片路径
        },
        {
            id: 5,
            title: 'Aga Restaurant & Bar',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            logo: Rectangle_90 // 店铺图片路径
        },
        {
            id: 6,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '其他', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            logo: Rectangle_91 // 店铺图片路径
        },
        // 可以继续添加其他店铺信息
    ];

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
                            市場
                        </Typography>
                    </Box>
                    <div /> {/* 添加弹性空间 */}
                    <Button onClick={handleScanClick} color="inherit" sx={{ position: 'relative', left: '25px' }}><img src={QRcodesvg} alt='HeaderRight' className='h-14'></img></Button>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                flexGrow: 1,
                overflowY: 'auto', // 允许内容区域垂直滚动
                padding: '24px',
                height: 'calc(100vh - 64px)', // 减去 AppBar 的高度
            }}>
                <Toolbar />
                <div  >
                    {/* 搜索 */}
                    <div className='mt-2' >
                        <p className='title'>搜索</p>
                        <div className="flex items-center rounded-full shadow-md mt-2" onClick={handleIconClick} >
                            <div className="p-2 bg-white rounded-l-full">
                                <SearchRoundedIcon className="w-6 h-6 text-gray-500" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 flex-grow bg-white outline-none rounded-r-full focus:ring-0 "
                            />
                        </div>
                    </div>
                    {/* 类别 */}
                    <div className='mt-6' style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
                        <p className='title mb-2'>类别</p>
                        <div className='flex ' >
                            {sorts.map((sort, index) => (
                                <div key={index} className='cart_types ' style={{ flexShrink: 0 }}>
                                    <img src={sort.selectedSvg} alt='' className="rounded-full shadow-md cart_type" />
                                    <p className="cart_type_item">{sort.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 分类店铺 */}
                    <div className='mt-6'>
                        <ul className='flex mb-3 title'>
                            {categories.map((category, index) => (
                                <li className='mr-2 navbar' key={index} onClick={() => handleCategoryClick(category.name)}>
                                    {selectedCategory === category.name ? (
                                        <img src={category.selectedSvg} alt={`selected ${category.name}`} className='h-full' />
                                    ) : (
                                        <img src={category.unselectedSvg} alt={`unselected ${category.name}`} className='h-full' />
                                    )}
                                </li>
                            ))}
                        </ul>
                        {/* 店铺列表 */}
                        <div>
                            {ShopList.filter((shop) => {
                                if (selectedCategory === '全部') {
                                    return true;
                                } else {
                                    return shop.category === selectedCategory;
                                }
                            }).map((shop, index) => (
                                <div key={index} className='cards mb-5 rounded-[15px] border-2 border-gray-50  shadow-md relative'>
                                    <img src={shop.offsvg} alt="" className='absolute -top-3 off' />
                                    <Grid container className='card h-full w-full '>
                                        <Grid item xs={4} >
                                            <div>
                                                <img src={shop.logo} alt="" className='card_img rounded-[15px] shadow-md ' />
                                            </div>
                                        </Grid>
                                        <Grid item xs={8} className='card_right'>
                                            <div className='card_titles'>
                                                <p className='card_title truncate'>{shop.title}</p>
                                                <p className='text-gray-600 card_item'>{shop.address}</p>
                                            </div>
                                            <button onClick={() => handleBuyClick(shop.id)} className='bg-[#CD5151] rounded-lg card_btn float-end  w-[95%] text-white text-lg'>購券</button>
                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='mb-20'></div>
                </div>

            </Box>
        </Box>
    );
}
export default Cart;