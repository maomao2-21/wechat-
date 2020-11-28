// 同时发送异步代码的次数
let ajaxTime = 0;

export const request = (params) => {
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header = {...params.header };
    if (params.url.includes("/my/")) {
        // 拼接header 带上token
        const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo";

        header["Authorization"] = wx.getStorageSync("token");
    }

    // 定义公共的URL
    ajaxTime++;
    wx.showLoading({
        title: '加载中',
        mask: true
    })


    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => { reject(err) },
            complete: () => {
                ajaxTime--;
                if (ajaxTime === 0) {
                    //   关闭正在等待的图标
                    wx.hideLoading();
                }

            }
        })
    })
}