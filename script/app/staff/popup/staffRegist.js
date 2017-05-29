/*********************************
* 직원등록
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {


  		this.defineEvent();

  		setData();

	  };


		function setData(){
      $("#staffWrap").validator();
			readStaff();

			// anbwidget
			$("#userRank").selectRank();
			$("#userProject").selectProject();

		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnStaffRegister").on("click", this.btnStaffRegister);
		};


    /*
    * 조회 버튼 액션
    */
		this.btnStaffRegister = function(e){
			console.log("click");
			var data = $("#staffRegistWrap").getData();
			console.log("[data is] ", data);

			//return false;

      var check = $("#staffWrap").validate();

			console.log(" >> ", check);
			return false;
      if(check){
        var data = $("#staffWrap").getData();
        console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
				var vData = {empNm: data.empNm, email: data.email, project :{prjId : data.prjId}, rank: {rankCode : data.rankCode}};
				console.log("[get vData is] " , vData);
	      ANBTX.C('/employee' , vData, function(res){
	          console.log("[직원등록] ", res);
	      });
      }else{
        console.log("stop");

      }

      e.preventDefault();

		};


    /*
    * 직원조회
    */
		function readStaff(){
			ANBTX.R('/employee',
			 	function(res){
					console.log("[직원] ", res);
					var gridData = [];

					var selData = $("#staffWrap").getData();
					//console.log("selData is ", selData);
					if(selData){
						if(selData.rankCode!=""){
						//	console.log("[1] ", selData.rankCode);
							gridData = res.filter(function(val){
								//console.log("[val us ] ", val);
								return val.rank.rankCode === selData.rankCode;
							});
						}else{
							gridData = res;
						}


					}

			 		$('#grid_staff').alopexGrid("dataSet", gridData);
			 	}
		  );
		}





});
