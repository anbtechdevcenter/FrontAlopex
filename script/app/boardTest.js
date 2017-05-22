/*********************************
* 직원관리
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
			readBoard();
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
			readBoard();
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
				title = '글 작성';
			}else if(type == 'R'){
				var sdata = $("#grid1").alopexGrid("dataGet", {_state :{selected:true}});
				data = sdata[0];
				data.type = type;
				title = '글 수정(추후 글 조회 및 버튼을 이용하여 수정기능 반영필요)';
			}
			var popupUrl = "/html/manage/popup/boardWriterPopup.html";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : title,
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
