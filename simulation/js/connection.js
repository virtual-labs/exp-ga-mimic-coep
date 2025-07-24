	// Define virtual canvas size
	var virtualWidth = 1200;
	var virtualHeight = 700;
	
	// Create Raphael canvas that fills the container
	const paper = Raphael("diagram", "100%", "100%");
	
	// Set viewBox for responsive scaling
	paper.setViewBox(0, 0, virtualWidth, virtualHeight, true);
	paper.canvas.setAttribute("preserveAspectRatio", "xMidYMid meet");
	
	let placedElements = [];
	var wrongCnt = 0;
	var wrongAttempts = 0;
	
	var x = 100, y = 100;
	var dropTolerance = 20; // User-defined tolerance for dropping near a rectangle
	
	// Draw tank
		var tank = paper.path("M" + (x - 70) + " " + (y + 70) + "  l 90 0 l 0 -90 l -25 -25 l 0 -15 l -40 0 l 0 15 l -25 25 z");
		tank.attr({
		    stroke: "#000",
		    "stroke-width": 2,
		    fill: "#fff"
		});
      
      
      var pump = paper.image("images/pump.png", (x + 85), (y+138 ), 54, 54);
      
      var afterPump = paper.path("M"+(x+135)+" "+(y+151)+" l 45 0 l 0 -136 l 223.1 0 l 0 17.2").attr({"stroke-width":2});
      var sv1Path = paper.path("M"+(x+403)+" "+(y+15)+" l 0 -32 l 57 0").attr({"stroke-width":2});
      var sv2Path = paper.path("M"+(x+403)+" "+(y+64.2)+" l 0 -32 l 57 0").attr({"stroke-width":2});

      var n1 = paper.path("M"+(x+473)+" "+(y-34)+"l 0 -7.5").attr({"stroke-width":2});
      var n2 = paper.path("M"+(x+475)+" "+(y+52)+"l 0 5.5").attr({"stroke-width":2});
      
      var svValve1 = paper.image("images/Solenoid_Valve.png", (x + 457), (y-39 ), 34, 34);
      var svValve2 = paper.image("images/Solenoid_ValveOpp.png", (x + 457), (y+20 ), 34, 34);
      
      var connectingLinesPump = paper.path("M"+(x-25)+" "+(y+70)+" l 0 95 l 118 0").attr({"stroke-width":2});
     
      var fdFan = paper.image("images/FD_fan.png", (x + 85), (y+300 ), 54, 54);
      
      var fdFanPath = paper.path("M"+(x-25)+" "+(y+327)+" l 110 0"+"M"+(x+138)+" "+(y+327)+" l 90 0 l 0 -150").attr({"stroke-width":2});
      
      var heater = paper.image("images/heater.png", (x + 198), (y+100), 60, 100);
      
	  var afterHeating = paper.path("M"+(x+227)+" "+(y+110)+" l 0 -78 l 176 0 l 0 57	"+"M"+(x+489)+" "+(y+32)+" l 60 0 l 0 -50 l -61 0"+"M"+(x+550)+" "+(y+8.1)+"l 60 0").attr({"stroke-width":2}).toFront();	
		
		var chamber = paper.image("images/chamber.png", (x + 345), (y+85), 120, 200);
		
		var afterChamber = paper.path("M"+(x+407.5)+" "+(y+285)+" l 0 82 l 110 0 l 0 -82 l 54 0").attr({"stroke-width":2}).toFront();
		
		var cyChamber = paper.image("images/cycloneSeperator.png", (x + 570), (y+250), 75, 150);
		var aftercyChamber = paper.path("M"+(x+606)+" "+(y+252)+" l 0 -50 l 90 0").attr({"stroke-width":2}).toFront();
		
		var bagFilter = paper.image("images/Bag_Filter.png", (x + 680), (y+180), 50, 150);
		var afterbagFilter = paper.path("M"+(x+705)+" "+(y+182)+" l 0 -55 l 115 0").attr({"stroke-width":2}).toFront();
		
		var IdFan = paper.image("images/ID_fan.png", (x + 820), (y+100), 54, 54);
		var afterIdFan = paper.path("M"+(x+874)+" "+(y+128)+" l 30 0 l 0 -90").attr({"stroke-width":2}).toFront();
		
		var chimney = paper.path("M"+(x+889)+" "+(y+38)+" l 30 0 l -15 -30 z").attr({"stroke-width":2}).toFront();
		
		// Function to validate if the drop coordinates are close enough to predefined points
	function isValidDrop(dropX, dropY) {
	    return predefinedPaths1.some(path =>
	        Math.abs(path.x - dropX) <= 3 && Math.abs(path.y - dropY) <= 3
	    );
	}

