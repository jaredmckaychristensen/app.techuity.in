@extends('layouts.master')
@section('page_id','homepage')
@section('main-nav')
		<header>
			<nav class="navbar navbar-default" role="navigation">
				@include('includes.top-admin-block')
			</nav>
		</header>
		<div class="header-bottom">
			<div class="subheader">
				<span class="sitename">Techuity Portal</span>
				<div class="container">
					<span class='subheading-msg'>Providing Technical Co-Founders</span>
				</div>
			</div>
			<div class="subheader-bot">
				<div class="container">
					<span>portal</span>
					<div class="clearfix"></div>
					<nav class="navbar navbar-default" role="navigation">
						@include('includes.navbar')
					</nav>
				</div>
			</div>
		</div>
@stop
@section('tier2-header')
@stop
@section('alerts')
@stop
@section('content')
		<div class="main-content">
			<div class="container">
				<div class="row">
					<p>Content Here</p>
				</div>
			</div>
		</div>
@stop
@section('tier2-footer')
@stop