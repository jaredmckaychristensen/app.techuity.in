@section('pre')
<!DOCTYPE html>
<!--[if lt IE 7]> <html class="lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>    <html class="lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>    <html class="lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="modern"> <!--<![endif]-->

<!-- The preceding is based on a series of tests done by Paul Irish and the HTML5Boilerplate crew.
	reference: http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
@show
	<head>
@section('meta')
		<title>Techuity: @yield('title','Portal')</title>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Techuity">
		<meta property="og:title" content="Techuity @yield('title','Portal')">
		<meta name="robots" content="index, nofollow">
		<meta name="csrf-token" content="{{csrf_token()}}">
@show
@section('scripts')

		<script type="text/javascript" src="/js/vendor/modernizr-2.8.3.min.js"></script>
		<script type='text/javascript' src='/js/vendor/jquery-1.11.2.min.js'></script>
		<script type='text/javascript' src="/js/bootstrap.min.js"></script>
		<script type='text/javascript' src="/js/bootstrap-tagsinput.min.js"></script>
		<script type='text/javascript' src="/js/plugins.js"></script>
		<script type='text/javascript' src="/js/bloodhound.js"></script>
		<script type='text/javascript' src="/js/bootstrap3-typeahead.min.js"></script>
		<script type='text/javascript' src="/js/validator.js"></script>
		<script type='text/javascript' src="/js/vendor/ckeditor/ckeditor.js"></script>
		<script type="text/javascript" src="/js/bootbox.min.js"></script>
		<script type="text/javascript" src="/js/main.js"></script>
@show
@section('css')

		<link type="text/css" rel="stylesheet" href="/css/normalize.min.css">
		<link type="text/css" rel="stylesheet" href="/css/main.min.css">
		<link type="text/css" rel="stylesheet" href="/css/bootstrap.min.css">
		<link type="text/css" rel="stylesheet" href="/css/bootstrap-tagsinput.min.css">
		<link type="text/css" rel="stylesheet" href="/css/font-awesome.min.css">
		<link type="text/css" rel="stylesheet" href="/css/typeaheadjs.css">
		<link type="text/css" rel="stylesheet" href="/css/style.css">
@show
	</head>
	<body>

		<div id="@yield('page_id','clientportal')">

@section('main-nav')
			<header>
				<nav class="navbar navbar-default" role="navigation">
					<div class="container">
						<a href='/' class="logo">
							Techuity
							<span>PORTAL</span>
						</a>
						@include('includes.top-admin-block')
						@include('includes.navbar')
					</div>
				</nav>
			</header>
@show
@section('tier2-header')
			<div class="container">
				<div class="content">
					<div class="row top">
						<div class="col-md-9 col-sm-4 ">
							<span class="title">Technical Co-Founders</span>
							<br/>
							<span class="subtitle">Another Tagline</span>
						</div>
						<div class="clearfix"></div>
					</div>
					@yield('title-action','')
					<h2>@yield('title','Add Page Title')@yield('sub-title','')</h2>
					<div class="clearfix"></div>
@show

@include('includes.notifications')

@yield('content')
					<div class="clearfix"></div>
@section('tier2-footer')
				</div>
			</div>
@show
			<div class="modal fade" id="stretto_modal_default" style="display:none;"></div>
			<div class="modal fade" id="stretto_modal_error" style="display:none;">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
							<h4 class="modal-title" id="modalLabel">Error</h4>
						</div>
						<div class="modal-body"></div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>