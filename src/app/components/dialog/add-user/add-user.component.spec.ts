import { UserService } from './../../../services/user.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';

describe('AddUserComponent', () => {
    let component: AddUserComponent;
    let fixture: ComponentFixture<AddUserComponent>;
    let service: UserService;
    let httpClientSpy: any;
  
    beforeEach(waitForAsync (() => {
        console.log('before create 1');
        // httpClientSpy = {
        //     get: jest.fn(),
        //     post: jest.fn()
        //   };
        // service = new UserService(httpClientSpy);
        TestBed.configureTestingModule({
            declarations: [AddUserComponent],
            // providers: [service]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(AddUserComponent);
        console.log('before create 2');

        component = fixture.componentInstance;
        component.formName = '';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    })

    // describe('Set up add/edit form', () => {    
    //     it('Generate add form', () => {        

    //     })
    // })

})



