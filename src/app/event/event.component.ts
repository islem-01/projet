import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from '../services/event.service';
import { Evt } from '../models/Evt';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<Evt>();
  displayedColumns: string[] = ['1','2','3','4','5'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EventService, private dialog: MatDialog) {}

  // ✅ Charger les données
  ngOnInit(): void {
    this.loadEvents();
  }

  // ✅ méthode réutilisable
  loadEvents() {
    this.ES.getAllEvents().subscribe((res: Evt[]) => {
      this.dataSource.data = res;
    });
  }

  // ✅ pagination + tri
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ filtre
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // ✅ OPEN DIALOG (AJOUT)
  open() {
    let dialogRef = this.dialog.open(CreateEventComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.ES.addEvent(data).subscribe(() => {
          this.loadEvents(); // refresh automatique
        });
      }
    });
  }

  // ✅ EDIT
  openedit(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = id;

    this.dialog.open(CreateEventComponent, dialogConfig);
  }
}