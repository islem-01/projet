import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
 export class MemberComponent implements OnInit {

  datasource: any[] = [];
  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createddate', 'actions'];

  member: any; // 🔹 déclaration obligatoire
  form!: FormGroup;

  constructor(private MS: MemberService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadMembers();

    const idcourant = this.activeRoute.snapshot.params['id'];

    if (idcourant) {
      this.MS.getMemberById(idcourant).subscribe((member) => {
        this.member = member;

        this.form = new FormGroup({
          cin: new FormControl(member.cin, [Validators.required]),
          name: new FormControl(member.name),
          type: new FormControl(member.type),
          cv: new FormControl(member.cv)
        });
      });
    } else {
      this.form = new FormGroup({
        cin: new FormControl('', [Validators.required]),
        name: new FormControl(''),
        type: new FormControl(''),
        cv: new FormControl('')
      });
    }
  }

  loadMembers() {
    this.MS.GetAllMembers().subscribe((members) => {
      this.datasource = members;
    });
  }

  delete(id: number) {
    this.MS.deleteMember(id).subscribe(() => {
      this.loadMembers();
    });
  }
}
