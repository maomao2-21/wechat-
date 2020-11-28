import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime.js";
// pages/category/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        leftMenuList: [],
        rightContent: [],
        // 被点击左侧菜单
        currentIndex: 0,
        //  滚动条
        scrollTop: 0
    },
    Cates: [],

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

        // {time:Date.now()}判断本地存储有没有旧数据 没有发新请求 有同时没过期用本地存储
        // 1 获取本地存储中的数据
        const Cates = wx.getStorageSync("cates");
        // 2 判断
        if (!Cates) {
            // 不存在  发送请求获取数据
            this.getCates();
        } else {
            // 有旧的数据 定义过期时间  10s 改成 5分钟
            if (Date.now() - Cates.time > 1000 * 10) {
                // 重新发送请求
                this.getCates();
            } else {
                // 可以使用旧的数据
                this.Cates = Cates.data;
                let leftMenuList = this.Cates.map(v => v.cat_name);
                let rightContent = this.Cates[0].children;
                this.setData({
                    leftMenuList,
                    rightContent
                })
            }
        }




    },
    async getCates() {
        // request({
        //   url: "/categories"
        // })
        //   .then(res => {
        //     this.Cates = res.data.message;

        //     // 把接口的数据存入到本地存储中
        //     wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });


        //     // 构造左侧的大菜单数据
        //     let leftMenuList = this.Cates.map(v => v.cat_name);
        //     // 构造右侧的商品数据
        //     let rightContent = this.Cates[0].children;
        //     this.setData({
        //       leftMenuList,
        //       rightContent
        //     })
        //   })

        // 1 使用es7的async await来发送请求
        const res = await request({ url: "/categories" });
        // this.Cates = res.data.message;
        this.Cates = res;
        // 把接口的数据存入到本地存储中
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        // 构造左侧的大菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
            leftMenuList,
            rightContent
        })
    },
    handleItemTap(e) {

        const { index } = e.currentTarget.dataset;
        let rightContent = this.Cates[index].children;
        this.setData({
            currentIndex: index,
            rightContent,
            // 重新设置右侧内容的scroll- view标签距离
            scrollTop: 0
        })


    }
})