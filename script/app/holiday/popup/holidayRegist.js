/*********************************
* 근태 관리 상세 팝업
* @author : 김수한
* @create : 2017-05-30
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#divWrap",
		btnCId = "#btnCreate",
		btnUId = "#btnUpdate",
		seqDevice = '';

	  this.init = function(id, param) {
			seqDevice = param.seqDevice;
			this.defineEvent();
			setData(param);
	  };


		function setData(param){

			$(wrapId).setData(param);

			// anbwidget
			//직원선택
			$("#empId").selectStaff({type:"empId"});
			//결재1
			$("#app1EmpId").selectStaff({type:"app1EmpId"});
			//결재2
			$("#app2EmpId").selectStaff({type:"app2EmpId"});

			//등록자 id 이름 셋팅
			$(wrapId).setData({"regEmpId" : $a.session("user_id"), "regEmpNm" : $a.session("user_id")});
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
			$("#btnClose").on("click", this.btnClose);
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
		* transaction 에 대한 공통함수
		  action : C - 등록
			         U - 수정
		*/
		function transactionAction(action){
			var msg = ''
				, pId = ''
				, data = $(wrapId).getData()
				, pdata = {};

			if(action == 'C'){
				msg = '등록완료되었습니다.';
				pid = '/device';
				console.log('data:::',data);
				ANBTX.C(pid, data, function(res){
					alert(msg);
					$a.close('success');
				});
			}	else if(action == 'U'){
				msg = '수정완료되었습니다.';
				data.seqDevice = seqDevice;
				pid = '/device';
				console.log(data);
				ANBTX.U(pid, data, function(){
					alert(msg);
					$a.close('success');
				});
			}

		}

});
