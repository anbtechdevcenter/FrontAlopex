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

    },
    _create : function(){

      var comp = document.createElement('select');

      comp.className = "Select";

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
        });

        res.unshift({"rankCode":"", "rankName": "==선택=="});

          $(comp).setData({
            rankList: res
          });
        });

      return $(this.element).replaceWith(comp).convert();
    }
  }); // rankselect end



  /**
  * 직급 셀렉트
  */
  $.widget("ui.selectProject", {
    options : {

    },
    _create : function(){

      var comp = document.createElement('select');

      comp.className = "Select";

    //  comp.className = "Divselect";
      comp.setAttribute("data-bind-option", "prjId:prjNm");
      comp.setAttribute("data-bind","options: projectList, selectedOptions : prjId");

      ANBTX.R('/project', function(res){
        console.log("[project is] ", res);

        res.unshift({"prjId":"", "prjNm": "==선택=="});

          $(comp).setData({
            projectList: res
          });
        });

      return $(this.element).replaceWith(comp).convert();
    }
  }); // rankselect end


});
