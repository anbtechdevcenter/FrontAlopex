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
* 이벤트 처리
*/
		this.defineEvent = function(){
			$("#btnRegist").on("click", this.btnRegist);
			$('#btnDelete').on("click", this.btnDelete);
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnTest").on("click", this.btnTest);
		};

		this.btnRegist = function(){
			$a.popup({
				title : '식권등록',
				url : 'popup/mealRegist.html',
				height:265,
				callback: function (data) { // $a.close(data) API 사용 시 동작하는 콜백
            if(data == 'success'){
            	readBoard();
        		}
        }
			});
		};

		this.btnSearch = function(){
			readBoard();
		};

		this.btnDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			if(check){

				var selData = $("#grid_meal").alopexGrid("dataGet", {_state : {selected:true}});
console.log(selData);
				if(selData.length>0){
					var seqMeal = selData[0].seqMeal;

					ANBTX.D('/meal/'+seqMeal,
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
					//console.log(res);
			 		$('#grid_meal').alopexGrid("dataSet", res);
			 	}
		  );
		}


	  //그리드 초기화
	  function initGrid() {
			$('#grid_meal').alopexGrid({
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
						key : 'empId',
						title : 'empId',
						width : '50px',
						render : function(value, data, render, mapping, grid){
							var empId = "";
							if(data){
								empId = data.employee.empId;
							}
              return empId;
            }
					}, {
						align : 'center',
						key : 'empNm',
						title : 'empNm',
						width : '50px',
						render : function(value, data, render, mapping, grid){
							var empNm = "";
							if(data){
								empNm = data.employee.empNm;
							}
              return empNm;
            }
					}
				]
			});
	  }

});
