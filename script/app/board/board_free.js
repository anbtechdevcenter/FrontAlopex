/*********************************
* 설명 작성
* @author : 김영우대리
* @create : 2017-05-29
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#wrapId",
    gridId = "#grid",
		popupUrl = "/html/manage/popup/codeTypePopup.html";

	  this.init = function(id, param) {

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
			readBoard();
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      // 아래는 기본 CRUD 처리.
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnRegiste").on("click", this.btnRegiste);
			$("#grid1").on("dblclick", '.bodycell', this.grid_dblClick);


      // 기타 이벤트 정의
		};

		/*
    * 직원조회
    */
		function readBoard(){
			var apiId = '/board';
			ANBTX.R(apiId,
			 	function(res){
					// 조회 조건이 있을 경우 filter 적용
			 		if($('#nm').val().length != 0){
						var result = res.filter(function(item){
							return item.regEmpNm === $('#nm').val();
						});
						$('#grid1').alopexGrid("dataSet", result);
					}else{
						$('#grid1').alopexGrid("dataSet", res);
					}
			 	}
		  );
		}

		/*
		*		글 작성
		*/
		this.btnRegiste = function(){
			openPopup('C');
		};

		/*
		* 게시글 조회
		*/
		this.grid_dblClick = function(){
			var sdata = $("#grid1").alopexGrid("dataGet", {_state :{focused:true}});
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
				title = '글 작성';
			}else if(type == 'R'){
				var sdata = $("#grid1").alopexGrid("dataGet", {_state :{focused:true}});
				data = sdata[0];
				data.type = type;
        //console.log(data);
				title = '글 수정';
			}
			var popupUrl = "/html/board/popup/boardPopup_free.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
         height: 470,
				 data : data,
				 callback : function(res){
					 if(res=="success"){
						 readBoard();
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
					{ key : 'boardTitle', title: '제목', width : '100px' },
					{ key : 'regEmpNm', title : '작성자', width : '40px', },
					{ key : 'registDate', title : '작성일', width : '40px' },
					{ key : 'regEmpId', title : '작성자ID', hidden : true },
					{ key : 'seqBoard', title : 'seqBoard', hidden : true }
				]
			});
	  }

});
