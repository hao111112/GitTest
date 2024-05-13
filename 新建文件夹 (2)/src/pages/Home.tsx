import React from 'react';
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react';
import { RouteComponentProps } from 'react-router-dom';
import { arrowBack } from 'ionicons/icons'; // 导入返回图标

interface Props extends RouteComponentProps {}

function Home(props: Props) {

    return (
        <>
            <IonHeader>
                <IonToolbar color={"primary"}>
                <IonTitle  className="ion-text-center">44 GUM</IonTitle>
                <IonButtons slot="end">
                    <IonButton onClick={() => props.history.goBack()}>
                        <IonIcon icon={arrowBack} slot="icon-only" />
                    </IonButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <div>
                <h2 className="text-blue-200 text-center">Home!!!!</h2>    
                <h1>About Page</h1>
            </div>
        </>
        
    );
}

export default Home;
