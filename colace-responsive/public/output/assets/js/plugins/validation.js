var Validation=function(){return{initValidation:function(){$("#sky-form1").validate({rules:{required:{required:!0},email:{required:!0,email:!0},url:{required:!0,url:!0},date:{required:!0,date:!0},min:{required:!0,minlength:5},max:{required:!0,maxlength:5},range:{required:!0,rangelength:[5,10]},digits:{required:!0,digits:!0},number:{required:!0,number:!0},minVal:{required:!0,min:5},maxVal:{required:!0,max:100},rangeVal:{required:!0,range:[5,100]}},messages:{required:{required:"Please enter something"},email:{required:"Please enter your email address"},url:{required:"Please enter your URL"},date:{required:"Please enter some date"},min:{required:"Please enter some text"},max:{required:"Please enter some text"},range:{required:"Please enter some text"},digits:{required:"Please enter some digits"},number:{required:"Please enter some number"},minVal:{required:"Please enter some value"},maxVal:{required:"Please enter some value"},rangeVal:{required:"Please enter some value"}},errorPlacement:function(e,r){e.insertAfter(r.parent())}})}}}();