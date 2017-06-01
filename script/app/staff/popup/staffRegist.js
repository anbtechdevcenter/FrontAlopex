/*********************************
* 직원등록
* @author : 김수한
* @create : 2017-05-18
*************************************/
$a.page(function() {
	var gridId = "#grid",
		wrapId = "#divWrap",
		btnCId = "#btnCreate",
		btnUId = "#btnUpdate",
		btnDId = "#btnDelete";
	  this.init = function(id, param) {

  		this.defineEvent();

  		setData();

	  };


		function setData(){
      $(wrapId).validator();
			readStaff();

			// anbwidget
			$("#userRank").selectRank();
			$("#userProject").selectProject();

		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnRegist").on("click", this.btnRegist);
			$("#btnClose").on("click", this.btnClose);

		};


    /*
    * 저장 버튼 액션
    */
		this.btnRegist = function(e){
      var check = $(wrapId).validate();

      if(check){
        var data = $(wrapId).getData();
        console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
				var vData = {empNm: data.empNm, email: data.email, project :{prjId : data.prjId}, rank: {rankCode : data.rankCode}};
				console.log("[get vData is] " , vData);
	      ANBTX.C('/employee' , vData, function(res){
	          console.log("[직원등록] ", res);
						$a.close('success');
	      });
      }else{
        console.log("stop");

      }

      e.preventDefault();

		};

		/*
    * 닫기 버튼 액션
    */
		this.btnClose = function(e){
			$a.close();
		};

    /*
    * 직원조회
    */
		function readStaff(){
			ANBTX.R('/employee',
			 	function(res){
					console.log("[직원] ", res);
					var gridData = [];

					var selData = $(wrapId).getData();
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
