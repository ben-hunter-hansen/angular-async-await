/**
 * Created by ben on 2/18/16.
 */

describe('angular-async-await', () => {
  "use strict";

  let $async, $log;

  beforeEach(() => {
    angular.mock.module('angular-async-await');
    inject((_$async_, _$log_) => {
      $async = _$async_;
      $log = _$log_;
    });

    spyOn($log, 'error');
  });

  describe('$async', () => {

    it('Should log an error when passed a non-function argument.', () => {
      let fn = $async({});
      expect($log.error).toHaveBeenCalled();
    });

    it('Should always return a function.', () => {
      expect(typeof $async(null)).toBe("function");
      expect(typeof $async(123)).toBe("function");
      expect(typeof $async({})).toBe("function");
      expect(typeof $async("abc")).toBe("function");
    });

  });

});