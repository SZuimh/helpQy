

let defaultOptions = {
    url:'',
    method:'POST',
    headers:{
        'Accept':'application/json',
		'Content-Type':'application/json',
    },
    body:null,
};


let  fetchTool=function(options){
	let opt = Object.assign({}, defaultOptions, options); //将默认的参数和传过来的合并在一起
    let sentData={
        credentials:"include",
    	method:opt.method,
    	headers:opt.headers,
    	body:opt.body || ''
    };
    //console.log(sentData);
   return new Promise((reslove,reject)=>{   
        fetch(opt.url, sentData)
        .then(response=> response.json())
        .then(responseText=>{  
            let resp = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
            reslove(resp); //这个resp会被外部接收
        }).catch(err=>{        

            reject(err);
        });
    }).catch(err => {
    });
}
export default fetchTool; 

