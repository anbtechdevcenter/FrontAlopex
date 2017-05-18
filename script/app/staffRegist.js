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
			readRank();
			readStaff();
		}

/**
* 이벤트 처리 1234
*/
		this.defineEvent = function(){
			$("#btnTest").on("click", this.btnTest);

			$("#btnSearch").on("click", this.btnSearch);
			$("#btnStaffRegister").on("click", this.btnStaffRegister);
		};

		/*
		* 테스트
		*/
		this.btnTest = function() {
			var data = $("#staffWrap").getData();
			console.log("[get data is] " , data);
		}

    /*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			readStaff();
		};

		this.btnStaffRegister = function(){
			$a.popup({
				title : '직원등록',
				url : 'staffRegist.html'
			});
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

    /**
		* 직급 처리
		*/
		function readRank(){
			ANBTX.R('/rank', function(res){
				//console.log("[rank is] ", res);
				res.unshift({"rankCode":"", "rankName": "==선택=="});

				$("#staffWrap").setData({
					rankList: res
				});
			});
		}




});
