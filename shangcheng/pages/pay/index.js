import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
import { request } from "../../request/index.js";
Page({
    data: {
        address: {},
        cart: [],

        totalPrice: 0,
        totalNum: 0
    },
    onShow() {
        //   // 1 获取缓存中的收货地址信息
        const address = wx.getStorageSync("address");
        //   // 1 获取缓存中的购物车数据
        let cart = wx.getStorageSync("cart") || [];
        // 过滤后的购物车数组
        cart = cart.filter(v => v.checked);
        // every数组方法会遍历 会接受一个回调函数 那么 每一个回调函数都返回true 那么every方法的返回值为true
        // 只要有一个回调函数返回false 那么不再循环执行，直接返回false
        // 空数组 调用every 返回值就是true
        // const allChecked = cart.length ? cart.every(v => v.checked) : false;
        this.setData({ address });



        // 1 总价格 总数量
        let totalPrice = 0;
        let totalNum = 0;
        cart.forEach(v => {

            totalPrice += v.num * v.goods_price;
            totalNum += v.num;

        })

        this.setData({
            cart,
            totalPrice,
            totalNum,
            address
        });

    },
    async handleOrderPay() {
        //  判断缓存有没有token

        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";


        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index',

            });
            return;
        }

        // 3 创建订单
        // 3.1 准备 请求头参数
        // const header = { Authorization: token };
        // 3.2 准备 请求体参数
        const order_price = this.data.totalPrice;
        const consignee_addr = this.data.address.all;
        const cart = this.data.cart;
        let goods = [];
        cart.forEach(v => goods.push({
            goods_id: v.goods_id,
            goods_number: v.num,
            goods_price: v.goods_price
        }))
        const orderParams = { order_price, consignee_addr, goods };
        // 4 准备发送请求 创建订单 获取订单编号
        // const { order_number } = await request({ url: "/my/orders/create", method: "POST", data: orderParams });
        // 发起预支付接口
        // const { pay } = await request({ url: "/my/orders/req_unifiedorder", method: "POST", data: { order_number } });
        // 6 发起微信支付  这里有问题
        // const res = await requestPayment(pay);

        // 7 查询后台 订单状态
        // const res = await request({ url: "/my/orders/chkOrder", method: "POST", data: { order_number } });

        await showToast({ title: "支付成功" });
        // 8 手动删除缓存中 已经支付了的商品
        let newCart = wx.getStorageSync("cart");
        newCart = newCart.filter(v => !v.checked);
        wx.setStorageSync("cart", newCart);
        // 8 支付成功了 跳转到订单页面
        wx.navigateTo({
            url: '/pages/order/index'
        });

    }


})