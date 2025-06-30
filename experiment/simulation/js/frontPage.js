function frontPage(){
	htm=`
<div class="row justify-content-center" >
            
            <div class="col-md-4" style="border-style: solid;padding:5px ;margin:5px;">
                <div class="card p-3">
<!--                     <h5 class="text-center">Pre_Commissioning</h5> -->
              			<img src="images/frontflat1.PNG" class="img_fluid">

                    <button class="btn btn-success " id="frontflat" style="float:right;margin: 10px;background-color:teal;"  >DESIGN FRONT FLAT</button>
<!--                		   <button class="btn btn-success " id="" style="float:right;margin: 10px;background-color:teal;"  >START AIR FILTER</button> -->
               
                </div>
            </div>
<!--              <div class="col-md-4" style="border-style: solid;padding:5px ;margin:5px;">
                <div class="card p-3">

              			<img src="images/desktype.PNG" class="img_fluid">

                    <button class="btn btn-success " id="desktype" style="float:right;margin: 10px;background-color:teal;"  >DESIGN DESK TYPE</button>

               
                </div>
            </div> -->
        
        </div>
	
	`;
	$("#main-div").html(htm);
	
	$("#frontflat").on("click", function () {
		console.log("front flat");
		mainPageFlat();
	});
	$("#desktype").on("click", function () {
		mainPageDesk();
	});
}