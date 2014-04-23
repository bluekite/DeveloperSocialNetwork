$(document).ready(function(){
	$.getJSON('/analysis/wordpress/15', function(ANS) {
		var table_html = '';
		table_html += '<tr><th>Developer Name</th><th>logic.DegreeCentrality</th><th>syntax.DegreeCentrality</th><th>work.DegreeCentrality</th></tr>';
		for( var i=0;i < ANS.DegreeCentrality.length; i++){
			table_html += '<tr><td>'+ ANS.DegreeCentrality[i].name +'</td><td>'+ ANS.DegreeCentrality[i].logic +'</td><td>'+ ANS.DegreeCentrality[i].syntax +'</td><td>'+ ANS.DegreeCentrality[i].work +'</td><td>'+'</td></tr>';
		}

		$('#TT-analysis').append(table_html);
	});
	$('#version-selector').on('change',function(){
		$.getJSON('/analysis/wordpress/'+this.options[this.selectedIndex].value, function(ANS) {
			var table_html = '';
			table_html += '<tr><th>Developer Name</th><th>logic.DegreeCentrality</th><th>syntax.DegreeCentrality</th><th>work.DegreeCentrality</th></tr>';
			for( var i=0;i < ANS.DegreeCentrality.length; i++){
				table_html += '<tr><td>'+ ANS.DegreeCentrality[i].name +'</td><td>'+ ANS.DegreeCentrality[i].logic +'</td><td>'+ ANS.DegreeCentrality[i].syntax +'</td><td>'+ ANS.DegreeCentrality[i].work +'</td><td>'+'</td></tr>';
			}

			$('#TT-analysis').html(table_html);
		});
	})

})