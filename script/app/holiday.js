/*********************************
* 근태관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			w3.includeHTML();

			initGrid();

			this.defineEvent();

			setData();

	  };


		function setData(){
			readHoliday();

			// anbwidget
			$("#ranksel").selectRank();
			$("#projectsel").selectProject();

			//workareasel

		}

/**
* 이벤트 처리
*/
		this.defineEvent = function(){
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnHolidayRegister").on("click", this.btnHolidayRegister);
			$("#btnHolidayDelete").on("click", this.btnHolidayDelete);

			$("#grid_holiday").on("dblclick", '.bodycell', this.grid_dblClick);
		};

		/*
		* 근태삭제
		*/
		this.btnStaffDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = $("#grid_holiday").alopexGrid("dataGet", {_state :{selected:true}});
			console.log("seldata ", selData);
			if(check && selData.length>0){

				var userId = AlopexGrid.trimData(selData[0]).empId;

				ANBTX.D('/holiday/'+userId, function(res){
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
			readHoliday();
		};

		this.btnStaffRegister = function(){
			$a.popup({
				title : '직원등록',
				url : 'popup/staffRegist.html'
			});
		};

		/*
		* 근태 상세 페이지 이동
		*/
		this.grid_dblClick = function(){

			var sdata = $("#grid_holiday").alopexGrid("dataGet", {_state :{focused:true}});
			console.log("sdata", sdata);
			$a.navigate('holidayDetail.html', sdata);
			//if(sdata.length > 0) openPopup('R');
		};

    /*
    * 근태조회
    */
		function readHoliday(){
			ANBTX.R('/holiday',
			 	function(res){
					console.log("[근태] ", res);

					//var selData = $("#holidayWrap").getData();

			 		$('#grid_holiday').alopexGrid("dataSet", res);
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
						title: '사번',
						width : '100px',
					},
					{
						key : 'empNm',
						title: '이름',
						width : '100px',
					},
					{
						key : 'holidayDay',
						title: '휴일일수',
						width : '100px',
					},
					{
						key : 'holidayEdate',
						title: '종료일자',
						width : '100px',
					},
					{
						key : 'holidayReason',
						title: '사유',
						width : '100px',
					},
					{
						key : 'holidaySdate',
						title: '시작일자',
						width : '100px',
					},
					{
						key : 'holidayType',
						title: '휴일특근코드',
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
						title: '휴일순번',
						width : '100px',
					},
					{
						key : 'app1Date',
						title: '결재1_일자',
						width : '100px',
					},
					{
						key : 'app1EmpId',
						title: '결재1_ID',
						width : '100px',
					},
					{
						key : 'app1EmpNm',
						title: '결재1_명',
						width : '100px',
					},
					{
						key : 'app2Date',
						title: '결재2_일자',
						width : '100px',
					},
					{
						key : 'app2EmpId',
						title: '결재2_ID',
						width : '100px',
					},
					{
						key : 'app2EmpNm',
						title: '결재2_명',
						width : '100px',
					}
				]
			});
	  }

});
