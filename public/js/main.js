$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//Add content type for "get" requests
$.ajaxPrefilter(function(options, originalOptions, jqXHR)
{
	if(originalOptions.type == 'GET' || originalOptions.type == 'get')
	{
		return jqXHR.setRequestHeader('Content-Type', 'application/json');
	}
});

var MODAL_COUNTER = 0;
$(document).ready(function() {

	/** clear modals when they are closed * */
	$(document).on(
			'hidden.bs.modal',
			'.modal',
			function(e) {
				$(this).data('bs.modal', null);
				$(this).removeClass('fv-modal-stack');
				MODAL_COUNTER -= 1;
				$('.modal-backdrop').css('min-height',
						$(document).height());
			});

	$(document)
			.on(
					'show.bs.modal',
					'.modal',
					function(e) {
						// if the z-index of this modal has been
						// set, ignore.
						if ($(this).hasClass('fv-modal-stack'))
							return;
						$(this).addClass('fv-modal-stack');
						MODAL_COUNTER += 1;
						$(this).css('z-index',
								1040 + (10 * MODAL_COUNTER));
						$(this).children('.modal-dialog').css(
								'z-index',
								1041 + (10 * MODAL_COUNTER));
					});

	$(document).on(
			'shown.bs.modal',
			'.modal',
			function(e) {
				$('.modal-backdrop').not('.fv-modal-stack')
						.css('z-index',
								1039 + (10 * MODAL_COUNTER));
				$('.modal-backdrop').not('.fv-modal-stack')
						.addClass('fv-modal-stack');
				$('.modal-backdrop').css('min-height',
						$(document).height());
			});
	
	
	/*
	 * search query type-ahead
	 */
	var q = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.whitespace,
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		remote: '/search/json?q=%QUERY'
	});
	q.initialize();
	
	$('#q').typeahead({
		name: 'search_q',
		source: q.ttAdapter(),
		autoSelect: false,
		afterSelect: function(data){
				window.location = '/search?exact=1&q='+data
		}
	});
	
	$('#tags').tagsinput({
		typeahead:{
			name: 'tags',
			source: function(query,process){
				return $.get('/search/tags?q='+query);;
			},
			autoSelect: false,
		}
	});

	$('form').validator().on('submit', function(e){
		if(e.isDefaultPrevented())
		{
			
		}//end if
		else
		{
			$('.btn-primary').prop('disabled',true);
			$('.btn-primary').addClass('disabled');
		}//end else
	});
});



/*
 * Returns default HTML for when a modal is loading
 */
function getModalWaitingHtml()
{
	return '<div class="modal-dialog"><div class="modal-content"><div class="modal-body text-center"><img src="/img/waiting.gif" /></div></div></div>';
}//end function


/*
 * This function adds backwards compatibility for remote modals, which was depricated in the last version of bootstrap
 * if using the "remote" option, this won't fix it, you'll have to do it another way.  But if using the inline tag attributes, this should fix it.
 */
STRETTO_MODAL_TARGET = '#stretto_modal_default';//TODO: eventually organize this into a prototype with separate options/etc
STRETTO_MODAL_ERROR = '#stretto_modal_error';
$(document).ready(function()
{
	$(document).on('click', '[data-toggle="stretto.modal"]', function(e)
	{
		e.preventDefault();
		/*	get url	*/
		var url = $(this).attr('href');
		if(typeof url === typeof undefined || url === false)
			url = null;
		
		var target = $(this).data("target");
		if(typeof target === typeof undefined || target === false)
			target = STRETTO_MODAL_TARGET;
		
		var backdrop = $(this).data("backdrop");
		if(typeof backdrop === typeof undefined || backdrop === false)
			backdrop = 'static';
		
		console.log('opening modal with target='+target+' backdrop='+backdrop+' url='+url);
		$(target).html(getModalWaitingHtml());
		$(target).modal({backdrop:backdrop,show:true});
		//if no remote data, just exit
		if(url == null)
			return;
		
		if($(target).data('large'))
			$(target+" .modal-dialog").addClass('modal-list');
		
		$(target+" .modal-dialog").load(url, function(response,status,xhr)
		{
			if(status != "error")
				return false;
			console.log(xhr.status+": "+xhr.statusText);
			$(STRETTO_MODAL_ERROR+" .modal-body").html('<div class="alert alert-danger">'+xhr.status+": "+xhr.statusText+'</div>');
			$(STRETTO_MODAL_ERROR).modal({show:true});
			$(target).modal('hide');
		});
	});
});



/** Retrieve a URL parameter by name **/
function urlParam(name)  {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return '';
    }
    else{
       return decodeURIComponent(results[1]) || '';
    }
}


$(document).on('click', '.delete-user',function(e)
{
	e.preventDefault();
	var id = $(this).data('id');
	var name = $(this).data('name');
	bootbox.confirm("Are you sure you want to permanently delete user #"+id+' ('+name+')?', function(result)
	{
		if(!result)
			return;
		deleteObject(id,'users');
	});
});
$(document).on('click', '.delete-resource',function(e)
{
	e.preventDefault();
	var id = $(this).data('id');
	var name = $(this).data('name');
	bootbox.confirm("Are you sure you want to permanently delete resource #"+id+' ('+name+')?', function(result)
	{
		if(!result)
			return;
		deleteObject(id,'resources');
	});
});
$(document).on('click', '.delete-center',function(e)
		{
			e.preventDefault();
			var id = $(this).data('id');
			var name = $(this).data('name');
			bootbox.confirm("Are you sure you want to permanently delete center #"+id+' ('+name+')?<br/><br/><strong>All associated resources and users will be permanently deleted as well!</strong>', function(result)
			{
				if(!result)
					return;
				deleteObject(id,'centers');
			});
		});

function deleteObject(id,path)
{
	//Bug in laravel where you can't use application/json on a delete request to a resource
	var contentType = $.ajaxSettings.headers['Content-Type'];
	$.ajax(
	{
		url: '/'+path+'/'+id,
		data: {_method:'DELETE'},
		method: 'POST',
		success: function(result, textStatus, jqXHR)
		{
			if(result.success) 
			{
				window.location.href = '/my/'+path+'/';
				return;
			}//end if
			
			//check for messages
			if(result.messages)
			{
				var txt = '';
				$.each(result.messages, function(index, val)  {
					if(val)  {
						txt = txt + val + "\n";
					}
				});
				if(txt)  {
					bootbox.alert(txt);
					return;
				}
			}//end if messages
			
			//default error
			bootbox.alert('There was a problem deleting the item! Please try again or contact support.');
		},
		error: function(jqXHR, textStatus, errorThrown)
		{
			bootbox.alert('There was a problem deleting the item! Please try again or contact support.');
		}
	});
}//end function