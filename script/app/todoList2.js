$a.page(function() {
	  this.init = function(id, param) {

		//그리드 초기화
		initGrid();
	  };
	  //그리드 초기화
	  function initGrid() {
			$('#grid_todolist2').alopexGrid({
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
