$(document).ready(function() {
	//get all dynamic tables and set them up
	$('.table-dynamic').each(function(index)  {
		//set the current sort on the table
		var sort = urlParam('sort') ? urlParam('sort') : $(this).data('sort');
		var sort_order = urlParam('sort_order') ? urlParam('sort_order') : $(this).data('sort_order');
		$(this).data('sort', sort);
		$(this).data('sort_order', sort_order);
		
		//add sort to all sort columns
		$('#' + $(this).attr('id') + ' thead tr:first th.sort').each(function(index)  {
			//default values
			var data_order = 'ASC';
			var sort_class = 'glyphicon-resize-vertical';
			
			//if this is the current sort
			if(sort == $(this).data('column'))  {
				//currently asc
				if(sort_order == 'ASC')  {
					data_order = 'DESC';
					sort_class = 'glyphicon-arrow-up'; 
				}
				else  {
					data_order = 'ASC';
					sort_class = 'glyphicon-arrow-down';
				}
			}
			$(this).append('<a href="#" class="sort-action" data-column="' + $(this).data('column') + '" data-order="' + data_order + '"><span class="glyphicon ' + sort_class + '"></span></a>');
		});
		
		//check for filters and sort in header
		if($(this).data('searchable') == 'on')  {
			var search_row = '';
			//look at each data column
			$('#' + $(this).attr('id') + ' thead tr:first th').each(function(index)  {
				//if a search column add the type
				if($(this).hasClass('td-search'))  {
					//get the value if it is passed in URL
					var val = urlParam($(this).data('column'));
					switch($(this).data('search_type'))  {
						case 'text':
							search_row = search_row + '<th class="filter-th"><input class="search-query" type="text" data-column="' + $(this).data('column') + '" value="' + val + '"></input></th>';
							break;
						case 'enum':
							search_row = search_row + '<th class="filter-th"><select class="search-query" data-column="' + $(this).data('column') + '"><option value=""></option>';
							//add each of the options
							$.each($(this).data('search_options'), function(index, value) {
								search_row = search_row + '<option value="' + index + '"' + (index == val ? ' selected' : '') + '>' + value + '</option>';
							});
							search_row = search_row + '</select></th>';
							break;
						case 'date':
							var from_val = urlParam($(this).data('column') + '_from');
							var to_val = urlParam($(this).data('column') + '_to');
							search_row = search_row + '<th class="filter-th"><div>FROM:&nbsp;<input class="search-query date-search date-from" type="text" data-provide="datepicker" data-date-format="mm/dd/yy" data-date-autoclose="true" data-column="' + $(this).data('column') + '_from" value="' + from_val + '"></input></div>' +
								'<div>TO:&nbsp;<input class="search-query date-search date-to" type="text" data-provide="datepicker" data-date-format="mm/dd/yy" data-date-autoclose="true" data-column="' + $(this).data('column') + '_to" value="' + to_val + '"></input></div></th>';
							break;
					}
				}
				//add icon to clear filters
				else if($(this).data('column') == 'action')  {
					search_row = search_row + '<th class="filter-th"><a href="' + window.location.pathname + '" class="glyphicon glyphicon-remove-circle remove-filters" title="Remove Filters"></a></th>';
				}
				else  {
					//add an empty col
					search_row = search_row + '<th class="filter-th"></th>';
				}
			});
			//add the row
			if(search_row)  {
				$('#' + $(this).attr('id') + ' thead tr:last').after('<tr>' + search_row + '</tr>');
			}
		}
		
		//submit the request to retrieve initial data
		var page = urlParam('page') ? urlParam('page') : 1;
		
		//Check for pass-through filters
		var filters = {};
		if($(this).data('passthrough'))
			filters = $.query_params;
		tableDynamicQuery($(this).attr('id'), page, filters);
	});
	
		
});

