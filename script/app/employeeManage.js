/*********************************
* 직원 관리
* 작업자 : 김영우 대리
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			initGrid();
			this.defineEvent();
			setData();
	  };


		function setData(){
			MainList();
		}

/**
* 이벤트 처리
*/
		this.defineEvent = function(){
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnRegiste").on("click", this.btnRegiste);
			$("#grid1").on("click", '.bodycell', this.grid_dblClick);
		};


    /*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			MainList();
		};


    /*
    * 프로젝트 조회
    */
		function MainList(){
			ANBTX.R('/employee',
			 	function(res){
					$('#grid1').alopexGrid("dataSet", res);
			 	}
		  );
		}

		/*
		*		직원 등록
		*/
		this.btnRegiste = function(){
			openPopup('C');
		};

		/*
		* 직원 조회
		*/
		this.grid_dblClick = function(){
			var sdata = $("#grid1").alopexGrid("dataGet", {_state :{selected:true}});
			if(sdata.length > 0) openPopup('R');
		};

		/*
		* 팝업 호출 공통 함수
		* 1. 등록 : type - C
		  2. 수정 : type - R
		*/
		function openPopup(type){
			var data = {};
			var title = '';
			if(type == 'C'){
				data.type = type;
				title = '프로젝트 등록';
			}else if(type == 'R'){
				var sdata = $("#grid1").alopexGrid("dataGet", {_state :{selected:true}});
				data = sdata[0];
				data.type = type;
				title = '프로젝트 관리';
			}
			console.log(data);
			var popupUrl = "/html/manage/popup/employeePopup.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
				 data : data,
				 iframe : false,
				//  width : 400,
				//  height : 300,
				 callback : function(res){
					 if(res=="success"){
						 MainList();
						 $(pops).close();
					 }
				 }
			 });
		}



	  //그리드 초기화
	  function initGrid() {
			$('#grid1').alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{ align : 'center', numberingColumn : true, title: 'No', width : '20px' },
					{ key : 'empNm', title: '이름', width : '100px' },
					{ key : 'birthDate', title : '생일', width : '40px' },
					{ key : 'enteringDate', title : '입사일', width : '40px' },
					{ key : 'empHp', title : '휴대번호', width : '30px' },
					{ key : 'empId', title : 'key', hidden : true }
				]
			});
	  }

});
