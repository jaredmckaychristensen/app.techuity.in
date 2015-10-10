@if ($errors->any())
<div class="alert alert-danger">
	<button type="button" class="close" data-dismiss="alert">&times;</button>
	<h4><i class="glyphicon glyphicon-warning-sign"></i> Warning:</h4>
	@foreach($errors->all() as $error)
	<li>{{$error}}</li>
	@endforeach
</div>
<script type="text/javascript">
$(function()
{
	@foreach($errors->toArray() as $field=>$messages)
	$('#group_{{$field}}').addClass('has-error');
	$('#group_{{$field}} p.help-block').html('{{$messages[0]}}').show();
	@endforeach
});
</script>
@endif

@if ($message = Session::get('success'))
<div class="alert alert-success alert-block">
	<button type="button" class="close" data-dismiss="alert">&times;</button>
	<h4>Success</h4>
	{{ $message }}
</div>
@endif

@if ($message = Session::get('error'))
<div class="alert alert-danger alert-block">
	<button type="button" class="close" data-dismiss="alert">&times;</button>
	<h4>Error</h4>
	{!! $message !!}
</div>
@endif

@if ($message = Session::get('warning'))
<div class="alert alert-warning alert-block">
	<button type="button" class="close" data-dismiss="alert">&times;</button>
	<h4>Warning</h4>
	{{ $message }}
</div>
@endif

@if ($message = Session::get('info'))
<div class="alert alert-info alert-block">
	<button type="button" class="close" data-dismiss="alert">&times;</button>
	<h4>Info</h4>
	{{ $message }}
</div>
@endif