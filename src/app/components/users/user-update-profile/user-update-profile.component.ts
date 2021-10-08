import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['./user-update-profile.component.css']
})
export class UserUpdateProfileComponent implements OnInit {

  user: any
  title = "cloudsSorage";
  selectedFile: null = null;
  image: any
  downloadURL: Observable<string> | undefined;
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  formEditProfile  ?: FormGroup;
  constructor(private router: Router,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              private storage: AngularFireStorage,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.userService.getById(this.id).subscribe(res => {
      this.formEditProfile = this.formBuilder.group({
        name: [res.name],
        phone: [res.phone,[Validators.pattern(/^0[1-9][0-9]{8}$/)]],
        address: [res.address,[Validators.minLength(2),Validators.maxLength(50)]],
        interest: [res.interest,[Validators.minLength(2),Validators.maxLength(50)]],
        birth_date: [res.birth_date],
        avatar: [res.avatar]
      });
    });
    this.image = this.formEditProfile?.value.avatar
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
    console.log(data)
    if (!this.image){
      this.userService.getById(this.id).subscribe(res => {
        // @ts-ignore
        this.formEditProfile?.value.avatar = [res.avatar]
      })
    }
      // @ts-ignore
    this.formEditProfile?.value.avatar = this.image
    this.userService.update(data,this.id).subscribe(res => {
        this.toastr.success('Change profile success');
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
