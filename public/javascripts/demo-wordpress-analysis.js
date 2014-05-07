var table_base = '<tr><th>开发者姓名</th><th>逻辑依赖关系-DegreeCentrality</th><th>语法依赖关系-DegreeCentrality</th><th>工作依赖关系-DegreeCentrality</th></tr>';


$(document).ready(function(){

	renderCircleGraph("/wordpress/circle_developer_comment_15.json","developer-comment",100);
	renderCircleGraph("/wordpress/circle_developer_commit_15.json","developer-commit",100);
	renderCircleGraph("/wordpress/circle_developer_work_15.json","developer-work",100);

	//renderCircleGraph("/wordpress/circle_file_logic_15.json","file-logic",10);
	//renderCircleGraph("/wordpress/circle_file_syntax_15.json","file-syntax",10);
	//renderCircleGraph("/wordpress/circle_file_work_15.json","file-work",10);

	renderCircleGraph("/wordpress/circle_TT_logic_15.json","TT-logic",250);
	renderCircleGraph("/wordpress/circle_TT_syntax_15.json","TT-syntax",150);
	renderCircleGraph("/wordpress/circle_TT_work_15.json","TT-work",100);


	renderMainGraph("/wordpress/circle_TT_logic_15.json","graph",300);


	$.getJSON('/analysis/wordpress/15/degreecentrality', function(ANS) {
		renderTabel(ANS);
	});
	$('#version-selector').on('change',function(){
		$.getJSON('/analysis/wordpress/'+this.options[this.selectedIndex].value+'/degreecentrality', function(ANS) {
			var table_html = '';
			table_html += table_base;
			for( var i=0;i < ANS.DegreeCentrality.length; i++){
				table_html += '<tr><td><a id="name-'+ANS.DegreeCentrality[i].name+
				'"class="btn-choice developer" href="#graph">'+ ANS.DegreeCentrality[i].name +
				'</a></td><td>'+ ANS.DegreeCentrality[i].logic +'</td><td>'+ 
				ANS.DegreeCentrality[i].syntax +'</td><td>'+ 
				ANS.DegreeCentrality[i].work +'</td><td>'+'</td></tr>';
			}

			$('#TT-analysis').html(table_html);
		});
	});

	$('label.version').on('click',function(event) {
		renderMainGraph("/wordpress/circle_"+($('label.TT.active').html().split("<")[0])+"_"+$(this).html().split("<")[0]+".json","graph",300);
		console.log($(this).html().split("<")[0]);
	});

	$('label.TT').on('click',function(event) {
		renderMainGraph("/wordpress/circle_"+($(this).html().split("<")[0])+"_"+$('label.version.active').html().split("<")[0]+".json","graph",300);
		console.log($(this).html().split("<")[0]);
	});
	$('label.developer').on('click',function(event) {
		renderMainGraph("/wordpress/circle_"+($(this).html().split("<")[0])+"_"+$('label.version.active').html().split("<")[0]+".json","graph",300);
		console.log($(this).html().split("<")[0]);
	});

	$('a.developer').on('click', function(event){
		console.log('#'+$(this).id);
	});

	$('#graph-tab a:first').tab('show');

});



function renderTabel(ANS){
		var table_html = '';
		table_html += table_base;
		for( var i=0;i < ANS.DegreeCentrality.length; i++){
			table_html += '<tr><td><a id="name-'+ANS.DegreeCentrality[i].name+
			'"class="btn-choice developer" href="#graph">'+ ANS.DegreeCentrality[i].name +
			'</a></td><td>'+ ANS.DegreeCentrality[i].logic +'</td><td>'+ 
			ANS.DegreeCentrality[i].syntax +'</td><td>'+ 
			ANS.DegreeCentrality[i].work +'</td><td>'+'</td></tr>';
		}

		$('#TT-analysis').html(table_html);
	}
