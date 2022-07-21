import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { user } from '../../../models/user.model';
import {
  faChevronCircleDown,
  faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';

import { Observable, Subscription } from 'rxjs';
import { AddUserComponent } from 'app/components/dialog/add-user/add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { appState } from 'app/state/store/app.state';

interface toggleGroupUsers {
  initState: true;
  showUsers: boolean;
  titleGroupUsers: string;
}

@Component({
  selector: 'app-group-users',
  templateUrl: './group-users.component.html',
  styleUrls: ['./group-users.component.css'],
})
export class GroupUsersComponent implements OnInit, OnChanges {
  @Input() group!: user[];
  @Output() openEditDialog = new EventEmitter();
  title!: string;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleRight = faChevronCircleRight;

  tglGroupUsers: toggleGroupUsers = {
    initState: true,
    showUsers: true,
    titleGroupUsers: '',
  };

  subscription!: Subscription;

  constructor(private store: Store<appState>, private dialog: MatDialog) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if ('group' in changes) {
    //   console.log('-----');
    //   console.log('group in onchange',this.group);
    // }
  }

  ngOnInit(): void {
  }

  toggleUsers(e: any) {
    this.title = e[0].title;
    // this.uiService.toggleShowUser(e[0].title);
  }

  openDialog(user: user) {
    console.log('in open edit user');
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '70%',
      height: 'fit-content',
      data: { dialogName: 'editPopup', user: user },
    });

    // dialogRef.afterClosed().subscribe((result: any) => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    //   this.popupName=result;
    // });
  }

  // add + edit user
  addUser(e: any) {
    console.log('test add *', e);
  }

  editUser(e: any) {
    console.log('test edit *', e);
  }
}
