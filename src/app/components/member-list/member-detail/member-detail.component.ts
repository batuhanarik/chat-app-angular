import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent {
  member: Member = null;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private _member: MemberService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
    ];
  }

  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }

  getMember() {
    this._member
      .getMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        this.galleryImages = this.getImages();
      });
  }
}
