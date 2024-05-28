import React, {  useRef, useState } from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons'; // 导入返回图标
import { Geolocation } from '@capacitor/geolocation';//地理位置插件


interface Props extends RouteComponentProps { }

function About(props: Props) {

    // const list = [
    //     { id: 1001, name: 'sehun' },
    //     { id: 1002, name: 'luhan' },
    //     { id: 1003, name: 'jun' },
    //     { id: 1004, name: 'wonwoo' },
    // ]
    const hadleClick = (name: string, e: React.MouseEvent<HTMLButtonElement>) => {
        console.log('beijinajile', name, e)
        setCount(count + 1);
        setForm({
            ...form,
            name: 'jun'

        })

    }
    const Button = () => {
        return <button>clinkmeeme</button>
    }

    const [count, setCount] = useState(0);
    const [form, setForm] = useState({ name: 'sehun' });
    const [value, setValue] = useState('');

    const inputRef = useRef(null);
    const showDOM = () => {
        console.dir(inputRef.current)
    }

    const [showPopup, setShowPopup] = useState(false); // 控制弹窗显示与隐藏的状态
    const [locationInfo, setLocationInfo] = useState<any>(null); // 存储地理位置信息的状态
    const handleGetPositionClick = () => {
        printCurrentPosition();
    };
    

    const printCurrentPosition = async () => {
        try {
            const coordinates = await Geolocation.getCurrentPosition();
            setLocationInfo(coordinates); // 更新地理位置信息的状态
            setShowPopup(true); // 显示弹窗
        } catch (error) {
            console.error('Error getting current position:', error);
        }
    };
    const Popup = () => {
        return (
            <div className="popup">
                <h3>地理位置信息</h3>
                <p>经度：{locationInfo?.coords.longitude}</p>
                <p>纬度：{locationInfo?.coords.latitude}</p>
                {/* 其他地理位置信息 */}
            </div>
        );
    };


    return (
        <>
            <IonHeader>
                <IonToolbar color={"primary"}>
                    <IonTitle className="ion-text-center">44 GUM</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => props.history.goBack()}>
                            <IonIcon icon={arrowBack} slot="icon-only" />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <div >
                <input
                    className='bg-pink-300'
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <div >
                <input
                    className='bg-pink-300'
                    type="text"
                    defaultValue={value}
                />
            </div>
            {/* //1.useRef生成ref对象 绑定到dom标签身上
            //2.dom可用时,ref.current获取dom
            // 渲染完毕之后dom生成之后才可用 */}
            <div >
                <input
                    className='bg-pink-400'
                    type="text"
                    ref={inputRef}
                />
                <button onClick={showDOM}>获取dom</button>
            </div>

            <div>
                <h2 className="text-blue-200 text-center">About!!!!</h2>
                <h1>About Page</h1>
                {/* 渲染列表 map循环*/}
                {/* <ul>
                    {list.map(item => <li key={item.id}>{item.name}</li>)}
                </ul> */}
                {/* <button onClick={(e) => hadleClick('sehun', e)}>click</button> */}
            </div>
            <div>
                <button onClick={(e) => hadleClick('sehun', e)}>{count}</button>
                <button onClick={(e) => hadleClick('sehun', e)}>修改form{form.name}</button>
            </div>
            <IonButton onClick={handleGetPositionClick}>获取地理位置</IonButton>
            <div >
                <h3>地理位置信息</h3>
                <p>经度：{locationInfo?.coords.longitude}</p>
                <p>纬度：{locationInfo?.coords.latitude}</p>
                {/* 其他地理位置信息 */}
            </div>
            {showPopup && <Popup />}
            {/* 渲染组件 */}
            <Button />
        </>

    );
}

export default About;
