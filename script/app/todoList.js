$a.page(function() {
	  this.init = function(id, param) {

		//그리드 초기화
		initGrid();

		this.defineEvent();

		setData();

	  };


		function setData(){
			readBoard();
		}

/**
* 이벤트 처리 12
*/
		this.defineEvent = function(){
			$("#btnSave").on("click", this.btnSave);
			$('#btnDelete').on("click", this.btnDelete);
			$("#btnSearch").on("click", this.btnSearch);
		};

		/**
		* 게시판 저장
		*/
    this.btnSave = function(){
			var check = confirm("저장하시겠습니까?");
			if(check){
				var data = $("#boardTb").getData();
				console.log("data ", data);

				$a.request("/board",{
					method : 'post',
					data : '#boardTb',
					error : function(){
						$("#boardTb").setData({boardTitle:'',boardContents:''});
						readBoard();
					}
				});


			}

		};


		this.btnSearch = function(){
			readBoard();
		};

		this.btnDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			if(check){

				var selData = $("#grid_todolist").alopexGrid("dataGet", {_state : {selected:true}});

				if(selData.length>0){
					var id = selData[0].seqBoard;
					$a.request("/board/"+id,{
						method : 'delete',
						error : function(){
							readBoard();
						}
					});
				}else{
					alert("선택된 열이 없습니다.");
				}


			}
		}


		function readBoard(){
			$a.request('/board', {
		       success: function(res){
						 $('#grid_todolist').alopexGrid("dataSet", res);
					 }
				});
		}


	  //그리드 초기화
	  function initGrid() {
			$('#grid_todolist').alopexGrid({
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
							key : 'boardTitle',
							title: '제목',
							width : '200px',
						}, {
							align : 'center',
							key : 'boardContents',
							title : '내용',
							width : '300px'
						}
				]
			});
	  }

});
