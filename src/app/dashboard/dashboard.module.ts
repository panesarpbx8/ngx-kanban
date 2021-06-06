import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { BoardsComponent } from './boards/boards.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { BoardComponent } from './boards/board/board.component';
import { NewBoardDialogComponent } from './dialogs/new-board-dialog/new-board-dialog.component';
import { TaskDialogComponent } from './dialogs/task-dialog/task-dialog.component';
import { BoardSettingsDialogComponent } from './dialogs/board-settings-dialog/board-settings-dialog.component';
import { DeleteBoardDialogComponent } from './dialogs/delete-board-dialog/delete-board-dialog.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BoardsComponent,
    BoardComponent,
    NewBoardDialogComponent,
    TaskDialogComponent,
    BoardSettingsDialogComponent,
    DeleteBoardDialogComponent,
  ],
  entryComponents: [
    NewBoardDialogComponent,
    TaskDialogComponent,
    BoardSettingsDialogComponent,
    DeleteBoardDialogComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    DragDropModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ]
})
export class DashboardModule { }