//sort by column
$(document).on('click', '.table-dynamic .sort-action', function(e)  {
	e.preventDefault();
	//get the table
	var table = $(this).closest('.table-dynamic');

	//set the sort column
	var order = $(this).data('order') ? $(this).data('order') : 'ASC';
	table.data('sort', $(this).data('column'));
	table.data('sort_order', $(this).data('order'));
	var params = tableGenerateParams(table.attr('id'));
	
	//redirect to the proper query url
	window.location = window.location.pathname + params;
});

//column search
$(document).on('keyup', '.table-dynamic .search-query', function(e)  {
	//if enter key is pressed
	if(e.keyCode == 13)  {
		//get the table
		var table = $(this).closest('.table-dynamic');
		var params = tableGenerateParams(table.attr('id'));
		//redirect to the proper query url
		window.location = window.location.pathname + params;
	}
});
$(document).on('change', '.table-dynamic select.search-query', function(e)  {
	//get the table
	var table = $(this).closest('.table-dynamic');
	var params = tableGenerateParams(table.attr('id'));
	//redirect to the proper query url
	window.location = window.location.pathname + params;
});
$(document).on('change', '.table-dynamic .date-search', function(e)  {
	//get the table
	var table = $(this).closest('.table-dynamic');
	var params = tableGenerateParams(table.attr('id'));
	//redirect to the proper query url
	window.location = window.location.pathname + params;
});

//builds the page params for the specified table
function tableGenerateParams(table_id, filters) 
{
	//get the table
	var table = $('#' + table_id);
	//define the params
	var params = '?limit=' + table.data('pagination') + '&sort=' + encodeURIComponent(table.data('sort')) + '&sort_order=' + table.data('sort_order');
	//add filters
	$('#' + table.attr('id') + ' thead .search-query').each(function(index)  {
		params = params + '&' + $(this).data('column') + '=' + encodeURIComponent($(this).val());
	});
	//override filters
	if(typeof filters != 'undefined' && filters != null)
	{
		for(var key in filters)
		{
			if(typeof filters[key] !== 'function')
			{
				params = params+'&'+key+'='+filters[key];
			}//end if
		}//end for
	}//end if
	return params;
}

