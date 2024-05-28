import { IonIcon, IonInput, IonItem } from "@ionic/react";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import axios from "axios";
import { Buffer } from "buffer";
import { eyeOffOutline, eyeOutline } from "ionicons/icons";
import JSEncrypt from "jsencrypt";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../../css/login.css";
import alter from "../../images/alter.png";
import loading from "../../images/loading.gif";
import title from "../../images/title.png";
import TwoFactorAuth from "./TwoFactorAuth";

const Login1: React.FC = () => {
    const history = useHistory();
    const { userName: username } = useParams<{ userName: string }>();

    const [password, setPassword] = useState(""); //密码
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 控制加载动画显示与隐藏
    const [isEmptyPassword, setIsEmptyPassword] = useState(false); //密码是否为空
    const [isInvalidPassword, setIsInvalidPassword] = useState(false); //密码是否规范
    const [showTimeoutMessage, setShowTimeoutMessage] = useState(false); //连接是否超时
    // const [showTwoFactorAuth] = useState(false); // 控制是否显示二次验证页面
    const [showTwoFactorAuth, setShowTwoFactorAuth] = useState(false); // 控制是否显示二次验证页面
    const [verificationSuccess, setVerificationSuccess] = useState(false); // 控制二次验证是否成功

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsInvalidPassword(false);
        setShowTimeoutMessage(false);

        if (password.trim() === "") {
            setIsEmptyPassword(true);
            return;
        } else {
            setIsEmptyPassword(false);
            setPassword(password.trim());
            if (!isValidPassword(password.trim())) {
                setIsInvalidPassword(true);
                return;
            } else {
                try {
                    // const response = await axios
                    //     .post("https://kocu.cswallet.co/api/auth/login", {
                    //         username: username,
                    //         password: password,
                    //     })
                    //     .then((res) => {
                    //         console.log(res);
                    //         const data = res.data.data;
                    //         console.log("data: ", data);
                    //         const publicKey = `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAxgM2PY7ZxbV6NCl1RyhypAJc6IeygCCtXKMvLWsS+Y/dO6+XjiPRKcu7TkLa5OSwmLFoWKLbF66w44sxcAtNSi/lR3P7TqjuB+fyFjbrBnO/XvA0K2znpj5O0eT2jgVPddBngE7k38SFrn/0oWCF/yQMNmbLC7hYQ5W5IAZmJrpgrGwz1kYY7NRQhZyjgmjTQ19mJ3tCYynYVle8/GL/zFSdVLlZP45otWCbYCHE6XqAHO6eYNQwW7CS/1Tks14JBp9prAjIxR0SHeh+qSc6+JSBKTnOifAzYFeiBkYu6uvM+VITY/xL0asdzWnxz+DbJi1VVN6J9XP3NBgJCw3gqBxh58QG8ksqs+bg18fat/B5c2k2Q13vInXFLNCn50/oZeqiyE/rN0CmOyP76HZnMsRyGq7IY+eL35p8ZrbFxQ2gGtU80h30wpEXKuCh750ESIlu+Rsl2F4sMdzvORnvMIS9IkB4qtYJx+c8V/hYHHuhamTx2AeR4wqrFddFZ2WRmDyONFjki+D7025GyNBBHYKTzyC8rnGHhlH6WwbDdFwGAP24C1Qn8fgEkFUd7ytZykhonD1HtobQqqbFdsgRU8V46vDgDtgAtnCnHO/ASJ4oyw6nKhD5Y9N3jiYlVplRAGA737T7kiR9xsngM89YFRdumG8nhoOjN3D5UrZEL0cCAwEAAQ==`;
                    //         const privateKey = `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`;
                    //         console.log("publicKey: ", publicKey);
                    //         console.log("privateKey: ", privateKey);

                    //         const decrypt = new JSEncrypt();
                    //         decrypt.setPrivateKey(privateKey);
                    //         // base64 decode data with public key algorithm UlNB
                    //         const base64Data = Buffer.from(data, "base64").toString("utf-8");
                    //         console.log("base64Data: ", base64Data);
                    //         // decrypt data with private key
                    //         const decryptedData = decrypt.decrypt(base64Data);

                    //         console.log("decryptedData: ", decryptedData);
                    //     })
                    //     .catch((err) => {
                    //         // 400 Bad Request is returned when the username or password is incorrect
                    //         console.log(err);
                    //     });

                    setIsInvalidPassword(false);
                    setIsLoading(true); // 提交表单时显示加载动画
                    setTimeout(() => {
                        setIsLoading(false); // 加载完成后隐藏加载动画
                        const user = { id: 123, name: username, email: "shdfodfs@gamil.com", vipCard: "690224056-402592", gender: "female" };
                        localStorage.setItem("user", JSON.stringify(user));
                        history.push("/main");
                        // setShowTwoFactorAuth(true);
                    }, 1500);
                } catch (error) {
                    console.log("error" + error);
                    setIsInvalidPassword(true);
                }
            }
        }
    };
    //判断密码是否正确（查找邮箱用户对比密码api）
    const isValidPassword = (password: string) => {
        // 这里可以根据您的密码规范来编写验证逻辑，以下是一个示例
        return password.length >= 6;
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    // 二次验证通过后的操作
    const handleVerificationSuccess = () => {
        console.log("二次验证成功，执行相应操作");
        setVerificationSuccess(true); // 设置二次验证成功状态为 true

        // 示例：假设验证通过后跳转到主页面
        history.push("/main");
    };
    //返回按钮
    const handleBackClick = () => {
        history.goBack();
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <AppBar position="fixed" sx={{ backgroundColor: "white", boxShadow: "none" }}>
                <Toolbar>
                    <IconButton size="large" edge="start" aria-label="menu" sx={{ mr: 2 }} onClick={handleBackClick}>
                        <ArrowBackIosOutlinedIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1, textAlign: "center", position: "relative", left: "-1.5rem" }}>
                        <Typography variant="h6" component="div" sx={{ color: "black" }}>
                            <img src={title} className="w-6 h-6 inline-block mr-2 mb-1" alt="Logo" />
                            44 GUM
                        </Typography>
                    </Box>
                    <div /> {/* 添加弹性空间 */}
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    overflowY: "auto", // 允许内容区域垂直滚动
                    height: "calc(100vh - 128px)", // 减去 AppBar 的高度
                }}
            >
                <Toolbar />
                <div className="mt-14">
                    <p className="text-center text-2xl font-bold">Login</p>
                    <div className="flex items-center justify-center mt-4">
                        {isLoading && <img src={loading} className="w-8 h-8" alt="Loading Indicator" />} {/* 加载动画 */}
                    </div>

                    <div className="pl-14 pr-4 mt-8">
                        <p>在这里输入你的账户密码</p>
                        <form onSubmit={onSubmit} className="mt-3">
                            <div className="flex flex-row items-center">
                                <IonItem className={`basis-11/12 rounded-xl  border-2 border-gray-400 text-gray-500`} lines="none">
                                    <IonInput type="text" placeholder="@gmail.com" value={username} disabled></IonInput>
                                    {/* <input type={showPassword ? 'text' : 'password'} className='h-full w-full border-0' placeholder='Password' value={password}></input> */}
                                </IonItem>
                            </div>
                            <div className="flex flex-row items-center mt-5">
                                <IonItem
                                    className={`basis-11/12 rounded-xl border-2 ${
                                        isEmptyPassword
                                            ? "border-red-500"
                                            : isInvalidPassword
                                            ? "border-red-500"
                                            : showTimeoutMessage
                                            ? "border-red-500"
                                            : "border-gray-400"
                                    } text-gray-500`}
                                    no-lines
                                    lines="none"
                                    no-border
                                >
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="h-full w-full border-0"
                                        placeholder="Password"
                                        value={password}
                                        onChange={handlePasswordChange}
                                    ></input>
                                    <button
                                        className="eye-button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowPassword(!showPassword);
                                        }}
                                    >
                                        <IonIcon icon={showPassword ? eyeOutline : eyeOffOutline} className="w-7 h-7" />
                                    </button>
                                </IonItem>
                                {(isEmptyPassword || isInvalidPassword || showTimeoutMessage) && (
                                    <img src={alter} className="w-6 h-6 ml-2" alt="Warning Icon" />
                                )}
                            </div>
                            {isEmptyPassword && <p className="text-red-500 mt-2 text-[10px]">请输入密码</p>}
                            {isInvalidPassword && <p className="text-red-500 mt-2 text-[10px]">用户名或密码有误</p>}
                            {showTimeoutMessage && <p className="text-red-500 mt-2 text-[10px]">連接超時,請檢查是否帶有VPN的應用在後台運行 錯誤:x10254</p>}
                            {(isEmptyPassword || isInvalidPassword || showTimeoutMessage) && (
                                <p className="text-[#0047FF80] text-center text-[11px] mt-12 pr-10 underline">忘記了使用哪個郵箱註冊的賬號？ 需要幫助</p>
                            )}
                            <div className="flex flex-col items-center mt-5 h-14 pr-10">
                                <button type="submit" className="bg-[#FF9292] hover:bg-[#f46c6c] w-[70%] h-[80%] text-white text-lg rounded-full mb-3">
                                    登录
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* 如果需要二次验证，则显示半透明遮罩和二次验证页面 */}
                    {showTwoFactorAuth && !verificationSuccess && (
                        <div
                            style={{
                                position: "absolute",
                                top: 180,
                                left: 0,
                                width: "100%",
                                height: "50%",
                                backgroundColor: "rgba(0, 0, 0, 0.9)", // 半透明黑色背景
                                zIndex: 9999, // 确保在登录页面上方显示
                            }}
                        >
                            <TwoFactorAuth onVerificationSuccess={handleVerificationSuccess} />
                        </div>
                    )}
                </div>
            </Box>
        </Box>
    );
};

export default Login1;
