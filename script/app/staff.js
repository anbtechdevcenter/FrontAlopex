/*********************************
* 직원관리
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
		//ctrl+c 서버 멈춤, npm start
		//그리드 초기화
		  /* 김수한 과장 작업 */
		initGrid();

		this.defineEvent();

		setData();

	  };


		function setData(){
			readStaff();
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
			readStaff();
		};


    /*
    * 직원조회
    */
		function readStaff(){
			ANBTX.R('/employee',
			 	function(res){

			 		$('#grid_staff').alopexGrid("dataSet", res);
			 	}
		  );
		}



	  //그리드 초기화
	  function initGrid() {
			$('#grid_staff').alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{
						align : 'center',
						selectorColumn : true,
						title: '선택',
						width : '20px',
					},
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '20px',
					},
					{
						key : 'empNm',
						title: '이름',
						width : '100px',
					}, {
						key : 'rank',
						title : '직급',
						width : '30px',
            render : function(value, data, render, mapping, grid){
              return value.rankName;
            }
					}, {
						key : 'team',
						title : '소속팀',
						width : '50px'
					}, {
						key : 'email',
						title : 'E-mail',
						width : '100px'
					}, {
						key : 'project',
						title : '진행 프로젝트',
						width : '150px',
            render : function(value, data, render, mapping, grid){
              var prjName = "";
              if(value!=null){
                prjName = value.prjNm;
              }
              return prjName;
            }
					}, {
						key : 'enteringDate',
						title : '입사일',
						width : '50px'
					}
				]
			});
	  }

});
