jQuery.fn.taskpaper = {}

jQuery.fn.taskpaper = jQuery.fn.taskpaper.getResults = function(options) {
    options = jQuery.extend({
    
        url: null,
        data: this,
        success: null,
        feed: null,

		    load: function(feed){
 
              function node(item, appendTo){
                if (item.items == undefined) return
                var parent = $().taskpaper.treeview.createNode( { 
                          item: item, 
                          appendTo: appendTo 
                          })
                $.each(item.items, function() {
                  node(this, parent)                
                })              
              }
            
		        this.feed = feed
            var parent = this.data
            
            $.each(feed.items, function() { node(this, parent)} )              
            
					},
        
    }, options);
    

    if(options.url) {

        $.ajax({
            type: 'GET',
            url: options.url,
            data: options.data,
            dataType: 'text',
            
            success: function(taskpaper) {
                var feed = new taskpaperResults(taskpaper);
                
                if(jQuery.isFunction(options.load)) options.load(feed)
                if(jQuery.isFunction(options.success)) options.success(feed)
                
                if (options.tagsControl) options.data.selectTags(options.tagsControl)
                if (options.projectsControl) options.data.selectProjects(options.projectsControl)
                if (options.filterControl) options.data.textFilter(options.filterControl)
                options.data.tagsHandler()
            }
        });
    }
    
    // add taskpaper class to activate styles
		this.addClass("taskpaper");
        
};
