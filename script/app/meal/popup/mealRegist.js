/*********************************
* 식권등록
* @author : 김수한
* @create : 2017-05-31
*************************************/
$a.page(function() {

	var wrapId = "#divWrap";
	  this.init = function(id, param) {
			setData();

  		this.defineEvent();

	  };


		function setData(){
			// anbwidget
			$("#staffsel").selectStaff({type:"empId"});
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
			var check = $(wrapId).validate();
			//console.log(check);
      if(check){
        var data = $(wrapId).getData();
      //  console.log("[get data is] " , data);

				//형태에 맞게 넣어줘야 함.
				var vData = {};
				var today = moment().format("YYYY-MM-DD");
				console.log(today);
				vData['applyQty'] = data.applyQty;
				if(data.applyQty == 5){
					vData['buyPrice'] = 25500;
				} else if(data.applyQty == 10){
					vData['buyPrice'] = 51000;
				} else if(data.applyQty == 20){
					vData['buyPrice'] = 102000;
				}
				//console.log(vData);
				vData['applyDate'] = today;

				vData['employee'] = {};
				vData.employee.empId = data.empId;
				vData.employee.regEmpNm = "123213";//data.regEmpNm; //필수값?

				vData.fixedQty  = data.fixedQty ;
				vData.mealType  = data.mealType ;
				vData.reason  = data.reason ;
				vData.seqMeal  = data.seqMeal ;
				vData.userInfo  = data.userInfo ;

				console.log("[get vData is] " , JSON.stringify(vData));
	       ANBTX.C('/meal' , vData, function(res){
					console.log("[get res is] " , res)
					if(res.error == 201){ //201 성공
						$a.close('success');
					}else{
						console.log("errorMessage:::" , res.errorMessage);
					}

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
