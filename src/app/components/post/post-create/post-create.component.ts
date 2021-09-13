import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  image: any
  downloadURL: Observable<string> | undefined;



  formCreatePost?: FormGroup;
  user: any;
  is_public: boolean = true;
  posts: any = [];

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.formCreatePost = this.fb.group({
      userId: [this.user.id],
      content: ['', [Validators.required]],
      is_public: [this.is_public,[Validators.required]],
    });
    this.getAll();
    this.image = this.formCreatePost.value.image
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




  getAll() {
    return this.postService.getAll().subscribe(res => {
      this.posts = res;
    });
  }

  submit() {
    let data = this.formCreatePost?.value;
    console.log(data)
    // @ts-ignore
    this.formCreatePost?.value.image = this.image
    return this.postService.create(data).subscribe(res => {
       this.toastr.success('Create Post successfully','Create Post');
       this.getAll();
       this.refresh();
    })

  }

  get content() {
    return this.formCreatePost?.get('content');
  }

  get isPublic(){
    return this.formCreatePost?.get('is_public');
  }

  refresh(): void {
    window.location.reload();
  }
}
