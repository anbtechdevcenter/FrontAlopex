/*********************************
* 코드타입 팝업
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#codeTypeWrap";


	  this.init = function(id, param) {

			this.defineEvent();

			setData();

	  };


		function setData(){

			//
			var today = moment().format("YYYY-MM-DD");
			//console.log(today);
			$(wrapId).setData({
				registDate : today
			});

		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
			$("#btnClose").on("click", this.btnClose);
			$("#btnRegiste").on("click", this.btnRegiste);

		};



    /*
    * 조회 버튼 액션
    */
		this.btnClose = function(){
			$a.close();
		};

		/*
		* 코드타입 등록
		*/
		this.btnRegiste = function(){
				var data = $("#codeTypeWrap").getData();

				ANBTX.C("/codeType", data, function(res){
					$a.close('success');
				});
		};





});
