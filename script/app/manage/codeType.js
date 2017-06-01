/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {

	var gridId = "#grid",
		wrapId = "#codeTypeWrap",
		popupUrl = "/html/manage/popup/codeTypePopup.html";


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

		};



		/*
		* 직원삭제
		*/
		this.btnDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = selectedGridData();
	//		console.log("seldata ", selData);
			if(check){

				var userId = selData.codeType;
//console.log(">> ", userId);
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
			var pops =  $a.popup({
				 url : popupUrl,
				 title : '코드타입 등록',
				 data : {'type' : 'C'},
				 width : 400,
				 height : 'auto',
				 callback : function(res){
					 console.log("res " , res);
					 if(res=="success"){
						 readCodeType();
						 //console.log("[pops] " , pops);
						 $(pops).close();
					 }

				 }
			 });

		};

		/**
		* 코드타입 수정
		*/
		this.btnUpdate = function(){
			var seldata = selectedGridData();

		//	console.log("[seldata] ", seldata);
			if(seldata === undefined){
				alert("수정하고자 하는 데이터를 먼저 선택하십시오!");
				return false;
			}else{
				var sdata = seldata.type = "U";
				var pops =  $a.popup({
					 url : popupUrl,
					 title : '코드타입 수정',
					 data : seldata,
					 width : 350,
					 height : 400,
					 callback : function(res){
						 //console.log("res " , res);
						 if(res=="success"){
							 readCodeType();
							 //console.log("[pops] " , pops);
							 $(pops).close();
						 }

					 }
				 });
			}


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
								codeTypeName : ''
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
						width : '35px',
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
