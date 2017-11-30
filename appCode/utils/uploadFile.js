
let defaultOptions = {
    url:'',
    method:'POST',
    headers:{
        'Content-Type': 'multipart/form-data'
    },
    body:null,
};


let  UploadFile=function(options){

	let opt = Object.assign({}, defaultOptions, options); //将默认的参数和传过来的合并在一起
    let sentData={
    	method:opt.method,
    	headers:opt.headers,
    	body:opt.body || ''
    };
   return new Promise((reslove,reject)=>{   
          
        fetch(opt.url, sentData)
        .then(response=> response.json())
        .then(responseText=>{
            let resp = typeof responseText === 'string' ? JSON.parse(responseText) : responseText;
            reslove(resp); //这个resp会被外部接收
        }).catch(err=>{
            reject(err);
        });
    })
    .catch(err => {

    });
}
export default UploadFile; 

