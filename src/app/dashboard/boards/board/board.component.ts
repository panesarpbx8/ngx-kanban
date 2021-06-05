import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/models/board.interface';
import { BoardService } from 'src/app/services/board.service';
import { Task } from '../../../models/task.interface';
import { NewTaskDialogComponent } from '../../dialogs/new-task-dialog/new-task-dialog.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;

  constructor(private dialog: MatDialog, private boardService: BoardService) { }

  ngOnInit(): void {
  }
  
  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTasks(this.board.id, this.board.tasks);
  }

  openNewTaskDialog(boardId: string): void {
    const taskTemplate: Task = {
      content: '',
      label: 'purple',
    };

    const dialogRef = this.dialog.open(NewTaskDialogComponent, {
      width: '500px',
      data: taskTemplate,
    });

    dialogRef.afterClosed().pipe().subscribe(task => {
      task && this.boardService.addTask(boardId, task);
    })
  }

}
