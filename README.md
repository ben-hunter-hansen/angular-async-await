# angular-async-await

## Overview
This module provides a service that wraps user defined async functions, and
allows them to await operations that update the view model without needing to
manually trigger a $digest cycle. 


## The problem
Consider the following controller logic, where
```UserService.getUser()``` returns a promise:
```javascript
  let vm = this;
  vm.user = {name: ""};
  
  vm.getUser = async function(userName) {
    vm.user = await UserService.getUser(userName);
    console.log(vm.user.name); // --> "foo";
  }
  
  vm.getUser("foo");
```
This code appears to function correctly, but the changes will not be
reflected in the view until a $digest cycle occurs.  Invoking ```$scope.$apply()```
will fix that problem, but then you end up with stuff like this everywhere:

```javascript
vm.getUser = async function(userName) {
  vm.user = await UserService.getUser(userName);
  $scope.$apply();  // don't forget this!
}
```

## The solution.

Let ```$async``` take care of it for you.


```javascript
"use strict";

let SampleViewCtrl = ['DummyService', '$async', function (DummyService, $async) {
  let vm = this;
  vm.user = {};

  vm.getUser = $async(async function (userName) {
    vm.user = await DummyService.getUser(userName);
    // vm.user is now updated in the view
  });
  
  vm.getUser("Ben Hansen");
}];

export default SampleViewCtrl;
```

## Getting started
**NOTE**: This module assumes you already have babel configured
properly for async/await support.  Take a look at this projects
.babelrc file for a list of the required plugins.


1.)  Install the package
```
npm install angular-async-await
```

2.) Import the module
```javascript
import "angular-async-await";
```

3.) Add the module to your apps dependency list
```javascript
angular.module('myApp', [
  'angular-async-await'
])
```

4.) Inject the ```$async``` service when required (typically in a controller and/or directive).
