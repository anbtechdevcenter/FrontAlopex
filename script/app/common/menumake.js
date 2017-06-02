$a.page(function() {

  this.init = function(id, param) {

   var access_token = $a.session('access_token');


   if(access_token!=='undefined'){
//console.log("[mkmenu token] ", access_token);

     // 메뉴 처리해 주기
     ANBTX.R('/menu', function(res){
      // console.log("[menu] ", res);

        var ul = document.createElement('ul');
        ul.className = 'nav';
        ul.id = "side-menu";

        res.sort(function(a,b){
          return a.mnOrder < b.mnOrder ? -1 :  a.mnOrder > b.mnOrder ? 1 : 0;
        });

       $.each(res, function(idx, val){
         //console.log(idx+ " >> ", val);
         var mnName = val.mnName;
         var mnDepth = val.mnDepth;
         var publishingRef = val.publishingRef;
         var mnId = val.mnId;

         var li = document.createElement('li');

         // depth가 2인경우 sub ul로 재처리 해주어야 함.
        // console.log("[depth] ", mnDepth);
         if(mnDepth===1){

            var a = document.createElement('a');

        //    a.textContent = mnName;
            a.setAttribute('href','#');

            var i = document.createElement('i');
            i.className = publishingRef;
            a.appendChild(i);
            var span = document.createElement('span');
            span.textContent = " "+mnName;
            a.appendChild(span);

            li.appendChild(a);
            li.setAttribute("id", mnId);
             ul.appendChild(li);
         }


       });

       // 2단계 add
       var inUlIdxArr = [];
       var inUlArr = [];
       var inUl = '';

       $.each(res, function(idx, val){
         var parentId = val.parentId;
         var mnName = val.mnName;
         var mnUrl = val.mnUrl;
         var mnDepth = val.mnDepth;
      //   console.log("[ul] ",  mnName);

         if(mnDepth > 1){

           if(inUlIdxArr.indexOf(parentId) > -1){
             // console.log("parent Id ",parentId);


           }else{

             inUlIdxArr.push(parentId);
            // inUl = document.createElement('ul');
           }  // inArr if end

           var inLi = document.createElement('li');
           var inA = document.createElement('a');
           inA.textContent= mnName;
           //inA.setAttribute("href", mnUrl);

           var vMenuClick = "menuClick('"+ mnUrl +"')";
           inA.setAttribute("onclick", vMenuClick);

           inLi.appendChild(inA);
          // findObj.append('<ul><li><a href="#">'+ mnName+'</a></li></ul>');
          //inUl.appendChild(inLi);
          var obj = {};
          obj.pKey = parentId;
          obj.pVal = inLi;
          inUlArr.push(obj);


        } // if depth >1 end


       });

       // 해당 li 아래로 붙게끔 처리
       //ul.append(inUl);  ANB_2017052611142312
       $.each(inUlIdxArr, function(idx,val){
         var clName = val;
         var selLi = $(ul).find("#"+clName);
      //   console.log(clName+" [ul] ", selLi );
        //if()
         var inUl = document.createElement('ul');
         inUl.className = "nav nav-second-level";
         $.each(inUlArr, function(i, v){
           if(val === v.pKey){
             inUl.append(v.pVal);
           }
           //console.log("[>>] ",i, v);
         });

         selLi[0].append(inUl);
       });


       $("#sidemenu-dynamic").replaceWith(ul);



     });

   }




 };
});
