import React from 'react';
import Test_Re from '../../images/QRcode/Test_Re.png'
import Ellipse1 from '../../images/wallet/Ellipse1.png';
import Ellipse2 from '../../images/wallet/Ellipse2.png';
import Ellipse3 from '../../images/wallet/Ellipse3.png';
import '../../css/QRcode.css'
import { useHistory, useLocation } from 'react-router-dom';
const QRCodePage: React.FC = () => {
    const history = useHistory();

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
    return (
        <div style={{ backgroundImage: `url(${Test_Re})`, width: '100%', height: '100%' }}>

        </div>

    );
};

export default QRCodePage;
