import { Component, OnInit, Output, Input, EventEmitter, Inject } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, of, skip, Subscription, toArray } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDeleteUserComponent } from './../confirm-delete-user/confirm-delete-user.component';

import { UserService } from './../../../services/user.service';
import { UiService } from '../../../services/ui.service';

import { user } from '../../../models/user.model';
import { fNameError } from 'app/models/fNameError.model';
import { lNameError } from 'app/models/lNameError.model';
import { emailError } from './../../../models/emailError.model';
import { dialog } from 'app/models/dialog.model';

import { appState } from 'app/state/store/app.state';
import { addUser, updateUser } from 'app/state/users/users.action';
// import { UniqueEmailValidationDirective } from 'app/directives/unique-email-validation.directive';

@Component({
  selector: 'app-form',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() formName!: string;
  @Output() onStatusChange = new EventEmitter<string>;

  groups$: Observable<user[]>;

  arr_users$: Observable<user[]> | undefined;
  tempGroup: user[];

  todayDate = new Date().getFullYear() + "-" + ("0" + (new Date().getMonth() + 1)).slice(-2) + "-" + ("0" + new Date().getDate()).slice(-2);
  dobEditUser!: Date;
  mainDob!: Date;

  dateFormat = 'yyyy-MM-dd';
  dobEditedUser!: string;
  dobUser!: Date;

  editedUser: any;

  tasks: user[] = [];
  ttl!: number;
  editTtl!: string;
  formState!: string;
  profileForm!: FormGroup;
  isReadonly: boolean = true;
  
  gender!: string;
  title!: string;

  subscription!: Subscription;

  firstNameError: fNameError = {
    errorIsRequired: false,
    errorMaxLength: false,
  };

  lastNameError: lNameError = {
    errorIsRequired: false,
    errorMaxLength: false,
  }

  maxDate: any;
  minDate: any;
  sMinDate: string;
  sMaxDate: string;

  emailError: emailError = {
    errorIsRequired: false,
    errorFormat: false,
    errorUnique: false,
  }

  users: user[];

  constructor(
    private store: Store<appState>,
    // private emailValidator: UniqueEmailValidationDirective,
    public datePipe: DatePipe,
    public dialog: MatDialog,
    private router: Router, 
    private uiService: UiService,
    private userService: UserService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialog,
) 
    {
      this.router.routeReuseStrategy.shouldReuseRoute = () => {
        return false;
      };

      this.subscription = this.uiService.onToggle().subscribe((value) => (this.isReadonly = value));
  }

  ngOnInit(): void {
    this.editedUser = this.data.user;
    this.groups$ = of(this.data.groupsUsers);

    if(this.data.dialogName == 'createPopup') {
      this.isReadonly = false;
    }

    switch (this.editedUser?.title) {
      case 'Team Lead': {
        this.title = 'teamLead';
        break;
      }
      case 'Architecture': {
        this.title = 'architecture';
        break;
      }
      case 'Web Developer': {
        this.title = 'webDev';
        break;
      }
      case 'Tester': {
        this.title = 'tester';
        break;
      }
      case 'UI/UX': {
        this.title = 'uiux';
        break;
      }
      case 'DBA': {
        this.title = 'dba';
        break;
      }
    }

    if(this.editedUser) {
      this.mainDob = this.editedUser.dob ? this.editedUser.dob : '12-30-2020';
      this.dobEditedUser = this.editedUser?.dob?.slice(0,10);

      this.dobUser = new Date(this.dobEditedUser);
      this.dobEditedUser = [
        ('0' + (this.dobUser.getMonth() + 1)).slice(-2),
        ('0' + this.dobUser.getDate()).slice(-2),
        this.dobUser.getFullYear()       
      ].join('-');
    }

    this.profileForm = new FormGroup({
      id: new FormControl(this.editedUser ? this.editedUser.id! : ''),
      firstName: new FormControl(this.editedUser ? this.editedUser.firstName : '', [Validators.required, Validators.maxLength(80)]),
      lastName: new FormControl(this.editedUser ? this.editedUser.lastName : '', [Validators.required, Validators.maxLength(80)]), 
      dob: new FormControl(this.editedUser ? this.dobEditedUser : '', []),
      gender: new FormControl(this.editedUser ? this.editedUser.gender.toString() : '2', []),
      company: new FormControl(this.editedUser ? this.editedUser.company : 'ROSEN', []),
      title: new FormControl(this.editedUser ? this.title : '', []),
      email: new FormControl(this.editedUser ? this.editedUser.email : '', [Validators.required, Validators.email]),
    });

    this.profileForm.valueChanges.subscribe(() => this.onStatusChange.emit(this.profileForm.status)); 

    this.profileForm.statusChanges.subscribe(formState=> {
      console.log('form status changed');
      console.log(this.profileForm.status);
    })

    this.dateFormat = 'yyyy-MM-dd';
    this.maxDate = new Date().toISOString().slice(0, 10);
    this.minDate = new Date(1900, 1, 1).toISOString().slice(0, 10);
    this.sMaxDate = this.datePipe.transform(this.maxDate, this.dateFormat);
    this.sMinDate = this.datePipe.transform(this.minDate, this.dateFormat);
  }

  currentUrl!: string;

  refreshComponent(){
    this.currentUrl = this.router.url;
    console.log(this.currentUrl);
    this.router.navigate([this.currentUrl]); 
 }
 openConfirmDialog(user: user) {
  const dialogRef = this.dialog.open(ConfirmDeleteUserComponent, {
    width: '50%',
    height: 'fit-content',
    data: {popupName: 'deleteDialog', user: user}
  });

  dialogRef.afterClosed().subscribe((result: any) => {
    this.dialogRef.close(); 
  });
 }

 handleReadonlyBtn() {
  this.uiService.handleReadonly();
 }

//  onChange(event: any) {
//   console.log(event.target.value);
//  }

 closeFormDialog() {
  this.dialogRef.close();
 }

 // validation
 onChangeFirstName(): void {
  const fname = this.profileForm.get('firstName');
  if(fname.touched) {
    if(fname.value == '') {
      this.firstNameError.errorIsRequired = true;
    }
    else {
      this.firstNameError.errorIsRequired = false;
    }
  }
  else {
    this.firstNameError.errorIsRequired = false;
  }
  if(fname.hasError('maxlength')) {
    this.firstNameError.errorMaxLength = true;
  }
  else {
    this.firstNameError.errorMaxLength = false;
  }
 }

 onChangeLastName(): void {
  const lname = this.profileForm.get('lastName');
  if(lname.touched) {
    if(lname.hasError('required')) {
      this.lastNameError.errorIsRequired = true;
    }
    else {
      this.lastNameError.errorIsRequired = false;
    }
  }
  else {
    this.lastNameError.errorIsRequired = false;
  }
  if(lname.hasError('maxlength')) {
    this.lastNameError.errorMaxLength = true;
  }
  else {
    this.lastNameError.errorMaxLength = false;
  }
 }

 dateError() {
  const dateForm = this.profileForm.get('dob');
  if(dateForm.touched) {
    const selectedDate = dateForm.value;
    if(selectedDate != null) {
      var vSelectedDate = Date.parse(selectedDate);
      var vMinDate = Date.parse(this.sMinDate);
      var vMaxDate = Date.parse(this.sMaxDate);
      if(vSelectedDate < vMinDate || vSelectedDate > vMaxDate) {
        return "Date must be from 01-01-1900 to now."
      }
    }
  }
  return "";
}
onChangeEmail() {
  const email = this.profileForm.get('email');
  if(email.touched) {
    if(email.value == '') {
      this.emailError.errorIsRequired = true;
    }
    else {
      this.emailError.errorIsRequired = false;
    }
  }
  else {
    this.emailError.errorIsRequired = false;
  }
  if(email.hasError('email')) {
    this.emailError.errorFormat = true;
  }
  else {
    this.emailError.errorFormat = false;
  }
  // if(email.hasError('uniqueEmail')) {
  //   this.emailError.errorUnique = true;
  // }
  }

  // add + edit user
  onSubmit(e: any) {
    if(true) {
      switch (e.value.title) {
        case 'teamLead': {
          this.ttl = 1;
          break;
        }
        case 'architecture': {
          this.ttl = 2;
          break;
        }
        case 'webDev': {
          this.ttl = 3;
          break;
        }
        case 'tester': {
          this.ttl = 4;
          break;
        }
        case 'uiux': {
          this.ttl = 5;
          break;
        }
        case 'dba': {
          this.ttl = 6;
          break;
        }
      }
    } 
    
    const addedUser: any = {
      firstName: e.value.firstName,
      lastName: e.value.lastName,
      dateOfBirth: this.datePipe.transform(e.value.dob, 'yyyy-MM-dd'),
      gender: parseInt(e.value.gender),
      company: 'ROSEN',
      title: this.ttl,
      email: e.value.email,
      status: 'Active'
    };

    const editedUser: any = {
      id: e.value.id,
      firstName: e.value.firstName,
      lastName: e.value.lastName,
      dateOfBirth: this.datePipe.transform(e.value.dob, 'yyyy-MM-dd'),
      gender: parseInt(e.value.gender),
      company: 'ROSEN',
      title: this.ttl,
      email: e.value.email,
    };

    if(this.editedUser) {
      this.store.dispatch(updateUser(editedUser));
      this.dialogRef.close(); 
    } else {
      this.store.dispatch(addUser(addedUser));
      this.dialogRef.close(); 
    }
  }
}


