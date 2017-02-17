$.alopex.page(function() {
	  this.init = function(id, param) { 
		  setEventListener();
	  };
	  function setEventListener() {
		  //next 버튼 클릭 이벤트 핸들러  
		  $('#next').click(function() {
			  //TextInput validate 체크 
			  if(!$('#name').validate()){
				  alert($('#name').getErrorMessage());
			  }
			  else{
			  	// 입력받은 이름을 다음페이지에 전달하면서 화면이동 
			  	$a.navigate('todoList.html', {'name':$('#name').val()});
			  }
		});  
	  };
});

