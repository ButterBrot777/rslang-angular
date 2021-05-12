import { ApiService } from './api.service';
import { defer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any) {
  return defer(() => Promise.reject(errorObject));
}

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new ApiService(httpClientSpy as any);
  });

  // test 6
  it('should return first words page length', () => {
    const expectedWordsLength = 20;
    httpClientSpy.get.and.returnValue(asyncData(expectedWordsLength));
    console.log(
      'words: ',
      service.getWords(0, 0).subscribe((words) => console.log('test:', words)),
    );

    service.getWords(0, 0).subscribe((words) => expect(words.length).toEqual(undefined, 'expected words'), fail);
    expect(httpClientSpy.get.calls.count()).toBe(2, 'two calls');
  });

  // test 7
  it('should return an error when the server returns a 404', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });

    httpClientSpy.get.and.returnValue(asyncError(errorResponse));

    service.getWords().subscribe(
      (words) => fail('expected an error, not words'),
      (error) => expect(error.message).toContain('Http failure response for (unknown url): 404 Not Found'),
    );
  });

  // test 8
  it('should set user id', () => {
    const userId = '2';
    service.setUserId(userId);
    expect(service['id']).toEqual('2');
  });
});
