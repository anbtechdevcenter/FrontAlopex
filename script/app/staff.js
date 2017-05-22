/*********************************
* 직원관리
* @author : anbtechdevcenter
* @create : 2017-05-18
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			// 인클루드 처리를 위한 내용
			w3.includeHTML();

			initGrid();

			this.defineEvent();

			setData();

	  };


		function setData(){
			readStaff();

			// anbwidget
			$("#ranksel").selectRank();
			$("#projectsel").selectProject();
			$("#codetypesel").selectCodeType();
			$("#stafftypesel").selectCommon({type : 'staffType'});
			$("#workareasel").selectCommon({type : 'workArea'});
			$("#teamsel").selectCommon({type : 'team'});
//workareasel
		}

/**
* 이벤트 처리 1234
*/
		this.defineEvent = function(){
			$("#btnTest").on("click", this.btnTest);

			$("#btnSearch").on("click", this.btnSearch);
			$("#btnStaffRegister").on("click", this.btnStaffRegister);
			$("#btnStaffDelete").on("click", this.btnStaffDelete);
		};

		/*
		* 직원삭제
		*/
		this.btnStaffDelete = function(){
			var check = confirm("삭제하시겠습니까?");
			var selData = $("#grid_staff").alopexGrid("dataGet", {_state :{selected:true}});
			console.log("seldata ", selData);
			if(check && selData.length>0){

				var userId = AlopexGrid.trimData(selData[0]).empId;

				ANBTX.D('/employee/'+userId, function(res){
					readStaff();
				});
			}
		}


		/*
		* 테스트
		*/
		this.btnTest = function() {
			var data = $("#staffWrap").getData();
			console.log("[get data is] " , data);
		}

    /*
    * 조회 버튼 액션
    */
		this.btnSearch = function(){
			readStaff();
		};

		this.btnStaffRegister = function(){
			$a.popup({
				title : '직원등록',
				url : 'staffRegist.html'
			});
		};


    /*
    * 직원조회
    */
		function readStaff(){
			ANBTX.R('/employee',
			 	function(res){
					console.log("[직원] ", res);
					var gridData = [];

					res.sort(function(a,b) {
						var aCd = a.rank.rankCode.substr(4,2);
						var bCd = b.rank.rankCode.substr(4,2);
						return aCd < bCd ? -1 : aCd > bCd ? 1 :0 ;
					});

					var selData = $("#staffWrap").getData();
					//console.log("selData is ", selData);
					if(selData){
						if(selData.rankCode!=""){
						//	console.log("[1] ", selData.rankCode);
							gridData = res.filter(function(val){
								//console.log("[val us ] ", val);
								return val.rank.rankCode === selData.rankCode;
							});
						}else{
							gridData = res;
						}


					}

			 		$('#grid_staff').alopexGrid("dataSet", gridData);
			 	}
		  );
		}



	  //그리드 초기화
	  function initGrid() {
			$('#grid_staff').alopexGrid({
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
					},
					{
						key : 'empNm',
						title: '이름',
						width : '100px',
					}, {
						key : 'rank',
						title : '직급',
						width : '30px',
            render : function(value, data, render, mapping, grid){
							var rankName = "";
							if(value){
								rankName = value.rankName;
							}
              return rankName;
            }
					}, {
						key : 'team',
						title : '소속팀',
						width : '50px'
					}, {
						key : 'email',
						title : 'E-mail',
						width : '100px'
					}, {
						key : 'project',
						title : '진행 프로젝트',
						width : '150px',
            render : function(value, data, render, mapping, grid){
              var prjName = "";
              if(value!=null){
                prjName = value.prjNm;
              }
              return prjName;
            }
					}, {
						key : 'enteringDate',
						title : '입사일',
						width : '50px'
					}
				]
			});
	  }

});
