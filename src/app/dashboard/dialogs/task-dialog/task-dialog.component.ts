import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from 'src/app/services/board.service';
import { Task } from '../../../models/task.interface';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {

  selectedLabel: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    public boardService: BoardService,
  ) { }

  ngOnInit(): void {
    this.selectedLabel = this.data.task.label;
  }

  changeLabel(label: 'red' | 'skyblue' | 'yellow' | 'teal' | 'purple') {
    this.data.task.label = label;
    this.selectedLabel = label;
  }

  deleteTask(): void {
    this.data.isDelete = true;
    this.dialogRef.close(this.data);
  }

  close(): void {
    this.dialogRef.close();
  }

}
