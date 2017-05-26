/*********************************
* 설명 작성
* @author : 김영우 대리
* @create : 2017-05-26
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#wrapId",
    gridId = "#grid1",
		popupUrl = "/html/project/popup/projectPopup.html";



	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			w3.includeHTML();
      // 그리드 존재시 그리스 선언부 함수 (구현코드는 제일 하단에 위치함)
			initGrid();

      // 이벤트 정의 함수부분
			this.defineEvent();

      // 화면 초기 데이터 및 초기 화면 그리는 부분 함수
			setData();

	  };

    /***************************************
    * @constructor : 초기 화면 로딩시 필요한
    * 데이터 세팅 및 UI Draw 코드 처리
    ****************************************/
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



		/**
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/
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
			var popupUrl = "/html/project/popup/projectPopup.html";
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


    /***************************************
    * @constructor : 그리드 초기화
    *
    ****************************************/
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
