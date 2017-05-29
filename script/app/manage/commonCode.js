/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {

var codeTypeArr = [];

var popupUrl = "/html/manage/popup/commonCodePopup.html",
	wrapId = "#codeTypeWrap";

	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			w3.includeHTML();

      codeTypeGet();
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
			$(wrapId).setData({
				registDate : today
			});

		}

    /**
    *
    */
    function codeTypeGet(){
      ANBTX.R('/codeType', function(res){
        codeTypeArr = res;
      }, false);
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
			var seldata = {};
			var sdata = seldata.type = "C";
			var pops =  $a.popup({
				 url : popupUrl,
				 title : '공통코드 수정',
				 data : seldata,
				 width : 300,
				 height : 250,
				 callback : function(res){
					 //console.log("res " , res);
					 if(res=="success"){
						 readCodeType();
						 //console.log("[pops] " , pops);
						 $(pops).close();
					 }

				 }
			 });


		};


    /*
    * 코드 타입조회
    */
		function readCodeType(){

				ANBTX.R('/codeCommon',
				 	function(res){
			//			console.log("[codeType] ", res);
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
        renderMapping : {
					"codetype" : {
						renderer : function(value, data, render, mapping){
            //  console.log("render " , codeTypeArr);
              var rtnVal = codeTypeArr.filter(function(val){
              //  console.log(val);
               return val.codeType === value;
              });

            //  /console.log(" >> " , rtnVal);
						 if('codeTypeName' in rtnVal[0]){
							 return rtnVal[0].codeTypeName;
						 }else{
							 return codeType;
						 }

						}
					}
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
						width : '150px',
            render : {type : "codetype"}
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
