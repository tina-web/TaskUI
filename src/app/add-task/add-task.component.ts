import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Task } from '../interfaces/models';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  @Output() addTask = new EventEmitter<Task>();

  taskTitle = new FormControl('');

  emitAddTask(): void {
    const formControlValue = this.taskTitle.value;
    const task = new Task(formControlValue ?? '');
    this.addTask.emit(task);
    this.taskTitle.setValue('');
  }
}
