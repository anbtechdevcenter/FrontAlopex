/*********************************
* 프로젝트 관리
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
		//ctrl+c 서버 멈춤, npm start
		//그리드 초기화
		  /* 김영우 대리 작업 */
		initGrid();

		this.defineEvent();

		setData();

	  };


		function setData(){
			readProjectList();
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
			readProjectList();
		};


    /*
    * 프로젝트 조회
    */
		function readProjectList(){
			ANBTX.R('/project',
			 	function(res){
					$('#grid1').alopexGrid("dataSet", res);
			 	}
		  );
		}

		/*
		*		프로젝트 등록
		*/
		this.btnRegiste = function(){
			openPopup('C');
		};

		/*
		* 프로젝트 조회
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
			var popupUrl = "/html/manage/popup/projectPopup.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
				 data : data,
				 iframe : false,
				 width : 400,
				 height : 300,
				 callback : function(res){
					 if(res=="success"){
						 readProjectList();
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
					{ key : 'prjNm', title: '프로젝트 명', width : '100px' },
					{ key : 'startDate', title : '시작일', width : '40px' },
					{ key : 'endDate', title : '종료일', width : '40px' },
					{ key : 'prjStatus', title : '상태', width : '30px',
						render : function(value, data, mapping){
							if(value == 'Active'){
								return "진행중";
							}else{
								return "종료";
							}
						}
					},
					{ key : 'prjId', title : 'seqBoard', hidden : true }
				]
			});
	  }

});
