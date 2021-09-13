import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {Location} from "@angular/common";
<<<<<<< HEAD
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
=======
>>>>>>> 9093ba2217a723abd4de619ba7690c79cda2ea7a

@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['./user-update-profile.component.css']
})
export class UserUpdateProfileComponent implements OnInit {

<<<<<<< HEAD
=======
  image: any
  downloadURL: Observable<string> | undefined;
>>>>>>> 009c28aba49af3cc62e613955f608a66d9780356
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  formEditProfile  ?: FormGroup;
  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
<<<<<<< HEAD
              private location: Location,
              private toastr: ToastrService,
              private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.userService.getById(this.id).subscribe(res => {
      this.formEditProfile = this.formBuilder.group({
        name: [res.name,[Validators.minLength(2),Validators.maxLength(50)]],
=======
              private location: Location) { }

  ngOnInit(): void {
    this.userService.getById().subscribe(res => {
      this.formEditProfile = this.fb.group({
        name: [res.name,[Validators.minLength(2),Validators.maxLength(50),Validators.pattern(/^[A-Z a-z]+$/)]],
>>>>>>> 9093ba2217a723abd4de619ba7690c79cda2ea7a
        phone: [res.phone,[Validators.pattern(/^0[1-9][0-9]{8}$/)]],
        address: [res.address,[Validators.minLength(2),Validators.maxLength(50)]],
        interest: [res.interest,[Validators.minLength(2),Validators.maxLength(50)]],
        birth_date: [res.birth_date],
      });
    });
    this.image = this.formEditProfile?.value.image
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          // @ts-ignore
          this.downloadURL.subscribe(url => {
            if (url) {
              this.image = url;
            }
            console.log(this.image);
          });
        })
      )
      .subscribe((url: any) => {
        if (url) {
          // this.image = url
          console.log(url);
        }
      });
  }


  submit() {
    let data = this.formEditProfile?.value;
<<<<<<< HEAD
    console.log(data)
    // @ts-ignore
    this.formEditProfile?.value.image = this.image
=======
>>>>>>> 9093ba2217a723abd4de619ba7690c79cda2ea7a
    this.userService.update(data,this.id).subscribe(res => {
      this.userService.changeUserLogin({...data, id: this.id});
      this.router.navigate(['admin/home/posts']);
      console.log(res);
    })
  }

  get name() {
    return this.formEditProfile?.get('name');
  }

  get phone() {
    return this.formEditProfile?.get('phone');
  }

  get address() {
    return this.formEditProfile?.get('address');
  }

  get interest() {
    return this.formEditProfile?.get('interest');
  }

  get birth_date() {
    return this.formEditProfile?.get('birth_date');
  }

  dateValidator(): ValidatorFn {
    return(control: AbstractControl): {[key: string]: any} | null =>{
      const today = new Date().getTime();
      if (!(control && control.value)) {
        return null;
      }
      return control.value.getTime() > today ? {invalidDate: 'You can not choose the day in future'} : null;
    }
  }

  back() {
    this.location.back();
  }
}
