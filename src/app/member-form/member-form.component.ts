import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MemberService, Member } from '../services/member.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  form!: FormGroup;
  member?: Member;
  idcourant?: number;   // ✅ propriété de classe

  constructor(
    private Ms: MemberService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // ✅ Récupérer l'id depuis la route
    const idParam = this.route.snapshot.params['id'];
    if (idParam) {
      this.idcourant = +idParam; // convertir en number
    }

    // ✅ Initialiser le formulaire vide
    this.form = new FormGroup({
      cin: new FormControl('', Validators.required),
      name: new FormControl(''),
      type: new FormControl(''),
      cv: new FormControl('')
    });

    // ✅ Si édition → charger les données
    if (this.idcourant) {
      this.Ms.getMemberById(this.idcourant).subscribe((m) => {
        this.member = m;

        this.form.patchValue({
          cin: m.cin,
          name: m.name,
          type: m.type,
          cv: m.cv
        });
      });
    }
  }

  sub(): void {

    if (this.idcourant) {
      // 🔵 MODE EDIT
      this.Ms.updateMember(this.idcourant, this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    } else {
      // 🟢 MODE CREATE
      this.Ms.addMember(this.form.value).subscribe(() => {
        this.router.navigate(['']);
      });
    }

  }
}
