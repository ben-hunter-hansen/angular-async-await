/**
 * angular-async-await.js
 *
 * Summary: This module provides a service
 * that wraps user defined async functions,
 * and allows them to await operations that update
 * the view model without needing to manually trigger
 * a $digest cycle.
 *
 * Created by Ben Hansen on 2/16/16.
 *
 * To report an issue, please visit:
 * https://github.com/ben-hunter-hansen/angular-async-await/issues
 *
 */


const $async = ['$rootScope','$log', ($rootScope, $log) => {
  "use strict";

  return cb => {

    const validArgument = (typeof cb === 'function');

    const wrapper = async function(...args) {
      try {
        await cb.call(this, ...args);
      } catch(e) {
        $log.error(e);
      } finally {
        $rootScope.$apply();
      }
    };

    if(!validArgument) {
      $log.error(`$async expects a function argument, got ${typeof cb}`);
    }

    return validArgument ? wrapper : () => {/* noop */}
  };
}];

export default angular.module('angular-async-await', [])
  .factory('$async', $async)