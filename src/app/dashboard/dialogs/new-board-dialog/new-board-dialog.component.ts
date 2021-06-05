import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/models/board.interface';

@Component({
  selector: 'app-new-board-dialog',
  templateUrl: './new-board-dialog.component.html',
  styleUrls: ['./new-board-dialog.component.scss']
})
export class NewBoardDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public board: Board,
    public dialogRef: MatDialogRef<NewBoardDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

}
