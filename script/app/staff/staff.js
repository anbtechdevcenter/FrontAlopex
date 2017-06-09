/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {

	var wrapId = "#staffWrap",
		gridId = "#grid_staff",
		popupUrl1 = "/html/staff/popup/staffRegist.html",
		popupUrl2 = "/html/staff/popup/staffDetail.html";

	  this.init = function(id, param) {

			initGrid();

			this.defineEvent();

			setData();

	  };


		function setData(){
			readStaff();

			// anbwidget
			$("#ranksel").selectRank();
			$("#projectsel").selectProject();
			$("#codetypesel").selectCodeType();
			$("#stafftypesel").selectCommon({type : 'staffType'});
			$("#workareasel").selectCommon({type : 'workArea'});
			$("#teamsel").selectCommon({type : 'team'});
			//workareasel

			//등록자 id 이름 셋팅
			$("#regEmpId").val($a.session("user_id"));
			$("#regEmpNm").val($a.session("user_id"));

		}

/**
* 이벤트 처리
*/
		this.defineEvent = function(){

			$("#btnSearch").on("click", this.btnSearch);
			$("#btnStaffRegister").on("click", this.btnStaffRegister);
			$("#btnStaffDelete").on("click", this.btnStaffDelete);

			$(gridId).on("dblclick", '.bodycell', this.grid_dblClick);

		};

		/*
		* 직원삭제
		*/
		this.btnStaffDelete = function(){
			var check = confirm("정말 삭제하시겠습니까? 복구가 안됩니다.");
			var selData = $(gridId).alopexGrid("dataGet", {_state :{selected:true}});
//			console.log("seldata ", selData);
			if(check && selData.length>0){

				var userId = AlopexGrid.trimData(selData[0]).empId;
				var msg = '등록완료되었습니다.';
				ANBTX.D('/employee/'+userId, function(res){
					alert(msg);
					readStaff();
				});
			}
		}

    /*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			readStaff();
		};

		this.btnStaffRegister = function(){
			//popupUrl1 = "/html/staff/popup/staffRegist.html",
			var pops =  $a.popup({
				title : '직원등록',
				url : popupUrl1,//'popup/staffRegist.html',
				width:1000,
				height:800,
				callback : function(res){
					if(res=="success"){
						readStaff();
						$(pops).close();
					}
				}
			});
		};

		/*
		* 직원 상세 페이지 이동
		*/
		this.grid_dblClick = function(){
			var sdata = $(gridId).alopexGrid("dataGet", {_state :{focused:true}});
			data = sdata[0];

			$a.popup({
				title : '직원수정',
				data : data,
				url : popupUrl2,
				width:1100,
				height:800,
				callback : function(res){
					console.log("res::::",res);
					if(res=="success"){
						readStaff();
						$(pops).close();
					}
				}
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

					var selData = $(wrapId).getData();
					var newGridData = {};
					if(selData){
						//이름
						if(selData.empNm != ""){
							gridData = res.filter(function(val){
								return val.empNm === selData.empNm;
							});
						}else{
							gridData = res;
						}

						//직급
						if(selData.rankCode != ""){
							gridData = gridData.filter(function(val){
								if(val.rank != null){
									return val.rank.rankCode === selData.rankCode;
								}
							});
						}else{
							gridData = gridData;
						}

						//프로젝트
						if(selData.prjId != ""){
							gridData = gridData.filter(function(val){
								if(val.project != null){
									return val.project.prjId === selData.prjId;
								}
							});
						}else{
							gridData = gridData;
						}

						//코드타입
						//직원유형
						if(selData.empFlag != ""){
							gridData = gridData.filter(function(val){
									if(val.empFlag != ""){
										return val.empFlag === selData.empFlag;
									}
							});
						}else{
							gridData = gridData;
						}


						//근무지역
						if(selData.workCd != ""){
							gridData = gridData.filter(function(val){
									if(val.workPosition != ""){
										return val.workPosition === selData.workCd;
									}
							});
						}else{
							gridData = gridData;
						}

						//팀(아직 소속팀 코드화 안되어 있음)
						if(selData.teamCd != ""){
							gridData = gridData.filter(function(val){
									if(val.team != ""){
										return val.team === selData.teamCd;
									}
							});
						}else{
							gridData = gridData;
						}


						//퇴사 levaveFlag
						if(selData.levaveFlag == true){
							console.log("levaveFlag:::",selData.levaveFlag); //true

							 gridData = gridData.filter(function(val){
							 		if(val.leaveDate != null){
							 			return true;
							 		}
							 });
						}else{
							gridData = gridData;
						}



					}

			 		$('#grid_staff').alopexGrid("dataSet", gridData);
			 	}
		  );
		}



	  //그리드 초기화
	  function initGrid() {
			$(gridId).alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				defaultSorting:{
					sortingColumn: 4,
					sortingDirection: "asc" //"desc"
				},
				sortingNullStringPosition : "bottom",
				columnMapping : [
					{
						selectorColumn : true,
						title: '선택',
						width : '20px',
					},
					{
						numberingColumn : true,
						title: 'No',
						width : '20px',
					},
					{
						key : 'empNm',
						title: '이름',
						width : '60px',
					}, {
						key : 'rank',
						title : '직급',
						width : '30px',
						render : function(value, data, render, mapping, grid){
							var rankName = "";
							if(value){
								rankName = value.rankName;
							}
              return rankName;
            }
					}, {
						key : 'team',
						title : '소속팀',
						width : '50px',
						sorting: true,
            render : function(value, data, render, mapping, grid){
							var rankName = "";
							if(value == "TEAM_SI"){
								rankName = "SI팀";
							} else if(value == "TEAM_SM"){
								rankName = "SM팀";
							} else if(value == "TEAM_DESIGN"){
								rankName = "디자인팀";
							} else if(value == "TEAM_SKILL"){
								rankName = "기술지원팀";
							} else if(value == "TEAM_HEADQUARTERS"){
								rankName = "본부";
							}
              return rankName;
            }
					}, {
						key : 'email',
						title : 'E-mail',
						width : '100px'
					}, {
						key : 'project',
						title : '진행 프로젝트',
						width : '150px',
            render : function(value, data, render, mapping, grid){
              var prjName = "";
              if(value!=null){
                prjName = value.prjNm;
              }
              return prjName;
            }
					}, {
						key : 'enteringDate',
						title : '입사일',
						width : '50px'
					}, {
						key : 'workPosition',
						title : '근무지역',
						width : '50px',
            render : function(value, data, render, mapping, grid){
							var vWorkPosition = "";
							if(value == "SITE_IC"){
								vWorkPosition = "이천";
							} else if(value == "SITE_CJ"){
								vWorkPosition = "청주";
							} else if(value == "SITE_WC"){
								vWorkPosition = "우시";
							} else if(value == "SITE_BD"){
								vWorkPosition = "분당";
							}else{
								vWorkPosition = "선택안됨";
							}
              return vWorkPosition;
            }
					}, {
						key : 'empFlag',
						title : '직원유형',
						width : '50px',
            render : function(value, data, render, mapping, grid){
							var vWorkPosition = "";
							if(value == "STFCD1"){
								vWorkPosition = "정직원";
							} else if(value == "STFCD2"){
								vWorkPosition = "계약직";
							} else if(value == "STFCD3"){
								vWorkPosition = "프리랜서";
							}else{
								vWorkPosition = "선택안됨";
							}
              return vWorkPosition;
            }
					}


				]
			});
	  }

});
