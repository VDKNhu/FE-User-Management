import { user } from './../../models/user.model';
import { UserService } from './../../services/user.service';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { getUsersSuccess, addUserSuccess, updateUserSuccess, deleteUserSuccess } from './users.action';
import { tap } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private UserService: UserService) {}

  loadUsers$ = createEffect(
    () => {
      // console.log(this.actions$);
      return this.actions$.pipe(
        tap(x=>console.log('in effect get', x)),
        ofType('Get users'),
        // tap(x => console.log('in pipe 1', x)),
        mergeMap(() => {
          return this.UserService.getUsers().pipe(
            // tap(x => console.log('in pipe 2',x)),
            map((users) => {
              // console.log('in effect', users);
              return getUsersSuccess({users});
            }),
          );
        })
      );
    }
  );

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      tap(x=>console.log('in effect add', x)),
      ofType('Add user'),
      mergeMap((addedUser) => {
        return this.UserService.onCreateUser(addedUser).pipe(
          map((data) => {
            const user = { addedUser, id: data.id };
            return addUserSuccess({ user });
          })
        );
      })
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      tap(x=>console.log('in effect delete', x)),
      ofType('Delete user'),
      mergeMap((deletedUser: user) => {
        return this.UserService.onDeleteUser(deletedUser.id).pipe(
          map(() => {
            return deleteUserSuccess();
          })
        );
      })
    );
  });

  updateUser$ = createEffect(() => {
    //title 1
    return this.actions$.pipe(
      tap(x=>console.log('in effect edit', x)),
      ofType('Update user'),
      mergeMap((editedUser) => {
        return this.UserService.onEditUser(editedUser).pipe(
          map(() => {
            console.log('before return update success')
            return updateUserSuccess();
          })
        );
      })
    );
  });

}
