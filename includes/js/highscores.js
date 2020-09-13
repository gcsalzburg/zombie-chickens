loading_scores = false;
$(function(){
	$("#right_arrow_link").click(function(e){
		e.preventDefault();
		if(loading_scores == false){
			loading_scores = true;
			$("#right_list").hide();
			$("#left_list").html($("#right_list").html()).show();
			$("#right_list").html("<div class='table_loading_rhs'></div>").show().load("includes/scores/get_scores.php",{start:$("#right_arrow").attr('data-start')},function(){
				$("#right_list").fadeIn('fast');
				$("#right_arrow").attr('data-start',(parseInt($("#right_arrow").attr('data-start'))+15));
				loading_scores = false;
			});
		}
	});
	$("#left_arrow_link").click(function(e){
		e.preventDefault();
		if(loading_scores == false){
			if((parseInt($("#right_arrow").attr('data-start'))-45)>=0){
				loading_scores = true;
				$("#left_list").hide();
				$("#right_list").html($("#left_list").html()).show();
				$("#left_list").html("<div class='table_loading_lhs'></div>").show().load("includes/scores/get_scores.php",{start:(parseInt($("#right_arrow").attr('data-start'))-45)},function(){
					$("#left_list").fadeIn('fast');
					$("#right_arrow").attr('data-start',(parseInt($("#right_arrow").attr('data-start'))-15));
					loading_scores = false;
				});
			}
		}
	});
});