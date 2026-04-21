import { Component, OnInit } from '@angular/core';
import { MemberService } from '../services/member.service';
import { EventService } from '../services/event.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  NbMembers = 0;
  NbEvents = 0;
  NbTools = 0;
  NbArticles = 0;

  NbTeachers = 0;
  NbStudents = 0;

  tabNom: string[] = [];
  tabEvt: number[] = [];

  // ================= LINE =================
  chartDataLine: ChartDataset[] = [
    {
      label: 'Events by Member',
      data: []
    }
  ];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions = {
    responsive: true
  };

  // ================= DOUGHNUT =================
  chartDataDoughnut: ChartDataset[] = [
    {
      label: 'Events by Lieu',
      data: []
    }
  ];
  chartLabelsDoughnut: string[] = [];
  chartOptionsDoughnut: ChartOptions = {
    responsive: true
  };

  // ================= PIE =================
  chartDataPie: ChartDataset[] = [
    {
      data: []
    }
  ];
  chartLabelsPie: string[] = ['Teacher', 'Student'];
  chartOptionsPie: ChartOptions = {
    responsive: true
  };

  constructor(private MS: MemberService, private ES: EventService) {

    // ================= MEMBERS =================
    this.MS.GetAllMembers().subscribe((data: any[]) => {

      this.NbMembers = data.length;

      this.NbTeachers = data.filter(m => m.type === 'teacher').length;
      this.NbStudents = data.filter(m => m.type === 'student').length;

      this.chartDataPie = [
        {
          data: [this.NbTeachers, this.NbStudents]
        }
      ];

      // reset
      this.tabNom = [];
      this.tabEvt = [];

      // LINE CHART (same logic prof)
      for (let member of data) {

        this.tabNom.push(member.name);

        const eventsCount =
          member.tab_Events ? member.tab_Events.length : 0;

        this.tabEvt.push(eventsCount);
      }

      this.chartLabelsLine = this.tabNom;

      this.chartDataLine = [
        {
          label: 'Events by Member',
          data: this.tabEvt
        }
      ];
    });

    // ================= EVENTS =================
    this.ES.getAllEvents().subscribe((data: any[]) => {

      this.NbEvents = data.length;

      const countByLieu: { [key: string]: number } = {};

      data.forEach(evt => {

        const lieu = evt.Lieu || evt.lieu || 'Unknown';

        if (countByLieu[lieu]) {
          countByLieu[lieu]++;
        } else {
          countByLieu[lieu] = 1;
        }
      });

      this.chartLabelsDoughnut = Object.keys(countByLieu);

      this.chartDataDoughnut = [
        {
          label: 'Events by Lieu',
          data: Object.values(countByLieu)
        }
      ];
    });
  }

    ngOnInit(): void {

    this.MS.GetAllMembers().subscribe((data) => {
      this.NbMembers = data.length;
    });

    this.ES.getAllEvents().subscribe((dataE) => {
      this.NbEvents = dataE.length;
    });

  }
}