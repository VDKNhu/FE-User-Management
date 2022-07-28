import { UserService } from './../../services/user.service';
import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let userServiceMock: any;

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

    beforeEach(async () => {
        userServiceMock = {
            getUsers: jest.fn().mockReturnValue(of(res))
        }
        
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            providers: [{
                provide: UserService, 
                useValue: userServiceMock
            }],
        }).compileComponents();
    });

    beforeEach(() => {
        const fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    // describe('ngOnInit', () => {
    //     it('should call getUsers', () => {
    //         const resultGetUsers = userServiceMock.getUsers();
    //         resultGetUsers.subscribe((result: any) => {
    //           expect(result).toEqual(of(res))
    //         })      
    //     })
    // })

})








