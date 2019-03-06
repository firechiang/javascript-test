document.onreadystatechange = function(){  
    if(document.readyState === 'complete'){
        console.info('DOM加载完成');
    }
}