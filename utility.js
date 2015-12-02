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
	displayVisible = !displayVisibile;	
	console.log(displayVisible)
}