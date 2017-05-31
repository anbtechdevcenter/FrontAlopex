/*********************************
* 소장되어 있는 도서 목록 출력
* 추후에 조회조건 추가 예정
* @author : 김영우 대리
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
		popupUrl = "/html/book/popup/bookPopup.html";


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
      mainList();
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      // 아래는 기본 CRUD 처리.
      $("#btnC").on("click", this.btnC);
			//$("#btnR").on("click", this.btnR);
			//$("#btnU").on("click", this.btnU);
			//$("#btnD").on("click", this.btnD);


      // 기타 이벤트 정의
			$("#grid").on("click", '.bodycell', this.grid_dblClick);
		};

    /**
		* 도서 등록 함수
		*/
		this.btnC = function(){
      openPopup('C');
		}

		/**
		* R
		*/
		this.btnR = function(){

		}

    /**
		* R
		*/
		this.btnU = function(){

		}

    /**
		* R
		*/
		this.btnD = function(){

		}


		/**
		* 목록 조회 함수
		*/
    function mainList(){
      var apiId = '/book';
			ANBTX.R(apiId,
			 	function(res){
          console.log(res);
					$('#grid').alopexGrid("dataSet", res);
			 	}
		  );
    }
    /**
    * 도서 상세 정보 조회
    */
    this.grid_dblClick = function(){
			var sdata = $("#grid").alopexGrid("dataGet", {_state :{selected:true}});
			if(sdata.length > 0) openPopup('R');
		};
    /**
    * 공통 transaction 호출 함수
    */
    function openPopup(type){
			var data = {};
			var title = '';
			if(type == 'C'){
				data.type = type;
				title = '도서등록';
			}else if(type == 'R'){
				var sdata = $("#grid").alopexGrid("dataGet", {_state :{selected:true}});
				data = sdata[0];
				data.type = type;
        console.log(data);
				title = '도서정보 상세조회';
			}
			var popupUrl = "/html/book/popup/bookPopup.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
         height : 380,
				 data : data,
				 callback : function(res){
					 if(res=="success"){
						 mainList();
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
			$('#grid').alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '20px',
					}, {
						key : 'bookName',
						title : '도서명',
						width : '200px'
					}, {
						key : 'publisher',
						title : '출판사',
						width : '150px'
					}, {
						key : 'author',
						title : '저자',
						width : '100px'
					}, {
						key : 'registDate',
						title : '등록일',
						width : '100px'
					}
				]
			});
	  }

});
