import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpSpy: { get: jasmine.Spy };
  let localStorageSpy: { getToken: jasmine.Spy; setAuthData: jasmine.Spy };
  let userServiceSpy: { get: jasmine.Spy };
  let routerSpy: { get: jasmine.Spy };
  let apiSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient', ['get']);
    localStorageSpy = jasmine.createSpyObj('localStorageService', ['getToken', 'setAuthData']);
    userServiceSpy = jasmine.createSpyObj('userServiceSpy', ['getToken']);
    routerSpy = jasmine.createSpyObj('router', ['navigate']);
    apiSpy = jasmine.createSpyObj('apiService', ['getWords']);

    service = new AuthService(httpSpy as any, localStorageSpy as any, userServiceSpy as any, routerSpy as any, apiSpy as any);
  });

  // test 9
  it('should return token', () => {
    const token = 'testToken';
    service.setToken(token);
    expect(service['token']).toEqual(token);
  });

  // test 10
  it('should return refresh token', () => {
    const token = 'testRefreshToken';
    service.setRefreshToken(token);
    expect(service['refreshToken']).toEqual(token);
  });
});
