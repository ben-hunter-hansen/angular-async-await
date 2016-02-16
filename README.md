# angular.async

* Use ES7 async/await syntax with angular 1.x

SampleViewCtrl.js
```javascript
"use strict";

let SampleViewCtrl = ['DummyService','$async', function(DummyService, $async) {
  let vm = this;
  vm.user = {};
  vm.onlineNow = [];

  async function getViewModel() {
    let model = await DummyService.getAll();

    vm.user = model.user;
    vm.onlineNow = model.online;
  }

  $async.register('getViewModel', getViewModel);
  $async.invokeAll();  // Init view model
}];
```

DummyService.js
```javascript

"use strict";

let DummyService = ['$http', ($http) => {
  let service = {};

  service.getCurrentUser = async function() {
    let future = await $http.get('http://localhost:3000/user');
    return future.data.user;
  };

  service.getUsersOnline = async function() {
    let future = await $http.get('http://localhost:3000/online');
    return future.data.users;
  };

  service.getAll = async function() {
    let userFuture = await service.getCurrentUser();
    let onlineFuture = await service.getUsersOnline();

    return {user: userFuture, online: onlineFuture};
  };

  return service;
}];

```
