/*********************************
* 플랫폼 메뉴 팝업
* @author : restnfeel
* @create : 2017-05-26
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#platPopWrap";
  var menuArr = [];


	  this.init = function(id, param) {

      // 이벤트 정의 함수부분
			this.defineEvent();

      // 화면 초기 데이터 및 초기 화면 그리는 부분 함수
			setData(param);

	  };

    /***************************************
    * @constructor : 초기 화면 로딩시 필요한
    * 데이터 세팅 및 UI Draw 코드 처리
    ****************************************/
		function setData(param){
      var   callType = param.type;
      var initData = {};
      if(callType==='C'){
        // 등록일 경우
        initData.isDefault = 'false'
        initData.mnDepthList = [{
          mnDepth : '1',
        },{
          mnDepth : '2',
        }];

        $("#btnPlatMenuPopU").hide();
      }else if(callType==='U'){
        // 수정일 경우
        initData = param;
        if('isDefault' in param){
          var isDef = param.isDefault;
          initData.isDefault = JSON.stringify(isDef);
        }

        $("#btnPlatMenuPopC").hide();
      }
    //  console.log("[로딩시 데이터] ", initData);
      // 기본 세팅
      $(wrapId).setData(initData);

      $("#menuSel").selectMenu();

      // 포커스 처리
      $("#pmenuNm").focus();

      ANBTX.R('/menu', function(res){
          menuArr = res;
      },true);

		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      // 아래는 기본 CRUD 처리.
      $("#btnPlatMenuPopC").on("click", this.btnPlatMenuPopC);
			$("#btnPlatMenuPopClose").on("click", this.btnPlatMenuPopClose);
      $("#btnPlatMenuPopU").on("click", this.btnPlatMenuPopU);

      // 기타 이벤트 정의

		};




    /**
		* R
		*/
		this.btnPlatMenuPopC = function(){
      var seldata = getWrapData();
      //seldata.isDefault=false;

      if('isDefault' in seldata){
        var ck = seldata.isDefault;
        seldata.isDefault = JSON.parse(ck);
      }

    //  console.log("[선택데이터] ", seldata);


      var orderMap = menuArr.filter(function(val){
        return val.mnId === seldata.parentId;
      });

    //  console.log("[orderMap] ", orderMap);

      if(orderMap.length>0){
        seldata.mnDepth = parseInt(orderMap[0].mnDepth)+1;
      }else{
        // 초기 데이터 없는경우
        seldata.mnDepth = 1;
      }


      var containsMap = menuArr.filter(function(val){
        return val.parentId === seldata.parentId;
      });

      var orderArrs = [];

      $.each(containsMap, function(idx, val){
          orderArrs.push(val.mnOrder);
      });

      orderArrs.sort();
      var orderIdx = orderArrs.length;

      seldata.mnOrder = orderArrs[orderIdx-1] + 1;

      // validataion
    //  console.log("[최종 데이터] ", seldata);

      if(seldata.mnName==""){
        alert("메뉴명을 필히 입력하십시오!");
        return false;
      }else if(seldata.mnUrl==""){
        alert("메뉴경로를 필히 입력하십시오!");
        return false;
      }else if(seldata.parentId==""){
        alert("상위메뉴를 필히 입력하십시오!");
        return false;
      }if(seldata.mnTemplateUrl==""){
        alert("메뉴모듈 경로를 필히 입력하십시오!");
        return false;
      }if(seldata.mnController==""){
        alert("API 호출경로를 필히 입력하십시오!");
        return false;
      }


      ANBTX.C('/menu', seldata, function(res){
        $a.close('success');
      });
		};

		/**
		* 팝업닫기
		*/
		this.btnPlatMenuPopClose = function(){
      $a.close();
		};

    /**
		* R
		*/
		this.btnU = function(){

		}

    /**
		* R
		*/
		this.btnD = function(){

		}


		/**
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/

    /**
    * @constructor wrap 의 데이터 가져오기
    */
    function getWrapData(){
      var data = $(wrapId).getData();
      return data;
    }



});
