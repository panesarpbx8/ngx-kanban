import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { Board } from 'src/app/models/board.interface';
import { BoardService } from 'src/app/services/board.service';
import { Task } from '../../../models/task.interface';
import { BoardSettingsDialogComponent } from '../../dialogs/board-settings-dialog/board-settings-dialog.component';
import { DeleteBoardDialogComponent } from '../../dialogs/delete-board-dialog/delete-board-dialog.component';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  constructor(private dialog: MatDialog, private boardService: BoardService, private toast: HotToastService) { }

  ngOnInit(): void {
  }
  
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.sortTasks(this.board.id, this.board.tasks);
  }

  openBoardSettingsDialog() {
    const dialogRef = this.dialog.open(BoardSettingsDialogComponent, {
      width: '500px',
      data: this.board,
    });

    dialogRef.afterClosed().subscribe(board => {
      if (board) {
        this.boardService.update(board);
        this.toast.success('Changes saved', { duration: 1500 });
      }
    });
  }

  openUpdateTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task, isDelete: false, },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.isDelete) {
        this.boardService.removeTask(this.board.id, data.task);
        this.toast.success('Task deleted', { duration: 1500 });
      } else {
        if (data.task) {
          this.boardService.updateTask(this.board.id, task);
          this.toast.success('Changes saved', { duration: 1500 });
        }
      }
    })
  }

  openAddTaskDialog(): void {
    const taskTemplate: Task = {
      content: '',
      label: 'purple',
      isDone: false,
    };

    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task: taskTemplate, isDelete: false, },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data.isDelete && data.task) {
        this.boardService.addTask(this.board.id, data.task);
        this.toast.success('New task added', { duration: 1500 });
      }
    })
  }

  async deleteBoard(): Promise<void> {
    const dialogRef = this.dialog.open(DeleteBoardDialogComponent, {
      width: '500px',
      data: { canDelete: false },
    });

    dialogRef.afterClosed().subscribe(data => {
      if (data.canDelete) {
        this.boardService.delete(this.board.id);
        this.toast.success('Board deleted', { duration: 1500 });
      }
    })
  }

}
