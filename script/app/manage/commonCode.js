/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			initGrid();

			this.defineEvent();

			setData();

	  };


		function setData(){
			readCodeType();

      $("#selcodetype").selectCodeType();
			//
			var today = moment().format("YYYY-MM-DD");
			//console.log(today);
			$("#codeTypeWrap").setData({
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
		};

		/*
		* 직원삭제
		*/
		this.btnDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = $("#grid").alopexGrid("dataGet", {_state :{selected:true}});
			//console.log("seldata ", selData);
			if(check && selData.length>0){

				var seqCode = AlopexGrid.trimData(selData[0]).seqCode;
      //  console.log("seqCode ", seqCode);

				ANBTX.D('/codeCommon/'+seqCode, function(res){
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
      //  data.codeType = "COD_2017051911001926";

        console.log("getData >> ", data);


				ANBTX.C("/codeCommon", data, function(res){
					readCodeType();
				});
		};


    /*
    * 코드 타입조회
    */
		function readCodeType(){

				ANBTX.R('/codeCommon',
				 	function(res){
						console.log("[codeType] ", res);
						var gridData = res;

				 		$('#grid').alopexGrid("dataSet", gridData);

						$("#codeTypeWrap").setData({
								codeNm : '',
                codeType : '',
                codeId : '',
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
						width : '50px',
					},
					{
						align : 'center',
						numberingColumn : true,
						title: 'No',
						width : '30px',
					}, {
						key : 'codeType',
						title : '코드타입',
						width : '150px'
					}, {
						key : 'codeId',
						title : '코드아이디',
						width : '150px'
					}, {
						key : 'codeNm',
						title : '코드명',
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
