

let get = async()=>{
    let prom = await fetch("http://localhost:4000");
    // let data = promis.json();
    console.log(prom);
    let data = await prom.json();
    console.log(data);
}

let post = async(sqldata)=>{ // This functio is called in script.js
    let prom = await fetch("http://localhost:4000/post",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(sqldata)
    });// end for fetch with post request

    let response = prom.json();
    console.log(response);
}

// console.log(post());
