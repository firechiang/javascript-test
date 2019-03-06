##### Document操作
```bash
let flgmntNode = document.createDocumentFragment();          # 创建虚拟节点 <为 group 节点>

document.createElement("span");                              # 创建节点

flgmntNode.appendChild(spanNode);                            # 虚拟节点装配子节点

el.appendChild(flgmntNode);                                  # 添加子节点

document.getElementsByTagName('span')                        # 获取 DOM节点为 span 的元素

document.getElementsByClassName('.name')                     # 获取class = name 的DOM节点 

document.getElementById('id').getElementsByTagName('span')   # 获取 id 为 id 元素 下的  span 元素

document.addEventListener('DOMContentLoaded',function(){});  # 代替$.ready();

document.onreadystatechange = function(){                    # 代替$.ready();      
    if(document.readyState === 'complete'){
        console.info('DOM加载完成');
    }
}

document.querySelector('.name')                              # 获取 class = name DOM 节点 -----也可  <#id> <div>  像 jquery 一样用法

document.querySelectorAll('.name')                           # 获取 所有的 class = name 的 DOM 节点  -----也可  <#id> <div>  像 jquery 一样用法

var dom;  

dom.getAttribute("id");                                      # 获取节点属性的值《如id，src  等等》

dom.setAttribute("id",122);                                  # 设置节点属性的值《如id，src  等等》
 
dom.removeAttribute("id"）                                                                                              # 删除节点属性《如id，src  等等》

dom.addEventListener('click',function(){});                  # 为dom绑定 click 事件  <用法不需要加  on >

dom.removeEventListener('click');                            # 移除dom click事件

dom.attachEvent( 'click')                                    # 为dom绑定 click 事件,针对IE

dom.detachEvent( 'click')                                    # 移除dom click事件,针对IE

dom.onclick = function(){}                                   # 为dom绑定 click 事件

dom.removeEventListener('click',function(){});               # 为dom移除 click 事件   

dom.replaceChild(newli,oldli);                               # 替换dom                           

dom.classList.add('name');                                   # 为dom添加 一个 class 名称为 name

dom.className += 'name'                                      # 为dom添加 一个 class 名称为 name

dom.classList.remove('name')                                 # 为dom移除 一个 class 名称为 name

dom.className = dom.className.replace(/\bname\b/gi,'')       # 为dom移除 一个 class 名称为 name

dom.className.search(/\bname\b/gi) !== -1                    # 该DOM节点  是不是 包含 名称为 name 的 class  
dom.className.indexOf("name")      !== -1                    # 该DOM节点  是不是 包含 名称为 name 的 class  
dom.classList.contains('name')                               # 该DOM节点  是不是 包含 名称为 name 的 class 

dom.classList.toggle('hidden')                               # 翻转某个类名，没用过 不知效果 怎样？

dom.textContent                                              # 获取元素 text  值  如：jquery text()方法

dom.innerHtml                                                # 获取元素 的 html

dom.hidden                                                   # 隐藏元素

dom.body                                                     # 获取 body

dom.style.display = ''                                       # 显示元素  <当style不为空时，可用>《为空时这样写，dom.style ="display:none" 》

dom.style.display = 'none'                                   # 隐藏元素   <当style不为空时，可用>《为空时这样写，dom.style ="display:none" 》

dom.style.background = 'red'                                 # 为元素 添加 css  <当style不为空时，可用>《为空时这样写，dom.style ="display:none" 》

dom.currentStyle.width                                       # 获取css 或者class 的width   IE8用

window.getComputedStyle(dom,false).width;                    # 获取css 或者class 的width   其他浏览器用 

dom.childNodes                                               # 获取子节点

Object.hasOwnProperty("name")                                # 某个对象里面是否包含某个属性
```

##### 遍历集合
```bash
var array = ['qwwe','www','www'];

array.forEach(function(entry){});                            # 遍历集合

var map = array.map(function(entry){                         # 好像是 <没用过> 将数组 转  map 对象

    return array.concat("jian");
});
```

