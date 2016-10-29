- $apply()方法可以在angular框架之外执行angular.js的表达式，例如：DOM事件，setTimeout,XHR或者是第三方的库
- 其根本原因是：$apply是为了让angularjs内部没有在$digest状态中的代码进入到$digest中，从而实现双向数据绑定。而$digest就是angularjs检测数据更新的方法。例如setTimeout这类延迟函数angularjs不会失去自动运行$digest来绑定数据。从而无法实现其效果，从而无法实现双向数据绑定所以，一般安全使用方法：
	- `if($scope.$$phase){
			$scope.$apply
		}`

	- 	```
		 $scope.safeApply = function(fn) {
    		var phase = this.$root.$$phase;
		    if (phase == ‘$apply‘ || phase == ‘$digest‘) {
		        if (fn && (typeof(fn) === ‘function‘)) {
		            fn();
		        }
		    } else {
		        this.$apply(fn);
		    }
		  };
		```
		  因为后面动态添加数据后，页面因为已经渲染，已经完成导致新添加的数据在页面中无法展示；
		  比如
		  ```
		  	<ul>
				<li ng-options="info.name for info in infos"></li>
		  	</ul>
		  ```
		  因为一开始的时候，infos数组的数据时固定的，那么如果在这之后我们想在infos添加数据这个下拉框选项是不会有改变的，这个时候百度，google就会告诉你用
		  $scope.$apply了，这个时候就会出现[rootScope:inprog]rootScope:inprog]apply already in progress这样的错误信息，那么这时候就需要使用安全的apply。
		  所以：先把最上面的safeApply方法加入你的scope里面，然后动态添加数据后，使用$scope.safeApply();就可以...

	