import { Component, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/models/member';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MemberService } from 'src/app/services/member.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent {
  @Input() member: Member | undefined;
  uploader: FileUploader | undefined;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  constructor(
    private _account: AccountService,
    private _member: MemberService
  ) {
    this._account.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        if (user) this.user = user;
      },
    });
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  setMainPhoto(photo: Photo) {
    this._member.setMainPhoto(photo.id).subscribe({
      next: (_) => {
        if (this.user && this.member) {
          this.user.photoUrl = photo.url;
          this._account.setCurrentUser(this.user);
          this.member.photoUrl = photo.url;
          this.member.photos.forEach((p) => {
            if (p.isMain) p.isMain = false;
            if (p.id === photo.id) p.isMain = true;
          });
        }
      },
    });
  }

  deletePhoto(photoId: number) {
    this._member.deletePhoto(photoId).subscribe({
      next: (_) => {
        if (this.member) {
          this.member.photos = this.member?.photos.filter(
            (x) => x.id !== photoId
          );
        }
      },
    });
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
        if (photo.isMain && this.user && this.member) {
          this.user.photoUrl = photo.url;
          this.member.photoUrl = photo.url;
          this._account.setCurrentUser(this.user);
        }
      }
    };
  }
}
