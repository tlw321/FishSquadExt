displayVisible = true;

window.onload = function() {
	console.log("hey");
};

function checkBoxChange()
{
	console.log("change");
	toggleVisibility();
}

function toggleVisibility()
{
	displayVisible = !displayVisible;	
	console.log(displayVisible)
}
