jQuery.fn.taskpaper = {}

jQuery.fn.taskpaper = jQuery.fn.taskpaper.getResults = function(options) {

    var self = this

    options = $.extend({
    
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
            
            // FIXME - this should be in the taskpaper.treeview - but it isn't binding nicely -- hhhhmmmm
            self.bindItems()
          
            self.sortable({ 
                cursor: 'move',
                items: 'li',
                handle: '.handle' 
                })
                
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

                if($.isFunction(options.load)) options.load(feed)
                if($.isFunction(options.success)) options.success(feed)
                
                if (options.tagsControl) options.data.selectTags(options.tagsControl)
                if (options.projectsControl) options.data.selectProjects(options.projectsControl)
                if (options.filterControl) options.data.textFilter(options.filterControl)
                options.data.tagsHandler()                      
            }
        });
    }
    
    // add taskpaper class to activate styles
		this.addClass($.fn.taskpaper.treeview.classes.taskpaper);

    // add Quick Entry panel TODO: refactor to a toolbar
  	obj = $("<a href='#'></a>")
			.attr('title', 'Quick Entry')
      .text('Quick Entry')
			.click( function(e) {
				self.event = e;
				var panel = self.create_panel("Quick Entry", 700); 				
   			panel.append('\
          <p><textarea type="text" id="taskpaper" cols="80" rows="20" value=""/></p>\
          <p class="submit"><button id="ok">Ok</button><button id="cancel">Cancel</button></p>'
          ).show();

      	$('#cancel', panel).click( function() { panel.remove(); return false; } );
      	
      	$('#ok', panel).click( function() { 
      	  self.empty()
      	  if($.isFunction(options.load)) options.load(new taskpaperResults($('#taskpaper', panel).val()))
      	  panel.remove();
    	    return false; 
    	  });
    	  
    	  $('#taskpaper', panel).val(self.serialize())
    	         
			  return false;
			})

		$("#quick-entry").append(obj.addClass('quick-entry'));

    $('#send').click(function(){alert(self.serialize())})
		
        
};
