//             别间隔时间(毫秒), 识别服务地址, 认证token
const webAR = new WebAR(1000, 'https://cn1-crs.easyar.com:8443/search', 'mk5HpNPpTTs6/iL1RFiOeO2svsFEL86V7erut5HQolqVATfBntApxg6ktMeX3yX6sUqlf1g2Jh4ADNa1ruDFhA==');
// Threejs简单使用类
const threeHelper = new ThreeHelper();

//  页面打开时进行识别
function OpenCam()
{
    const videoSelect = document.querySelector('#videoDevice');
    webAR.listCamera(videoSelect)
        .then(msg => {
            // 隐藏"打开摄像头"按钮
            this.style.display = 'none';
            document.querySelector('#start').style.display = 'none';
            document.querySelector('#stop').style.display = 'none';
            videoSelect.style.display = 'none';
        })
        .catch(err => {
            // 没有找到摄像头
            console.info(err);
        });

    webAR.openCamera()
        .then(msg => {
            console.info(msg);
        }).catch(err => {
        console.info(err);
    });

    webAR.startRecognize((msg) => {
        console.info(msg);
        // 可以将 setting 作为meta上传到EasyAR的云识别，使用方法如下
        const setting = {
            model: 'asset/model/trex_v3.fbx',
            scale: 0.02,
            position: [0, 0, 0]
        };
        threeHelper.loadObject(setting);
    });
}

OpenCam();

//  刷新页面
function Refresh()
{
    window.location.reload();
}
