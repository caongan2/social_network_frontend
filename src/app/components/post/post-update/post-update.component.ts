import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {finalize} from "rxjs/operators";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {
  image: any
  downloadURL: Observable<string> | undefined;


  formUpdate?: FormGroup;
  user:any;
  is_public:boolean = true;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService,
              private location: Location,
              private storage: AngularFireStorage) { }

  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.postService.getPostById(this.id).subscribe(res => {
      this.formUpdate = this.fb.group({
        content:[res.content,[Validators.required]],
        is_public:[res.is_public,[Validators.required]]
      })
      this.image = this.formUpdate.value.image
    })
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
    let data = this.formUpdate?.value;
    // @ts-ignore
    this.formUpdate?.value.image = this.image
    return this.postService.update(data,this.id).subscribe(res => {
      this.toastr.success('Update Post successfully','Update Post');
      this.router.navigate(['admin/home/posts']);
    })
  }

  get content() {
    return this.formUpdate?.get('content');
  }

  get isPublic(){
    return this.formUpdate?.get('is_public');
  }

  back() {
    this.router.navigate(['admin/home/posts'])
  }

}
