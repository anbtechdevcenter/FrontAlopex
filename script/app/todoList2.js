/**
* @author : 길형준 사원
* @description : 직원등록현황
*/
$a.page(function() {
	  this.init = function(id, param) {
			// 화면로딩시 초기 설정함수
			this.setInit();

			//그리드 초기화
			initGrid();
	  };

		/**
		* @author : 서정환 차장
		* @description : 화면로딩시 초기처리할 내용들
		*/
		this.setInit = function(){
			ANBTX.R('/rank',this.rankRead);
		}

		/**
		* @author : 서정환 차장
		* @description : 직급정보를 서버로 부터 받아와 setData 한다.
		*/
		this.rankRead = function(res){
			console.log("[>>] ", res);
			var options = [];
			$.each(res, function(idx, val){
				var obj = {};
				obj['value'] = val.rankCode;
				obj['text'] = val.rankName;
				options.push(obj);
			});
			options.unshift({text:'==선택==', value :"default"});
			$("#webView").setData({rankOptions : options});
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
