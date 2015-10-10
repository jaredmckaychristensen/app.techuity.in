
				@if(Auth::guest())
					<a href="/auth/login" class="user-btn"><i class="glyphicon glyphicon-log-in glyphicon-sm"></i> Sign In</a>
				@else
					<a href="/auth/logout" class="user-btn">Sign Out <i class="glyphicon glyphicon-log-in"></i></a>
					<div class="modal fade" id="edit_account" style="display:none;"></div>
					<div class="modal fade" id="edit_page" style="display:none;"></div>
					<!-- div class="modal fade" id="my_pages" style="display:none;" data-large="true"></div-->
					<ul class="nav nav-pills pull-right" style="margin-top:10px;">
						<li role="presentation" class="dropdown">
							<a class="dropdown-toggle btn btn-green" data-toggle="dropdown" href="#" role="button" aria-expanded="false"><i class="glyphicon glyphicon-cog"></i> Administration <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<!-- li><a href="/modals/my_pages" data-toggle="stretto.modal" data-target="#my_pages">My Pages</a></li-->
								<li><a href="/modals/my_account" data-toggle="stretto.modal" data-target="#edit_account">My Account</a></li>
							@if(in_array(Auth::user()['type'],[\Techuity\User::TYPE_ADMIN,\Techuity\User::TYPE_INSTITUTE]))
								<li><a href="/my/centers/">My Centers</a></li>
							@elseif(Auth::user()->type == \Techuity\User::TYPE_CENTER)
								<li><a href="/centers/{{Auth::user()->center_id}}">My Center</a>
							@endif
							@if(in_array(Auth::user()['type'],[\Techuity\User::TYPE_ADMIN,\Techuity\User::TYPE_INSTITUTE,\Techuity\User::TYPE_CENTER]))
								<li><a href="/my/resources/">My Resources</a></li>
								<li><a href="/users/">Users</a></li>
							@endif
							</ul>
						</li>
					</ul>
				@endif