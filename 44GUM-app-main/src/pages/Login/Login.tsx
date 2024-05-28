import React, { useState } from 'react';
import { IonBackButton, IonButtons,IonItem, IonTitle, IonToolbar, useIonLoading } from '@ionic/react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import title from '../../images/title.png';
import alter from '../../images/alter.png';
import '../../css/login.css'
interface Props extends RouteComponentProps { }

function Login(props: Props) {

    const [email, setEmail] = useState('');
    const [present, dismiss] = useIonLoading();
    const [isEmptyEmail, setIsEmptyEmail] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsInvalidEmail(false);
        if (email.trim() === '') {
            setIsEmptyEmail(true);
            // setIsInvalidEmail(false);
            return;
        } else {
            setIsEmptyEmail(false);
            setEmail(email.trim());
            if (!isValidEmail(email.trim())) {
                setIsInvalidEmail(true);
                return;
            } else {
                setIsInvalidEmail(false);
                await present({ message: 'loading.....' })
                setTimeout(() => {
                    dismiss();
                    localStorage.setItem('email', email); // 将邮箱地址存储到 localStorage 中
                    props.history.push('/login1');
                }, 1500);
            }
        }
    };
    //判断邮箱地址是否规范（查找邮箱用户）
    const isValidEmail = (email: string) => {
        // 正则表达式来验证邮箱格式
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;//包括一个用户名，一个 '@' 符号，一个域名，和一个域名后缀
        return emailPattern.test(email);
    };
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmail(e.target.value);
    // };
    

    return (
        <>
            <IonToolbar className="custom-toolbar flex items-center justify-center mt-2">
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle className="ion-text-center text-black text-3xl font-bold">
                    <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                    44 GUM
                </IonTitle>
            </IonToolbar>

            <div className=' mt-16'>
                <p className='text-center text-2xl font-bold'>Login</p>
                <div className='pl-14 pr-4 mt-8'>
                    <p>在这里输入你的邮箱地址</p>
                    <form onSubmit={onSubmit} className='mt-3 '>
                        <div className='flex flex-row  items-center'>
                            <IonItem className={`basis-11/12 rounded-xl  border-2 ${isEmptyEmail ? 'border-red-500' : isInvalidEmail ? 'border-red-500' : 'border-gray-400'} text-gray-500`} lines="none">
                                {/* <IonInput type='text' placeholder='@gmail.com' value={email} onIonChange={handleInputChange}></IonInput> */}
                                <input type='text' className='h-full w-full border-0' placeholder='@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)}></input >
                            </IonItem>
                            {(isEmptyEmail || isInvalidEmail) && <img src={alter} className="w-6 h-6 ml-3" alt="Warning Icon" />}
                        </div>
                        {isEmptyEmail && <p className="text-red-500 mt-2 text-[11px]">请输入邮箱地址</p>}
                        {isInvalidEmail && <p className="text-red-500 mt-2 text-[11px]">沒有找到該郵箱用戶，請檢查郵箱賬號及格式是否正確</p>}

                        {(isEmptyEmail || isInvalidEmail) && <p className="text-[#0047FF80] text-center text-[11px] mt-12 pr-10 underline">忘記了使用哪個郵箱註冊的賬號？ 需要幫助</p>}
                        <div className='flex flex-col items-center mt-5 h-14 pr-10'>
                            <button type="submit" className='bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3'>继续</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default withRouter(Login);
