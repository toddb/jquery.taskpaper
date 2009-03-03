;$(function($){
  
  $.extend($.fn, {
    
    bindItems: function(){    // see jquery.hotkeys.js if a more generic implementation is needed
		  $().items()
		    .unbind('keypress')   // FIXME - only need this because .live isn't working  
		    .bind('keypress', function(event){
            $(event.target).__keypress(event.which, window.getSelection())
		        })
		},
				
		__keypress: function(which, selection){
      // console.log(which)
      switch(which)
      {
        case 58:  // : project
          if (this.isAtEndOfItem()) this.addClass("project")
          break;    
        case 8:   // delete when at the start of an item remove 
          if (this.isAtStartOfEmptyItem()) this.removeItem() 
          if (this.isAtEndOfItem()) this.removeClass("project")          
          break;    
        case 45:  // - task
          if (this.isAtStartOfEmptyItem()) this.addClass("task") // || checkToRemoveProject()
          break;
        case 13:  // enter
         this.appendItemToItem() // || this.appendItemToProject()
          // check that the preceeding character is not a : because then it needs to leave the previous line as project!
          break;
        default:
      }		  
		},
		
		appendItemToItem: function() {
		  var span = $('<span contenteditable="true">')
            .addClass('task')
            .html('&nbsp;')     
		  var item = $('<li>').append(span).insertAfter(this.parent(':first')).hide().slideDown('slow')
		  // focus must come last
      span.focus()
      this.bindItems()
      return item
		},
		
		removeItem: function() {
		  var new_item
		  if (this.parent().is(':only-child')) {
		    new_item = this.projectForItem()
		  } else if (this.parent().is(':last-child')) {
		    new_item = this.prevItem()
		  } else {
		    new_item = this.nextItem()
		  }
      new_item.focus()
      this.parent().slideUp('slow').remove()
      return new_item
		},
		
		isInItem: function() {
		  var sel = $().selection()
      if (sel.anchorNode != sel.focusNode) return false
      if (!$(sel.anchorNode.parentNode).is('span.task,span.note,span.project')) return false
      if (!$(sel.focusNode.parentNode).is('span.task,span.note,span.project')) return false
		  return true
		},
		
		isAtStartOfEmptyItem: function() {  
      return ($.trim($().selection().anchorNode.data).length == 0 && this.isInItem()) ? true : false
		},
				
		isAtEndOfItem: function() {
      return ($().selection().focusOffset == $().selection().focusNode.length && this.isInItem()) ? true : false	  	  
		},
		
    prevItem: function() {
      return this.parent().prev().find('span')
    },
    
    nextItem: function() {
      return this.parent().next().find('span')
    },
    
    projectForItem: function() {
      return this.parent().parent().parent().find('span.project')
    },
    
    

		
  })
})