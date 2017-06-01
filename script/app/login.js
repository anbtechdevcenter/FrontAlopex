/*********************************
* 설명 작성
* @author : restnfeel
* @create : 2017-05-18
*************************************/
$a.page(function() {

	  this.init = function(id, param) {

      $a.session('token');   //초기화

$('body').progress().remove();  //progress 종료
        $("#authlogin").on('click', function(){
          var username = $("#susername").val();
          var password = $("#spassword").val();
          var data = {
						'grant_type' : 'password',
						'username' : username,
						'password' : password
					};

				//	console.log("data is " , data);

          $.ajax({
            type : 'POST',
            url : "http://restnfeel.com:8080/api/oauth/token",
            data : data,
            beforeSend : function(xhr){
              xhr.setRequestHeader("Accept","application/json");
							xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
							xhr.setRequestHeader("Authorization","Basic YW5iZGV2Y2VudGVyLWNsaWVudC13aXRoLXNlY3JldDpkZXZjZW50ZXI=");
            },
            success : function(res){
							var access_token = res.access_token;
              console.log("login back ", res, access_token);
              $a.session("access_token", access_token);
              $a.navigate("/html/manage/codeType.html");
            },
						error : function(error){
							console.log("[error] ", error);
						}
          });



        });

	  };




});
