import React from 'react';
import { IonBackButton, IonButtons,IonItem, IonTitle, IonToolbar} from '@ionic/react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';

import '../../css/login.css'
interface Props extends RouteComponentProps { }

function RegisterEamilSecondPhone(props: Props) {
    // const email = localStorage.getItem('email') || '';// 从本地存储中获取邮箱数据
    const phoneNumber = localStorage.getItem('phoneNumber') || '';// 从本地存储中获取邮箱数据

    // const maskedEmail = email.replace(/^(.{3}).+(.{4}@.+)/, (match, firstPart, secondPart) => {
    //     const maskedMiddle = '*'.repeat(email.length - firstPart.length - secondPart.length);
    //     return firstPart + maskedMiddle + secondPart;
    // });
    
    const maskedPhoneNumber = phoneNumber.replace(/^(.{3}).+(.{3})$/, (match, firstPart, lastPart) => {
        const middlePart = '*'.repeat(phoneNumber.length - 6); // 除去前三位和后三位的长度
        return firstPart + middlePart + lastPart;
    });
    // 将邮箱地址前三个和后四个字符保留，其余字符用*代替
    // const maskedEmail = email.replace(/^(.{3}).+(.{4}@.+)/, (match, firstPart, secondPart) => {
    //     const maskedMiddle = '*'.repeat(email.length - firstPart.length - secondPart.length);
    //     return firstPart + maskedMiddle + secondPart;
    // });
    // const maskedphoneNumber = phoneNumber.replace(/^(.{3}).+(.{3})$/, (match, firstPart, lastPart) => {
    //     const middlePart = '*'.repeat(phoneNumber.length - 6); // 除去前三位和后三位的长度
    //     return firstPart + middlePart + lastPart;
    // });
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        props.history.push('/registerEamilSecondEnd');
    };

    return (
        <>
            <IonToolbar className="custom-toolbar flex mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/registerEamilSecond" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl  font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-10'>
                <p className='text-center text-2xl font-bold'>開啟二級驗證</p>

                <div className='pl-14 pr-4 mt-8'>
                    <form onSubmit={onSubmit} className='mt-3 text-[14px] '>
                        <div className='form-signup'>
                            <p className='form-signup-title font-bold'>*檢查你的移動設備是否可用</p>
                            <div className='flex flex-row  items-center'>
                                <IonItem className={`basis-11/12 rounded-xl border-2  text-gray-500`} no-lines lines="none" no-border>
                                    <input type={'text'} className='h-full w-full border-0' placeholder='輸入驗證碼'></input>
                                </IonItem>
                            </div>
                            <div className='flex text-xs mt-5 phoneitem'>
                                <p >檢查您的移動設備 </p>
                                <p>+65 {maskedPhoneNumber} </p>
                                <p>是否收到來自 X-Fxxx開頭的信件</p>
                            </div>

                        </div>
                        <div className='mt-[10%] mb-[10%] text-sm text-center pr-14 pl-4'>
                            <Link to="/about" className='text-[#0047FF80] hover:text-sky-700 underline'>沒有收到信件？需要幫助</Link>
                        </div>
                        <div className='flex flex-col items-center mt-5 h-14 pr-10'>
                            <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default withRouter(RegisterEamilSecondPhone);
