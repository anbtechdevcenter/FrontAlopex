/*********************************
* 직원등록
* @author : 김수한
* @create : 2017-05-18
*************************************/
$a.page(function() {
	var gridId = "#grid",
		wrapId = "#divWrap",
		btnCId = "#btnCreate";
	  this.init = function(id, param) {

  		this.defineEvent();

  		setData();

	  };


		function setData(){
      // anbwidget
			$("#ranksel").selectRank();
			$("#projectsel").selectProject();
			$("#stafftypesel").selectCommon({type : 'staffType'});
			$("#workareasel").selectCommon({type : 'workArea'});
			$("#teamsel").selectCommon({type : 'team'});
			$("#empFlagsel").selectCommon({type : 'staffType'});
			$("#maritalsel").selectCommon({type : 'maritalState'});
			$("#lunarStatesel").selectCommon({type : 'lunarState'});

			//등록자 id 이름 셋팅
			$("#regEmpId").val($a.session("user_id"));
			$("#regEmpNm").val($a.session("user_id"));

		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnRegist").on("click", this.btnRegist);
			$("#btnClose").on("click", this.btnClose);

		};


    /*
    * 저장 버튼 액션
    */
		this.btnRegist = function(e){
      var check = $(wrapId).validate();

      if(check){
        var data = $(wrapId).getData();
        console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
//				var vData = {empNm: data.empNm, email: data.email, project :{prjId : data.prjId}, rank: {rankCode : data.rankCode}};
				var vData = data;
				//object일 경우
				vData['project'] = {};
				vData.project.prjId = data.prjId;
				vData['rank'] = {};
				vData.rank.rankCode = data.rankCode;

				vData.team = data.teamCd;
				vData.workPosition = data.workCd;

			 	delete vData.teamCd;
			 	delete vData.workCd;

				console.log("[get data1 is] " , data);
	      ANBTX.C('/employee' , data, function(res){
	          console.log("[직원등록] ", res);
						$a.close('success');
	      });
      }else{
        console.log("stop");

      }

      e.preventDefault();

		};

		/*
    * 닫기 버튼 액션
    */
		this.btnClose = function(e){
			$a.close();
		};

});
