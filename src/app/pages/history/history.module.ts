import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { HistoryTableComponent } from './components/history-table/history-table.component';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
  ],
  declarations: [HistoryPage, HistoryTableComponent, DateFormatPipe]
})
export class HistoryPageModule {}
