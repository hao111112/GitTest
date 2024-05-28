import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import i18n from "i18next";
import React, { useEffect } from "react";
import { initReactI18next } from "react-i18next";
import { Route, useHistory } from "react-router-dom";
import zh_hk from "./locales/en.json";
import CartSearch from "./pages/Cart/CartSearch";
import Default from "./pages/Default";
import Login from "./pages/Login/Login";
import Login1 from "./pages/Login/Login1";
import TC from "./pages/Login/TCLogin";
import Logo from "./pages/Logo";
import Main from "./pages/Main";
import RegisterEmail from "./pages/Register/RegisterEmail";
import RegisterEmail1 from "./pages/Register/RegisterEmail1";
import RegisterEmailSecond from "./pages/Register/RegisterEmailSecond";
import RegisterEmailSecondEnd from "./pages/Register/RegisterEmailSecondEnd";
import RegisterPhone from "./pages/Register/RegisterPhone";
import RegisterPhone1 from "./pages/Register/RegisterPhone1";
import RegisterPhoneSecond from "./pages/Register/RegisterPhoneSecond";
import RegisterPhoneSecondEnd from "./pages/Register/RegisterPhoneSecondEnd";
import RegisterSuccess from "./pages/Register/RegisterSuccess";

setupIonicReact();

i18n.use(initReactI18next).init({
    resources: {
        zh_hk: { translation: zh_hk },
    },
    lng: "zh_hk",
    fallbackLng: "zh_hk",
    interpolation: {
        escapeValue: false,
    },
});

const App: React.FC = () => {
    return (
        <IonApp>
            <IonReactRouter>
                <AppContent />
            </IonReactRouter>
        </IonApp>
    );
};

const AppContent: React.FC = () => {
    const history = useHistory();

    useEffect(() => {
        const userStr = localStorage.getItem("user");
        const user = userStr ? JSON.parse(userStr) : null;
        console.log(user);
        if (user) {
            history.push("/main");
        } else {
            // TODO: rename default to welcome
            history.push("/default");
        }
    }, [history]);

    return (
        <IonRouterOutlet>
            <Route path="/default" exact={true} component={Default} />
            <Route path="/login" exact={true} component={Login} />

            <Route path="/login1/:userName" exact={true} component={Login1} />

            <Route path="/main" component={Main} />
            <Route path="/cartSearch" component={CartSearch} />

            <Route path="/registerPhone" exact={true} component={RegisterPhone} />
            <Route path="/registerPhone1" exact={true} component={RegisterPhone1} />
            <Route path="/registerPhoneSecond" exact={true} component={RegisterPhoneSecond} />
            <Route path="/registerPhoneSecondEnd" exact={true} component={RegisterPhoneSecondEnd} />

            <Route path="/registerEmail" exact={true} component={RegisterEmail} />
            <Route path="/registerEmail1" exact={true} component={RegisterEmail1} />
            <Route path="/registerEmailSecond" exact={true} component={RegisterEmailSecond} />
            <Route path="/registerEmailSecondEnd" exact={true} component={RegisterEmailSecondEnd} />
            <Route path="/registerSuccess" exact={true} component={RegisterSuccess} />

            <Route path="/logo" exact={true} component={Logo} />
            <Route path="/tcLogin" exact={true} component={TC} />
            {/* <Redirect exact={true} from="/" to="/default" /> */}
        </IonRouterOutlet>
    );
};

export default App;
