/*********************************
* 근태관리
* @author : 김수한
* @create : 2017-05-26
*************************************/
$a.page(function() {

		var wrapId = "#divWrap",
			gridId = "#grid_Holiday",
			btnR = "#btnR",
			btnD = "#btnD",
			popupUrl1 = "/html/staff/popup/staffRegist.html",
			popupUrl2 = "/html/staff/popup/staffDetail.html";

	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			//w3.includeHTML();

			initGrid();

			this.defineEvent();

			setData();

	  };


		function setData(){
			readHoliday();

			// anbwidget
			$("#ranksel").selectRank();
			$("#projectsel").selectProject();

		}

/**
* 이벤트 처리
*/
		this.defineEvent = function(){
			$("#btnR").on("click", this.btnR);
			$("#btnC").on("click", this.btnC);
			$("#btnD").on("click", this.btnD);

			$(gridId).on("dblclick", '.bodycell', this.grid_dblClick);
		};;

		/*
		* 근태삭제
		*/
		this.btnD = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = $(gridId).alopexGrid("dataGet", {_state :{selected:true}});
			console.log("seldata ", selData);
			if(check && selData.length>0){

				var userId = AlopexGrid.trimData(selData[0]).empId;

				ANBTX.D('/holiday/'+userId, function(res){
					if(res.status == '204'){
						readHoliday();
					}
				});
			}
		}

    /*
    * 조회 버튼 액션
    */
		this.btnR = function(){
			readHoliday();
		};

		/*
    * 근태 등록 버튼 액션
    */
		this.btnC = function(){
			$a.popup({
				title : '근태등록',
				url : 'holiday/popup/holidayRegist.html',
				width:1100,
				height:900,
			});
		};

		/*
		* 근태 상세 페이지 이동
		*/
		this.grid_dblClick = function(){

			var sdata = $(gridId).alopexGrid("dataGet", {_state :{focused:true}});
			console.log("sdata", sdata);
			//$a.navigate('holidayDetail.html', sdata);

			$a.popup({
				title : '근태수정',
				url : 'holiday/popup/holidayDetail.html',
				data : sdata[0],
				width:1100,
				height:900,
			});

		};

    /*
    * 근태조회
    */
		function readHoliday(){
			var pid = '/holiday/loginUser';
			//console.log('pid :: ' + pid);
			ANBTX.R(pid,
			 	function(res){
					console.log("readHoliday [근태] ", res);

					//var selData = $("#holidayWrap").getData();

			 		$(gridId).alopexGrid("dataSet", res);
			 	}
		  );
		}

	  //그리드 초기화
	  function initGrid() {
			$(gridId).alopexGrid({
				autoColumnIndex: true,
        defaultColumnMapping : {
          align : 'center'
        },
				headerGroup: [{fromIndex:5, toIndex:6, title:"휴가"}],
				defaultSorting:{
					sortingColumn: 2,
					sortingDirection: 'asc'
				},
				footer : {
						//position : "top", //헤더 아래에 footer를 표시합니다.
						footerMapping : [
								{columnIndex:3, title:"총원", align:"center"},//셀에 표현하는 텍스트의 정렬방향을 정할 수 있습니다.
								{columnIndex:4, render:"count(4)"},//통계함수의 결과값만 셀에 표현합니다.
						]
				},
				//셀의 rowspan 기능은 grouping 된 범위를 따라갑니다.
				grouping : {
						useGrouping : true,
						useGroupRowspan : true,
						useGroupRearrange:true,
						useDragDropBetweenGroups: true,
						by : ['empId','empNm'],
						useGroupFooter : ['empId'],
				},
				columnMapping : [
					{
						align : 'center',
						selectorColumn : true,
						title: '선택',
						width : '40px',
					},
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '40px',
					},
					{
						key : 'empId',
						title: '사번',
						width : '100px',
						sorting: true,
						rowspan : true
					},
					{
						key : 'empNm',
						title: '이름',
						width : '100px',
						rowspan : true
					},
					{
						key : 'holidayDay',
						title: '일수',
						width : '100px',
						groupFooter:['휴일 합계 ','sum(holidayDay)','일'],
						groupFooterAlign:'center',
					},
					{
						key : 'holidaySdate',
						title: '시작일자',
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
