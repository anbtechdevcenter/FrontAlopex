/*********************************
<<<<<<< HEAD
* 설명 작성
=======
* 장비 조회
>>>>>>> b762266fe06c17994aa259dd000c65e7fd85cb2a
* @author : 김수한 과장
* @create : 2017-05-30
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#wrapId",
    gridId = "#grid",
		popupUrl = "/html/device/popup/devicePopup.html";

	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			//w3.includeHTML();
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
			readDeviceList();
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnRegiste").on("click", this.btnRegiste);
			$(gridId).on("click", '.bodycell', this.grid_dblClick);
		};



		/**
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/
		/*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			readDeviceList();
		};


    /*
    * 장비 조회
    */
		function readDeviceList(){
			ANBTX.R('/device',
			 	function(res){
					$(gridId).alopexGrid("dataSet", res);
			 	}
		  );
		}

		/*
		*		장비 등록
		*/
		this.btnRegiste = function(){
			openPopup('C');
		};

		/*
		* 장비 조회
		*/
		this.grid_dblClick = function(){
			var sdata = $(gridId).alopexGrid("dataGet", {_state :{selected:true}});
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
				title = '장비 등록';
			}else if(type == 'R'){
				var sdata = $(gridId).alopexGrid("dataGet", {_state :{selected:true}});
				data = sdata[0];
				data.type = type;
				title = '장비 관리';
			}else if(type == 'U'){
				var sdata = $(gridId).alopexGrid("dataGet", {_state :{selected:true}});
				data = sdata[0];
				data.type = type;
				title = '장비 수정';
			}
			//var popupUrl = "/html/Device/popup/DevicePopup.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
				 data : data,
				 iframe : false,
				 width : 900,
				 height : 890,
				 callback : function(res){
					 if(res=="success"){
						 readDeviceList();
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
			$(gridId).alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{ align : 'center', numberingColumn : true, title: 'No', width : '20px' },
          { key : 'deviceModel', title : '모델명', width : '40px' },
          { key : 'deviceName', title : '장비명', width : '40px' },
          { key : 'deviceSn', title : '시리얼번호', width : '40px' },
          { key : 'deviceState', title : '장비상태', width : '40px' },
          { key : 'deviceType', title : '장비구분', width : '40px' },
          { key : 'disposalDate', title : '폐기일자', width : '40px' },
          { key : 'makersId', title : '제조사코드', width : '40px' },
          { key : 'makersName', title : '제조사명', width : '40px' },
          { key : 'purchaseDate', title : '구입일자', width : '40px' },
          { key : 'rentalEdate', title : '반납일자', width : '40px' },
          { key : 'rentalEmpId', title : '사용자사번', width : '40px' },
          { key : 'rentalSdate', title : '지급일자', width : '40px' },
          { key : 'seqDevice', title : '장비순번', width : '40px' },
          { key : 'startDate', title : 'startDate', width : '40px' },
          { key : 'bringProof', title : '반입증여부', width : '40px'},
          { key : 'desc01', title : 'CPU', width : '40px' },
          { key : 'desc02', title : 'Memory', width : '40px' },
          { key : 'desc03', title : 'HDD', width : '40px' },
          { key : 'desc04', title : 'SSD', width : '40px' },
          // { key : 'desc05', title : 'desc05', width : '40px' },
          // { key : 'desc06', title : 'desc06', width : '40px' },
          // { key : 'desc07', title : 'desc07', width : '40px' },
          // { key : 'desc08', title : 'desc08', width : '40px' },
          // { key : 'desc09', title : 'desc09', width : '40px' },
          // { key : 'desc10', title : 'desc10', width : '40px' },
          // { key : 'desc11', title : 'desc11', width : '40px' },
          // { key : 'desc12', title : 'desc12', width : '40px' },
          // { key : 'desc13', title : 'desc13', width : '40px' },
          // { key : 'desc14', title : 'desc14', width : '40px' },
          // { key : 'desc15', title : 'desc15', width : '40px' },
          // { key : 'desc16', title : 'desc16', width : '40px' },
          // { key : 'desc17', title : 'desc17', width : '40px' },
          // { key : 'desc18', title : 'desc18', width : '40px' },
          // { key : 'desc19', title : 'desc19', width : '40px' },
          // { key : 'desc20', title : 'desc20', width : '40px' },
				]
			});
	  }
});
