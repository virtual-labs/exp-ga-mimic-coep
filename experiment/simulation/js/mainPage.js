var resultJson={};
var timerMasterJson={};
var compCnt=0;
var ledCnt=0;
function mainPageFlat() {
	var droppedImagesData = {};
	
	$("#header").html("DESIGN FRONT FLAT");
	$("#buttonDiv").prop("hidden",false);
	
	var htm=`
	
	<div class="row">
	
	<div class="col-sm-3">
	<p class="img-label">INDICATORS</p>
	<div class="responsive-rectangle" id="firstRect">
     <div class="control-box">
        <img src="images/boilerDiagram.png" alt="Boiler Diagram" id="boilerImage"  draggable="true" ondragstart="event.dataTransfer.setData('text', this.id)">
     
    </div>
<!--    	<div class="control-box" >
			  <img src="images/led.png" alt="LED" id="img_led">
		</div>-->
    </div>
   <div class="row" id="indicatorDiv">
    <div class="alert alert-primary  " style="float: left;    border: 2px solid;border: 2px solid;margin-top:5px;" role="alert">
		You must place the Mimic component first to enable other indicators."
		<br><button type="button" id="nextLevel" class="btn btn-primary" style="background-color:teal;float:right;" disabled ><b>Enabled indicators  </b></button>
		
	
		</div>
  	</div>
  <div class="responsive-rectangle no-click" id="secondRect">
  
			   <div class="control-box" >
			  <img src="images/r1.jpg" alt="Pressure" id="img_pressure" title="PRESSURE_GAUGE" >
			</div>
			
			<div class="control-box">
			  <img src="images/element.png" alt="3 ELEMENT CONTROLLER" id="img_element3" title="3 ELEMENT CONTROLLER">
			</div>
			<div class="control-box">
			  <img src="images/steam.PNG" alt="Steam Flow" id="img_steam" title="STEAM FLOW">
			</div>
			<div class="control-box">
			  <img src="images/mnv.png" alt="Cold Flow" id="img_meter" title="COLD FLOW">
			</div>
			<div class="control-box">
			  <img src="images/s1.jpg" alt="On_off" id="img_s1" title="ON/OFF">
			</div>
			<div class="control-box">
			  <img src="images/tc.png" alt="Temp Controller" id="img_tc" title="TEMP CONTROLLER">
			</div>
			<div class="control-box">
			  <img src="images/alram2.png" alt="ALARM ACK" id="img_alarm" title="ALARM ACK">
			</div>
			<div class="control-box">
			  <img src="images/yellow.png" alt="yellow" id="yellow" title="GRAY LED" >
			</div>
			<div class="control-box">
			  <img src="images/speed.png" alt="Speed" id="speed" TITLE="SPEED">
			</div>
    
  </div>
  
  
</div>

		<div class="col-sm-9">
  <div class="responsive-rectangle1">
    <div class="left-half">
      <div class="inner-rectangle-left" id="rectLeft" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    </div>
    <div class="right-half">
      <div class="inner-rectangle-right" id="rectRight" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    </div>
  </div>
</div>
	</div>

	`;
	$("#main-div").html(htm);
	var attempt=0;
	$("#validate").on('click', function () {
		compCnt++;
		// Check individual lengths
	    const PressureCount = droppedImagesData["Pressure"]?.length || 0;
	    const elementCount = droppedImagesData["3 ELEMENT CONTROLLER"]?.length || 0; 
	    const steamFlowCount = droppedImagesData["Steam Flow"]?.length || 0; 
	    const ColdFlowCount = droppedImagesData["Cold Flow"]?.length || 0; 
	    
	    const yellowValveCount = droppedImagesData["On_off"]?.length || 0;
	    const tempCount = droppedImagesData["Temp Controller"]?.length || 0; 
	    
	    const alarmAckCount = droppedImagesData["ALARM ACK"]?.length || 0; 
	    const GREYCount = droppedImagesData["yellow"]?.length || 0; 
	    const speedCount = droppedImagesData["Speed"]?.length || 0; 
	    
	    console.log("PressureCount :", PressureCount);
	    console.log("yellowValveCount:", yellowValveCount);
	    console.log("elementCount:", elementCount);
	    
	    console.log("steamFlowCount :", steamFlowCount);
	    console.log("ColdFlowCount:", ColdFlowCount);
	    console.log("tempCount:", tempCount);
	    
	    console.log("alarmAckCount :", alarmAckCount);
	    console.log("GREYCount:", GREYCount);
	    console.log("speedCount:", speedCount);
	    totalCount=parseInt(PressureCount+elementCount+steamFlowCount+ColdFlowCount +yellowValveCount +tempCount +alarmAckCount+GREYCount+speedCount) ;
	    
	    if(attempt<2){
	    	if (
				PressureCount === 6 &&
				elementCount === 1 &&
				steamFlowCount === 2 &&
				ColdFlowCount === 4 &&
				yellowValveCount === 6 &&
				tempCount === 1 &&
				alarmAckCount === 1 &&
				GREYCount === 1 &&
				speedCount === 2 
		     )
	    		{
	    		 Swal.fire({
	    		        icon: 'success',
	    		        title: 'Correct!',
	    		        text: 'All components placed correctly.',
	    		        confirmButtonColor: '#3085d6'
	    		      });
					  result();
	    		}
	    	else{
	    		if(totalCount>24){
	    			 Swal.fire({
	 	    	        icon: 'error',
	 	    	        title: 'Incorrect',
	 	    	        text: 'More component.',
	 	    	        confirmButtonColor: '#d33'
	 	    	      });
	    		}
	    		else{
	    			 Swal.fire({
		 	    	        icon: 'error',
		 	    	        title: 'Incorrect',
		 	    	        text: 'Less component.',
		 	    	        confirmButtonColor: '#d33'
		 	    	      });
	    		}
	    	     
	    	}
	    		
	    }
	    else if(attempt>=2){
			
			if (
					    		PressureCount === 6 &&
					    		elementCount === 1 &&
					    		steamFlowCount === 2 &&
					    		ColdFlowCount === 4 &&
					    		yellowValveCount === 6 &&
					    		
					    		tempCount === 1 &&
					    		alarmAckCount === 1 &&
					    		GREYCount === 1 &&
					    		speedCount === 2 
					     )
				    		{
				    		 Swal.fire({
				    		        icon: 'success',
				    		        title: 'Correct!',
				    		        text: 'All components placed correctly.',
				    		        confirmButtonColor: '#3085d6'
				    		      });
								  result();
				    		}
			else{
				Swal.fire({
				//	    		  icon: 'error',
				//	    		  title: 'Incorrect',
				//	    		  text: 'More component.',
					    		  imageUrl: 'images/STANDERD.PNG', // replace with your actual image path
					    		 
								  width: 'max-content',
					    		  imageAlt: 'Warning Image',
					    		  confirmButtonColor: '#d33'
					    		});
			}
	    	
	    }
	    
	    attempt++;
	    
	});
	$(function () {
		  const labelMap = {
		  
		    img_pressure: "Pressure Gauge",
		    img_s1: "Sensor 1",
		    img_element3: "3 Element Controller",
		    img_steam: "Steam Flow",
		    img_meter: "Cold Flow",
		    img_tc: "Temp Controller",
		    speed: "speed",
		    yellow:"On_off",
		    img_yellow:"yellow",
		    img_alarm: "Alarm Ack"
		  };

		  const makeDraggable = (selector, customLabel) => {
			  $(selector).draggable({
			    helper: "clone",
			    revert: "invalid",
			    start: function (event, ui) {
			      const originalId = ui.helper.attr("id");
			      console.log(`${customLabel} started dragging`);
			      console.log(originalId);
			      ui.helper.css({
			        "z-index": 1000,
			        width: "50%",
			        height: "50%"
			      });

			      // Custom behavior for LED
//			      if (originalId === "img_element3") {
//			    	  ui.helper.css({
//					        "z-index": 1000,
//					        width: "50%",
//					        height: "100%"
//					      });
//			      }
			    }
			  });
			};
		 

		  // Assign draggable behavior
		  Object.keys(labelMap).forEach((id) => {
		    makeDraggable(`#${id}`, labelMap[id]);
		  });

		  function countDroppedImages() {
		    const counts = {};
		    $(".dropped").each(function () {
		      const id = $(this).attr("data-id");
		      counts[id] = (counts[id] || 0) + 1;
		    });
		    return counts;
		  }
		  
		  
		  $(".inner-rectangle-left, .inner-rectangle-right").droppable({
		    accept: "img",
		    drop: function (event, ui) {
		      const dropZone = $(this);
		      const dropOffset = dropZone.offset();
		      const zoneWidth = dropZone.width();
		      const zoneHeight = dropZone.height();

		      let imgWidth = 70;
		      let imgHeight = 70;
		      let margin = 10;

		      let left = event.pageX - dropOffset.left - imgWidth / 2;
		      let top = event.pageY - dropOffset.top - imgHeight / 2;

		      // Border margin check
		      if (
		        left < margin ||
		        top < margin ||
		        left + imgWidth > zoneWidth - margin ||
		        top + imgHeight > zoneHeight - margin
		      ) {
		        Swal.fire({
		          icon: 'warning',
		          title: 'Cannot place component',
		          text: 'Too close to edge (min 20mm required).',
		          confirmButtonColor: '#3085d6'
		        });
		        return;
		      }

		      // Overlap or too close to existing images
		      let tooClose = false;
		      dropZone.find("img.dropped").each(function () {
		        const $other = $(this);
		        if (ui.helper[0] === $other[0]) return;

		        const otherPos = $other.position();
		        const otherLeft = otherPos.left - margin;
		        const otherTop = otherPos.top - margin;
		        const otherWidth = $other.outerWidth() + margin * 2;
		        const otherHeight = $other.outerHeight() + margin * 2;

		        if (
		          left < otherLeft + otherWidth &&
		          left + imgWidth > otherLeft &&
		          top < otherTop + otherHeight &&
		          top + imgHeight > otherTop
		        ) {
		          tooClose = true;
		          return false;
		        }
		      });

		      if (tooClose) {
		        Swal.fire({
		          icon: 'error',
		          title: 'Cannot place image',
		          text: 'Minimum 20mm spacing required between 2 component.',
		          confirmButtonColor: '#d33'
		        });
		        return;
		      }

		      // Move existing image
		      if (ui.helper.hasClass("dropped")) {
		        ui.helper.css({ left, top });
		        return;
		      }

		   // Get the original alt attribute
		      const originalId = ui.helper.attr("alt");

		      let clone;

		      if (originalId === "3 ELEMENT CONTROLLER") {
		        // Special size for 3 ELEMENT CONTROLLER
		        clone = ui.helper.clone().removeAttr("style").css({
		          position: "absolute",
		          left: left,
		          top: top,
		          height: '20%',
		          "object-fit": "contain",
		          "z-index": 10,
		          border: "2px solid #000",
		          "box-sizing": "border-box"
		        }).addClass("dropped").attr("data-id", originalId);
		        
		        if (!droppedImagesData[originalId]) {
		            droppedImagesData[originalId] = [];
		          }

		          droppedImagesData[originalId].push({
		            id: originalId,
		            left: left,
		            top: top,
		            width: clone.width(),
		            height: clone.height()
		          });

		          console.log(droppedImagesData);
		      } 
		      else if (originalId === "Temp Controller") {
			        // Special size for 3 ELEMENT CONTROLLER
			        clone = ui.helper.clone().removeAttr("style").css({
			          position: "absolute",
			          left: left,
			          top: top,
			         
			          height: '10%',
			          "object-fit": "contain",
			          "z-index": 10,
			          border: "2px solid #000",
			          "box-sizing": "border-box"
			        }).addClass("dropped").attr("data-id", originalId);
			        if (!droppedImagesData[originalId]) {
			            droppedImagesData[originalId] = [];
			          }

			          droppedImagesData[originalId].push({
			            id: originalId,
			            left: left,
			            top: top,
			            width: clone.width(),
			            height: clone.height()
			          });

			          console.log(droppedImagesData);
			      }
		      
		      else if (originalId === "Steam Flow") {
			        // Special size for 3 ELEMENT CONTROLLER
			        clone = ui.helper.clone().removeAttr("style").css({
			          position: "absolute",
			          left: left,
			          top: top,
			         
			          height: '10%',
			          "object-fit": "contain",
			          "z-index": 10,
			          border: "2px solid #000",
			          "box-sizing": "border-box"
			        }).addClass("dropped").attr("data-id", originalId);
			        if (!droppedImagesData[originalId]) {
			            droppedImagesData[originalId] = [];
			          }

			          droppedImagesData[originalId].push({
			            id: originalId,
			            left: left,
			            top: top,
			            width: clone.width(),
			            height: clone.height()
			          });

			          console.log(droppedImagesData);
			      }
		      
		    
		      else {
		        // Default size for other elements
		        clone = ui.helper.clone().removeAttr("style").css({
		          position: "absolute",
		          left: left,
		          top: top,
		          width: imgWidth,
		          height: imgHeight,
		          "object-fit": "contain",
		          "z-index": 10,
		          border: "2px solid #000",
		          "box-sizing": "border-box"
		        }).addClass("dropped").attr("data-id", originalId);
		        if (!droppedImagesData[originalId]) {
		            droppedImagesData[originalId] = [];
		          }

		          droppedImagesData[originalId].push({
		            id: originalId,
		            left: left,
		            top: top,
		            width: clone.width(),
		            height: clone.height()
		          });

		          console.log(droppedImagesData);
		      }
		      
		      // Append the clone to the drop target
		      $(this).append(clone);
		      clone.draggable({
		        containment: this,
		        revert: "invalid",
		        start: function () {
//		          $("body").append('<div id="drag-coords" style="position:absolute; padding:2px 6px; background:#000; color:#fff; font-size:12px; border-radius:4px;  z-index:9999;"></div>');
		        }
//		        drag: function (event, ui) {
//		          const x = Math.round(ui.position.left);
//		          const y = Math.round(ui.position.top);
//		          $("#drag-coords").text(`X: ${x}, Y: ${y}`).css({
//		            top: event.pageY + "px",
//		            left: event.pageX + "px"
//		          });
//		        },
//		        stop: function () {
//		          $("#drag-coords").remove();
//		        }
		      });

		      dropZone.css("position", "relative").append(clone);
		      

		    }
		  });
		});
	 var imageCopy ;
		var adjustedTop ;
		var adjustedLeft ;
		var topPercent ;
		var  leftPercent ;
		var bCnt=0;
		 window.allowDrop = function(ev) {
			  console.log("window allow");
			  ev.preventDefault();
			}

		 window.drag = function(ev)  {
			  ev.preventDefault();
			  console.log("window drag");
			  ev.dataTransfer.setData("text", ev.target.id);
			}

		 window.drop = function(ev) 	{
			  console.log("window drop");
			  ev.preventDefault();// 🔒 Prevent future drops on this element
			 
		
			  if (ev.dataTransfer != null || ev.dataTransfer != undefined) {
			    var data = ev.dataTransfer.getData("text");
			    var draggedImage = document.getElementById(data);

			    // Clone the image
			    var imageCopy = draggedImage.cloneNode(true);
			    imageCopy.removeAttribute("id"); // remove duplicate ID

			    // Set a new id for the dropped image
			    imageCopy.id = "mimicImg";
			    imageCopy.setAttribute("draggable", false);

			    // Style the image to fit perfectly in the inner-rectangle
			    imageCopy.style.width = "100%";
			    imageCopy.style.height = "100%";
			    imageCopy.style.objectFit = "fill";
			    imageCopy.style.borderRadius = "4px";
			    imageCopy.style.position = "relative";

			    // Clear and add the image to the drop zone
			    ev.target.innerHTML = "";
			    ev.target.appendChild(imageCopy);

			    const img = document.getElementById("boilerImage");

			    // For block 
			    const $img = $("#mimicImg");
			    const imgOffset = $img.position();

			    // Get position relative to parent
			    const imgPos = $img.position(); // { top: ..., left: ... }

			    // Get parent dimensions
			    var $parent = $img.parent();
			    var parentWidth = $parent.width();
			    var parentHeight = $parent.height();

			    // Convert to percentage
			    var topPercent = (imgPos.top / parentHeight) * 100;
			    var leftPercent = (imgPos.left / parentWidth) * 100;

			    console.log('Top %:', topPercent.toFixed(2) + '%');
			    console.log('Left %:', leftPercent.toFixed(2) + '%');

			    CreateBlock($img, 54, 20);
			    CreateBlock($img, 86, 43);
			    CreateBlock($img, 84, 63);
			    CreateBlock($img, 57, 80);
			    CreateBlock($img, 89, 24);
			    CreateBlock($img, 38, 3);

			    Swal.fire({
			      icon: 'success',
			      title: 'Next step',
			      text: 'Click on yellow rectangle to set LED Light',
			      confirmButtonColor: '#3085d6'
			    });

			    $("#firstRect").addClass("no-click");
			    $("#nextLevel").prop("disabled", false);
			  }
			 
			}
		

		function CreateBlock($img, x, y) {
			console.log("create Block call");
			var blockName = 'block_' + (bCnt++);
			
		  // Calculate position relative to image
		  const imgPos = $img.position();
		  const parentWidth = $img.width();
		  const parentHeight = $img.height();

		  const topPercent = (imgPos.top / parentHeight) * 100;
		  const leftPercent = (imgPos.left / parentWidth) * 100;

		  const adjustedTop = topPercent + x;
		  const adjustedLeft = leftPercent + y;
		  var parentClass = $img.parent().attr("id");
		  console.log(parentClass); // Output: "inner-rectangle-left"
//		  $('#' + parentClass).css({
//			  "pointer-events": "none"
//			});
		  // Append block instead of replacing content
		  $('<div ></div>', { id: blockName }).appendTo('#'+parentClass);
		 
		  // Style the block and bring it forward
		  $("#" + blockName).css({
			 
		    position: 'absolute',
		    top: adjustedTop + '%',
		    left: adjustedLeft + '%',
		    width: '4%',
		    height: '3%',
		    border: '2px solid #e0b944',
//		    backgroundColor: 'grey',
		    boxSizing: 'border-box',
		    class:"droppable-block",
		    zIndex: 9999
		  }) .on('click', function () {
			    console.log("Block clicked:", blockName);
			    // Or call a custom function
			    handleBlockClick(this.id);
			  }).on('dblclick', function () {
				  handleBlockDoubleClick(this.id); // double click
			  });;
		  function handleBlockClick(blockId) {
			  console.log("Custom click handler for:", blockId);
			  // Your logic here (e.g., add LED blink class)
			  $("#" + blockId).toggleClass("led blink");
			}
		  

		}
		var ledBlocks = [];
		
		// Collect all block IDs with .led.blink
//		$(".droppable-block.led.blink").each(function () {
//		  ledBlocks.push(this.id);
////		  printLED();
//		});
	
		$("#nextLevel").on("click", function () {
			
			var allocatedBlock=[];
			for(var i=0;i<6;i++)
			{
				  if ($('#block_' + i).hasClass("led blink")) {
					  allocatedBlock.push('block_'+i);
				  
				  }
			}
			  console.log(allocatedBlock);
			    console.log(allocatedBlock.length + " allocatedBlock");
			// Toggle #secondRect based on whether any LEDs are selected
			    if(allocatedBlock.length ==0){
			    	 Swal.fire({
					      icon: 'error',
					      title: 'Set first led on yellow rectangle',
//					      text: '',
					      confirmButtonColor: '#3085d6'
					    });
			    }
			    else if (allocatedBlock.length > 0) {
			    	$("#indicatorDiv").prop("hidden",true);
			    	$("#validate").prop("disabled", false);
			  $("#secondRect").removeClass("no-click");
			  document.getElementById("rectLeft").removeAttribute("ondrop");
			  document.getElementById("rectLeft").removeAttribute("ondragover");
			  ledCnt=allocatedBlock.length;
			} else {
			  $("#secondRect").addClass("no-click");
			}
		});

		// Step 2: Handle block click (only if LED was selected first)
		$(".droppable-block").on("click", function () {
			 
		  if (ledSelected) {
		    $(this).addClass("led blink");
//		    $(this).css("background-color", "blue");
//		    $(this).css("background-color", "red");
		    ledSelected = false; // reset the state
		    $("#img_led").removeClass("selected"); // remove visual cue
		  } else {
		    Swal.fire({
		      icon: 'info',
		      title: 'First Click the LED',
		      text: 'Please click the LED image before selecting a block.',
		      confirmButtonColor: '#3085d6'
		    });
		  }
		});
			
}
