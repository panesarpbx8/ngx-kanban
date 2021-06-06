import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-board-dialog',
  templateUrl: './delete-board-dialog.component.html',
  styleUrls: ['./delete-board-dialog.component.scss']
})
export class DeleteBoardDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeleteBoardDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  canDelete(): void {
    this.data.canDelete = true;
    this.dialogRef.close(this.data);
  }

  close(): void {
    this.dialogRef.close();
  }

}
