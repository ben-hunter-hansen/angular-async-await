# angular-async-await


## Examples

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
