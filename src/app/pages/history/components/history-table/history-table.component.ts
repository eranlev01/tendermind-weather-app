import { Component, Input, OnInit } from '@angular/core';
import { weatherHistoryModel } from '../../model/weatherHistoryModel';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit {

  @Input() weatherHistoryCollection!: weatherHistoryModel[];
  constructor() { }
  
  ngOnInit() {}

}
