/*********************************
* 프로젝트 관리 팝업
* @author : 김영우
* @create : 2017-05-22
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#divWrap",
		callType = 'C',
		btnCId = "#btnCreate",
		btnUId = "#btnUpdate",
		btnDId = "#btnDelete",
		empId = '';

	  this.init = function(id, param) {
			callType = param.type;
			this.defineEvent();
			setData(param);
	  };


		function setData(param){
			if(callType=='C'){
				// 등록인 경우
				$(btnUId).hide();
				$(btnDId).hide();
			}else{
				// 수정인 경우 넘겨온 데이터 받기
				$(btnCId).hide();
				empId = param.empId;
				if(param.prjStatus == 'Active'){
					$("#chkActive").setChecked(true);
				}else{
					$("#chkActive").setChecked(false);
				}
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
		* 프로젝트 등록
		*/
		this.btnRegiste = function(){
			transactionAction('C');
		};

		/*
		* 프로젝트 수정
		*/
		this.btnUpdate = function(){
			transactionAction('U');
		};

		/*
		* 프로젝트 삭제
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
			if($("#chkActive").prop("checked") == true){
				data.prjStatus = 'Active';
			}else{
				data.prjStatus = 'Terminated';
			}
			if(action == 'C'){
				msg = '등록완료되었습니다.';
				pid = '/employee';
				ANBTX.C(pid, data, function(res){
					alert(msg);
					$a.close('success');
				});
			}	else if(action == 'U'){
				msg = '수정완료되었습니다.';
				data.empId = empId;
				pid = '/employee';
				ANBTX.U(pid, data, function(){
					alert(msg);
					$a.close('success');
				});
			} else if(action == 'D'){
				msg = '삭제완료되었습니다.';
				pid = '/employee/'+empId;
				ANBTX.D(pid, function(){
					alert(msg);
					$a.close('success');
				});
			}

		}

});
