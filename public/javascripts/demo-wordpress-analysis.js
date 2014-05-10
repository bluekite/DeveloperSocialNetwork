var table_base = '<tr><th>开发者姓名</th><th>逻辑依赖关系-DegreeCentrality</th><th>语法依赖关系-DegreeCentrality</th><th>工作依赖关系-DegreeCentrality</th></tr>';


$(document).ready(function(){

	renderCircleGraph("/wordpress/circle_developer_comment_15.json","developer-comment",100);
	renderCircleGraph("/wordpress/circle_developer_commit_15.json","developer-commit",100);
	renderCircleGraph("/wordpress/circle_developer_work_15.json","developer-work",100);

	// renderCircleGraph("/wordpress/circle_file_logic_15.json","file-logic",10);
	// renderCircleGraph("/wordpress/circle_file_syntax_15.json","file-syntax",10);
	// renderCircleGraph("/wordpress/circle_file_work_15.json","file-work",10);

	renderCircleGraph("/wordpress/circle_TT_logic_15.json","TT-logic",250);
	renderCircleGraph("/wordpress/circle_TT_syntax_15.json","TT-syntax",150);
	renderCircleGraph("/wordpress/circle_TT_work_15.json","TT-work",100);


	renderMainGraph("/wordpress/circle_developer_comment_15.json","graph",300);


	$.getJSON('/analysis/wordpress/15/developer/degree', function(ANS) {
		parallelData(ANS);
	});

	$.getJSON('/analysis/wordpress/15/TT/degree', function(ANS) {
		//parallelData(ANS);
		renderTabel(ANS);
	});

	//表格数据图
	$('#version-selector').on('change',function(){
		$.getJSON('/analysis/wordpress/'+this.options[this.selectedIndex].value+'/developer/degree', function(ANS) {
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

	//平行数据表格和版本迭代关系的融合图
	$('label.version').on('click',function(event) {
		mixedGraphData();
		// if($('label.TT.active').html())
		// 	renderMainGraph("/wordpress/circle_"+($('label.TT.active').html().split("<")[0])+"_"+$(this).html().split("<")[0]+".json","graph",300);
		if($('label.developer.active').html())
			renderMainGraph("/wordpress/circle_"+($('label.developer.active').html().split("<")[0])+"_"+$(this).html().split("<")[0]+".json","graph",300);
		$.getJSON('/analysis/wordpress/'+$(this).html().split("<")[0]+'/developer/degree', function(ANS) {
			document.location.href = "#parallel";
			parallelData(ANS);

		});
	});

	$('label.TT').on('click',function(event) {
		if($('label.version.active').html())
			renderMainGraph("/wordpress/circle_"+($(this).html().split("<")[0])+"_"+$('label.version.active').html().split("<")[0]+".json","graph",300);
		//console.log($(this).html().split("<")[0]);
	});
	$('label.developer').on('click',function(event) {
		if($('label.version.active').html())
			renderMainGraph("/wordpress/circle_"+($(this).html().split("<")[0])+"_"+$('label.version.active').html().split("<")[0]+".json","graph",300);
		//console.log($(this).html().split("<")[0]);
	});

	$('a.developer').on('click', function(event){
		//console.log('#'+$(this).id);
	});

	$('#graph-tab a:first').tab('show');

});

function mixedGraphData(){
	var activeVersion = [];
	$('label.version.active').each(function() {
		activeVersion.push($(this).html().split("<")[0]);
	});
	var activeTT = [];
	$('label.TT.active').each(function() {
		activeTT.push($(this).html().split("<")[0]);
	});
	var activeDeveloper = [];
	$('label.developer.active').each(function() {
		activeDeveloper.push($(this).html().split("<")[0]);
	});
	//console.log(activeVersion);
	//console.log(activeTT);
	//console.log(activeDeveloper);
	//var mixedData;
	//mixedData.activeVersion = activeVersion;
	//mixedData.activeDeveloper = activeDeveloper;

}

function mixedParallelData(){
	
}

function parallelData(ANS){
	console.log('hello'+ANS);
	$("#parallel").html("");
	var parallel = [];
	var singleArray;
	for( var i=0;i < ANS.DegreeCentrality.length; i++){
		singleArray = new Array(3);
		singleArray[0] = "logic";
		singleArray[1] = ANS.DegreeCentrality[i].name;
		singleArray[2] = ANS.DegreeCentrality[i].logic;
		singleArray[3] = ANS.DegreeCentrality[i].logic;
		//console.log(singleArray);
		parallel.push(singleArray);
		singleArray = new Array(3);
		singleArray[0] = "syntax";
		singleArray[1] = ANS.DegreeCentrality[i].name;
		singleArray[2] = ANS.DegreeCentrality[i].syntax;
		singleArray[3] = ANS.DegreeCentrality[i].logic;
		//console.log(singleArray);
		parallel.push(singleArray);
		singleArray = new Array(3);
		singleArray[0] = "work";
		singleArray[1] = ANS.DegreeCentrality[i].name;
		singleArray[2] = ANS.DegreeCentrality[i].work;
		singleArray[3] = ANS.DegreeCentrality[i].logic;
		//console.log(singleArray);
		parallel.push(singleArray);
	}
	var width = 1200, height = 610, margin ={b:50, t:50, l:300, r:0};

	var svg = d3.select("#parallel")
		.append("svg").attr('width',width).attr('height',(height+margin.b+margin.t))
		.append("g").attr("transform","translate("+ margin.l+","+margin.t+")");

	var data = [ 
		{data:bP.partData(parallel,2), id:'sales', header:["Category","State", "Centrality Analysis"]},
		//{data:bP.partData(sales_data,3), id:'Sales', header:["Channel","State", "Sales"]}
	];

	bP.draw(data, svg);
}


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
