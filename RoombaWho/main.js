const fs = require('fs');
const testFile = '/Users/adbarlow/Projects/Tray/RoombaWho/input.txt';
fs.readFile(testFile, 'UTF-8', (err, data) => {
	if (err) {
		throw err;
	}
	//split the text file into an array
	var filedata = data.split('\n');

	//build out the plots of dirt
	var dirtyPatches = [];
	var dirtyCount = 0;
	for (let index = 1; index < filedata.length - 1; index++) {
		var dirtPatch = {};
		dirtPatch.x = filedata[index].split(' ')[0];
		dirtPatch.y = filedata[index].split(' ')[1];
		dirtPatch.isDirty = true;
		dirtyPatches.push(dirtPatch);
	}

	//Identify Room Dimentions
	//Identify current/starting location
	var roomDimentionsX = filedata[0].split(' ')[0];
	var roomDimentionsY = filedata[0].split(' ')[1];
	var currentX = filedata[1].split(' ')[0];
	var currentY = filedata[1].split(' ')[1];

	//split the last line of the .text file into its own array
	var navigation = filedata[filedata.length - 1].split('');

	//itterate over the navigation array
	//plot how navagation items move the hoover
	//**N and S plot Y axis / E and W plot x axis */
	//inside loop, make sure current posstion does not go outside bounds of room
	navigation.forEach(function(item, index, array) {
		if (item == 'N') {
			if (!currentY++ > roomDimentionsY) {
				currentY++;
			}
		} else if (item == 'S') {
			if (!currentY-- < 0) {
				currentY--;
			}
		} else if (item == 'E') {
			if (!currentX++ > roomDimentionsX) {
				currentX++;
			}
		} else {
			if (!currentX-- < 0) {
				currentX--;
			}
		}

		//each directional move should check an see if current position is over a dirtpatch
		//if there is a dirtpatch, clean and add to counter
		if (positionIsWithinPatch(currentX, currentY, dirtyPatches)) {
			dirtyCount++;
		}
	});

	//print to console the final X, Y of the hoover
	//print dirt spot cleaned up
	console.log(currentX + ' ' + currentY);
	console.log(dirtyCount);

	function positionIsWithinPatch(x, y, patches) {
		// iterate over each patch
		// if both x and y match && isClean is false:
		// - set isDirty to true
		// - return true

		for (var i = 0; i < patches.length; i++) {
			if (patches[i].x == x && patches[i].y == y && patches[i].isDirty) {
				patches[i].isDirty = false;
				return true;
			}
		}
		return false;
	}
});
