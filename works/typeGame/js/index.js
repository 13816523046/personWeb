

$(function(){
    setTimeout(function(){
        $(".start").slideDown("slow");
    },1000)

    var game1=new game();
    //$('select').change(function(){
    //    game1.speed=parseInt($('select option:selected').html())+2;
    //    game1.letterLen=parseInt($('select option:selected').html())+4;
    //    game1.aa=parseInt($('select option:selected').html());
    //    game1.spans=[];
    //    game1.arrqu=[];
    //    game1.posarr=[];
    //    $('.ss').remove();
    //})
    $(".button").click(function(){
        game1.play();
        $(".start").slideUp("slow");
    })
})