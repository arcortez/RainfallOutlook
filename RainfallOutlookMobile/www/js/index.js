function openNav() {
    document.getElementById("mySidenav").style.left = "0";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeNav() {
    document.getElementById("mySidenav").style.left = "-1000";
    document.body.style.backgroundColor = "white";
}

function openPage(string){
    document.getElementById("maps").style.display = "none";
    document.getElementById("data").style.display = "none";
    document.getElementById("downloads").style.display = "none";
    document.getElementById("settings").style.display = "none";
    document.getElementById("arrowright").style.display = "none";
    document.getElementById("arrowleft").style.display = "none";
    document.getElementById("legend").style.display = "none";
    document.getElementById("floatingbtn").style.display = "none"
    document.getElementById("refresh").style.display = "none";
    document.getElementById("backtomaps").style.display = "none";

    if(string =='maps'){
        document.getElementById("maps").style.display = "block"; 
        document.getElementById("arrowright").style.display = "block";
        document.getElementById("arrowleft").style.display = "block";
        document.getElementById("floatingbtn").style.display = "block";
    }else if(string =='data'){
        document.getElementById("data").style.display = "block";
        document.getElementById("floatingbtn").style.display = "block";
        document.getElementById("refresh").style.display = "block";    
        document.getElementById("backtomaps").style.display = "block";    
    }else if(string =='downloads'){
        document.getElementById("downloads").style.display = "block";
    }else if(string =='settings'){
        document.getElementById("settings").style.display = "block";
    }
    closeNav();
}

function showLegend(bool){
    
    if(bool == 'true'){
        document.getElementById("legend").style.display = "block";
        console.log("show legend");
    }else{
        document.getElementById("legend").style.display = "none";
        console.log("hide legend");
    }
}