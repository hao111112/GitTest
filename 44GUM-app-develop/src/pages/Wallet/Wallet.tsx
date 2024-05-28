
import { AppBar, Box, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useEffect,useState } from 'react';
import profile from '../../images/wallet/profile.png';
import Design from '../../images/wallet/Design2.svg';
import HeaderRight from '../../images/navbar/headerCode.png';
import QRcodesvg from '../../images/navbar/QRcode.svg';
import MenuA from '../../images/wallet/A.svg';
import MenuB from '../../images/wallet/B.svg';
import MenuC from '../../images/wallet/C.svg';
import MenuA1 from '../../images/wallet/A1.svg';
import MenuB1 from '../../images/wallet/B1.svg';
import MenuC1 from '../../images/wallet/C1.svg';
import Ellipse1 from '../../images/wallet/Ellipse1.png';
import Ellipse2 from '../../images/wallet/Ellipse2.png';
import Ellipse3 from '../../images/wallet/Ellipse3.png';
import MenuIcon from '@mui/icons-material/Menu';
import Background from '../../images/navbar/Background.png';
import WalletDetailPage from './WalletDetail';
import { useSwipeable } from 'react-swipeable';
import { useHistory } from 'react-router-dom';
import '../../css/wallet.css'; // 导入自定义样式文件
import axios from 'axios';
// Wallet 组件中声明 setSelectedTab 属性
interface WalletProps {
    setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
}

