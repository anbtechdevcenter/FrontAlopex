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
			readRank();
			readBoard();
		}

/**
* 이벤트 처리 1234
*/
		this.defineEvent = function(){
			$("#btnSearch").on("click", this.btnSearch);
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
			console.log('nm ::' + $('#nm').val());
			///var apiId = 'board'
			var apiId = (($('#nm').val().length == 0) ? '/board' : '/board/'+$('#nm').val());
			console.log('apiId :: ' + apiId);
			ANBTX.R(apiId,
			 	function(res){
			 		$('#grid_board').alopexGrid("dataSet", res);
			 	}
		  );
		}

    /**
		* 직급 조회
		*/
		function readRank(){
			ANBTX.R('/rank', function(res){
				console.log("[rank is] ", res);
				$("#staffWrap").setData({
					rankList: res
				});

			});
		}


	  //그리드 초기화
	  function initGrid() {
			$('#grid_board').alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '20px',
					},
					{
						key : 'boardTitle',
						title: '제목',
						width : '100px',
					}, {
						key : 'regEmpNm',
						title : '작성자',
						width : '40px',
					}, {
						key : 'registDate',
						title : '작성일',
						width : '40px'
					}, {
						key : 'regEmpId',
						title : '작성자ID',
						hidden : true
					}
				]
			});
	  }

});
