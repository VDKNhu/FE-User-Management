import { dialog } from './../../../models/dialog.model';
import { UserService } from '../../../services/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Validators,
  FormControl,
  FormGroup,
  FormBuilder,
} from '@angular/forms';

import { user } from '../../../models/user.model';
import { appState } from 'app/state/store/app.state';
import { Store } from '@ngrx/store';
import { deleteUser } from 'app/state/users/users.action';
// import { deleteUser } from 'app/state/users/users.action';

@Component({
  selector: 'app-confirm-delete-user',
  templateUrl: './confirm-delete-user.component.html',
  styleUrls: ['./confirm-delete-user.component.css'],
})
export class ConfirmDeleteUserComponent implements OnInit {
  confirmForm!: FormGroup;
  isValid = false;

  user!: user;
  users: user[];

  constructor(
    private store: Store<appState>,
    private UserService: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmDeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: dialog
  ) {
    this.user = this.data.user;
  }

  ngOnInit(): void {
    this.confirmForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onChangeEmail(): void {
    console.log(this.confirmForm.get('email').value);
    if (this.confirmForm.get('email').value == this.user.email) {
      this.isValid = true;
    } else {
      console.log(false);
      this.isValid = false;
    }
  }

  discard() {
    this.dialogRef.close();
  }

  onDeleteUser(user: any) {
    this.store.dispatch(deleteUser(user));
    this.dialogRef.close(); 
  }
}
