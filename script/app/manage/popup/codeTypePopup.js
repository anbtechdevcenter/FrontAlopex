/*********************************
* 코드타입 팝업
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#popCodeTypeWrap",
		callType = 'C',
		btnCId = "#btnPopRegiste",
		btnUId = "#btnPopUpdate",
		btnCloseId = "#btnPopClose";

	  this.init = function(id, param) {

			callType = param.type;
			//console.log("call Type ", callType, param);
			this.defineEvent();

			setData(param);

	  };


		function setData(param){

			if(callType=='C'){
				// 등록인 경우
				var today = moment().format("YYYY-MM-DD");
				param.registDate = today;



			}else{
				// 수정인 경우 넘겨온 데이터 받기
				$(wrapId).setData(param);
				// C인경우 hide
				$(btnCId).hide();
			}



		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
			$(btnCloseId).on("click", this.btnClose);
			$(btnCId).on("click", this.btnRegiste);
			$(btnUId).on("click", this.btnUpdate);

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
				var data = $(wrapId).getData();

				ANBTX.C("/codeType", data, function(res){
					$a.close('success');
				});
		};

		/*
		* 코드타입 수정
		*/
		this.btnUpdate = function(){
			var data = $(wrapId).getData();
			// 수정일자 넣어주기
			var today = moment().format("YYYY-MM-DD");
			data.updateDate = today;
			ANBTX.U("/codeType", data, function(){
				$a.close('success');
			});
		};




});
