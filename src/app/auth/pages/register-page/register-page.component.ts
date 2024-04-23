import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import * as customValidators from '../../../shared/validators/validators';
import { ValidatorsService } from '../../../shared/service/validators.service';
import { EmailValidator } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: []
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    // email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [new EmailValidator()]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],

  },{
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
  });

  constructor(
    private fb:FormBuilder,
    private validatorsService:ValidatorsService,
    private emailValidator:EmailValidator
  ){}

  isValidField(field:string){

    return this.validatorsService.isValidField(this.myForm, field);

  }


  onSubmit(){
    this.myForm.markAllAsTouched();
    if(this.myForm.valid){
      console.log(this.myForm.value);
    }
  }

}
