/**
* @author anbtechdevcenter
* @create 2017-05-19
* @desc
*/

$(function(){

  /**
  * 직급 셀렉트
  */
  $.widget("ui.selectRank", {
    options : {
      para : ''
    },
    _create : function(){

      var comp = document.createElement('select');

      comp.className = "Select";

      var vPara = this.options.para;
    //  comp.className = "Divselect";
      comp.setAttribute("data-bind-option", "rankCode:rankName");
      comp.setAttribute("data-bind","options: rankList, selectedOptions : rankCode");

      ANBTX.R('/rank', function(res){
        //console.log("[rank is] ", res);
        res.sort(function(a, b) {
          var aRcd = a.rankCode.substr(4,2);
          var bRcd = b.rankCode.substr(4,2);
        //	console.log(aRcd+ "" + bRcd , aRcd > bRcd);
          return aRcd < bRcd ? -1 : aRcd > bRcd ? 1 : 0;
        }, true);

        res.unshift({"rankCode":"", "rankName": "==선택=="});

          $(comp).setData({
            rankList: res
            , rankCode : vPara
          });
        });

      return $(this.element).replaceWith(comp);
    }
  }); // rankselect end



  /**
  * 프로젝트 셀렉트
  */
  $.widget("ui.selectProject", {
    options : {
      para : ''
    },
    _create : function(){

      var comp = document.createElement('select');

      var vPara = this.options.para;

      comp.className = "Select";

    //  comp.className = "Divselect";
      comp.setAttribute("data-bind-option", "prjId:prjNm");
      comp.setAttribute("data-bind","options: projectList, selectedOptions : prjId");

      ANBTX.R('/project', function(res){
      //  console.log("[project is] ", res);

        res.unshift({"prjId":"", "prjNm": "==선택=="});

          $(comp).setData({
            projectList: res
            ,prjId: vPara
          });
        }, true);

      return $(this.element).replaceWith(comp);
    }
  }); // select end



  /**
  * 코드타입 셀렉트
  */
  $.widget("ui.selectCodeType", {
    options : {
      para : ''
    },
    _create : function(){

      var comp = document.createElement('select');

      comp.className = "Select";

    //  comp.className = "Divselect";
      comp.setAttribute("data-bind-option", "codeType:codeTypeName");
      comp.setAttribute("data-bind","options: codeTypeList, selectedOptions : codeType");

      ANBTX.R('/codeType', function(res){
      //  console.log("[project is] ", res);

        res.unshift({"codeType":"", "codeTypeName": "==선택=="});

          $(comp).setData({
            codeTypeList: res
          });
        }, true);

      return $(this.element).replaceWith(comp);
    }
  }); // select end



  /**
  * 직원유형 셀렉트
  */
  $.widget("ui.selectCommon", {
    options : {
      type : '',
      para : ''
    },
    _create : function(){
      var comp = document.createElement('select');

      comp.className = "Select";
      //  comp.className = "Divselect";

      var keyword = "";
      var intype = this.options.type;
      var vPara = this.options.para;
      var selectedCd  = "codeId";
      // 하드코딩 코드 값이 아닌, codeType로 부터 받아온 텍스트명의 값을 넣어주는것으로 변경 피
      switch (intype) {
        case "staffType":
          keyword = "COD_2017051911001926";
          selectedCd = "empFlag";
          break;
        case "workArea" :
          keyword = "COD_2017051911095827";
          selectedCd = "workCd";
          break;
          case "team" :
            keyword = "COD_2017051917305250";
            selectedCd = "teamCd";
            break;
        default:

      }
      comp.setAttribute("data-bind-option", "codeId:codeNm");
      comp.setAttribute("data-bind","options: codeTypeList, selectedOptions : "+selectedCd);


      ANBTX.R('/codeCommon', function(res){
        //console.log("[commonSel is] ", res);
      var vals = res.filter(function(val){

        return val.codeType === keyword;
      });

        vals.unshift({"codeId":"", "codeNm": "==선택=="});
          switch (intype) {
            case "staffType":
              $(comp).setData({
                codeTypeList: vals
              });
              break;
            case "workArea" :
              $(comp).setData({
                codeTypeList: vals
                ,workCd: vPara
              });
              break;
            case "team" :
              $(comp).setData({
                codeTypeList: vals

                ,workCd: vPara
              });
              break;
            default:

          }


        }, true);

      return $(this.element).replaceWith(comp);
    }
  }); // select end


});
