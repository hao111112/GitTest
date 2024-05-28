import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import offsvg from '../../images/cart/off.svg';
import Sampledesign from '../../images/cart/category/Sampledesign.svg';
import Rectangle_90 from '../../images/cart/Rectangle 90.png';
import Rectangle_91 from '../../images/cart/Rectangle 91.png';
import Ellipse1 from '../../images/wallet/Ellipse1.png';
import Ellipse2 from '../../images/wallet/Ellipse2.png';
import '../../css/cartMerchant.css'; // 导入自定义样式文件
import { useHistory, useParams } from 'react-router-dom';
const CartCategory: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState<string>('全部');
    const { categoryName } = useParams<{ categoryName: string }>();
    //返回按钮
    const handleBackClick = () => {
        history.push('/main/cart');
    };

    useEffect(() => {
        setSelectedCategory(categoryName);
        setShowNavbar(false);
        console.log(selectedCategory);
        // 组件卸载时重新显示底部导航栏
        return () => {
            setShowNavbar(true);
        };
    }, [categoryName]); // 添加 categoryName 到依赖项数组中


    const ShopList = [
        {
            id: 1,
            title: 'Aga Restaurant & Baraaaaaa',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui  Commercial Building, Haiphong Road, Tsim Sha Tsui',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_90, // 店铺图片路径
            logo: Ellipse1 // 店铺图片路径
        },
        {
            id: 2,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_91,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 3,
            title: 'Aga Restaurant & Bar',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui ',
            category: '其他', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_90,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 4,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_91,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 5,
            title: 'Aga Restaurant & Bar',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_90,// 店铺图片路径
            logo: Ellipse1 // 店铺图片路径
        },
        {
            id: 6,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '其他', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_91,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 7,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_91,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 8,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_91,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 9,
            title: 'SugarK',
            address: '2-8 Sugar Street, Causeway Bay, Hong Kong',
            category: '餐飲', // 店铺分类
            offsvg: offsvg, // 店铺优惠图标路径
            pic: Rectangle_91,// 店铺图片路径
            logo: Ellipse2 // 店铺图片路径
        },
        // 可以继续添加其他店铺信息
    ];

    const handleBuyClick = (shopId: number) => {
        // 在这里添加图标点击事件的处理逻辑
        // alert('handleBuyClick');
        history.push(`/cartMerchant/${shopId}`, { from: 'cartCategory' });
    };

    return (
        <Box sx={{
            position: 'relative', // 将 Box 的 position 属性设置为 relative
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundImage: `url(${Sampledesign})`,
            backgroundSize: '100% ',
            backgroundRepeat: 'no-repeat'
        }}>
            <AppBar position="fixed" sx={{ boxShadow: 'none', zIndex: '10', backgroundColor: 'transparent' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon className='text-white' style={{ fontSize: '1.8rem' }} />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }}>
                        <div className='text-white text-center cartCategory-title relative   -left-6'>{categoryName}</div>
                    </Box>
                    <div /> {/* 弹性空间 */}
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{
                flexGrow: 1,
                height: '100vh'
            }}>
                <div className='cartCategory-appbar'></div>
                <Box sx={{
                    flexGrow: 1,
                    overflowY: 'auto', // 允许内容区域垂直滚动
                    height: '100vh'
                }}>
                    {/* 店铺列表 */}
                    <div className='cartCategory-body '>
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
                                                <img src={shop.pic} alt="" className='card_img rounded-[15px] shadow-md ' />
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
                        <div className='cartCategory-end '></div>
                    </div>
                    
                </Box>
          
            </Box>

        </Box>
    );
}
export default CartCategory;