import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'; //　<------------追加
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private db: AngularFireDatabase ) { 
    this.item = db.object('/item').valueChanges();
  }
  item: Observable<any>
  todo = [];
  done = [];
  myForm: FormGroup;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }
/*--------------以下追加分----------------------*/
/*
 * ドロップしたcdkDropListが同じなら場所を入れ替えます
 * cdkDropListが違う場合はアイテムを移します
 */
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
/*--------------------------------------*/　

/*タスク登録用のメソッド*/
  taskRegist() {
    console.log(this.myForm.value);
    this.todo.push({
      title: this.myForm.controls.title.value,
      description: this.myForm.controls.description.value,
    });
  }

}