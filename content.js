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

function addWaterMark()
{
    var waterMark = document.createElement("div");

    waterMark.style.width = "150px";
    waterMark.style.height = "108px";
    waterMark.style.position = "fixed";
    waterMark.style.left = "85%";
    waterMark.style.top = "15%";
    waterMark.style.backgroundImage = "url('http://timwilliams.my.to/assets/fishsquad.png')";
    waterMark.style.backgroundColor = "blue";
    waterMark.style.backgroundSize = "contain";
    waterMark.style.zIndex = "9999";
    waterMark.id = "fish-watermark";
    waterMark.style.visibility = "true";
    var theBody = document.getElementsByTagName("body")[0];
    theBody.appendChild(waterMark);
	
	document.getElementsByName("displayFishCheck")[0].checked = waterMark.style.visibility;
}

addWaterMark();


