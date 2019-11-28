function worldclockgetapi(clockapiurl='http://worldclockapi.com/api/json/utc/now'){
    let clockdata;
    const clockapireq=new XMLHttpRequest();
    clockapireq.onreadystatechange=function(){
        if(this.readyState==4 && this.status==200) {
            clockdata=JSON.parse(this.responseText);
        }
    }
    clockapireq.open("GET", clockapiurl, true);
    clockapireq.send();
    return clockdata;
}
var apiclockdata=worldclockgetapi();

function worldclock(clockdata=apiclockdata){
    let time_zone;
    let city;
    const timezonecities=['london']

    for(let k=0; k<timezonecities.length; k++) {
        switch (timezonecities[k]) {
            case "london":
            case "gmt":
                time_zone="Etc/GMT";
            break;
            case "tehran":
                time_zone="Asia/Tehran";
            break;
            case "dubai":
                time_zone="Asia/Dubai";
            break;
            case "newyork":
                time_zone="America/New_York";
            break;
            case "istanbul":
                time_zone="Europe/Istanbul";
            break;
            default:
                time_zone="";
        }
        city=timezonecities[k];
        const clocksecondshandle=document.querySelector("#"+city+"-clock .svg-clock-seconds");
        const clockminuteshandle=document.querySelector("#"+city+"-clock .svg-clock-minutes");
        const clockhourshandle=document.querySelector("#"+city+"-clock .svg-clock-hours");
        let today=(clockdata!=undefined) ? new Date(clockdata) : new Date();
        let todayutc=new Date(today.toLocaleString('en-US', {timeZone: time_zone}));
        let timediffer=today.getTime()-todayutc.getTime();
        today.setTime(today.getTime()-timediffer);//gmt
        setInterval(function(){
            today.setTime(today.getTime()+1000);

            minutes=today.getMinutes();
            hours=today.getHours();
            seconds=today.getSeconds();
            clockhourshandle.style.transform="rotate("+(hours+minutes/60)*360/12+"deg)" ;
            clockminuteshandle.style.transform="rotate("+(minutes+seconds/60)*360/60+"deg)" ;
            clocksecondshandle.style.transform="rotate("+seconds*360/60+"deg)" ;
        },1000);
      }
}