// Define Predefined Paths
var predefinedPaths1 = [
    { x: (x + 34), y: (y + 327),dashed: false, validate: true },  // Solid
    { x: (x + 34), y: (y + 259),dashed: false, validate: false },  // Dashed
    { x: (x + 169), y: (y + 327),dashed: false, validate: true  }, // Solid
    { x: (x + 169), y: (y + 259),dashed: false, validate: false  }, // Dashed
    { x: (x + 113), y: (y + 380),dashed: false, validate: false  }, // Solid--
    { x: (x + 113), y: (y + 448),dashed: false, validate: false  }, // Dashed
    { x: (x + 205), y: (y + 380),dashed: false, validate: true  }, // Adjusted line length here
    { x: (x + 205), y: (y + 448),dashed: false, validate: false  },  // Issue: Unable to drop here
    { x: (x + 240), y: (y + 109),dashed: false, validate: false  },
    { x: (x + 370), y: (y + 109),dashed: false, validate: true  },
    { x: (x + 550), y: (y + 284),dashed: false, validate: true  },
    { x: (x + 550), y: (y + 219.6),dashed: false, validate: false  },
    { x: (x + 780), y: (y + 155),dashed: false, validate: true  },
    { x: (x + 780), y: (y + 219),dashed: false, validate: false  },
    { x: (x + 973), y: (y + 124),dashed: false, validate: false  },
    { x: (x + 738), y: (y + 126),dashed: false, validate: false  },
    { x: (x + 738), y: (y + 57.8),dashed: false, validate: false  },
    { x: (x + 833), y: (y + 100),dashed: false, validate: false  } // modify only for this path
];

// Draw Paths for Predefined Locations
// Draw Paths for Predefined Locations
predefinedPaths1.forEach(path => {
    let lineLength = (Math.round(path.x) === Math.round(x + 205) && Math.round(path.y) === Math.round(y + 380)) 
        ? -52 
        : (Math.round(path.x) === Math.round(x + 833) && Math.round(path.y) === Math.round(y + 100)) 
            ? -70 
            : -28; // Apply -70 only for the specific path

    paper.path(`M${path.x} ${path.y} l 0 ${lineLength}`).attr({
        stroke: "#cccfcd",
        "stroke-width": 2
    }).toBack();
});


// Define Dashed Paths with Validation
var predefinedPaths2 = [
    { x: (x + 34), y: (y + 327), dashed: true, validate: false },
    { x: (x + 34), y: (y + 259), dashed: true, validate: true },
    { x: (x + 169), y: (y + 327), dashed: true, validate: false },
    { x: (x + 169), y: (y + 259), dashed: true, validate: true },
    { x: (x + 113), y: (y + 380), dashed: true, validate: true },
    { x: (x + 113), y: (y + 448), dashed: true, validate: true },
    { x: (x + 205), y: (y + 380), dashed: true, validate: false }, 
    { x: (x + 205), y: (y + 448), dashed: true, validate: true },
    { x: (x + 240), y: (y + 109),dashed: true, validate: true  },
    { x: (x + 370), y: (y + 109),dashed: true, validate: false },
    { x: (x + 550), y: (y + 284),dashed: true, validate: false  },
    { x: (x + 550), y: (y + 219.6),dashed: true, validate: true  },
     { x: (x + 780), y: (y + 155),dashed: true, validate: false  },
     { x: (x + 780), y: (y + 219),dashed: true, validate: true  },
     { x: (x + 973), y: (y + 124),dashed: true, validate: true  },
     { x: (x + 738), y: (y + 126),dashed: true, validate: true  },
     { x: (x + 738), y: (y + 57.8),dashed: true, validate: true  },
     { x: (x + 833), y: (y + 100),dashed: true, validate: true  } 
];

