var fs = require('fs');

module.exports = function(app){

    app.get('/analysis/wordpress/:version', function(req, res){
        var logic_row = fs.readFileSync('public/wordpress/network_TT_logic_'+ req.params.version +'.json', 'utf-8');
        var syntax_row = fs.readFileSync('public/wordpress/network_TT_syntax_'+ req.params.version +'.json', 'utf-8');
        var work_row = fs.readFileSync('public/wordpress/network_TT_work_'+ req.params.version +'.json', 'utf-8');
        var developers_row = fs.readFileSync('public/wordpress/developer.json','utf-8');
        var TT_logic = JSON.parse(logic_row);
        var TT_syntax = JSON.parse(syntax_row);
        var TT_work = JSON.parse(work_row);
        var developers = JSON.parse(developers_row);

        var SNA = { "DegreeCentrality":[] };

        for(var j = 0; j < developers.length; j++){
            var logic_count = 0, syntax_count = 0, work_count = 0;
            for(var i =0; i< TT_logic.length; i++){
                if(TT_logic[i]['developer1'] == developers[j]['developer'] || TT_logic[i]['developer1'] == developers[j]['developer']){
                    logic_count += TT_logic[i]['count'];
                }
            }
            for(var i =0; i< TT_syntax.length; i++){
                if(TT_syntax[i]['developer1'] == developers[j]['developer'] || TT_syntax[i]['developer1'] == developers[j]['developer']){
                    syntax_count += TT_syntax[i]['count'];
                }
            }
            for(var i =0; i< TT_work.length; i++){
                if(TT_work[i]['developer1'] == developers[j]['developer'] || TT_work[i]['developer1'] == developers[j]['developer']){
                    work_count += TT_work[i]['count'];
                }
            }
            SNA.DegreeCentrality.push({'name':developers[j]['developer'],'logic':logic_count,'syntax':syntax_count,'work':work_count});
        }
        res.json(SNA);
    });

    app.get('/analysis/wordpress/:version/2', function(req, res){
        var logic_row = fs.readFileSync('public/wordpress/network_TT_logic_'+ req.params.version +'.json', 'utf-8');
        var syntax_row = fs.readFileSync('public/wordpress/network_TT_syntax_'+ req.params.version +'.json', 'utf-8');
        var work_row = fs.readFileSync('public/wordpress/network_TT_work_'+ req.params.version +'.json', 'utf-8');
        var developers_row = fs.readFileSync('public/wordpress/developer.json','utf-8');
        var TT_logic = JSON.parse(logic_row);
        var TT_syntax = JSON.parse(syntax_row);
        var TT_work = JSON.parse(work_row);
        var developers = JSON.parse(developers_row);

        var SNA = { "DegreeCentrality":[] };

        for(var j = 0; j < developers.length; j++){
            var logic_count = 0, syntax_count = 0, work_count = 0;
            for(var i =0; i< TT_logic.length; i++){
                if(TT_logic[i]['developer1'] == developers[j]['developer'] || TT_logic[i]['developer1'] == developers[j]['developer']){
                    logic_count += TT_logic[i]['count'];
                }
            }
            for(var i =0; i< TT_syntax.length; i++){
                if(TT_syntax[i]['developer1'] == developers[j]['developer'] || TT_syntax[i]['developer1'] == developers[j]['developer']){
                    syntax_count += TT_syntax[i]['count'];
                }
            }
            for(var i =0; i< TT_work.length; i++){
                if(TT_work[i]['developer1'] == developers[j]['developer'] || TT_work[i]['developer1'] == developers[j]['developer']){
                    work_count += TT_work[i]['count'];
                }
            }
            SNA.DegreeCentrality.push({'name':developers[j]['developer'],'logic':logic_count,'syntax':syntax_count,'work':work_count});
        }
        res.json(SNA);
    });

}