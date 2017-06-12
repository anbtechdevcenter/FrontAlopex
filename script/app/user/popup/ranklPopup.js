/*********************************
* 직급체계관리 팝업
* @author : 김수한
* @create : 2017-06-12
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#divWrap",
		callType = 'C',
		btnCId = "#btnCreate",
		btnUId = "#btnUpdate",
		btnDId = "#btnDelete",
		prjId = '';

	  this.init = function(id, param) {
			callType = param.type;
			console.log(callType);
			this.defineEvent();
			setData(param);
	  };


		function setData(param){
			if(callType=='C'){
				// 등록인 경우
				$(btnUId).hide();
				$(btnDId).hide();
			}else if(callType=='U'){
				// 수정인 경우 넘겨온 데이터 받기
				$(btnCId).hide();
				$(btnDId).hide();
			}else{
				// 수정인 경우 넘겨온 데이터 받기
				$(btnCId).hide();
				$(btnUId).hide();
			}
			$(wrapId).setData(param);

		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
			$("#btnClose").on("click", this.btnClose);
			$(btnCId).on("click", this.btnRegiste);
			$(btnUId).on("click", this.btnUpdate);
			$(btnDId).on("click", this.btnDelete);
		};

    /*
    * 닫기 버튼 액션
    */
		this.btnClose = function(){
			$a.close();
		};

		/*
		* 등록 버튼 액션
		*/
		this.btnRegiste = function(){
			transactionAction('C');
		};

		/*
		* 수정 버튼 액션
		*/
		this.btnUpdate = function(){
			transactionAction('U');
		};

		/*
		* 삭제 버튼 액션
		*/
		this.btnDelete = function(){
			transactionAction('D');
		};

		/*
		* transaction 에 대한 공통함수
		  action : C - 등록
			         U - 수정
							 D - 삭제
		*/
		function transactionAction(action){
			var msg = ''
				, pId = ''
				, data = $(wrapId).getData()
				, pdata = {};

			if(action == 'C'){
				msg = '등록완료되었습니다.';
				pid = '/gw_rank';
				ANBTX.C(pid, data, function(res){
					alert(msg);
					$a.close('success');
				});
			}	else if(action == 'U'){
				msg = '수정완료되었습니다.';
				pid = '/gw_rank';
				ANBTX.U(pid, data, function(){
					alert(msg);
					$a.close('success');
				});
			} else if(action == 'D'){
				msg = '삭제완료되었습니다.';
				pid = '/gw_rank/'+data.arId;
				ANBTX.D(pid, function(){
					alert(msg);
					$a.close('success');
				});
			}

		}

});
