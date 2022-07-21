import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { faArrowUp, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './../../services/user.service';

import { Store } from '@ngrx/store';
import { appState } from 'app/state/store/app.state';
import { getInitialUsers } from 'app/state/users/users.selectors';
import {
  debounceTime,
  distinctUntilChanged,
  groupBy,
  mergeMap,
  Observable,
  of,
  skip,
  skipWhile,
  tap,
  toArray,
} from 'rxjs';
import { user } from '../../models/user.model';

import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { getUsers } from 'app/state/users/users.action';
import { AddUserComponent } from '../dialog/add-user/add-user.component';

export interface popupName {
  popupName: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, CanActivate {
  popupName!: string;

  testUser: user[];

  faSearch = faSearch;
  faArrowUp = faArrowUp;
  faPlus = faPlus;

  searchControl = new FormControl();
  searchText!: string;

  sortControl = new FormControl();
  sortChoice!: string;
  isAsc!: boolean;

  user!: user;

  users$: Observable<user[]> | undefined;
  arr_users$: Observable<user[]>;

  groups$: Observable<user[][]>; // Subject();
  tempGroup: user[][] = [];

  constructor(
    private store: Store<appState>,
    private dialog: MatDialog,
    private UserService: UserService
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((val) => {
        this.searchText = val;
      });

    this.sortControl.valueChanges.pipe().subscribe((val) => {
      this.sortChoice = val;
    });

    this.store.dispatch(getUsers());

    this.arr_users$ = this.store.select(getInitialUsers);

    this.arr_users$.pipe(skip(1)).subscribe((res) => {
      this.tempGroup = [];
      Object.values(this.groupBy(res, (user) => user.title)).forEach((group) =>
        this.tempGroup.push(group)
      );
      this.groups$ = of(this.tempGroup);
    });

  }

  groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
    arr.reduce((groups, item) => {
      (groups[key(item)] ||= []).push(item);
      return groups;
    }, {} as Record<K, T[]>);

  openAddUser() {
    console.log('in open add user');
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '70%',
      height: 'fit-content',
      data: {
        dialogName: 'createPopup',
        user: null,
        groupsUsers: this.tempGroup,
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('after close dialog add');
      this.store.dispatch(getUsers());

      this.arr_users$.pipe(skip(1)).subscribe((res) => {
        this.tempGroup = [];
        Object.values(this.groupBy(res, (user) => user.title)).forEach((group) =>
          this.tempGroup.push(group)
        );
        this.groups$ = of(this.tempGroup);
      });
    });
  }

  search() {
    console.log('in search');
    this.tempGroup = [];
    if (this.searchText != '') {
      this.UserService.searchUser(this.searchText)
        .pipe(
          tap((x) => console.log('tap ', x)),
          mergeMap((res) => res),
          groupBy((user) => user.title),
          mergeMap((groups$) => groups$.pipe(toArray()))
        )
        .subscribe((groups) => {
          this.tempGroup.push(groups);
          this.groups$ = of(this.tempGroup);
          this.groups$.subscribe((x) => console.log('final groups', x));
        });
    } else {
      this.UserService.getUsers()
        .pipe(
          mergeMap((res) => res),
          groupBy((user) => user.title),
          mergeMap((groups$) => groups$.pipe(toArray()))
        )
        .subscribe((groups) => {
          this.tempGroup.push(groups);
          this.groups$ = of(this.tempGroup);
          this.groups$.subscribe((x) => console.log('final groups', x));
        });
    }
  }
}
