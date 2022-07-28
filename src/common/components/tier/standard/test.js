function some(){
    return new Promise((res,rej)=>{
        setTimeout(() => {
                console.log("1ck")
                setTimeout(() => {
                    console.log("2ck")
                }, 3000);
        }, 3000);
    })
}


function test(){
    console.log("실행")
    some().then(e=>{
        console.log('완',e)
    })
}

test()