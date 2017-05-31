/*********************************
* 식권등록
* @author : 김수한
* @create : 2017-05-31
*************************************/
$a.page(function() {
	  this.init = function(id, param) {
			setData();

  		this.defineEvent();

	  };


		function setData(){
			// anbwidget
			$("#staffsel").selectStaff();
		}

    /**
    * 이벤트 처리
    */
		this.defineEvent = function(){
			$("#btnRegistPopup").on("click", this.btnRegistPopup);
			$("#btnClose").on("click", this.btnClose);
		};

    /*
    * 등록 버튼 액션
    */
		this.btnRegistPopup = function(e){
			var check = $("#divWrap").validate();
			console.log(check);
      if(check){
        var data = $("#divWrap").getData();
        console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
				var vData = {};
				var time = new Date();
				console.log(time);
				vData['applyQty'] = data.applyQty;
				if(data.applyQty == 5){
					vData['buyPrice'] = 25500;
				} else if(data.applyQty == 10){
					vData['buyPrice'] = 51000;
				} else if(data.applyQty == 20){
					vData['buyPrice'] = 102000;
				}

				vData['applyDate'] = time;

				vData['employee'] = {};
				vData.employee.empId = data.empId;
				vData.employee.regEmpNm = data.regEmpNm; //필수값?

				vData.fixedQty  = data.fixedQty ;
				vData.mealType  = data.mealType ;
				vData.reason  = data.reason ;
				vData.seqMeal  = data.seqMeal ;
				vData.userInfo  = data.userInfo ;

				console.log("[get vData is] " , vData);
	       ANBTX.C('/meal' , vData, function(res){
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
