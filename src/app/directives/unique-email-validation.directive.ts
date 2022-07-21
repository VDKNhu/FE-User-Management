// import { Directive } from '@angular/core';
// import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
// import { map, Observable } from 'rxjs';
// import { UserService } from '../services/user.service';

// @Directive({
//   selector: '[appUniqueEmailValidation]',
//   providers: [{
//     provide: NG_ASYNC_VALIDATORS,
//     useExisting: UniqueEmailValidationDirective,
//     multi: true
//   }]
// })
// export class UniqueEmailValidationDirective {

//   constructor(
//     private userService: UserService
//   ) { }

//   validate(control: AbstractControl<any, any>): Promise<ValidationErrors> | Observable<ValidationErrors> {
//     return this.userService.getUserByEmail(control.value).pipe(
//       map(users => {
//         return users && users.length > 0 ? {'uniqueEmail': true} : null;
//       })
//     )
//   }


// }
