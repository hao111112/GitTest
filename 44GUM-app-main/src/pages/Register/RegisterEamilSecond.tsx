import React from 'react';
import { IonBackButton, IonButtons, IonTitle, IonToolbar} from '@ionic/react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import '../../css/login.css'
interface Props extends RouteComponentProps { }

function RegisterEamilSecond(props: Props) {
    const email = localStorage.getItem('email') || '';// 从本地存储中获取邮箱数据
    // 将邮箱地址前三个和后四个字符保留，其余字符用*代替
    const maskedEmail = email.replace(/^(.{3}).+(.{4}@.+)/, (match, firstPart, secondPart) => {
        const maskedMiddle = '*'.repeat(email.length - firstPart.length - secondPart.length);
        return firstPart + maskedMiddle + secondPart;
    });
    // 处理按钮点击事件的函数
    const handleClick = () => {
        // 在每次点击时增加点击次数
        props.history.push('/registerEamilSecondPhone');
    };

    return (
        <>
            <IonToolbar className="custom-toolbar flex mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/registerEmail1" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl  font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className='mt-10'>
                <p className='text-center text-2xl font-bold'>開啟二級驗證</p>
                <div className='text-center mt-8 px-10'>
                    <p className='form-signup-title mt-5'>{maskedEmail}</p>
                    <p className='text-left mt-5'>我們為您的郵箱發送了一封郵件， 請檢查您的電子郵箱進行驗證</p>
                    <div className='mt-[10%] mb-[10%] text-sm'>
                        <Link to="/about" className='text-[#0047FF80] hover:text-sky-700 underline'>沒有收到郵件？需要幫助</Link>
                    </div>

                    <div className='flex flex-col items-center mt-5 h-14'>
                        <button onClick={handleClick} className='bg-[#FF9292] hover:bg-[#f46c6c] w-[60%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default withRouter(RegisterEamilSecond);
