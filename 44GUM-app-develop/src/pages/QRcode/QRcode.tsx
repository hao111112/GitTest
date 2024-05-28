import React from 'react';
import Test_Re from '../../images/QRcode/Test_Re.png'
import Design from '../../images/QRcode/Design.png'
import Avater from '../../images/QRcode/Avater.svg'
import Card_Design from '../../images/QRcode/Card_Design.png'
import gathering from '../../images/QRcode/gathering.svg'
import QRcode from '../../images/QRcode/QRcode.svg'
import scan from '../../images/QRcode/scan.svg'
import transfer from '../../images/QRcode/transfer.svg'
import deal from '../../images/QRcode/deal.svg'
import '../../css/QRcode.css'
import { useHistory, useLocation } from 'react-router-dom';
const QRCodePage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  // 当前页面的路径
  const currentUrl = location.pathname;
  // 从路径中提取最后一部分，即页面名称
  const currentPage = currentUrl.split('/').pop();
  console.log('currentPage' + currentPage);
  
  const handleScanClick = () => {
    history.push('/qrCodeScan', { from: currentPage });
  }; 

  const handleTransactionHistoryClick = () => {
    history.push('/transactionHistory', { from: currentPage });
  }; 
  const handleCollectionClick = () => {
    history.push('/collection', { from: currentPage });
  }; 
  return (
    <div style={{ backgroundImage: `url(${Test_Re})`, width: '100%', height: '100%' }}>

      <div className='fixed bottom-0 ' style={{ backgroundImage: `url(${Design})`, backgroundSize: '100%', width: '100%', height: '51%', backgroundRepeat: 'no-repeat' }}>

        <div className='flex justify-center'>
          <div className='QRcode_Card_Design relative' style={{ backgroundImage: `url(${Card_Design})`, backgroundSize: '100%', backgroundRepeat: 'no-repeat' }}>
            <div className='QRcode_Card_Design_top flex h-[55%] justify-between'>
              <div className='QRcode_Card_Design_logo'>
                <img src={Avater} alt="" className='w-full' />
              </div>
              <div className='w-[65%]  text-white QRcode_Card_Design_info'>
                <p >Man Hing Chan</p>
                <div className='flex'>
                  <p className='QRcode_Card_Design_vips'>會員</p>
                  <p className='QRcode_Card_Design_vip'>#204591</p>
                </div>
              </div>
            </div>
            <div className='QRcode_Card_Design_bottom flex h-[45%]'>
              <div className='w-[50%] flex flex-col items-center justify-center'>
                <div className='QRcode_Card_Design_bottom_img'>
                  <img src={QRcode} alt="" className='w-full' />
                </div>
                <p className='QRcode_Card_Design_bottom_item'>3690224056-402592</p>
              </div>
              <div className='w-[50%] flex QRcode_Card_Design_bottom_btns'>
                <button className='bg-[#CD5151] rounded-md QRcode_Card_Design_bottom_btn self-end text-white text-center'>我的賬戶</button>
              </div>

            </div>

          </div>
        </div>

        <div className='QRcode_content  relative'>
          <div className='flex justify-around'>
            <div className=' QRcode_content_img text-center'>
              <img src={transfer} alt="" className='w-full' />
              <p className='QRcode_content_item'>轉出</p>
            </div>
            <div className='  QRcode_content_img text-center' onClick={handleCollectionClick}>
              <img src={gathering} alt="" className='w-full' />
              <p className='QRcode_content_item'>收款</p>
            </div>
          </div>

          <div className='flex justify-around'>
            <div className='  QRcode_content_img text-center'onClick={handleTransactionHistoryClick}>
              <img src={deal} alt="" className='w-full' />
              <p className='QRcode_content_item'>交易記錄</p>
            </div>
            <div className='  QRcode_content_img text-center' onClick={handleScanClick}>
              <img src={scan} alt="" className='w-full' />
              <p className='QRcode_content_item'>掃QR code</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};

export default QRCodePage;