// Draw Dashed Paths
// Draw Dashed Paths for Predefined Locations
predefinedPaths2.forEach(path => {
    let lineLength = (Math.round(path.x) === Math.round(x + 205) && Math.round(path.y) === Math.round(y + 380)) 
        ? -52 
        : (Math.round(path.x) === Math.round(x + 833) && Math.round(path.y) === Math.round(y + 100)) 
            ? -70 
            : -28; // Apply -70 only for the specific path

    paper.path(`M${path.x} ${path.y} l 0 ${lineLength}`).attr({
        stroke: "#cccfcd",
        "stroke-width": 2,
        "stroke-dasharray": path.dashed ? "-" : "" // Dashed line styling
    }).toBack();
});


// Debugging: Print Allowed Drop Positions
console.log("Expected drop locations:");
predefinedPaths1.forEach(path => {
    console.log(`x=${path.x}, y=${path.y}`);
});

   
		// Drop zones
		const dropZones = [
		    { x: (x + 70), y: (y - 36), width: 40, height: 40, type: "LSH", occupied: false },
		    { x: (x + 70), y: (y - 36 + 75), width: 40, height: 40, type: "LSL", occupied: false },
		    { x: (x + 15), y: (y +259), width: 40, height: 40, type: "PSHH1", occupied: false },
		    { x: (x + 15), y: (y +191), width: 40, height: 40, type: "IL", occupied: false },
		     { x: (x + 150), y: (y +191), width: 40, height: 40, type: "IL", occupied: false },
		    { x: (x + 150), y: (y +259), width: 40, height: 40, type: "PSHH2", occupied: false },
		     { x: (x + 95), y: (y +380), width: 40, height: 40, type: "FY", occupied: false },
		     { x: (x + 95), y: (y +448), width: 40, height: 40, type: "FC", occupied: false },
		     { x: (x + 185), y: (y +380), width: 40, height: 40, type: "FE", occupied: false },
		     { x: (x + 185), y: (y +448), width: 40, height: 40, type: "FT", occupied: false },
		     { x: (x + 235), y: (y +45), width: 36, height: 36, type: "TY", occupied: false },
		     { x: (x + 295), y: (y +45), width: 36, height: 36, type: "TIC", occupied: false },
		     { x: (x + 355), y: (y +45), width: 36, height: 36, type: "TT", occupied: false },
		     { x: (x + 510), y: (y +100), width: 36, height: 36, type: "TSHH", occupied: false },
		     { x: (x + 532), y: (y +219.6), width: 36, height: 36, type: "TT2", occupied: false },
		      { x: (x + 532), y: (y +155), width: 36, height: 36, type: "IL", occupied: false },
		      { x: (x + 762), y: (y +155), width: 36, height: 36, type: "PSHH3", occupied: false },
		      { x: (x + 762), y: (y +219), width: 36, height: 36, type: "IL", occupied: false },
		      { x: (x + 955), y: (y +60), width: 36, height: 36, type: "PSHH4", occupied: false },
		      { x: (x + 955), y: (y +124), width: 36, height: 36, type: "IL", occupied: false },
		      { x: (x + 720), y: (y +58.5), width: 40, height: 40, type: "NT", occupied: false },
		      { x: (x + 720), y: (y-10), width: 40, height: 40, type: "NIC", occupied: false },
		      { x: (x + 810), y: (y-10), width: 40, height: 40, type: "NY", occupied: false },
		      { x: (x + 459), y: (y -72), width: 30, height: 30, type: "IL", occupied: false },
		      { x: (x + 460), y: (y +58), width: 30, height: 30, type: "IL", occupied: false }
		];

		// Draw drop zones
		dropZones.forEach(zone => {
		    paper.rect(zone.x, zone.y, zone.width, zone.height).attr({
		        fill: "rgba(0, 0, 0, 0.1)",
		        stroke: "#cccfcd",
		        "stroke-width": 1,
		    });
		});
   
  
   // Predefined paths
		var predefinedPaths = [
		    { x: (x + 20), y: (y-15), dashed: false, validate: true },
		    { x: (x + 20), y: (y + 60), dashed: false, validate: true },
		    { x: (x + 135), y: (y + 470) , dashed: false, validate: false}, // dashed
		    { x: (x + 461), y: (y + 120) , dashed: false, validate: true},
		    { x: (x + 905), y: (y + 78) , dashed: false, validate: true}, 
		     { x: (x + 760.5), y: (y+9) , dashed: false, validate: false},
		    
		    // last two small lines
		    { x: (x + 330), y: (y + 63) , dashed: false, validate: false}, // below condition should get implemented here also for this path
		    { x: (x + 270), y: (y + 63) , dashed: false, validate: false}, //Only for this path
		     
		];

     predefinedPaths.forEach((path, index) => {
    // Check if it's one of the last two paths in the array
    let lineLength = (index >= predefinedPaths.length - 2) ? 25 : 50;

    let pathElement = paper.path(`M${path.x} ${path.y} l ${lineLength} 0`).attr({
        stroke: "#cccfcd",
        "stroke-width": 2
    });
});
     
        
//    predefinedPaths.forEach(path => {
//            paper.path(`M${path.x} ${path.y} l 50 0`).attr({
//                stroke: "#cccfcd",
//                "stroke-width": 2
//            }).toBack();
//        });

     
    var predefinedPaths3 = [
		    { x: (x + 20), y: (y-15) , dashed: true, validate: false},
		    { x: (x + 20), y: (y + 60), dashed: true, validate: false },
		    { x: (x + 135), y: (y + 470), dashed: true, validate: true }, // dashed
		     { x: (x + 461), y: (y + 120) , dashed: true, validate: false},
		    { x: (x + 905), y: (y + 78) , dashed: true, validate: false},
		    { x: (x + 760.5), y: (y+9) , dashed: true, validate: true},
		    
		    { x: (x + 330), y: (y + 63) , dashed: true, validate: true}, //small lines
		    { x: (x + 270), y: (y + 63) , dashed: true, validate: true}
		];
   
     predefinedPaths3.forEach((path, index) => {
    // Check if it's one of the last two paths
    let lineLength = (index >= predefinedPaths3.length - 2) ? 25 : 50;

    let pathElement3 = paper.path(`M${path.x} ${path.y} l ${lineLength} 0`).attr({
        stroke: "#cccfcd",
        "stroke-width": 2,
        "stroke-dasharray": path.dashed ? "-" : ""
    });
});

   
//    predefinedPaths3.forEach(path => {
//            paper.path(`M${path.x} ${path.y} l 50 0`).attr({
//                stroke: "#cccfcd",
//                "stroke-width": 2 ,"stroke-dasharray": path.dashed ? "-" : "" // Dashed line styling
//            }).toBack();
//        });
     
	// Convert screen coordinates to SVG coordinates
	
	function getSVGCoordinates(e) {
    let svgRect = paper.canvas.getBoundingClientRect();
    let scaleX = virtualWidth / svgRect.width;
    let scaleY = virtualHeight / svgRect.height;

    let svgX = (e.clientX - svgRect.left) * scaleX;
    let svgY = (e.clientY - svgRect.top) * scaleY;

    console.log(`SVG Coordinates: x=${svgX}, y=${svgY}`); // Debugging log

    return { x: svgX, y: svgY };
}


	// Handle dragging of components
	document.querySelectorAll(".component").forEach(component => {
	    component.addEventListener("dragstart", (e) => {
	        e.dataTransfer.setData("imgSrc", component.querySelector("img")?.src || ""); // Allow both images & paths
	        e.dataTransfer.setData("type", component.getAttribute("data-type"));
	    });
	});

	document.getElementById("diagram").addEventListener("dragover", (e) => {
	    e.preventDefault();
	});

	document.getElementById("diagram").addEventListener("drop", (e) => {
	    e.preventDefault();
	    const imgSrc = e.dataTransfer.getData("imgSrc");
	    const draggedType = e.dataTransfer.getData("type");
	
	    let dropPoint = getSVGCoordinates(e);
	       
	         // 🔹 Improved solidHLine drop handling with better tolerance
	if (draggedType === "solidHLine") {
    let closestPath = predefinedPaths.find(path =>
        dropPoint.x >= (path.x - dropTolerance) &&
        dropPoint.x <= (path.x + 50 + dropTolerance) &&
        dropPoint.y >= (path.y - dropTolerance) &&
        dropPoint.y <= (path.y + dropTolerance)
    );

    if (closestPath) {
        // 🔹 Determine if it's one of the last two paths
        let pathIndex = predefinedPaths.indexOf(closestPath);
        let isLastTwoPaths = pathIndex >= predefinedPaths.length - 2;
        let lineLength = isLastTwoPaths ? 25 : 50;

        let pathElement = paper.path(`M${closestPath.x} ${closestPath.y} l ${lineLength} 0`).attr({
            stroke: "#000", 
            "stroke-width": 2
        });

        // 🔹 Create a larger, transparent clickable area
        let clickableArea = paper.rect(closestPath.x, closestPath.y - 5, lineLength, 10).attr({
            fill: "rgba(0,0,0,0)", // Transparent but clickable
            stroke: "none", 
            cursor: "pointer"
        });

        clickableArea.click(() => {
            pathElement.remove();
            clickableArea.remove();
            placedElements = placedElements.filter(el => el !== pathElement && el !== clickableArea);
            wrongCnt++;
        });

        placedElements.push(pathElement);
        placedElements.push(clickableArea);
    }
    return;
}


   
       
              // 🔹 Improved solidVLine drop handling with better tolerance
	if (draggedType === "solidVLine") {
    let closestPath1 = predefinedPaths1.find(path =>
        dropPoint.x >= (path.x - dropTolerance) &&
        dropPoint.x <= (path.x + 50 + dropTolerance) &&
        dropPoint.y >= (path.y - dropTolerance) &&
        dropPoint.y <= (path.y + dropTolerance)
    );

    if (closestPath1) {
        let pathElement1, clickableArea1;

        let lineLength = (closestPath1.x === (x + 205) && closestPath1.y === (y + 380)) 
            ? -52 
            : (closestPath1.x === (x + 833) && closestPath1.y === (y + 100)) 
                ? -70 
                : -28; // Apply -70 only for the specific path

        pathElement1 = paper.path(`M${closestPath1.x} ${closestPath1.y} l 0 ${lineLength}`).attr({
            stroke: "#000", "stroke-width": 2
        });

        clickableArea1 = paper.rect(closestPath1.x - 5, closestPath1.y + lineLength, 10, Math.abs(lineLength)).attr({
            fill: "rgba(0,0,0,0)", // Transparent but clickable
            stroke: "none", 
            cursor: "pointer"
        });

        clickableArea1.click(() => {
            pathElement1.remove();
            clickableArea1.remove();
            placedElements = placedElements.filter(el => el !== pathElement1 && el !== clickableArea1);
            wrongCnt++;
        });

        placedElements.push(pathElement1);
        placedElements.push(clickableArea1);
    }
    return;
}

       
       
       if (draggedType === "dasshedV") {
    let closestPath2 = predefinedPaths2.find(path =>
        dropPoint.x >= (path.x - dropTolerance) &&
        dropPoint.x <= (path.x + 50 + dropTolerance) &&
        dropPoint.y >= (path.y - dropTolerance) &&
        dropPoint.y <= (path.y + dropTolerance)
    );

    if (closestPath2) {
        let pathElement2, clickableArea2;

        let lineLength = (closestPath2.x === (x + 205) && closestPath2.y === (y + 380)) 
            ? -52 
            : (closestPath2.x === (x + 833) && closestPath2.y === (y + 100)) 
                ? -70 
                : -28; // Apply -70 only for the specific path

        pathElement2 = paper.path(`M${closestPath2.x} ${closestPath2.y} l 0 ${lineLength}`).attr({
            stroke: "#000", 
            "stroke-width": 2, 
            "stroke-dasharray": closestPath2.dashed ? "-" : ""
        });

        clickableArea2 = paper.rect(closestPath2.x - 5, closestPath2.y + lineLength, 10, Math.abs(lineLength)).attr({
            fill: "rgba(0,0,0,0)", // Transparent but clickable
            stroke: "none", 
            cursor: "pointer"
        });

        clickableArea2.click(() => {
            pathElement2.remove();
            clickableArea2.remove();
            placedElements = placedElements.filter(el => el !== pathElement2 && el !== clickableArea2);
            wrongCnt++;
        });

        placedElements.push(pathElement2);
        placedElements.push(clickableArea2);
    }
    return;
}

	
	
	//paste here
	
	 if (draggedType === "dasshedHLine") {
		
		
		 let closestPath3 = predefinedPaths3.find(path =>
        dropPoint.x >= (path.x - dropTolerance) &&
        dropPoint.x <= (path.x + 50 + dropTolerance) &&
        dropPoint.y >= (path.y - dropTolerance) &&
        dropPoint.y <= (path.y + dropTolerance)
    );

    if (closestPath3) {
        // 🔹 Determine if it's one of the last two paths
        let pathIndex = predefinedPaths3.indexOf(closestPath3);
        let isLastTwoPaths = pathIndex >= predefinedPaths.length - 2;
        let lineLength = isLastTwoPaths ? 25 : 50;

        let pathElement3 = paper.path(`M${closestPath3.x} ${closestPath3.y} l ${lineLength} 0`).attr({
            stroke: "#000", 
            "stroke-width": 2 ,"stroke-dasharray": closestPath3.dashed ? "-" : ""
        });

        // 🔹 Create a larger, transparent clickable area
        let clickableArea3 = paper.rect(closestPath3.x, closestPath3.y - 5, lineLength, 10).attr({
            fill: "rgba(0,0,0,0)", // Transparent but clickable
            stroke: "none", 
            cursor: "pointer"
        });

        clickableArea3.click(() => {
            pathElement3.remove();
            clickableArea3.remove();
            placedElements = placedElements.filter(el => el !== pathElement3 && el !== clickableArea3);
            wrongCnt++;
        });

        placedElements.push(pathElement3);
        placedElements.push(clickableArea3);
    }
    return;
		
		
		
		
//		let closestPath3 = predefinedPaths3.find(path =>
//        dropPoint.x >= (path.x - dropTolerance) &&
//        dropPoint.x <= (path.x + 50 + dropTolerance) &&
//        dropPoint.y >= (path.y - dropTolerance) &&
//        dropPoint.y <= (path.y + dropTolerance)
//    );
//
//    if (closestPath3) {
//        // 🔹 Determine if it's the last path
//        let isLastPath = predefinedPaths3.indexOf(closestPath3) === predefinedPaths3.length - 1;
//        let lineLength = isLastPath ? 25 : 50;
//
//        let pathElement3 = paper.path(`M${closestPath3.x} ${closestPath3.y} l ${lineLength} 0`).attr({
//            stroke: "#000", 
//            "stroke-width": 2,"stroke-dasharray": closestPath3.dashed ? "-" : ""
//        });
//
//        // 🔹 Create a larger, transparent clickable area
//        let clickableArea3 = paper.rect(closestPath3.x, closestPath3.y - 5, lineLength, 10).attr({
//            fill: "rgba(0,0,0,0)", // Transparent but clickable
//            stroke: "none", 
//            cursor: "pointer"
//        });
//
//        clickableArea3.click(() => {
//            pathElement3.remove();
//            clickableArea3.remove();
//            placedElements = placedElements.filter(el => el !== pathElement3 && el !== clickableArea3);
//            wrongCnt++;
//        });
//
//        placedElements.push(pathElement3);
//        placedElements.push(clickableArea3);
//    }
//    return;
		

	}
	
	
	
	
         
    // 🔹 Handle image drop with tolerance
	    let validDrop = dropZones.find(zone =>
	    dropPoint.x >= (zone.x - dropTolerance) &&
	    dropPoint.x <= (zone.x + zone.width + dropTolerance) &&
	    dropPoint.y >= (zone.y - dropTolerance) &&
	    dropPoint.y <= (zone.y + zone.height + dropTolerance) &&
	    !zone.occupied
	);

	    if (validDrop) {
	        let imgElement = paper.image(imgSrc, validDrop.x, validDrop.y, validDrop.width, validDrop.height).attr({cursor: "pointer"});
	        imgElement.data("type", draggedType);
	
	        imgElement.click(() => {
	            imgElement.remove();
	            validDrop.occupied = false;
	            wrongCnt++;
	        });
	
	        validDrop.occupied = true;
	        placedElements.push(imgElement);
	    }
	});

	// Validation on button click
	document.getElementById("startBtn").addEventListener("click", () => {
	    console.log(wrongCnt);
	    console.log(wrongAttempts);
	
	    let validImages = dropZones.every(zone =>
	        placedElements.some(el => el.attrs &&
	            el.attrs.x === zone.x && el.attrs.y === zone.y &&
	            el.data("type") === zone.type)
	    );
	
//	    let validPaths = predefinedPaths.every(path =>
//	        placedElements.some(el => el.attrs && el.attrs.path &&
//	            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y)
//	    );

         let validPaths = predefinedPaths
    .filter(path => path.validate) // ✅ Only check paths marked as true
    .every(path =>
        placedElements.some(el => 
            el.attrs && el.attrs.path &&
            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y &&
            (
                (path.dashed && el.attrs["stroke-dasharray"] === "-") || // ✅ Dashed line validation
                (!path.dashed && el.attrs["stroke-dasharray"] === undefined) // ✅ Solid line validation
            )
        )
    );
        

	    
//	    let validPaths1 = predefinedPaths1.every(path =>
//	        placedElements.some(el => el.attrs && el.attrs.path &&
//	            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y)
//	    );

        
        let validPaths1 = predefinedPaths1
    .filter(path => path.validate) // ✅ Only check paths marked as true
    .every(path =>
        placedElements.some(el => 
            el.attrs && el.attrs.path &&
            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y &&
            (
                (path.dashed && el.attrs["stroke-dasharray"] === "-") || // ✅ Dashed line validation
                (!path.dashed && el.attrs["stroke-dasharray"] === undefined) // ✅ Solid line validation
            )
        )
    );
    
	    
//	    let validPaths2 = predefinedPaths2.every(path =>
//    placedElements.some(el => 
//        el.attrs && el.attrs.path &&
//        el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y &&
//        (path.dashed ? el.attrs["stroke-dasharray"] === "-" : el.attrs["stroke-dasharray"] === "")
//	    )
//	);

      let validPaths2 = predefinedPaths2
    .filter(path => path.validate) // ✅ Only check paths marked as true
    .every(path =>
        placedElements.some(el => 
            el.attrs && el.attrs.path &&
            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y &&
            (
                (path.dashed && el.attrs["stroke-dasharray"] === "-") || // ✅ Dashed line validation
                (!path.dashed && el.attrs["stroke-dasharray"] === undefined) // ✅ Solid line validation
            )
        )
    );

//       let validPaths3 = predefinedPaths3.every(path =>
//	        placedElements.some(el => el.attrs && el.attrs.path &&
//	            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y)
//	    );


        let validPaths3 = predefinedPaths3
    .filter(path => path.validate) // ✅ Only check paths marked as true
    .every(path =>
        placedElements.some(el => 
            el.attrs && el.attrs.path &&
            el.attrs.path[0][1] === path.x && el.attrs.path[0][2] === path.y &&
            (
                (path.dashed && el.attrs["stroke-dasharray"] === "-") || // ✅ Dashed line validation
                (!path.dashed && el.attrs["stroke-dasharray"] === undefined) // ✅ Solid line validation
            )
        )
    );

	
	    if (validImages && validPaths && validPaths1 && validPaths2 && validPaths3) {
	        alert("✅ All elements are placed correctly!");
	        console.log("correct : "+placedElements.length);
	    } else {
	        wrongAttempts++;
	        alert("❌ Some elements are missing or misplaced!");
	        console.log("wrong : "+placedElements.length);
	    }
	});
