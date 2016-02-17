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


SampleViewCtrl.js
```javascript
"use strict";

let SampleViewCtrl = ['DummyService', '$async', function (DummyService, $async) {
  let vm = this;
  vm.user = {};
  vm.onlineNow = [];

  vm.getUser = $async(async function (userName) {
    vm.user = await DummyService.getUser(userName);
  });

  vm.getUsersOnline = $async(async function() {
    vm.onlineNow = await DummyService.getUsersOnline();
  });

  vm.getUser("Ben Hansen");
  vm.getUsersOnline();
}];

export default SampleViewCtrl;
```

DummyService.js
```javascript

"use strict";

let DummyService = ['$http', ($http) => {
  let service = {};

  service.getUser = async function(userName) {
    let config = {
      params: {
        name: userName
      }
    };

    let future = await $http.get('http://localhost:3000/user', config);
    return future.data.user;
  };

  service.getUsersOnline = async function() {
    let future = await $http.get('http://localhost:3000/online');
    return future.data.users;
  };

  return service;
}];

export default DummyService;

```