//submit the query to be loaded in the specified table
function tableDynamicQuery(table_id, page, filters)  {
	//get the table
	var table = $('#' + table_id);
	
	//waiting cursor
	$('#'+table_id+' tbody:first').html('<tr><td colspan="'+$('#' + table_id + ' thead:first tr:first th').length+'"><div class="text-center"><img src="/img/waiting.gif" /></div></td></tr>');
	
	//generate the query
	var page = !page ? 1 : page;
	var params = tableGenerateParams(table_id, filters);
	
	//save the URL without page so we can use in pagination links
	var paginate_url = window.location.pathname + params;
	
	//add the current page to url
	var url = table.data('uri') + params + '&page=' + page; 
		
	//retrieve the data
	$.get(url, function(result)  {
		if(result.success)  {
			//replace the table data
			$('#' + table.attr('id') + ' tbody tr').remove();
			$.each(result.data, function(index, row)  {
				tablePopulateRow(table.attr('id'), row);
			});
			
			//remove existing pagination
			$('.' + table.attr('id') + '_paginate').remove();
			$('.paginator').html('&nbsp;');
			
			//check for pagination
			if(table.data('pagination') && result.pages > 1)  {
				//build the links
				var pagin = '<div class="row pull-left pagination ' + table.attr('id') + '_paginate"><li><a data-page="1" href="' + paginate_url + '&page=1">&laquo;</a></li>';
				
				//We want to only show a limited number of pages
				//If the current page is less than 5, show everything up to that point
				if(result.current_page <= 5)
				{
					for(var x=1; x <= result.current_page; x++)
						pagin = pagin + '<li' + (result.current_page == x ? ' class="active"' : '') + '><a data-page="'+x+'" href="' + paginate_url + '&page=' + x + '">' + x + '</a></li>';
				}//end if
				//Otherwise we show the first page, some dots, then 2 prior to the current
				else
				{
					pagin = pagin + '<li><a data-page="1" href="' + paginate_url + '&page=1">1</a></li>';
					pagin = pagin + '<li class="disabled"><span class="fa fa-ellipsis-h fa-small"></span></li>';
					for(var x=result.current_page-2; x <= result.current_page; x++)
						pagin = pagin + '<li' + (result.current_page == x ? ' class="active"' : '') + '><a data-page="'+x+'" href="' + paginate_url + '&page=' + x + '">' + x + '</a></li>';
				}//end else
				//If less than 5 remain, just show them all
				var remaining = result.pages - result.current_page;
				if(remaining <= 5)
				{
					for(var x=parseInt(result.current_page)+1; x <= result.pages; x++)
						pagin = pagin + '<li><a data-page="'+x+'" href="' + paginate_url + '&page=' + x + '">' + x + '</a></li>';
				}//end if
				//otherwise show the next two, dots, then last page
				else
				{
					for(var x=parseInt(result.current_page)+1; x <= parseInt(result.current_page)+2; x++)
						pagin = pagin + '<li' + (result.current_page == x ? ' class="active"' : '') + '><a data-page="'+x+'" href="' + paginate_url + '&page=' + x + '">' + x + '</a></li>';
					pagin = pagin + '<li class="disabled"><span class="fa fa-ellipsis-h fa-small"></span></li>';
					pagin = pagin + '<li><a data-page="'+result.pages+'" href="' + paginate_url + '&page='+result.pages+'">'+result.pages+'</a></li>';
				}//end else
				pagin = pagin + '<li><a data-page="'+result.pages+'" href="' + paginate_url + '&page=' + result.pages + '">&raquo;</a></li></div>';
				//add below the table
				if(table.data('manual-paginator'))
				{
					$('.paginator').html(pagin);
				}//end if
				else
				{
					if(!table.data('pagination-no-top'))
						$('#' + table.attr('id')).before(pagin);
					if(!table.data('pagination-no-bottom'))
						$('#' + table.attr('id')).after(pagin);
				}//end else
				
				//Now make fix all of the links to be ajax.  We do this separately in case we want to make this optional later
				$('.pagination > li > a').each(function(index)
				{
					$(this).on('click',function(e)
					{
						e.preventDefault();
						tableDynamicQuery(table_id, $(this).data('page'), filters)
					});
				});
			}
			
			//Add draggability
			$('.draggable').draggable(
			{
				helper : "clone",
				opacity : 0.7,
				cursor : "move",
				revert : function(dropped)
				{
					var dropped = dropped && dropped.hasClass("droppable");
					return !dropped;
				}//end revert
			});
		}
		else  {
			//TODO: Fix this to be more robust
			alert('error: ' + result.messages);
		}
	});
		
}

//populate a row <tr> for the specified table and add it
function tablePopulateRow(tableId, data)  {
	var row;
	
	//search for an object id
	var id = data['id'];
	var draggable = typeof data['draggable']
	
	//determine the cols that should be included
	$('#' + tableId + ' thead:first tr:first th').each(function(index)  {
		var rdata = data[$(this).data('column')];
		//check for a callback defined
		if($(this).data('callback'))  {
			var fn = window[$(this).data('callback')];
			rdata = fn(rdata);
		}
		
		//add the column to the row and include any classes that should be present
		if($(this).data('column') == 'draggable')
		{
			rdata = '<div class="text-center"><i class="fa fa-bars fa-2x"></i></div>';
		}//end if
		if($(this).data('selectable'))
		{
			var exclude_function = $(this).data('selectable-exclude');
			if(!exclude_function || typeof window[exclude_function] !== 'function' || !window[exclude_function](id))
				rdata = '<input type="checkbox" class="'+$(this).data('selectable_class')+'" value="'+id+'" />';
			else rdata = '';
		}//end if
		row = row + '<td' + ($(this).data('td_class') ? ' class="' + $(this).data('td_class') + '"' : '') + '>' + rdata + '</td>';
	});
	//create the row and add to table
	$('#' + tableId + ' tbody:first').append('<tr'+($('#'+tableId).data('draggable') ? ' class="draggable" data-id="'+id+'" data-type="'+$('#'+tableId).data('draggable-type')+'"' : '')+'>' + row + '</tr>');
}

