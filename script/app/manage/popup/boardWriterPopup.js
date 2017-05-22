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
				$(wrapId).setData(param);
			}
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
				var data = $(wrapId).getData();
				data.regEmpId = 'testid';
				data.regEmpNm = 'test유저';

				ANBTX.C("/board", data, function(res){
					$a.close('success');
				});
		};

		/*
		* 게시글 수정
		*/
		this.btnUpdate = function(){
			var data = $(wrapId).getData();
			data.seqBoard = seqId;
			data.regEmpId = 'testid';
			data.regEmpNm = 'test유저';
			console.log(data);
			ANBTX.U("/board", data, function(){
				$a.close('success');
			});
		};

		/*
		* 게시글 삭제
		*/
		this.btnDelete = function(){
			var pid = '/board/'+seqId;
			var data = {};
			ANBTX.U(pid, data, function(){
				$a.close('success');
			});
		};


});
