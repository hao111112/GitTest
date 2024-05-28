import React from 'react';
import cardbg from '../../images/wallet/walletDetail/cardbg.png';
import Line from '../../images/wallet/walletDetail/Line.svg';
import qrcode from '../../images/wallet/walletDetail/qrcode.png';
import CloseIcon from '@mui/icons-material/Close';
import Ellipse1 from '../../images/wallet/Ellipse1.png';
import Ellipse2 from '../../images/wallet/Ellipse2.png';
import Ellipse3 from '../../images/wallet/Ellipse3.png';
import '../../css/walletDetail.css'
import { useHistory } from 'react-router-dom';

const WalletDetailPage: React.FC<{ onClose: () => void; shopId: number | null }> = ({ onClose, shopId }) => {
    const history = useHistory();

    // 使用 shopId 来获取相关数据或执行其他操作
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
            address: '2油尖旺區尖沙咀金馬',
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
    const shop = ShopList.find(shop => shop.id === shopId);
    return (
        <div className='w-full h-full walletDetail flex justify-center'>
            <div className='absolute walletDetail-card' style={{ backgroundImage: `url(${cardbg})`, backgroundSize: 'contain',backgroundRepeat:'no-repeat' }}>
                <div className='flex w-full walletDetail-card-titles'>
                    <div className='w-full h-full flex items-center  justify-center '>
                        <p className='font-bold text-wrap text-center '>{shop?.title}</p>
                    </div>
                    <button className="close-button absolute" onClick={onClose}>
                        <CloseIcon className='w-full h-full' />
                    </button>
                </div>
                <div className='w-full  walletDetail-card-content'>
                    <div className='flex walletDetail-card-top items-center'>
                        <div className='walletDetail-card-top-logo'>
                            <img src={shop?.logo} className='w-full h-ful' alt="" />
                        </div>
                        <div className='walletDetail-card-top-content '>
                            <p className='text-gray-600 walletDetail-card-top-title'>現金券</p>
                            <div className='flex walletDetail-card-top-item relative'>
                                <p className='walletDetail-card-top-price'>HK$</p>
                                <p className='font-bold text-[#CD5151] walletDetail-card-top-money'>{shop?.money}</p>
                            </div>
                        </div>
                    </div>
                    <div className='walletDetail-card-middle'>
                        <div className='flex walletDetail-card-middle-content walletDetail-card-middle-addressHeigh'>
                            <p className='w-[18%]   '>地址:</p>
                            <p className='w-[82%]   walletDetail-card-middle-address'>{shop?.address}</p>
                        </div>
                        <div className='flex walletDetail-card-middle-content'>
                            <p className='w-[18%]   '>電話:</p>
                            <p className='w-[82%]   '>+852 52799003</p>
                        </div>

                        <div >
                            <button className='bg-[#CD5151] rounded-[20px] walletDetail-card-middle-btn w-[90%] text-white'>點擊這裡跳轉至使用細則及詳細條款</button>
                        </div>
                    </div>
                    <div className='walletDetail-card-end'>
                        <div>
                            <img src={Line} alt="" className='w-full' />
                        </div>
                        <div className='flex flex-col items-center w-full'>
                            <div className='walletDetail-card-end-img'>
                                <img src={qrcode} alt="" className='w-full h-full' />
                            </div>
                            <div className='walletDetail-card-end-item'>
                                <p>62952-676y934862334023-1029</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletDetailPage;
