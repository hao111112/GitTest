
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import offsvg from '../../images/cart/off.svg';
import header from '../../images/cart/merchant/header.png';
import add from '../../images/cart/merchant/add.svg';
import minus from '../../images/cart/merchant/minus.svg';
import Rectangle_90 from '../../images/cart/Rectangle 90.png';
import Rectangle_91 from '../../images/cart/Rectangle 91.png';
import Ellipse1 from '../../images/wallet/Ellipse1.png';
import Ellipse2 from '../../images/wallet/Ellipse2.png';
import '../../css/cartMerchant.css'; // 导入自定义样式文件

import { useHistory, useLocation, useParams } from 'react-router-dom';

const CartMerchant: React.FC<{ setShowNavbar: React.Dispatch<boolean> }> = ({ setShowNavbar }) => {
    const history = useHistory();
    const [quantity1, setQuantity1] = useState<number>(1); // 初始数量为 1
    const [quantity2, setQuantity2] = useState<number>(1); // 初始数量为 1
    const location = useLocation();
    const { from }: { from?: string } = location.state || {};
    console.log('from'+from)
    //返回按钮
    const handleBackClick = () => {
        if (from === 'home') {
            history.push('/main/home');
        } else if(from === 'cart'){
            history.push('/main/cart');
        } else if(from === 'cartCategory'){
            console.log('history.push(`/cartCategory/${shop?.category}`);'+shop?.category)
            history.push(`/cartCategory/${shop?.category}`);
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

    const { shopId } = useParams<{ shopId: string }>();
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

    const shop = ShopList.find(shop => shop.id === parseInt(shopId));

    // 点击结账的处理逻辑
    const handleBuyClick = () => {

        alert('结账商家id' + shop?.id + '第一个数量:' + quantity1 + '第2个数量:' + quantity2)
    };
    // 点击加号时增加数量
    const handleIncreaseQuantity = (shopId: number) => {
        if (shopId == 1) {
            setQuantity1(quantity1 + 1);
        }
        else if (shopId == 2) {
            setQuantity2(quantity2 + 1);
        }
    };
    // 点击减号时减少数量，但不能小于 1
    const handleDecreaseQuantity = (shopId: number) => {
        if (shopId == 1) {
            if (quantity1 > 1) {
                setQuantity1(quantity1 - 1);
            }
        }
        else if (shopId == 2) {
            if (quantity2 > 1) {
                setQuantity2(quantity2 - 1);
            }
        }

    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',

        }}>
            <AppBar position="fixed" sx={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleBackClick}
                    >
                        <ArrowBackIosOutlinedIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: 'center', position: 'relative', left: '-1.5rem' }}>
                        <Typography variant="h6" component="div" sx={{ color: 'black' }}>
                            {shop?.title}
                        </Typography>
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
                    <div className='CartMerchant_header ' style={{ backgroundImage: `url(${header})`, backgroundSize: '100% 100%' }}>
                        <div className='CartMerchant_header_content flex items-end h-full justify-between'>
                            <div className='CartMerchant_header_logo'>
                                <img src={shop?.logo} alt="" className='w-full' />
                            </div>
                            <div className='CartMerchant_header_title  text-white '>
                                <p>{shop?.title}</p>
                            </div>
                        </div>
                        <div className='CartMerchant_title shadow-md  flex'>
                            <p className='font-semibold mr-2'>AGA HK$ 100 </p>
                            <p>現金券</p>
                        </div>
                        <div className='CartMerchant_pay'>
                            <p>支付</p>
                            <div >
                                <div className='flex justify-between mt-2'>
                                    <div className='CartMerchant_pay_img '>
                                        <img src={shop?.logo} alt="" className='w-full' />
                                    </div>
                                    <div className='CartMerchant_pay_item'>
                                        <p>HK$ 100.00 現金券</p>
                                        <p>現金 HK$ 100.00 + 積分 20</p>
                                    </div>
                                    <div className='flex w-[35%]  justify-between items-end'>
                                        <button className='CartMerchant_pay_btn ' onClick={() => handleDecreaseQuantity(1)}>
                                            <img src={minus} alt="" className='w-full' />
                                        </button>
                                        <p className='CartMerchant_pay_number'>{quantity1}</p>
                                        <button className='CartMerchant_pay_btn ' onClick={() => handleIncreaseQuantity(1)}>
                                            <img src={add} alt="" className='w-full' />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex justify-between mt-5'>
                                    <div className='CartMerchant_pay_img'>
                                        <img src={shop?.logo} alt="" className='w-full' />
                                    </div>
                                    <div className='CartMerchant_pay_item '>
                                        <p>HK$ 100.00 現金券</p>
                                        <p>現金 HK$ 85.00</p>
                                    </div>
                                    <div className='flex w-[35%]  justify-between items-end'>
                                        <button className='CartMerchant_pay_btn' onClick={() => handleDecreaseQuantity(2)}>
                                            <img src={minus} alt="" className='w-full' />
                                        </button>
                                        <p className='CartMerchant_pay_number'>{quantity2}</p>
                                        <button className='CartMerchant_pay_btn ' onClick={() => handleIncreaseQuantity(2)}>
                                            <img src={add} alt="" className='w-full' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='CartMerchant_detail'>
                            <p>詳細</p>
                        </div>

                    </div>
                </div>
            </Box>
            <div className='fixed bottom-0 w-full flex justify-center items-center h-[12%] bg-white'>
                <button onClick={() => handleBuyClick()} className='bg-[#D84343] rounded-[15px] CartMerchant_buy w-[85%] '>
                    <p className='CartMerchant_buy_item text-white'>結賬</p>
                </button>
            </div>
        </Box>
    );
}
export default CartMerchant;