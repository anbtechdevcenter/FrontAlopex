$a.page(function() {
	  this.init = function(id, param) {
		  //ToDo List 조회를 위해서 서버 정보 세팅
		  //a.request.setup은 모든 reqeust에 공통으로 사용되므로 통신을 여러 번 사용하는 프로젝트에서는 각 페이지에서 정의하지 않고 common.js 같은 파일에 따로 작성하여 사용하시면 됩니다.
		 $a.request.setup({
				url : function(id, param) {
		            return  'http://api.anbtech.net:8080/api'+ id+'.json'; // $a.request ANP API CAll 1
			    }, //서버 URL
				contentType: 'application/json; charset=utf-8',
				dataType : 'json',
				method : 'GET',
				before : function(id, option) {
          //this.requestHeaders["Content-Type"] ="application/json; charset=UTF-8"; // 위와 같이 컨텐츠타입 지정하도록 변경
					$('body').progress(); //progress bar 시작
				},

				fail : function(res) {
					alert('서버오류 입니다.');
				},

				error : function(err) {
					//alert('현재 네트상태를 확인하십시요.');
					if (err.errorMessage) {
						//console.log(err);
						//console.log("에러 코드 : " + err.errorMessage);
					}
				},

				after : function(res) {
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
