					<div class="navbar-header">
						<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
					</div>
					<div class="collapse navbar-collapse" id="example-navbar-collapse">
						<ul class="nav navbar-nav">
							<li role="presentation">
								<a href="/about"{!!Request::is('about') ? ' class="active"' : ''!!}>About</a>
							</li>
							<li role="presentation">
								<a href="/resources"{!!Request::is('resources*') ? ' class="active"' : ''!!}>Resources</a>
							</li>
							<li role="presentation">
								<a href="/pitches"{!!Request::is('pitches*') ? ' class="active"' : ''!!}>Pitches</a>
							</li>
						</ul>
					</div>