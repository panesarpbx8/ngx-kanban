import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/models/board.interface';

@Component({
  selector: 'app-board-settings-dialog',
  templateUrl: './board-settings-dialog.component.html',
  styleUrls: ['./board-settings-dialog.component.scss']
})
export class BoardSettingsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public board: Board,
    public dialogRef: MatDialogRef<BoardSettingsDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
