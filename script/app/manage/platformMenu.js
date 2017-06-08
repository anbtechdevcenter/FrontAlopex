/*********************************
* 플랫폼 메뉴를 관리합니다.
* @author : restnfeel
* @create : 2017-05-26
*************************************/
$a.page(function() {

 /**
 * 업무소스내(page내부) 전역역활 변수
 * 타입별로 정의 (strin, boolean, number, array, object)
 * 아래는 string 타입에 대해서만 정의함.
 */
	var wrapId = "#platmenuWrap",
    gridId = "#platmenuGrid",
		popupUrl = "/html/manage/popup/platformMenuPopup.html";

  var parentArr = []
      ,roleOpt = [{
        authorityName: 'ROLE_ADMIN',
        authNm : '어드민 [시스템관리자]'
      },{
        authorityName: 'ROLE_MANAGER',
        authNm : '관리자 [팀장급이상]'
      },{
        authorityName: 'ROLE_USER',
        authNm : '일반사용자'
      }];

	  this.init = function(id, param) {

      // 화면 초기 데이터 및 초기 화면 그리는 부분 함수
			setData();


      readMenu();

      // 그리드 존재시 그리스 선언부 함수 (구현코드는 제일 하단에 위치함)
			initGrid();

      // 이벤트 정의 함수부분
			this.defineEvent();



	  };

    /***************************************
    * @constructor : 초기 화면 로딩시 필요한
    * 데이터 세팅 및 UI Draw 코드 처리
    ****************************************/
		function setData(){
      $(wrapId).setData({
        roleOpt :roleOpt
      })
		}

		/**
		* 이벤트 처리
		*/
		this.defineEvent = function(){
      // 아래는 기본 CRUD 처리.
      $("#btnPlatMenuC").on("click", this.btnPlatMenuC);
			$("#btnPlatMenuR").on("click", this.btnR);
			$("#btnPlatMenuU").on("click", this.btnPlatMenuU);
			$("#btnPlatMenuD").on("click", this.btnPlatMenuD);

      //이 편집모드로 들어간 이후에 편집모드에서 빠져나오게 되면 호출되는 이벤트
      $(gridId).on( "cellEditEnd" , function(e){
        var data = AlopexGrid.parseEvent(e).data;

        //console.log(data);
        $("#platmenuGrid").alopexGrid('dataGet', {_state:{edited:true}});
      });
      // 기타 이벤트 정의
		};

    /**
		* 메뉴등록을 위한 팝업 처리
		*/
		this.btnPlatMenuC = function(){

      var pops =  $a.popup({
				 url : popupUrl,
				 title : '메뉴 등록',
         height: 550,
				 data : {'type' : 'C' },
				 callback : function(res){
					 //console.log("res " , res);
					 if(res=="success"){
						 readMenu();
						 //console.log("[pops] " , pops);
						 $(pops).close();
					 }

				 }
			 });
		};

		/**
		* R
		*/
		this.btnR = function(){
      readMenu();
		}

    /**
		* 수정처리
		*/
		this.btnPlatMenuU = function(){
      var seldata = selectedGridData();
      if(seldata===undefined){
        alert("수정하고자 하는 데이터를 먼저 선택하십시오!");
      }else{


        seldata.type = "U";
        var pops =  $a.popup({
           url : popupUrl,
           title : '메뉴 수정',
           height: 550,
           data : seldata,
           callback : function(res){
             //console.log("res " , res);
             if(res=="success"){
               readMenu();
               //console.log("[pops] " , pops);
               $(pops).close();
             }

           }
         });
      }

		}

    /**
		* 선택 삭제
		*/
		this.btnPlatMenuD = function(){
      var seldata = selectedGridData();
      var check = confirm("선택한 데이터를 삭제하시겠습니까?");
      if(check){
        var menuId = seldata.mnId;
        ANBTX.D('/menu/'+menuId, function(res){
          readMenu();
        });
      }
		};


		/**
		* 아래부터는 구현을 위한 함수 작성
		* 기명함수 권장
		*/

    /**
    * 메뉴를 조회한다.
    */
    function readMenu(){
      var seldata = $(wrapId).getData();
      var roleName = seldata.authorityName;

      //console.log("[ROLE IS ] " , roleName, seldata);

      //return false;

      ANBTX.R('/menu/WEB/'+roleName, function(res){
        res.sort(function(a,b){
          return a.mnOrder < b.mnOrder ? -1 :  a.mnOrder > b.mnOrder ? 1 : 0;
        });
        $(gridId).alopexGrid('dataSet', res);
        parentArr = res;
        //console.log(parentArr);
      }, true);

      $(gridId).alopexGrid("expandTreeNode");

    }

    /**
    * 그리드 선택에 대한 함수
    */
    function selectedGridData(){
      var data = $(gridId).alopexGrid("dataGet", {_state : {selected : true}})[0];
      return data;
    }



    /***************************************
    * @constructor : 그리드 초기화
    *
    ****************************************/
	  function initGrid() {
			$(gridId).alopexGrid({
        enableDefaultContextMenu:false,
	      //disableTextSelection : true,
        tree : {
      		useTree : true,
      		idKey : "mnId", //노드를 지시하는 유일한 값이 저장된 키값
      		parentIdKey : "parentId", //자신의 상위(parent) 노드를 지시하는 ID가 저장된 키값
      		expandedKey : "isDefault" //데이터가 그리드에 입력되는 시점에 초기 펼쳐짐 여부를 저장하고 있는 키값

      		//노드의 초기 펼쳐짐 여부를 인식하는 값의 형태는 expandedValue 옵션에 저장되어 있으며
      		//다른 형태의 값을 사용해야 한다면 이 옵션값을 변경하십시오. 순서대로 펼쳐짐/닫힘 입니다.
      		//expandedValue : ["true", "false"]

      		//최 상위 노드들의 parentIdKey 에 지정되어야 하는 값.
      		//rootNodeParentIdValue : ""
    	 },
        defaultColumnMapping : {
          align : 'left',
          // editable: true
        },
        // cellSelectable: true,
        // cellInlineEdit: true,

        renderMapping : {
					"parentName" : {
						renderer : function(value, data, render, mapping){
            //  console.log("render " , codeTypeArr);
              var rtnVal = parentArr.filter(function(val){
              //console.log(val, '   value:::',value);
               return val.mnId === value;
              });

              //console.log(" >> " , rtnVal, '   value:::',value);
              if(rtnVal[0] != undefined){
                if('mnName' in rtnVal[0]){
                  return rtnVal[0].mnName;
                }else{
                  return value;
                }
              }
						}
					}
				},
				columnMapping : [
					{
						key : 'mnName',
						title : '메뉴명',
						width : '200px',
            align : 'left',
            treeColumn : true,
			      treeColumnHeader : true,
            "NODE_EXPANDED" : "true"
					}, {
						key : 'mnDepth',
						title : '메뉴 Depth',
						width : '80px',
            align : 'center'
					}, {
						key : 'mnOrder',
						title : '메뉴순서',
						width : '80px',
            align : 'center'
					},{
						key : 'mnUrl',
						title : '메뉴경로',
						width : '250px'
					}, {
						key : 'parentId',
						title : '상위메뉴',
						width : '150px',
            render : {type : 'parentName'},
            align : 'center'
					}, {
						key : 'mnDepth',
						title : '메뉴 Depth',
            width : '80px',
            align : 'center'
					}, {
						key : 'isDefault',
						title : '메뉴펼침',
						width : '80px',
            align : 'center'
					}, {
						key : 'mnController',
						title : '호출 API',
						width : '100px'
					}, {
						key : 'mnState',
						title : '사용여부',
						width : '80px',
            render : function(value, data){
              value = $.trim(value);//공백제거
              if(value==='Y'){
                return "사용"
              }else if(value==='N'){
                return "미사용"
              }
            },
            'align' : 'center'
					}, {
						key : 'mnTemplateUrl',
						title : '화면분류',
						width : '150px'
					}, {
						key : 'publishingRef',
						title : '아이콘 클래스',
						width : '150px'
					}
				]
			});
	  }

});
