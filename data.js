// data.js
// 把软件列表放这儿：name, keywords (数组), icon (路径或 emoji), url, desc, size (可选)
const softwareData = [
  { id: "1",   name: "Visual Studio Code",   keywords: ["vs","vscode","代码"],        
    icon: "https://visualstudio.microsoft.com/wp-content/uploads/2022/09/VisualStudioCode.svg", 
    url: "https://code.visualstudio.com/sha/download?build=stable&os=win32-x64-user", 
    desc: "正式版 1.104.1", size: "直链下载 | 110 MB" },

  { id: "2",   name: "Visual Studio 2022",   keywords: ["vs","代码"],      
    icon: "https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg", 
    url: "https://c2rsetup.officeapps.live.com/c2r/downloadVS.aspx?sku=community&channel=Release&version=VS2022&source=VSLandingPage&cid=2030:f0b1e99ee92e49b1be16e10eecbc28c5", 
    desc: "正式版", size: "直链下载 | 4.3 MB" },

  { id: "3", name: "Blender", keywords: ["建模","编辑"],      
    icon: "https://ts3.tc.mm.bing.net/th/id/ODF.SedCFfOiDtpq6Mpo1vUcsw?w=32&h=32&qlt=90&pcl=fffffa&o=6&pid=1.2", 
    url: "https://www.blender.org/download/release/Blender4.5/blender-4.5.3-windows-x64.msi/", 
    desc: "正式版 4.5.3", size: "直链下载 | 344 MB" },

  { id: "4",  name: "OBS Studio",  keywords: ["直播","录屏","混流"],      
    icon: "https://obsproject.com/assets/images/new_icon_small-r.png", 
    url: "https://cdn-fastly.obsproject.com/downloads/OBS-Studio-31.1.2-Windows-x64-Installer.exe", 
    desc: "正式版 31.1.2", size: "直链下载 | 150 MB" },

  { id: "5",  name: "Radmin VPN",  keywords: ["VPN","梯子"],    
    icon: "https://ts1.tc.mm.bing.net/th/id/OIP-C.fV8arAjztV28ihYHi_y8xAAAAA?w=80&h=80&c=1&bgcl=b32611&r=0&o=7&dpr=1.3&pid=ImgRC&rm=3", 
    url: "https://radminvpn.org/wp-content/uploads/2024/11/Radmin_VPN_1.4.4642.1.zip", 
    desc: "正式版 1.4.4642.1", size: "123云盘 | 19.7 MB" },

  { id: "6",   name: "几何画板",   keywords: ["数学","破解"],      
    icon: "https://www1.shuwei-2.top/static/pictures/sp/1.png", 
    url: "https://wwue.lanzoub.com/itiSa0mv06vg", 
    desc: "破解版 4.06 ", size: "解压密码 fd7k | 蓝奏云 | 38.7 MB" },

  { id: "7", name: "BurpSuite", keywords: ["bp","抓包","BP","破解","汉化"],      
    icon: "https://ts4.tc.mm.bing.net/th/id/ODF.w6syz1CPF2VCh4dxMjonQg", 
    url: "https://www.123pan.com/s/F2W5Vv-Rk7Vv.html", 
    desc: "破解汉化版 2025.9.4 ", size: "解压密码 52pj | 123云盘 | 648.54 MB" },

  { id: "8", name: "Microsoft Office 2024", keywords: ["Office","微软"],    
    icon: "https://ts3.tc.mm.bing.net/th/id/ODF.Y77AUHJ37M167GfxiS3cyg", 
    url: "https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/zh-cn/ProPlus2024Retail.img", 
    desc: "专业增强版", size: "直链下载 | 5.3 GB" },

  { id: "9", name: "Microsoft Office 2021", keywords: ["Office","微软"],    
    icon: "https://ts3.tc.mm.bing.net/th/id/ODF.Y77AUHJ37M167GfxiS3cyg", 
    url: "https://link.zhihu.com/?target=https%3A//c2rsetup.officeapps.live.com/c2r/download.aspx%3FproductReleaseID%3DProPlus2021Retail%26platform%3DX64%26language%3Dzh-cn", 
    desc: "专业增强版", size: "直链下载 | 7.2 MB" },
    
  { id: "10", name: "Microsoft Office 365", keywords: ["Office","微软"],    
    icon: "https://ts4.tc.mm.bing.net/th/id/OIP-C.h4eY4PfPZ4cNifeQBvqm4gHaIJ", 
    url: "https://link.zhihu.com/?target=https%3A//c2rsetup.officeapps.live.com/c2r/download.aspx%3FproductReleaseID%3DO365ProPlusRetail%26platform%3DX64%26language%3Dzh-cn", 
    desc: "专业增强版", size: "直链下载 | 7.2 MB" },
    
  { id: "11", name: "DownKyi", keywords: ["bilibili","下载"],    
    icon: "https://img.3dmgame.com/uploads/images/thumbnews/20250521/1747814728_660381.png", 
    url: "https://down.wsyhn.com/23_353316", 
    desc: "正式版 1.6.1", size: "直链下载 | 31.59 MB" },
  
  { id: "12", name: "DiskGenius", keywords: ["磁盘","修复","恢复"],    
    icon: "https://ts4.tc.mm.bing.net/th/id/OSAAS.8A5498C4B8244AC74136A71E6E652FBC", 
    url: "https://wwve.lanzouo.com/iRP6R370krra", 
    desc: "破解版 6.0.0.1631", size: "解压密码 fd7k | 蓝奏云 | 29.6 MB" },
  
    { id: "13", name: "TranslucentTB", keywords: ["transTB","任务栏美化"],    
    icon: "https://ts4.tc.mm.bing.net/th/id/OIP-C.0GaqvX7uuUua8VmzSf1WygAAAA", 
    url: "https://down.wsyhn.com/23_258402", 
    desc: "开源", size: "直链下载 | 31.59 MB" },
    
    { id: "14", name: "Steam", keywords: ["steam","游戏"],    
    icon: "https://www.pinclipart.com/picdir/big/100-1003109_steam-clip-art.png", 
    url: "https://store.steampowered.com/about/", 
    desc: "正式版 版本号未知", size: "直链下载 | 文件大小未知" },
  
  { id: "15", name: "示例软件", keywords: ["浏览器","上网"],    
    icon: "pic/app8.png", 
    url: "https://example.com/download8", 
    desc: "开源", size: "48MB" },

  { id: "16", name: "示例软件", keywords: ["浏览器","上网"],    
    icon: "pic/app8.png", 
    url: "https://example.com/download8", 
    desc: "开源", size: "48MB" }
];
