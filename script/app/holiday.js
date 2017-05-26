/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			w3.includeHTML();

			console.log("확인");

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
		}

/**
* 이벤트 처리 1234
*/
		this.defineEvent = function(){
			$("#btnTest").on("click", this.btnTest);

			$("#btnSearch").on("click", this.btnSearch);
			$("#btnStaffRegister").on("click", this.btnStaffRegister);
			$("#btnStaffDelete").on("click", this.btnStaffDelete);

			$("#grid_staff").on("dblclick", '.bodycell', this.grid_dblClick);
		};

		/*
		* 직원삭제
		*/
		this.btnStaffDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = $("#grid_staff").alopexGrid("dataGet", {_state :{selected:true}});
			console.log("seldata ", selData);
			if(check && selData.length>0){

				var userId = AlopexGrid.trimData(selData[0]).empId;

				ANBTX.D('/employee/'+userId, function(res){
					readStaff();
				});
			}
		}


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
				url : 'popup/staffRegist.html'
			});
		};

		/*
		* 직원 상세 페이지 이동
		*/
		this.grid_dblClick = function(){
			console.log('1111');
			//$a.navigate('staffDetail.html', {empId: 'EMP_2017032123252012'});

			var sdata = $("#grid_staff").alopexGrid("dataGet", {_state :{focused:true}});
			console.log("sdata", sdata);
			$a.navigate('staffDetail.html', sdata);
			//if(sdata.length > 0) openPopup('R');
		};

    /*
    * 직원조회
    */
		function readStaff(){
			ANBTX.R('/employee',
			 	function(res){
					console.log("[직원] ", res);
					var gridData = [];

					// res.sort(function(a,b) {
					// 	var aCd = a.rank.rankCode.substr(4,2);
					// 	var bCd = b.rank.rankCode.substr(4,2);
					// 	return aCd < bCd ? -1 : aCd > bCd ? 1 :0 ;
					// });

					var selData = $("#staffWrap").getData();
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

					}

			 		$('#grid_staff').alopexGrid("dataSet", gridData);
			 	}
		  );
		}



	  //그리드 초기화
	  function initGrid() {
			$('#grid_holiday').alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{
						align : 'center',
						selectorColumn : true,
						title: '선택',
						width : '20px',
					},
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '20px',
					},
					{
						key : 'empId',
						title: '아이디',
						width : '100px',
					},
					{
						key : 'empNm',
						title: '이름',
						width : '100px',
					},
					{
						key : 'holidayDay',
						title: 'holidayDay',
						width : '100px',
					},
					{
						key : 'holidayEdate',
						title: 'holidayEdate',
						width : '100px',
					},
					{
						key : 'holidayReason',
						title: 'holidayReason',
						width : '100px',
					},
					{
						key : 'holidaySdate',
						title: 'holidaySdate',
						width : '100px',
					},
					{
						key : 'holidayType',
						title: 'holidayType',
						width : '100px',
					},
					{
						key : 'regEmpId',
						title: '등록자ID',
						width : '100px',
					},
					{
						key : 'regEmpNm',
						title: '등록자명',
						width : '100px',
					},
					{
						key : 'registDt',
						title: '등록일',
						width : '100px',
					},
					{
						key : 'seqHoliday',
						title: 'seqHoliday',
						width : '100px',
					},
					{
						key : 'app1Date',
						title: 'app1Date',
						width : '100px',
					},
					{
						key : 'app1EmpId',
						title: 'app1EmpId',
						width : '100px',
					},
					{
						key : 'app1EmpNm',
						title: 'app1EmpNm',
						width : '100px',
					},
					{
						key : 'app2Date',
						title: 'app2Date',
						width : '100px',
					},
					{
						key : 'app2EmpId',
						title: 'app2EmpId',
						width : '100px',
					},
					{
						key : 'app2EmpNm',
						title: 'app2EmpNm',
						width : '100px',
					}
				]
			});
	  }

});
