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
			readBoard();

			$("#staffsel").selectStaff();
		}

/**
* 이벤트 처리 1234
*/
		this.defineEvent = function(){
			$("#btnSave").on("click", this.btnSave);
			$('#btnDelete').on("click", this.btnDelete);
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnTest").on("click", this.btnTest);
		};

		/**
		* 게시판 저장
		*/
		this.btnTest = function() {
			$a.navigate('html/todoList.html' , {pageInfo:document.URL}); // pageInfo : 현재 페이지 url
		};

    	this.btnSave = function(){
			var check = confirm("저장하시겠습니까?");
			if(check){
				//var data = $("#boardTb").getData();
				//console.log("data ", data);
				ANBTX.C('/meal', '#mealTb',
				 	function(res){
						$("#mealTb").setData({employee:'',applyQty:''});
						readBoard();
				 	}
			  );
			}
		};


		this.btnSearch = function(){
			readBoard();
		};

		this.btnDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			if(check){

				var selData = $("#grid_mealTicketApply").alopexGrid("dataGet", {_state : {selected:true}});

				if(selData.length>0){
					var id = selData[0].seqBoard;

					ANBTX.D('/meal/'+id,
						function(res){
							readBoard();
						}
					);
				}else{
					alert("선택된 열이 없습니다.");
				}
			}
		};


		function readBoard(){
			ANBTX.R('/meal',
			 	function(res){
			 		$('#grid_mealTicketApply').alopexGrid("dataSet", res);
			 	}
		  );
		}


	  //그리드 초기화
	  function initGrid() {
			$('#grid_mealTicketApply').alopexGrid({
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
						align : 'center',
						key : 'applyDate',
						title: '신청일',
						width : '100px',
					}, {
						align : 'center',
						key : 'applyQty',
						title : '식권갯수',
						width : '50px'
					}, {
						align : 'center',
						key : 'buyPrice',
						title : 'buyPrice',
						width : '50px'
					}, {
						align : 'center',
						key : 'employee.birthDate',
						title : 'birthDate',
						width : '50px'
					}, {
						align : 'center',
						key : 'employee.birthState',
						title : 'birthState',
						width : '300px', hidden : true
					}, {
						align : 'center',
						key : 'employee.birthDate',
						title : 'birthDate',
						width : '50px', hidden : true
					}, {
						align : 'center',
						key : 'employee.birthDate',
						title : 'birthDate',
						width : '50px', hidden : true
					}, {
						align : 'center',
						key : 'employee.depart',
						title : 'depart',
						width : '50px', hidden : true
					}, {
						align : 'center',
						key : 'employee.email',
						title : 'email',
						width : '100px', hidden : true
					}, {
						align : 'center',
						key : 'employee.empEngNm',
						title : 'empEngNm',
						width : '50px', hidden : true
					}, {
						align : 'center',
						key : 'employee.empFlag',
						title : 'empFlag',
						width : '20px', hidden : true
					}, {
						align : 'center',
						key : 'employee.empHp',
						title : 'empHp',
						width : '50px', hidden : true
					}, {
						align : 'center',
						key : 'employee.empId',
						title : 'empId',
						width : '50px'
					}, {
						align : 'center',
						key : 'employee.empNm',
						title : 'empNm',
						width : '50px'
					}
				]
			});
	  }

});