const Wallet: React.FC<WalletProps> = ({ setSelectedTab }) => {
    const history = useHistory();
    const [selectedCategory, setSelectedCategory] = useState<string>('所有');
    const [selectedShop, setSelectedShop] = useState<number | null>(null); // 改为 number | null 类型
    const [WalletDetail, setWalletDetail] = useState<boolean>(false);
    //===================================================
    const [walletList, setWalletList] = useState([]);
    //===================================================
    const handleScanClick = () => {
        history.push('/qrCodeScan', { from: 'wallet' });
    };

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    };

    const categories = [
        { name: '所有', selectedSvg: MenuA, unselectedSvg: MenuA1 },
        { name: '餐饮', selectedSvg: MenuB, unselectedSvg: MenuB1 },
        { name: '娱乐', selectedSvg: MenuC, unselectedSvg: MenuC1 }
    ]; // 分类按钮数组

    const ShopList = [
        {
            id: 1,
            title: 'Aga Restaurant & Bara',
            address: '1油尖旺區尖沙咀金馬倫道22-24號東麗中心i',
            category: '餐饮', // 店铺分类
            money: 100, // 店铺优惠图标路径
            logo: Ellipse1 // 店铺图片路径
        },
        {
            id: 2,
            title: 'SugarK',
            address: '2油尖旺區尖沙咀金馬倫道22-24號東麗中心',
            category: '餐饮', // 店铺分类
            money: 100, // 店铺优惠图标路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 3,
            title: 'Aga Restaurant & Bar',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui ',
            category: '娱乐', // 店铺分类
            money: 100, // 店铺优惠图标路径
            logo: Ellipse3 // 店铺图片路径
        },
        {
            id: 4,
            title: 'SugarK',
            address: '2油尖旺區尖沙咀金馬倫道22-24號東麗中心',
            category: '餐饮', // 店铺分类
            money: 100, // 店铺优惠图标路径
            logo: Ellipse1 // 店铺图片路径
        },
        {
            id: 5,
            title: 'Aga Restaurant & Bar',
            address: '12-12A Blue Horse Commercial Building, Haiphong Road, Tsim Sha Tsui',
            category: '餐饮', // 店铺分类
            money: 100, // 店铺优惠图标路径
            logo: Ellipse2 // 店铺图片路径
        },
        {
            id: 6,
            title: 'SugarK',
            address: '2油尖旺區尖沙咀金馬倫道22-24號東麗中心',
            category: '娱乐', // 店铺分类
            money: 100, // 店铺优惠图标路径
            logo: Ellipse3 // 店铺图片路径
        },
        // 可以继续添加其他店铺信息
    ];
    const handleWalletDetailClick = (shopID: number) => {
        setSelectedShop(shopID); // 将点击的店铺存储在状态中
        setWalletDetail(true);
    };
    //===================================================
    useEffect(() => {
        const fetchWalletList = async () => {
          try {
            const response = await axios.get('http://kocu.cswallet.co/api/wallet/asset');
            const walletList = response.data;
            console.log(walletList)
            setWalletList(walletList);
          } catch (error) {
            console.error('Failed to fetch country list:', error);
          }
        };
    
        fetchWalletList();
      }, []);
    //===================================================
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
                            我的優惠
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

                <div className='px-2'>
                    {/* 分类店铺 */}
                    <div >
                        <ul className='flex mb-3 wallet_title'>
                            {categories.map((category, index) => (
                                <li className='mr-2 wallet_navbar' key={index} onClick={() => handleCategoryClick(category.name)}>
                                    {selectedCategory === category.name ? (
                                        <img src={category.selectedSvg} alt={`selected ${category.name}`} className='h-full' />
                                    ) : (
                                        <img src={category.unselectedSvg} alt={`unselected ${category.name}`} className='h-full' />
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* 店铺列表 */}
                        <div className='flex flex-col items-center'>
                            {ShopList.filter((shop) => {
                                if (selectedCategory === '所有') {
                                    return true;
                                } else {
                                    return shop.category === selectedCategory;
                                }
                            }).map((shop, index) => (
                                <div key={index}
                                    className='wallet_cards  mb-1 d relative '
                                >
                                    <div>
                                        <img src={Design} className='absolute w-full h-full' alt="" />
                                    </div>
                                    <div onClick={() => handleWalletDetailClick(shop.id)}>
                                        <Grid container className='wallet_card h-full '>
                                            <Grid item xs={4} className='flex justify-center items-center' >
                                                <img src={shop.logo} alt="" className='wallet_card_img rounded-full shadow-md ' />
                                            </Grid>
                                            <Grid item xs={8} className='wallet_card_right '>
                                                <div className='wallet_card_titles h-full  '>
                                                    <p className='wallet_card_title truncate text-gray-600'>{shop.title}</p>
                                                    <div className='flex items-center'>
                                                        <p className='text-gray-600 font-bold wallet_card_unit'>HK$</p>
                                                        <p className='text-[#B74040] font-bold wallet_card_money ml-3'>{shop.money}</p>
                                                    </div>
                                                    <p className='text-gray-400 wallet_card_item truncate'>{shop.address}</p>
                                                </div>

                                            </Grid>
                                        </Grid>
                                    </div>

                                    {WalletDetail && (
                                        <div className="fixed top-0 left-0 w-full h-full z-50">
                                            <div className="w-full h-full flex items-center justify-center">
                                                <WalletDetailPage onClose={() => setWalletDetail(false)} shopId={selectedShop} />
                                            </div>
                                        </div>
                                    )}

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

export default Wallet;
// import { useEffect, useState } from 'react';
// import Axios from 'axios';

// // Your existing imports...

// const Wallet: React.FC<WalletProps> = ({ setSelectedTab }) => {
//     const history = useHistory();
//     const [selectedCategory, setSelectedCategory] = useState<string>('所有');
//     const [selectedShop, setSelectedShop] = useState<number | null>(null);
//     const [WalletDetail, setWalletDetail] = useState<boolean>(false);
//     const [shopList, setShopList] = useState<any[]>([]); // State to store fetched shop list

//     const handleScanClick = () => {
//         history.push('/qrCodeScan', { from: 'wallet' });
//     };

//     const handleCategoryClick = (category: string) => {
//         setSelectedCategory(category);
//     };

//     useEffect(() => {
//         const fetchShopList = async () => {
//             try {
//                 const response = await Axios.get('http://kocu.cswallet.co/api/wallet/asset/voucher/details');
//                 setShopList(response.data);
//             } catch (error) {
//                 console.error('Error fetching shop list:', error);
//                 // Handle errors, show error message, etc.
//             }
//         };

//         fetchShopList();
//     }, []); // Empty dependency array to ensure this effect runs only once on component mount

//     const handleWalletDetailClick = (shopID: number) => {
//         setSelectedShop(shopID);
//         setWalletDetail(true);
//     };
    
    
//     return (
//         <Box sx={{ /* Your existing styles */ }}>
//             {/* Your existing AppBar */}
//             <AppBar position="fixed" sx={{ /* Your existing styles */ }}>
//                 {/* Your existing AppBar content */}
//             </AppBar>

//             <Box component="main" sx={{ /* Your existing styles */ }}>
//                 {/* Your existing content */}

//                 {/* Shop list */}
//                 <div className='flex flex-col items-center'>
//                     {shopList.map((shop, index) => (
//                         <div key={index} className='wallet_cards mb-1 d relative' onClick={() => handleWalletDetailClick(shop.id)}>
//                             {/* Your existing shop card content */}
//                         </div>
//                     ))}
//                 </div>
                
//                 {/* Wallet detail modal */}
//                 {WalletDetail && (
//                     <div className="fixed top-0 left-0 w-full h-full z-50">
//                         <div className="w-full h-full flex items-center justify-center">
//                             <WalletDetailPage onClose={() => setWalletDetail(false)} shopId={selectedShop} />
//                         </div>
//                     </div>
//                 )}
//             </Box>
//         </Box>
//     );
// }

// export default Wallet;
