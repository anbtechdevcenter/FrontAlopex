/*********************************
* 설명 작성
* @author : 본인이름
* @create : 2017-05-18
*************************************/
$a.page(function() {

 // band id :
// ?access_token=ZQAAARXLSPwceflD-YrlPvyQCRyEyVehUgzpGBxYJzyWmy8dexpehhnXG4GdN2WQRwb-FTmOSh8mEdvhV7rESK-NRgQVH6sVtymSElZPhIGRqiqx

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
 var BAND_POSTS_URL = "https://openapi.band.us/v2/band/posts?access_token=ZQAAARXLSPwceflD-YrlPvyQCRyEyVehUgzpGBxYJzyWmy8dexpehhnXG4GdN2WQRwb-FTmOSh8mEdvhV7rESK-NRgQVH6sVtymSElZPhIGRqiqx&band_key=AABuGr3m10dewXLd2FAKG7lc&locale=ko_KR"; // 글목록 조회
 var BAND_ACCESS_TOKEN = "ZQAAARXLSPwceflD-YrlPvyQCRyEyVehUgzpGBxYJzyWmy8dexpehhnXG4GdN2WQRwb-FTmOSh8mEdvhV7rESK-NRgQVH6sVtymSElZPhIGRqiqx";
 var BAND_LOCAL = "ko_KR";
 var BAND_KEY = "AABuGr3m10dewXLd2FAKG7lc";

	var wrapId = "#wrapId",
    gridId = "#grid",
		popupUrl = "/html/manage/popup/codeTypePopup.html";



	  this.init = function(id, param) {
      console.log("naver band");

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
      bandPostRead();
		}

    function bandPostRead(){
      $.ajax({
        dataType : 'jsonp',
        url : BAND_POSTS_URL ,
        success : function(res){
          console.log("BAND ", res);
          var data = res.result_data.items;
          $(gridId).alopexGrid('dataSet', data);
        }
      })
    }

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      // 아래는 기본 CRUD 처리.
      $("#btnC").on("click", this.btnC);
			$("#btnR").on("click", this.btnR);
			$("#btnU").on("click", this.btnU);
			$("#btnD").on("click", this.btnD);


      // 기타 이벤트 정의
		};

    /**
		* R
		*/
		this.btnC = function(){

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
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/



    /***************************************
    * @constructor : 그리드 초기화
    *
    ****************************************/
	  function initGrid() {
			$(gridId).alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{
						align : 'center',
						selectorColumn : true,
						title: '선택',
						width : '35px',
					},
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '20px',
					}, {
						key : 'content',
						title : '내용',
						width : '350px'
					}, {
						key : 'created_at',
						title : '작성일',
						width : '150px',
            render : function(value){
              var rtn = moment(value).format("YYYY-MM-DD");
              //console.log("[rtn] ", rtn);
              return rtn;
            }
					}, {
						key : 'comment_count',
						title : '답글수',
						width : '150px'
					}, {
						key : 'author',
						title : '작성자',
						width : '150px',
            render : function(value){

              return value.name;
            }
					}
				]
			});
	  }

});
