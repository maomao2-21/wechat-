// pages/auth/index.js
import { login } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { request } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 获取用户信息
    async handleGetUserInfo(e) {
        const { encryptedData, rawData, iv, signature } = e.detail;
        // 2 获取小程序登录成功后的code
        const { code } = await login();

        const loginParams = { encryptedData, rawData, iv, signature, code };
        // //  3 发送请求 获取用户的token
        const res = await request({ url: "/users/wxlogin", data: loginParams, method: "post" });
       

    }
})