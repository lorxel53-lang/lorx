// منع الضغط المطول وفتح القائمة
document.addEventListener("contextmenu", function(e){
    e.preventDefault();
});


// منع تحديد النص
document.addEventListener("selectstart", function(e){
    e.preventDefault();
});


// منع الزوم باللمس
document.addEventListener("gesturestart", function(e){
    e.preventDefault();
});


// منع زوم الكيبورد
document.addEventListener("keydown", function(e){

    if(e.ctrlKey && 
      (e.key === "+" || e.key === "-" || e.key === "0")){
        e.preventDefault();
    }

});


// منع السحب والتكبير باللمس
document.addEventListener("touchmove", function(e){

    if(e.scale !== 1){
        e.preventDefault();
    }

},{passive:false});