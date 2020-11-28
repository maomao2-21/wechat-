// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onShow() {
        const userinfo = wx.getStorageSync("userinfo");
        const collect = wx.getStorageSync("collect") || [];

        this.setData({ userinfo, collectNums: collect.length });

    }
})