fish = {} //Fish namespace
fish.selected = null;
fish.x_pos = 0;
fish.y_pos = 0;
fish.x_elem = 0;
fish.y_elem = 0;


function checkBoxChange()
{
	console.log("change");
	//toggleVisibility();
}

function toggleVisibility()
{
	var fish_watermark = document.getElementById("fish-watermark");
	fish_watermark.style.visibility = document.getElementsByName("displayFishCheck")[0].checked;
}

function parseCoordinate(coordinate_string)
{
    return coordinate_string.replace("(","").replace(")","").split(",");
}

function loadCoordinates(coordinate)
{
    var wm_cookie = getCookie("watermark_coordinates");

    if(wm_cookie.length < 1)
    {
	switch(coordinate)
	{
	    case "x":
	    return "85%";

	    case "y":
	    return "15%";
	}
    }

    else
    {
	switch(coordinate)
	{
	    case "x":
	    return parseCoordinate(wm_cookie)[0];

	    case "y":
	    return parseCoordinate(wm_cookie)[1];
	}
    }
}

function addWaterMark()
{
    var waterMark = document.createElement("div");
    
    waterMark.style.width = "150px";
    waterMark.style.height = "108px";
    waterMark.style.position = "fixed";
    waterMark.style.left = loadCoordinates("x");"85%";
    waterMark.style.top = loadCoordinates("y");"15%";
    waterMark.style.backgroundImage = "url('https://drive.google.com/uc?export=view&id=0B_LWN32gPlSXZ0tPelVXbXJ4cXc')";
    waterMark.style.backgroundColor = "blue";
    waterMark.style.backgroundSize = "contain";
    waterMark.style.zIndex = "9999";
    waterMark.id = "fish-watermark";
    
    var removeButton = document.createElement("div");
    removeButton.style.width = "15%";
    removeButton.style.height = "15%";
    removeButton.innerHTML = "X";
    removeButton.id = "watermarkRemoveButton";
    removeButton.style.visibility = "hidden";
    removeButton.style.color = "white";
    
    waterMark.onmousedown = function()
    {
	drag_init(this);
	return false;
    }

    waterMark.onmouseover = function()
    {
	//Display remove button
	this.childNodes[0].style.visibility = "visible";
    }

    waterMark.onmouseleave = function()
    {
	//Hide remove button
	this.childNodes[0].style.visibility = "hidden";
    }

    removeButton.onclick = function()
    {
	this.parentNode.style.display = "none";
	setCookie("watermark_visibility", "hidden", 365);
    }
    
    //Store the coordinates as a cookie
    storeCoordinates(waterMark.style.left, waterMark.style.top);

    //Append removeButton to watermark
    waterMark.appendChild(removeButton);

    //Add watermark to fish namespace
    fish.waterMark = waterMark;
    
    var theBody = document.getElementsByTagName("body")[0];
    theBody.appendChild(waterMark);
}


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
	var c = ca[i];
	while (c.charAt(0)==' ') c = c.substring(1);
	if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

function storeCoordinates(x, y)
{
    var coord_string = "(" + x.toString() + "," + y.toString() + ")";
    fish.current_coordinates = coord_string;
    
    setCookie("watermark_coordinates", coord_string, 365);
    console.log(fish.current_coordinates);
}

function drag_init(elem)
{
    fish.selected = elem;
    fish.x_elem = fish.x_pos - fish.selected.offsetLeft;
    fish.y_elem = fish.y_pos - fish.selected.offsetTop;
}


function move_elem(e)
{
    fish.x_pos = document.all ? window.event.clientX : e.pageX;
    fish.y_pos = document.all ? window.event.clientY : e.pageY;

    if (fish.selected !== null)
    {
	fish.selected.style.left = (fish.x_pos - fish.x_elem) + 'px';
	fish.selected.style.top = (fish.y_pos - fish.y_elem) + 'px';
    }
}

function drop()
{
    if(fish.selected !== null)
    {
	storeCoordinates(fish.selected.style.left, fish.selected.style.top);
	fish.selected = null;
    }
}

function parseCoordinates()
{
    
}

addWaterMark();
document.onmousemove = move_elem;
document.onmouseup = drop;