##### Ajax  传统写法
```bash
var request = new XMLHttpRequest();

request.onLoad = function(){                                 # ajax成功回调
    console.info(this.responseText);                         # ajax返回值

};
request.onerror = function(err){                             # ajax报错回调   
    console.info('报错');
}
request.open('get','index.json',true);                       # 打开ajax请求
request.send();                                              # 发送请求
```

##### ajax Fetch基础写法
```bash
fetch('index.json').then(function(response){                 # ajax成功回调
    if(response.status != 200){
        console.info('状态码：'+response.status);
        return;
    }
    response.json.then(function(data){
        console.info('ajax返回值：'+data);
    });
}).catch(function(err){                                      # ajax错误回调
    console.info('报错');
});
```

##### ajax Fetch封装写法
```bash
function status(response){                                   # 校验调用是否成功
    var code = response.status;
    if(code >= 200 && code < 300){
        return Promise.resolve(response);
    }else{
        return Promose.reject(new Error(response.responseText));
    }
}

function json (response){                                    # 将ajax返回数据转成 json
    response.json();
}

fetch('url').then(status).then(json).then(function(data){
    console.info('返回值'+data);
}).catch(function(err){
    console.info('报错');
});
```

##### ajax Fetch全面写法
```bash
fetch('url',{
    method:'post',                                                                     # 请求方式
    headers:{'Content-type':'application/x-www-form-urlencoded;charset=utf-8'},        # 请求头信息
    body:'name=jiang&id=1',                                                            # 请求 体 信息  就是参数
    credentials:''                                                                     # 携带一些类似  cookies  之类的 凭证信息
}).then(status).then(json).then(function(data){                                        # 这里调用了  两个  校验函数   定义在上面
    console.info('数据'+data);
}).catch(function(err){
    console.info('报错');
});
```

##### 预览本地图片
```bash
$("#fileupload").unbind().bind("change",function(){
    var file = this.files[0] || null;
	console.info(file);
	if(file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e){
            $("#fileuploadImg").attr("src",this.result);
        }
    }
});
```

##### Base64加解密
```bash
window.btoa("test");                                                                   # 加密                                                                                                                                                                            
window.atob("dGVzdA==");                                                               # 解密

var str = "China，中国";
window.btoa(window.encodeURIComponent(str))

window.decodeURIComponent(window.atob('Q2hpbmElRUYlQkMlOEMlRTQlQjglQUQlRTUlOUIlQkQ='))
```

##### 正则表达式记录
```bash
//获取域名
var durl=/(http:\/\/[^\/]+\/)/i;
var domain = manageUrl.match(durl)[1];
//开头
if (!/(https|http)?:\/\//.test(img)) {}
```

##### setInterval 和 setTimeout 区别
```bash
相同点：当代码执行到,定时函数<setInterval或setTimeout>时，会在当前代码执行栈，以外为定时函数创建独立的代码执行栈，并在其内创建一个执行队列。
不同点：setTimeout：在指定延时后，会往执行队列里面加入回调函数，且只加入一次<就是只调用一次>
                   <注：每次调用setTimeout都会往队列里面加入回调，如果队列里面有，未执行完成的回调，需等待执行完成才执行下一个回调>
       setInterval：在间隔延迟时间后，不断的往队列里面加入回调，<如果上一个回调还未执行完成，将不会加入回调>
总结：setTimeout只执行一次；setInterval 循环执行。
```

##### js视频流采集几个重要的API
```bash
https://addpipe.com/blog/mediarecorder-api/                                    # 列子
https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia        # navigator的getUserMedia
https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API     # MediaRecorder
https://developer.mozilla.org/en-US/docs/Web/API/FileReader                    # FileReader
https://developer.mozilla.org/en-US/docs/Web/API/Blob                          # Blob
```

