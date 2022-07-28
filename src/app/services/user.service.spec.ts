import { UserService } from './user.service';
import { of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

describe('UserService', () => {
  let service: UserService;
  let httpClientSpy: any;

  const res = [{
      id: 106,
      firstName: "Trúc ",
      lastName: "Linh",
      dob: "2002-01-01T00:00:00",
      gender: 2,
      company: "ROSEN",
      title: "DBA",
      email: "truclinh@gmail.com",
      status: "Active"
    }];

  const addedUser = {
    id: 106,
    firstName: "Trúc ",
    lastName: "Linh",
    dob: "2002-01-01T00:00:00",
    gender: 2,
    company: "ROSEN",
    title: 1,
    email: "truclinh@gmail.com",
    status: "Active"
  }

  const addUser: any = {
    firstName: "Trúc ",
    lastName: "Linh",
    dob: "2002-01-01T00:00:00",
    gender: 2,
    company: "ROSEN",
    title: 1,
    email: "truclinh@gmail.com",
    status: "Active"
  }

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    };
    service = new UserService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsers function', () => {
    beforeEach(() => {
      httpClientSpy.get.mockReturnValue(of(res));
      service.getUsers();
    }) 

    it('should return array users', () => {
      const resultGetUsers = service.getUsers();
      resultGetUsers.subscribe((result: any) => {
        expect(result).toEqual(of(res))
      })
    })

    it('should call only one time', () => {
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })

    it('should call https://localhost:7151/api/users', () => {
      expect(httpClientSpy.get).toHaveBeenCalledWith('https://localhost:7151/api/users');
    })   
  })

  describe('getUsersWithError with catch/throw error', () => {
    beforeEach(() => {
      httpClientSpy.get.mockReturnValue(of(res));
      service.getUsersWithError();
    }) 

    it('should throw error', () => {
      service.getUsers().subscribe({
        next: data => console.log(data),
        error: error => {
          expect(error.message).toContain('test 404 error')
        }
      })  
    })

    it('should return observable user', () => {
      const resultGetUsers = service.getUsers();
      resultGetUsers.subscribe((result: any) => {
        expect(result).toEqual(of(res))
      })
    })

    it('should call only one time', () => {
      // jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(res));
      expect(httpClientSpy.get).toBeCalledTimes(1);
    })

    it('should call https://localhost:7151/api/users', () => {
      expect(httpClientSpy.get).toHaveBeenCalledWith('https://localhost:7151/api/users');
    })   
  })

  describe('onCreateUser function', () => {
    beforeEach(() => {
      httpClientSpy.post.mockReturnValue(of(addedUser));
      service.onCreateUser(addUser);
    }) 

    it('should return observable user', () => {
      const resultCreateUser = service.onCreateUser(addUser);
      resultCreateUser.subscribe((result: any) => {
        expect(result).toEqual(of(addedUser))
      })
    })

    it('should call only one time', () => {
      expect(httpClientSpy.post).toBeCalledTimes(1);
    })

    it('should call with parameters', () => {
      expect(httpClientSpy.post).toHaveBeenCalledWith('https://localhost:7151/api/users', addUser, HttpOptions);
    })   
  })

  // describe('test', () => {
  //   it('test foreach function', () => {
  //     const mockCallback = jest.fn(x => 42 + x);
  //     service.test_foreach([0, 1], mockCallback);

  //     expect(mockCallback.mock.calls[0][0]).toBe(0)
  //   })
  // })
});
