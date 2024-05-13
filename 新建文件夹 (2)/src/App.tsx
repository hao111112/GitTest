import React, { useEffect } from 'react';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import Default from './pages/Default';
import Home from './pages/Home';
import About from './pages/About';
import Main from './pages/Main';
import { useHistory } from 'react-router-dom';
import Login from './pages/Login/Login';
import LoginTest from './pages/Login/LoginTest';
import Login1 from './pages/Login/Login1';
import LoginTest1 from './pages/Login/LoginTest1';
import RegisterPhone from './pages/Register/RegisterPhone';
import RegisterPhone1 from './pages/Register/RegisterPhone1';
import Region from './pages/Region/Region';
import RegisterEmail from './pages/Register/RegisterEmail';
import RegisterEmail1 from './pages/Register/RegisterEmail1';
import Logo from './pages/Logo';
import Transitions from './pages/Transitions';
import RegisterEamilSecond from './pages/Register/RegisterEamilSecond';
import RegisterPhoneSecond from './pages/Register/RegisterPhoneSecond';
import RegisterEamilSecondEnd from './pages/Register/RegisterEamilSecondEnd';
import RegisterPhoneSecondEnd from './pages/Register/RegisterPhoneSecondEnd';
import RegisterSuccess from './pages/Register/RegisterSuccess';
import CartSearch from './pages/Cart/CartSearch';
import TC from './pages/Login/TCLogin';
setupIonicReact();

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
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    console.log(user);
    if (user) {
      history.push('/main');
    } else {
      history.push('/default');
    }
  }, [history]);
  return (
    <IonRouterOutlet>
      <Route path="/default" exact={true} component={Default} />
      <Route path="/home" exact={true} component={Home} />
      <Route path="/about" exact={true} component={About} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/loginTest" exact={true} component={LoginTest} />
      <Route path="/login1" exact={true} component={Login1} />
      <Route path="/loginTest1/:userName" exact={true} component={LoginTest1} />
      <Route path="/main" component={Main} />
      <Route path="/cartSearch" component={CartSearch} />

      <Route path="/registerPhone" exact={true} component={RegisterPhone} />
      <Route path="/registerPhone1" exact={true} component={RegisterPhone1} />
      <Route path="/registerPhoneSecond" exact={true} component={RegisterPhoneSecond} />
      <Route path="/registerPhoneSecondEnd" exact={true} component={RegisterPhoneSecondEnd} />

      <Route path="/registerEmail1" exact={true} component={RegisterEmail1} />
      <Route path="/registerEamilSecond" exact={true} component={RegisterEamilSecond} />
      <Route path="/registerEamilSecondEnd" exact={true} component={RegisterEamilSecondEnd} />
      <Route path="/registerSuccess" exact={true} component={RegisterSuccess} />
      
      <Route path="/region" exact={true} component={Region} />
      <Route path="/logo" exact={true} component={Logo} />
      <Route path="/transitions" exact={true} component={Transitions} />
      <Route path="/tcLogin" exact={true} component={TC}/>
      {/* <Redirect exact={true} from="/" to="/default" /> */}

    </IonRouterOutlet>
  );
};

export default App;
