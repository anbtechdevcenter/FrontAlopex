/**
* @author anbtechdevcenter
* @create 2017-05-19
* @desc
*/

$(function(){

  /**
  * 직급 셀렉트
  */
  $.widget("ui.rankselect", {
    options : {

    },
    _create : function(){
      var comp = document.createElement('select');
    //  comp.id = "anbwidget-select";
      comp.className = "Divselect";
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

      return $(this.element).append(comp);
    }
  });



});
