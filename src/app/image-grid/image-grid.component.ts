import { CdkDrag, CdkDragDrop, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'st-image-grid',
  standalone: true,
  imports: [
    DragDropModule,
    CommonModule
  ],
  templateUrl: './image-grid.component.html',
  styleUrl: './image-grid.component.scss'
})
export class ImageGridComponent {
  @Input()
  images: String[];
  board: number[] = Array(64).fill(1);

  constructor() {

  }

  drop(event: CdkDragDrop<number>) {
    this.board[event.previousContainer.data] = 0;
    this.board[event.container.data] = 1;
  }

  enterPredicate = (drag: CdkDrag, drop: CdkDropList) =>
    this.board[drop.data] === 0;
}