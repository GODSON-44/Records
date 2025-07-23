
let cam = document.querySelector("#cam");
let stop = document.querySelector("#stop");
let settext = document.querySelector(".card-text");
let frame = document.querySelector("#image");
let qrframe = document.querySelector("#reader");
let purpose = document.querySelector("#prps");
let table = document.querySelector("#table");
let curr = 0;



let conth = qrframe.clientHeight;
let contw = qrframe.clientWidth;

let data;
async function onScanSuccess(decodedText, decodedResult) {
        const now = new Date();
        console.log("QR Code scanned: ", decodedText);
        data = decodedText.split(',');
        settext.innerText = data[0] + "-" + data[1];
        data.push(purpose.value);
        qrframe.before(frame);
        html5QrCode.stop();

        // let serial = document.querySelector("#curr");
        // let curr = serial.value;


        // Adding the data
        let html = `<tr id = "newrow"><th scope="row">${curr+1}</th><td >${data[0]}</td><td >${data[1]}</td><td>${data[2]}</td><td>${data[4]}</td><td>${now.toLocaleString()}</td></tr>`;
        table.innerHTML +=  html;
        curr++;


        purpose.value = "";
        await post(data);// called after stoping the scanner important
        await get();
      }

const html5QrCode = new Html5Qrcode("reader");// included by online server script...


cam.addEventListener("click", async ()=>{

    if(purpose.value == ""){
        alert("Enter purpose !");
        return;
    }

    await html5QrCode.start( // Calling the scanner
        { facingMode: "environment" }, // Rear camera
        { fps: 15, qrbox: 400},
        onScanSuccess
);
    
    frame.remove();

})

stop.addEventListener("click",()=>{
    html5QrCode.stop();
    qrframe.before(frame);
    
})
// console.log(data);