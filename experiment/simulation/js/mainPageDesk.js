function mainPageDesk() {
	$("#header").html("DESK TYPE");
	$("#buttonDiv").prop("hidden",false);
//	$("#step1").prop("hidden",true);
	$("#step1").html(`
	<b>Step 1 :</b> Drag the computer console or mimic and drop it into any available block.`);
	var htm=`
	
	<div class="row">
	<div class="col-sm-3">
	
  	  <select id="indicatorSelect" class="form-select ">
        <option value="" disabled selected >Select type of desk</option>
        <option value="mimic">Mimic</option>
        <option value="compConsole">Computer console</option>
        
      </select>
     	
	<p class="img-label">INDICATORS</p>
	<div class="responsive-rectangle" id="firstRect" hidden>
     <div class="control-box" id="imgRender">
       
    </div>

    </div>
   <div class="row" id="Divindicator">
    <div class="alert alert-primary  " style="float: left;    border: 2px solid;    border: 2px solid;margin-top:5px;" role="alert">
		You must place the Mimic component first to enable other indicators."
		<br><button type="button" id="nextLevel" class="btn btn-primary" style="background-color:teal;float:right;" disabled ><b>Enabled indicators  </b></button>
		
	
		</div>
  	</div>
  	
  <div class="responsive-rectangle no-click" id="secondRect">
  
			   <div class="control-box" >
			  <img src="images/r1.jpg" alt="Pressure" id="img_pressure"  >
			</div>
			<div class="control-box">
			  <img src="images/s1.jpg" alt="Pressure" id="img_s1">
			</div>
			<div class="control-box">
			  <img src="images/element.png" alt="3 ELEMENT CONTROLLER" id="img_element3">
			</div>
			<div class="control-box">
			  <img src="images/steam.PNG" alt="Steam Flow" id="img_steam">
			</div>
			<div class="control-box">
			  <img src="images/mnv.png" alt="Cold Flow" id="img_meter">
			</div>
			<div class="control-box">
			  <img src="images/tc.png" alt="Temp Controller" id="img_tc">
			</div>
			<div class="control-box">
			  <img src="images/alram2.png" alt="ALARM ACK" id="img_alarm">
			</div>
			<div class="control-box">
			  <img src="images/yellow.png" alt="yellow" id="yellow">
			</div>
			<div class="control-box">
			  <img src="images/speed.png" alt="Speed" id="speed">
			</div>
    
  </div>
  
  
</div>

		<div class="col-sm-7">
	  <div class="responsive-rectangle2">
	  
	    <div class="  left-half1 ">
	      <div class="inner-rectangle-left1" id="rectLeft"  ondrop="drop(event)" ondragover="allowDrop(event)"></div>
	    </div>
	 </div>
	     <div class="responsive-rectangle2" STYLE="height: 50%;"> 
	    <div class="  right-half1 ">
	       <div class="inner-rectangle-right1" id="rectRight" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
	    </div>
	    
	  </div>
	</div>
	</div>

	`;
	$("#main-div").html(htm);
	$("#indicatorSelect") .on('change', function ()  {
		    const selectedValue = this.value;
		    console.log("Selected desk type:", selectedValue);

		    // You can run conditional logic here
		    if (selectedValue === "mimic") {
		    	
		      // Do something for Mimic
		    	$("#firstRect").prop("hidden",false);
		    		$("#imgRender").html(`
		    		 <img src="images/boilerDiagram.png" alt="Boiler Diagram" id="boilerImage"  draggable="true" ondragstart="event.dataTransfer.setData('text', this.id)">
     
		    		`);
		    } else if (selectedValue === "compConsole") {
		      // Do something for Computer Console
		    	$("#firstRect").prop("hidden",false);
		    	$("#imgRender").html(`
			    		 <img src="images/pc.jpg" alt="Computer Console" id="compConsole"  draggable="true" ondragstart="event.dataTransfer.setData('text', this.id)">
	     
			    		`);
		    }
		  });
	
		  const labelMap = {
		  
		    img_pressure: "Pressure Gauge",
		    img_s1: "Sensor 1",
		    img_element3: "3 Element Controller",
		    img_steam: "Steam Flow",
		    img_meter: "Cold Flow",
		    img_tc: "Temp Controller",
		    speed: "speed",
		    yellow:"yellow",
		    img_yellow: "Control Supply",
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

		  $(".inner-rectangle-left1, .inner-rectangle-right1").droppable({
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
		      }

		      // Append the clone to the drop target
		      $(this).append(clone);
		      clone.draggable({
		        containment: this,
		        revert: "invalid",
		        start: function () {
		          $("body").append('<div id="drag-coords" style="position:absolute; padding:2px 6px; background:#000; color:#fff; font-size:12px; border-radius:4px;  z-index:9999;"></div>');
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

		 window.drop = function(ev) {
			  console.log("window drop");
			  ev.preventDefault();
			  let dropTarget = ev.target;
			  if (ev.dataTransfer != null || ev.dataTransfer != undefined) {
			    var data = ev.dataTransfer.getData("text");
			    var draggedImage = document.getElementById(data);

			    // Clone the image
			    var imageCopy = draggedImage.cloneNode(true);
			    imageCopy.removeAttribute("id"); // remove duplicate ID
			    imageCopy.id = "mimicImg";
			    imageCopy.setAttribute("draggable", false);
			    imageCopy.style.width = "100%";
			    imageCopy.style.height = "100%";
			    imageCopy.style.objectFit = "fill";
			    imageCopy.style.borderRadius = "4px";
			    imageCopy.style.position = "relative";

			    ev.target.innerHTML = "";
			    ev.target.appendChild(imageCopy);

			    const $img = $("#mimicImg");
			    const imgPos = $img.position();
			    const $parent = $img.parent();
			    const parentWidth = $parent.width();
			    const parentHeight = $parent.height();
			    const topPercent = (imgPos.top / parentHeight) * 100;
			    const leftPercent = (imgPos.left / parentWidth) * 100;

			    console.log('Top %:', topPercent.toFixed(2) + '%');
			    console.log('Left %:', leftPercent.toFixed(2) + '%');

			    // 🔍 Check if dragged image is boiler
			    if (data === "boilerImage") {
			      CreateBlock($img, 52, 20);
			      CreateBlock($img, 84, 43);
			      CreateBlock($img, 82, 63);
			      CreateBlock($img, 55, 80);
			      CreateBlock($img, 87, 24);
			      CreateBlock($img, 36, 3);

			      Swal.fire({
			        icon: 'success',
			        title: 'Next step',
			        text: 'Click on yellow rectangle to set LED Light',
			        confirmButtonColor: '#3085d6'
			      });

			      $("#firstRect").addClass("no-click");
			      $("#nextLevel").prop("disabled", false);
			      
			    } else if(data==="compConsole") {
			    	
			    	$("#firstRect").addClass("no-click");
				      $("#nextLevel").prop("disabled", false);
			      // 🚨 Handle non-boiler image drop here
//			      Swal.fire({
//			        icon: 'info',
//			        title: 'Different image dropped',
//			        text: 'This is not the boiler image.',
//			        confirmButtonColor: '#3085d6'
//			      });

			      // Optionally: add different blocks or skip block generation
			      // CreateBlock($img, ...); // if needed
			    }
			  }
			}

		
		

		function CreateBlock($img, x, y) {
//			console.log("create Block call");
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
//		  console.log(parentClass); // Output: "inner-rectangle-left"
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
		    width: '3%',
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
			var seletedType=$("#indicatorSelect").val();
			if(seletedType=="mimic")
			{
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
//						      text: '',
						      confirmButtonColor: '#3085d6'
						    });
				    }
				    else if (allocatedBlock.length > 0) {
				  $("#secondRect").removeClass("no-click");
				  document.getElementById("rectLeft").removeAttribute("ondrop");
				  document.getElementById("rectLeft").removeAttribute("ondragover");
				} else {
				  $("#secondRect").addClass("no-click");
				}
			
			}
			else
				{
				 $("#secondRect").removeClass("no-click");
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
