/*********************************
* 식권상세
* @author : 김수한
* @create : 2017-05-31
*************************************/
$a.page(function() {
	  this.init = function(id, param) {

			this.defineEvent();

  		setData(param);

	  };


		function setData(data){
			console.log('setData:::',data);
			// anbwidget
			//$("#ranksel").selectRank();
			//$("#projectsel").selectProject(); //프로젝트
			//랭크
			if(data != undefined){
				if(data.rank != undefined){
					$("#ranksel").selectRank({para:data.rank.rankCode});
				}else{
					$("#ranksel").selectRank();
				}

				//프로젝트
				if(data.project != undefined){
					$("#projectsel").selectProject({para:data.project.prjId});
				}else{
					$("#projectsel").selectProject();
				}

				//직원타입
				$("#stafftypesel").selectCommon({type : 'staffType'});

				//업무지역
				if(data.workPosition != ""){
					$("#workareasel").selectCommon({type : 'workArea', para:data.workPosition}); //업무지역
				}else{
					$("#workareasel").selectCommon({type : 'workArea'}); //업무지역
				}

				//팀
				if(data.workPosition != ""){
					$("#teamsel").selectCommon({type : 'team', para:data.team}); //팀
				}else{
					$("#teamsel").selectCommon({type : 'team'});
				}

				//직원구분
				if(data.workPosition != ""){
					$("#empFlagsel").selectCommon({type : 'staffType', para:data.empFlag}); //직원구분
				}else{
					$("#empFlagsel").selectCommon({type : 'staffType'});
				}

				//직원
				if(data.empId != ""){
					$("#staffsel").selectStaff({type:"empId", para : param.empId});
				}else{
					$("#staffsel").selectStaff({type:"empId"});
				}

				//데이터 바인딩
				$('#bindarea').setData(data);

			}else{
				$("#ranksel").selectRank();
				$("#projectsel").selectProject();
				$("#stafftypesel").selectCommon({type : 'staffType'});
				$("#workareasel").selectCommon({type : 'workArea'});
				$("#teamsel").selectCommon({type : 'team'});
				$("#empFlagsel").selectCommon({type : 'staffType'});

				$("#staffsel").selectStaff({type:"empId"});
			}

		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnStaffUpdate").on("click", this.btnStaffUpdate);
		};


    /*
    * 저장 버튼 액션
    */
		this.btnStaffUpdate = function(e){

			 var data = $("#bindarea").getData();
			 //console.log("[data is] ", data);

			//return false;

      var check = $("#bindarea").validate();

			//console.log(" >> ", check);
      if(check){
        var data = $("#bindarea").getData();
        //console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
				var vData = data;
				//object일 경우
				vData['project'] = {};
				vData.project.prjId = data.prjId;
				vData['rank'] = {};
				vData.rank.rankCode = data.rankCode;
				//var vData = {empNm: data.empNm, email: data.email, project :{prjId : data.prjId}, rank: {rankCode : data.rankCode}};

				vData.team = data.teamCd;
				vData.workPosition = data.workCd;
			 	//vData = JSON.stringify(vData);
			 	delete vData.teamCd;
			 	delete vData.workCd;

				console.log("[get vData is] " , JSON.stringify(vData));
				alert('현재 수정은 안됨(400에러(Bad Request 발생 - 주석처리))');
	      // ANBTX.U('/employee' , vData, function(res){
	      //     console.log("[직원등록] ", res);
				// 		//$a.navigate('staff.html');
	      // });
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
