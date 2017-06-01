/**
*@author 김상훈
*/

// 객체 리터럴 네임스페이싱(Object Literal Namespacing)
var ANBTX = ANBTX || {};

/*
 * ## 통신 공통함수 정의
 * ## 함수명은 ANBTX.R ~ C, U, D 로 통일한다.
 * ## Parameter
 * - id       : RestFul API 호출 ID
 * - data     : $a.request 통신시 전달할 data
 * - callback : 성공 또는 에러시 처리되는 콜백함수 (조회시는 success 로, 나머지는 Error 로 떨어진다)
 */

// 조회 (Retrieve)
ANBTX.R = function(id, callback, isAsync) {
  if (!id) {
    alert('파라미터 ID가 존재하지 않습니다');
    return false;
  }else {

//console.log("[isAsync] ", isAsync);

    if(isAsync!=undefined){
      isAsync  =  false;
    }else{
      isAsync = true;
    }

     $a.request(id, {
        'async' : isAsync,
        'method'  :'GET',
        'success': callback
     });

  }
}

// 삽입 (Create)
ANBTX.C = function(id, data, callback) {
  if (!id || !data) {
    alert('파라미터 ID나 data가 존재하지 않습니다');
    return false;
  }else {
     $a.request(id, {
          'method' : 'POST',
          'data' : data,
          'success': callback
     });
  }
}

// 수정 (Update)
ANBTX.U = function(id, data, callback) {
  if (!id || !data) {
    alert('파라미터 ID나 data가 존재하지 않습니다');
    return false;
  }else {
     $a.request(id, {
          'method' : 'PATCH',
          'processData' : false,
          'data' : data,
          'success': callback
     });
  }
}

// 삭제 (Delete)
ANBTX.D = function(id, callback) {
  if (!id) {
    alert('파라미터 ID가 존재하지 않습니다');
    return false;
  }else {
     $a.request(id, {
          'method' : 'DELETE',
          'success': callback
     });
  }
}
