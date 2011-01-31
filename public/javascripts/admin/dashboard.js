

    $(document).ready(function(){
      
      //Put paginator in middle
      var paginator_width = $('div.paginate').width();
      $('div.paginate').css('margin-left', ((626-paginator_width)/2) +'px');
      $('div.paginate').show();
    
      $('a.close').click(function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        $('div.requests_info').fadeOut();
      });
      
      $('ul.your_tables li.last').hover(function(){
        $('div.tables_list div.left div.bottom_white_medium').css('background-position','0 -11px');
      }, function(){
        $('div.tables_list div.left div.bottom_white_medium').css('background-position','0 0');
      });
      
      
      $('a.new_table').click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        $('div.mamufas').fadeIn();
        // $.ajax({
        //   method: "POST",
        //   url: '/api/json/tables/',
        //   success: function(data) {
        //     console.debug(data);
        //   },
        //   error: function(e) {
        //     console.debug(e);
        //   }
        // });
      });
      
      $('a.delete').click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var table_id = $(this).attr('table-id');
        $('div.mamufas a.confirm_delete').attr('table-id',table_id);
        $('div.mamufas div.delete_window').show();
        $('div.mamufas').fadeIn('fast');
        bindESC();
      });
      
      
      $('div.mamufas a.cancel, div.mamufas a.close_delete, div.mamufas a.close_settings').click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        $('div.mamufas').fadeOut('fast',function(){
          $('div.mamufas div.settings_window').hide();
          $('div.mamufas div.delete_window').hide();
        });
        unbindESC();
      });
      
      
      
      $('a.confirm_delete').click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        var table_id = $(this).attr('table-id');
        $.ajax({
          type: "DELETE",
          url: '/api/json/tables/'+table_id,
          success: function(data) {
            window.location.href=window.location.href;
          },
          error: function(e) {
            console.debug(e);
          }
        });
      });
      
      
      $('a.settings').click(function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        $('div.mamufas div.settings_window').show();
        $('div.mamufas').fadeIn('fast');
        bindESC();
      });
      
    });
    
    
    function bindESC() {
      $(document).keydown(function(){
        if (event.which == '27') {
          $('div.mamufas').fadeOut('fast',function(){
            $('div.mamufas div.settings_window').hide();
            $('div.mamufas div.delete_window').hide();
          });
        }
      });
    }

    function unbindESC() {
      $(document).unbind('keydown');
    }
    