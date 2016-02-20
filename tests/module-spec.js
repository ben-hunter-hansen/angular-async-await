/**
 * Created by ben on 2/18/16.
 */

describe('angular-async-await', () => {
  "use strict";

  let $async, $log, $compile, $rootScope;

  beforeEach(() => {
    angular.mock.module('angular-async-await');

    inject((_$async_, _$log_, _$rootScope_, _$compile_) => {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
      $async = _$async_;
      $log = _$log_;
    });
  });

  describe('$async', () => {

    it('Should log an error when passed a non-function argument.', () => {
      spyOn($log, 'error');

      const fn = $async({});
      expect($log.error).toHaveBeenCalled();
    });

    it('Should log an error when an error is thrown.', () => {
      spyOn($log, 'error');

      const functionThatWillThrow = _ => { throw new Error("fooException"); };
      $async(functionThatWillThrow)();

      expect($log.error).toHaveBeenCalledWith(new Error("fooException"));
    });

    it('Should always return a function.', () => {
      expect(typeof $async(null)).toBe("function");
      expect(typeof $async(123)).toBe("function");
      expect(typeof $async({})).toBe("function");
      expect(typeof $async("abc")).toBe("function");
    });


    it('Should pass the correct arguments back to the original callback function.', () => {
      const fn = $async(async function(a,b,c) {
        expect(a).toBe("foo");
        expect(b).toBe("bar");
        expect(c).toBe("foobar");
      });

      fn("foo", "bar", "foobar");
    });


    it('Should trigger a $digest cycle after the supplied callback completes.', () => {
      spyOn($rootScope, '$digest');

      const fn = $async(async function() {});

      fn().then(() => {
        expect($rootScope.$digest).toHaveBeenCalled();
      });
    });


    it('Should update the view once the awaited promise resolves.', (done) => {

      $rootScope.data = "foo";
      const element = $compile(angular.element('<div>{{ data }}</div>'))($rootScope);
      $rootScope.$digest();

      expect(element.text()).toBe("foo");

      const promise = new Promise((res) => res("bar"));

      const awaitThePromise = $async(async function (){
        $rootScope.data = await promise;
        done();
      });

      awaitThePromise().then(() => {
        expect($rootScope.data).toBe("bar");
        expect(element.text()).toBe("bar");
      });
    });
  });
});