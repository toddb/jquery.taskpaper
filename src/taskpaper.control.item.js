;(function($){
  
  $.extend($.fn, {
    
    bindItems: function(){    // see jquery.hotkeys.js if a more generic implementation is needed
		  $().items()
		    .unbind('keypress')   // FIXME - only need this because .live isn't working  
		    .bind('keypress', function(event){
		        var key = (event.which == '0') ? event.keyCode : event.which
            $(event.target).__keypress(key)
		        })
		    .bind('blur', function(event){ $(event.target).__blur()})
		},
		
		__blur: function() {
      this.asSelf().replaceWith($.fn.taskpaper.treeview.editable_content(this.text(), this.attr('class')))
      $('.'+$.fn.taskpaper.treeview.classes.taskpaper).selectTags('#tags')  // FIX ME - this is hardcoded yet passed in initially
		},
		
		__keypress: function(which){
		  
		  var KEYS = $.fn.taskpaper.KEYS = {   // FIXME - have as constants higher up?
     		ENTER: 13,
     		DELETE: 8,
     		PROJECT: 58, // :
     		TASK: 45,    // -
     		TAG: 64,
     		UP: 38,
     		DOWN: 40
     	  }  

      switch(which)
      {
        case KEYS.PROJECT:
          if (this.isAtEndOfItem()) this.toggleProject()
          break;    
        case KEYS.DELETE:
          // console.log($.selection())
          if (this.isAtStartOfEmptyItem()) this.removeItem()
          // if (this.isAtEndOfItem()) this.toggleProject()         
          break;    
        case KEYS.TASK:
          if (this.isAtStartOfEmptyItem()) this.toggleTask()
          break;
        case KEYS.ENTER:
          if (this.isAtStartOfEmptyItem()) return false
          
          // create project and add task // if project
          this.appendItemToItem() // && parse line to add tags // if task
 
         // check that the preceeding character is not a : because then it needs to leave the previous line as project!
          break;
        case KEYS.UP:
          if (this.parent().is(':first-child')) {
            this.projectForItem().focus() // FIX ME - doesn't actually select the correct node
          } else {
            this.prevItem().focus()           
          };
          break;
        case KEYS.DOWN:
          if (this.parent().is(':last-child')) {
            this.nextProject().focus()  // FIX ME - doesn't actually select the correct node
          } else {
            this.nextItem().focus()
          };
          break;
        default:
      }		
      
		},
		
		toggleProject: function() { 
		  if (this.hasClass('project')) {
		    this.removeClass("project").addClass('note')
		  } else {
		    this.addClass("project").removeClass('note').removeClass('task')
		  }
		  $('.'+$.fn.taskpaper.treeview.classes.taskpaper).selectProjects('#projects')  // FIX ME - this is hardcoded yet passed in initially
		  return this
		},

		toggleTask: function() { 
		  if (!this.hasClass('task')) this.removeClass("task").addClass('note').removeClass('project')
      // return this.addClass("task").removeClass('note').removeClass('project') 
		},
		
		appendItemToItem: function() {
      var span = $.fn.taskpaper.treeview.editable_content('&nbsp;', 'note')    
		  var item = span.insertAfter(this.parent(':first')).hide().slideDown('slow')		  
      this.bindItems()
      span.find('span.note').focus() // span focus must come after item creation
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
		  var sel = $.selection()
      if (sel.anchorNode != sel.focusNode) return false
      if (!$(sel.anchorNode.parentNode).is('span.task,span.note,span.project')) return false
      if (!$(sel.focusNode.parentNode).is('span.task,span.note,span.project')) return false
		  return true
		},
		
		isAtStartOfEmptyItem: function() {  
      return ($.trim($.selection().focusNode.data).length == 0 && this.isInItem()) ? true : false
		},
				
		isAtEndOfItem: function() {
      return ($.selection().focusOffset == $.selection().focusNode.length && this.isInItem()) ? true : false	  	  
		},
		
    prevItem: function() {
      return this.parent().prev().find('span.note,span.task')
    },
    
    asSelf: function() {
      return this.parents('li:first')      
    },
    
    nextItem: function() {
      return this.parent().next().find('span.note,span.task')
    },

    nextProject: function() {
      return this.parent().next().find('li')  // FIX ME
    },
    
    prevProject: function() {
      return this.parent().next().find('li') // FIX ME
    },
    
    projectForItem: function() {
      return this.parent().parent().parent().find('span.project')
    },
    		
  })
  
})(jQuery);