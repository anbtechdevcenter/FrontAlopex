/*********************************
* 직원등록
* @author : anbtechdevcenter
* @author : 김수한
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			//console.log('param::::',param);
			// 인클루드 처리를 위한 내용
			//w3.includeHTML();

			this.defineEvent();

  		setData(param);

	  };


		function setData(data){
			//console.log('setData:::',data);
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
				if(data.empFlag != undefined){
					$("#stafftypesel").selectCommon({type : 'staffType', para:data.empFlag});
				}else{
					$("#stafftypesel").selectCommon({type : 'staffType'});
				}


				//업무지역
				if(data.workPosition != ""){
					$("#workareasel").selectCommon({type : 'workArea', para:data.workPosition});
				}else{
					$("#workareasel").selectCommon({type : 'workArea'});
				}

				//팀
				if(data.workPosition != ""){
					$("#teamsel").selectCommon({type : 'team', para:data.team});
				}else{
					$("#teamsel").selectCommon({type : 'team'});
				}

				//직원구분
				if(data.workPosition != ""){
					$("#empFlagsel").selectCommon({type : 'staffType', para:data.workPosition});
				}else{
					$("#empFlagsel").selectCommon({type : 'staffType'});
				}

				//결혼유무
				if(data.maritalState != ""){
					$("#maritalsel").selectCommon({type : 'maritalState', para:data.maritalState});
				}else{
					$("#maritalsel").selectCommon({type : 'maritalState'});
				}

				// 생일상태
				if(data.lunarState != ""){
					$("#lunarStatesel").selectCommon({type : 'lunarState', para:data.lunarState});
				}else{
					$("#lunarStatesel").selectCommon({type : 'lunarState'});
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
				$("#maritalsel").selectCommon({type : 'maritalState'});
				$("#lunarStatesel").selectCommon({type : 'lunarState'});
			}

			//등록자 id 이름 셋팅
			$("#regEmpId").val($a.session("user_id"));
			$("#regEmpNm").val($a.session("user_id"));

		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnStaffUpdate").on("click", this.btnStaffUpdate);
			$("#btnClose").on("click", this.btnClose);
		};


    /*
    * 저장 버튼 액션
    */
		this.btnStaffUpdate = function(e){

			var data = $("#bindarea").getData();

      var check = $("#bindarea").validate();

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

				//console.log("[get vData is] " , JSON.stringify(vData));
				ANBTX.U('/employee' , vData, function(res){
		      //console.log("[직원등록] ", res);
					if(res.error == '201'){
						var msg = "수정 되었습니다.";
						alert(msg);
						$a.close('success');
					}
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
