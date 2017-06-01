/*********************************
* 장비 관리 팝업
* @author : 김수한
* @create : 2017-05-30
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#divWrap",
		callType = 'C',
		btnCId = "#btnCreate",
		btnUId = "#btnUpdate",
		btnDId = "#btnDelete",
		seqDevice = '';

	  this.init = function(id, param) {
			callType = param.type;
			seqDevice = param.seqDevice;
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

			if(action == 'C'){
				msg = '등록완료되었습니다.';
				pid = '/device';
				ANBTX.C(pid, data, function(res){
					alert(msg);
					$a.close('success');
				});
			}	else if(action == 'U'){
				msg = '수정완료되었습니다.';
				data.seqDevice = seqDevice;
				pid = '/device';
				console.log(data);
				data = {
							  "bringProof": "string",
							  "desc01": "string",
							  "desc02": "string",
							  "desc03": "string",
							  "desc04": "string",
							  "desc05": "string",
							  "desc06": "string",
							  "desc07": "string",
							  "desc08": "string",
							  "desc09": "string",
							  "desc10": "string",
							  "desc11": "string",
							  "desc12": "string",
							  "desc13": "string",
							  "desc14": "string",
							  "desc15": "string",
							  "desc16": "string",
							  "desc17": "string",
							  "desc18": "string",
							  "desc19": "string",
							  "desc20": "string",
							  "deviceModel": "string",
							  "deviceName": "string",
							  "deviceSn": "string",
							  "deviceState": "string",
							  "deviceType": "string",
							  "disposalDate": "2017-06-01T00:38:48.104Z",
							  "makersId": "string",
							  "makersName": "string",
							  "purchaseDate": "2017-06-01T00:38:48.104Z",
							  "rentalEdate": "2017-06-01T00:38:48.104Z",
							  "rentalEmpId": "string",
							  "rentalSdate": "2017-06-01T00:38:48.104Z",
							  "seqDevice": "DEV_2017053014352727"
							}
				ANBTX.U(pid, data, function(){
					alert(msg);
					$a.close('success');
				});
			} else if(action == 'D'){
				msg = '삭제완료되었습니다.';
				pid = '/device/'+seqDevice;
				ANBTX.D(pid, function(){
					alert(msg);
					$a.close('success');
				});
			}

		}

});
