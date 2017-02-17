$a.setup({
    defaultComponentClass: {
    	webEditor: 'WebEditor',
    	webeditor: 'Webeditor'
    }
});


$a.widget.webEditor = $a.widget.webeditor = $a.inherit($a.widget.object, {
    widgetName: 'webeditor',
    properties: {
		height: 300
    },
    init: function(el, options){
		var opts = $.extend(true, {}, this.properties, options);
		$(el).webeditor(opts);
    }
});