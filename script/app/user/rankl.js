/*********************************
* 설명 작성
* @author : 김수한 과장
* @create : 2017-06-12
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#wrapId",
    gridId = "#grid",
		popupUrl = "/html/user/popup/ranklPopup.html";



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
			readList();
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      //조회
			$("#btnSearch").on("click", this.btnSearch);
      //추가
			$("#btnRegiste").on("click", this.btnRegiste);
      //수정
			$(gridId).on("dblclick", '.bodycell', this.grid_dblClick);
		};

		/**
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/
		/*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			readList();
		};


    /*
    * 프로젝트 조회
    */
		function readList(){
			ANBTX.R('/gw_rank',
			 	function(res){
					$(gridId).alopexGrid("dataSet", res);
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
		this.grid_dblClick = function(e){
      var evObj = AlopexGrid.parseEvent(e);
      var key = evObj.mapping.key;
      if(key == "arId"){
        var sdata = $(gridId).alopexGrid("dataGet", {_state :{focused:true}});
  			if(sdata.length > 0) openPopup('U');
      }else if(key == "arIdD"){
        var sdata = $(gridId).alopexGrid("dataGet", {_state :{focused:true}});
  			if(sdata.length > 0) openPopup('D');
      }

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
				title = '직급 등록';
			}else if(type == 'U'){
				var sdata = $(gridId).alopexGrid("dataGet", {_state :{focused:true}});
				data = sdata[0];
				data.type = type;
				title = '직급 관리';
			}else if(type == 'D'){
				var sdata = $(gridId).alopexGrid("dataGet", {_state :{focused:true}});
				data = sdata[0];
				data.type = type;
				title = '직급 삭제';
			}
			var popupUrl = "/html/user/popup/ranklPopup.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
				 data : data,
				 iframe : false,
				 width : 400,
				 height : 405,
				 callback : function(res){
					 if(res=="success"){
						 readList();
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
        headerGroup: [
          {fromIndex:4, toIndex:5, title:"비고", hideSubTitle: true}
        ],
				columnMapping : [
					{ align : 'center', numberingColumn : true, title: 'No', width : '20px' },
					{ key : 'arName', title: '직급명', width : '100px' },
					{ key : 'arCode', title : '직급코드', width : '40px' },
					{ key : 'arPriorty', title : '출력순위', width : '40px' },
          { key : 'arId', title : '비고', width : '30px',
						render : function(value, data, mapping){
							var html = '<button class="btn btn-primary btn-sm" type="button" id="btnU">수정</button>'
              return html;
						}
					},
          { key : 'arIdD', title : '비고1', width : '30px',
            render : function(value, data, mapping){
              var html = '<button class="btn btn-primary btn-sm" type="button" id="btnD">삭제</button>'
              return html;
            }
          }
				]
			});
	  }

});
