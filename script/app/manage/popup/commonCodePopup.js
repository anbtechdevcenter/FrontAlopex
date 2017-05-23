/*********************************
* 설명 작성
* @author : 본인이름
* @create : 2017-05-18
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#commonCodeTypeWrap",
    commSelCodeType ="#selcodetypePop";



	  this.init = function(id, param) {
      console.log("확인용");
      // 그리드 존재시 그리스 선언부 함수 (구현코드는 제일 하단에 위치함)


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
      $(commSelCodeType).selectCodeType();
      var today = moment().format("YYYY-MM-DD");
			//console.log(today);
			$(wrapId).setData({
				registDate : today,
        useYn : 'Y'
			});
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      // 아래는 기본 CRUD 처리.
      $("#btnClose").on("click", this.btnClose);



      // 기타 이벤트 정의
		};

    /**
		* 팝업닫기
		*/
		this.btnClose = function(){
      $a.close("success");
		}

		/**
		* R
		*/
		this.gridR = function(){

		}

    /**
		* R
		*/
		this.gridU = function(){

		}

    /**
		* R
		*/
		this.gridD = function(){

		}


		/**
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/




});
