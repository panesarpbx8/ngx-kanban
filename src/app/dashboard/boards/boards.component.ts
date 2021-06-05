import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Board } from 'src/app/models/board.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';
import { NewBoardDialogComponent } from '../dialogs/new-board-dialog/new-board-dialog.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit, OnDestroy {

  private sub: Subscription;
  boards: Board[];

  constructor(
    private auth: AuthService,
    private boardService: BoardService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.sub = this.auth.user$.pipe(
      switchMap(user => this.boardService.findByUID(user.uid)),
    ).subscribe(boards => this.boards = boards);
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sort(this.boards);
  }

  async openNewBoardDialog(): Promise<void> {
    const currentUserId = (await this.auth.user$.pipe(take(1)).toPromise()).uid;
    const board: Board = {
      tasks: [{ content: 'your task', label: 'teal' }],
      title: '',
      uid: currentUserId,
      priority: this.boards.length,
    }

    const dialogRef = this.dialog.open(NewBoardDialogComponent, {
      width: '500px',
      data: board,
    });

    dialogRef.afterClosed().subscribe(readyBoard => {
      readyBoard && this.boardService.create(readyBoard);
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
