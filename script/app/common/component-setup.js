$a.page(function() {
	  this.init = function(id, param) {
		  //ToDo List 조회를 위해서 서버 정보 세팅
		  //a.request.setup은 모든 reqeust에 공통으로 사용되므로 통신을 여러 번 사용하는 프로젝트에서는 각 페이지에서 정의하지 않고 common.js 같은 파일에 따로 작성하여 사용하시면 됩니다.
		 $a.request.setup({
				url : function(id, param) {
		            return  'http://api.anbtech.net/api'+ id+'.json'; // $a.request 서비스 ID가 적용될 것이다
			    }, //서버 URL
        dataType : 'json',
				method : 'GET',
				before : function(id, option) {
          this.requestHeaders["Content-Type"] ="application/json; charset=UTF-8";
					$('body').progress(); //progress bar 시작
				},
				after : function(res) {
				    $('body').progress().remove();  //progress 종료
				},

				fail : function(res) {
					alert('서버오류 입니다.');
					$('body').progress().remove();  //progress 종료
				},
				error : function(err) {
        //  console.error("[에러발생] ",err);

					//alert('현재 네트상태를 확인하십시요.');
					$('body').progress().remove();  //progress 종료
				}
			});


      AlopexGrid.setup({
      	autoColumnIndex: true,
        numberingColumnFromZero: false,
        rowSingleSelect : true,
        rowClickSelect : true,
        fitTableWidth: true,
      	height: 300
      });


      $a.setup('popup', {
        iframe: false
      });



    };

});
