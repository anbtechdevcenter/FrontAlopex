/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#codeTypeWrap";


	  this.init = function(id, param) {
			initGrid();

			this.defineEvent();

			setData();

	  };


		function setData(){
			readCodeType();

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
			$("#btnSearch").on("click", this.btnSearch);
			$("#btnRegiste").on("click", this.btnRegiste);
			$("#btnDelete").on("click", this.btnDelete);
			$("#btnUpdate").on("click", this.btnUpdate);

			$(gridId).on("dataSelect", this.gridSelect);
		};

		/**
		* 그리드 선택시 해당 값들을 세터 처리
		*/
		this.gridSelect = function(event){
			var selObj = AlopexGrid.parseEvent(event);
			var data = selObj.datalist[0];
			//console.log("[select is ] ", data);
			$(wrapId).setData(data);
		}

		/*
		* 직원삭제
		*/
		this.btnDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = selectedGridData();
			console.log("seldata ", selData);
			if(check){

				var userId = selData.codeType;
console.log(">> ", userId);
				ANBTX.D('/codeType/'+userId, function(res){
					readCodeType();
				});
			}
		}

    /*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			readCodeType();
		};

		/*
		* 코드타입 등록
		*/
		this.btnRegiste = function(){
				var data = $("#codeTypeWrap").getData();
				ANBTX.C("/codeType", data, function(res){
					readCodeType();
				});
		};

		/**
		* 코드타입 수정
		*/
		this.btnUpdate = function(){
			var data = $(wrapId).getData();

			console.log("", data);

			ANBTX.U("/codeType", wrapId, function(){
				readCodeType();
			});
		};

		/**
		* 선택한 그리드의 데이터 값을 반환
		* single selection 에 대한 처리만 담당.
		*/
		function selectedGridData(){
			var seldata = $(gridId).alopexGrid("dataGet", {_state :{selected:true}})[0];
			//console.log("[선택 값] ", seldata);
			return seldata;
		}


    /*
    * 코드 타입조회
    */
		function readCodeType(){

				ANBTX.R('/codeType',
				 	function(res){
					//	console.log("[codeType] ", res);
						var gridData = res;

				 		$('#grid').alopexGrid("dataSet", gridData);

						$("#codeTypeWrap").setData({
								codeTypeName : '',
								reason : ''
						});
						$("#codeTypeNm").focus();

				 	}
			  );
		}



	  //그리드 초기화
	  function initGrid() {
			$('#grid').alopexGrid({
        defaultColumnMapping : {
          align : 'center'
        },
				columnMapping : [
					{
						align : 'center',
						selectorColumn : true,
						title: '선택',
						width : '20px',
					},
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '20px',
					}, {
						key : 'codeTypeName',
						title : '코드타입명',
						width : '150px'
					}, {
						key : 'useYn',
						title : '사용여부',
						width : '50px'
					}, {
						key : 'reason',
						title : '코드타입 내용',
						width : '200px'
					}, {
						key : 'registDate',
						title : '등록일',
						width : '100px'
					}, {
						key : 'updateDate',
						title : '수정일',
						width : '100px'
					}
				]
			});
	  }

});
