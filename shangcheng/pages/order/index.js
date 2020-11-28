// pages/order/index.js
/* 
1 页面被打开的时候 onShow 
  0 onShow 不同于onLoad 无法在形参上接收 options参数 
  0.5 判断缓存中有没有token 
    1 没有 直接跳转到授权页面
    2 有 直接往下进行 
  1 获取url上的参数type
  2 根据type来决定页面标题的数组元素 哪个被激活选中 
  2 根据type 去发送请求获取订单数据
  3 渲染页面
2 点击不同的标题 重新发送请求来获取和渲染数据 
 */
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

    /**
     * 页面的初始数据
     */
    data: {

        tabs: [{
            id: 0,
            value: "全部",
            isActive: true,
        }, {
            id: 1,
            value: "待付款",
            isActive: false,
        }, {
            id: 2,
            value: "待发货",
            isActive: false,
        }, {
            id: 3,
            value: "退款/退货",
            isActive: false,
        }]

    },
    onShow(options) {
        let pages = getCurrentPages();
        let currentpage = pages[pages.length - 1].options;
        console.log(currentpage);
        const { type } = currentpage;
        this.getOrders(type);
        wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
        const token = wx.getStorageSync("token");
        Authorization: token;
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',
            });
            return;
        }
    }, // 获取订单列表的方法
    async getOrders(type) {

        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";
        const res = await request({ url: "/my/orders/all", data: { type } });
        console.log(res);
        // this.setData({
        //     orders: res.orders.map(v => ({...v, create_time_cn: (new Date(v.create_time * 1000).toLocaleString()) }))
        // })
    },


    handleTabsItemChange(e) {
        // 获取被点击的标题索引

        const { index } = e.detail;
        // 修改源数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        //  赋值到data中
        this.setData({
            tabs
        })
    },

})