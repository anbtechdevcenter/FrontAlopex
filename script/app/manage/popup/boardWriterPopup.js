/*********************************
* 게시글 팝업
* @author : 김영우
* @create : 2017-05-22
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#codeTypeWrap",
		callType = 'C',
		btnCId = "#btnRegiste",
		btnUId = "#btnUpdate",
		btnDId = "#btnDelete",
		seqId = '';

	  this.init = function(id, param) {
			callType = param.type;
			this.defineEvent();
			setData(param);
	  };


		function setData(param){
			if(callType=='C'){
				// 등록인 경우
				var today = moment().format("YYYY-MM-DD");
				param.registDate = today;
				$(btnUId).hide();
				$(btnDId).hide();
			}else{
				// 수정인 경우 넘겨온 데이터 받기
				$(btnCId).hide();
				seqId = param.seqBoard;
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
    * 조회 버튼 액션
    */
		this.btnClose = function(){
			$a.close();
		};

		/*
		* 게시글 등록
		*/
		this.btnRegiste = function(){
			transactionAction('C');
		};

		/*
		* 게시글 수정
		*/
		this.btnUpdate = function(){
			transactionAction('U');
		};

		/*
		* 게시글 삭제
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
			data.regEmpId = 'testid';
			data.regEmpNm = 'test유저';

			if(action == 'C'){
				msg = '등록완료되었습니다.';
				pid = '/board';
				ANBTX.C(pid, data, function(res){
					alert(msg);
					$a.close('success');
				});
			}	else if(action == 'U'){
				msg = '수정완료되었습니다.';
				data.seqBoard = seqId;
				data.registDate = moment().format("YYYY-MM-DD");
				pid = '/board';
				// pdata.registDate = moment().format("YYYY-MM-DD")
				// $("#txtDate").setData(pdata)
				ANBTX.U(pid, data, function(){
					alert(msg);
					$a.close('success');
				});
			} else if(action == 'D'){
				msg = '삭제완료되었습니다.';
				pid = '/board/'+seqId;
				ANBTX.D(pid, function(){
					alert(msg);
					$a.close('success');
				});
			}

		}

});
