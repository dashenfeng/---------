const backgroundAudioManager = wx.getBackgroundAudioManager()
// index.js
Page({
    data: {
        isMe: true,
        btnEnable: false,
        toName: "W",
        mainText: '能和你见证这浩瀚的星空，是我的荣幸',
        userInfo: {
            avatar: '',
            nickName: '',
            isAvatar: false
        },
        isPlay:true,
    },
    // 挂载
    onLoad(option) {
        // music
        backgroundAudioManager.title = '相亲相爱';
        backgroundAudioManager.epname = '相亲相爱';
        backgroundAudioManager.singer = '群星';
        backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000';
        // 设置了 src 之后会自动播放
        backgroundAudioManager.src = 'https://dl.stream.qqmusic.qq.com/C400003MWaX93bRaxK.m4a?guid=7859761639&vkey=F313E19535C4080657FF996470E8F798973AB94FC26E017F881ECFBD1CD454EB2B405DFE97A704DB710F36D941227FB88555581D80A39961&uin=892726098&fromtag=120032';
        backgroundAudioManager.onPlay(() => {
            //   console.log("音乐播放开始");
          })
        backgroundAudioManager.onEnded(() => {
            //   console.log("音乐播放结束");
          })
        // 携带一些参数
        // console.log(option, 'option');
        const { toName, mainText, receiver, input, nickName, avatar } = option
        // console.log(avatar, 'avatar');
        this.setData({
            toName: toName || this.data.toName,
            mainText: mainText || this.data.mainText,
            isMe: receiver !== '1',
            btnEnable: input === "0",
            userInfo: {
                ...this.data.userInfo,
                nickName: nickName || '',
                avatar: avatar || ''
            }
        })
    },
    // 取得页面最新的输入值
    toNameInput(e) {
        const { value } = e.detail
        console.log(e.detail, 'detail');
        this.setData({
            toName: value,
        })
    },
    mainTextInput(e) {
        const { value } = e.detail
        this.setData({
            mainText: value,
        })
    },
    onShareAppMessage() {
        const { toName, mainText, userInfo: { avatar, nickName } } = this.data
        console.log(avatar, nickName, '打印打印打印');
        return {
            title: 'www',
            path: `pages/index/index?toName=${toName}&mainText=${mainText}&nickName=${nickName}&avatar=${avatar}&receiver=1&input=0`,
        }
    },
    // 输入昵称
    onInput(e) {
        const { value } = e.detail
        this.setData({
            ['userInfo.nickName']: value
        })
    },
    // 选择头像
    onChooseAvatar(e) {
        console.log('选择头像', e);
        const { avatarUrl } = e.detail
        this.setData({
            ['userInfo.avatar']: avatarUrl,
            ['userInfo.isAvatar']: true
        })
    },
    // 音乐控制
    musicControl() {
        if (this.data.isPlay) {
            backgroundAudioManager.pause();
            this.setData({isPlay:false})
        }else{
            backgroundAudioManager.play();
            this.setData({isPlay:true})
        }
    }
})
