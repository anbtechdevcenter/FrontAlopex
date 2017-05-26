/*********************************
* 직원등록
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {

			this.defineEvent();

  		setData(param[0]);

	  };


		function setData(data){
			console.log(data);
			// anbwidget
			$("#ranksel").selectRank();
			//$("#ranksel").selectRank({para:data.rank.rankCode}); //랭크
			//$("#projectsel").selectProject({para:data.project.prjId}); //프로젝트
			$("#projectsel").selectProject(); //프로젝트
			$("#stafftypesel").selectCommon({type : 'staffType'}); //직원타입
			$("#workareasel").selectCommon({type : 'workArea'}); //업무지역
			$("#teamsel").selectCommon({type : 'team', para:data.team}); //팀

			$('#bindarea').setData(data);

			//selectbox bind
			$('#ranksel').setSelected("RANK30");
		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnStaffRegister").on("click", this.btnStaffRegister);
		};


    /*
    * 저장 버튼 액션
    */
		this.btnStaffRegister = function(e){

			// var data = $("#bindarea").getData();
			// console.log("[data is] ", data);

			//return false;

      var check = $("#bindarea").validate();

			console.log(" >> ", check);
      if(check){
        var data = $("#bindarea").getData();
        console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
				var vData = data;
				//object일 경우
				vData['project'] = {};
				vData.project.prjId = data.prjId;
				vData['rank'] = {};
				vData.rank.rankCode = data.rankCode;
				//var vData = {empNm: data.empNm, email: data.email, project :{prjId : data.prjId}, rank: {rankCode : data.rankCode}};

				vData.team = data.teamCd;

				console.log("[get vData is] " , vData);
	      ANBTX.C('/employee' , vData, function(res){
	          console.log("[직원등록] ", res);
						$a.navigate('staff.html');
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
