var currentPage = 'home';

function openNav() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById("menuOpen").style.display = "none";
    document.getElementById("menuClose").style.display = "block";
    document.getElementById("headlogo").style.visibility = "hidden";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
    document.getElementById("menuOpen").style.display = "block";
    document.getElementById("menuClose").style.display = "none";
    document.getElementById("headlogo").style.visibility = "visible";
    closeTip();
}

function openTip(){
    document.getElementById("tiptag").style.display = "none";
    document.getElementById("agritips").style.display = "block";
}

function closeTip(){
    document.getElementById("tiptag").style.display = "block";
    document.getElementById("agritips").style.display = "none";   
}

function openPage(string){
    document.getElementById("scheme").style.display = "none";
    document.getElementById("home").style.display = "none";
    document.getElementById("data").style.display = "none";
    document.getElementById("downloads").style.display = "none";
    document.getElementById("settings").style.display = "none";

    if(string =='home'){
        document.getElementById("home").style.display = "block"; 
        currentPage = 'home';
    }else if(string =='maps'){
        document.getElementById("maps").style.display = "block"; 
        currentPage = 'maps';
    }else if(string =='data'){
        document.getElementById("data").style.display = "block";
        currentPage = 'data';
    }else if(string =='downloads'){
        document.getElementById("downloads").style.display = "block";
        currentPage = 'downloads';
    }else if(string =='settings'){
        document.getElementById("settings").style.display = "block";
        currentPage = 'settings';
    }
    closeNav();
}

document.getElementById('displays').provinceSelect.onchange = changeP;

function changeP(){
    var changeID = document.getElementById('displays').provinceSelect.value;
    var loaded = angular.element(document.getElementById("fullscale")).scope();
    //trigger angular function in controller.js
    loaded.$apply(function(){
        loaded.changeCurrentProvince(changeID);
    })
}


document.getElementById('displays').muniSelect.onchange = changeM;

function changeM(){
    var changeID = document.getElementById('displays').muniSelect.value;
    var loaded = angular.element(document.getElementById("fullscale")).scope();

    //trigger angular function in controller.js
    loaded.$apply(function(){
        loaded.changeDisplayArr(changeID);
    })
}


function selectScheme(){
    document.getElementById('notices').innerHTML = "Loading... Please Wait. This might take a bit."
    d3.csv("data/Forecast.csv", parseData);
    d3.json("data/Provinces.json", drawMaps);
    document.getElementById('menuOpen').style.display = 'block'; 
    document.getElementById('main').style.display = 'block';
    document.getElementById('page-header').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    openPage('home');
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    
}

function onBackKeyDown(e) {
    e.preventDefault();
    closeNav();
    if(currentPage != 'home'){
        openPage('home')
    }else{
        var conf = confirm("Would you like to exit the app?");
        if(conf == true){
            App.exitApp();
        }else{
            //do nothing
        }
    }
}



function setM(val){
    document.getElementById('displays').muniSelect.value = val.id;
    changeM();
}

function setP(){
    document.getElementById('displays').pkey.value
    document.getElementById('displays').provinceSelect.value = val.id;
    changeP();
}