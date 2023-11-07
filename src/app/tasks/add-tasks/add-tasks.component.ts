import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskService } from '../task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-tasks.component.html',
  styleUrls: ['./add-tasks.component.scss']
})
export class AddTasksComponent {

  public load = false;
  public taskForm: UntypedFormGroup;
  public categories: any = [];

  constructor(
    private fb: UntypedFormBuilder,
    public activeModal: NgbActiveModal,
    public taskService: TaskService){
    this.createForm();
    this.getCategories();
  }

  createForm(){
    this.taskForm= this.fb.group({
      title:['', Validators.required],
      deadline:['', Validators.required],
      categorie:['', Validators.required]
    });
  }

  getCategories(){
    this.taskService.getCategories().subscribe(
      {
        next:(value: any) => {
          this.categories = value;
        }, error(err) {
          console.log(err)
        },
      }
    );
  }

  save(){
    this.load = true;
    let task = this.createTaskToSave();
    this.taskService.postSave(task).subscribe(
      {
        next:(value: any) => {
          if(value){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Se ha creado la tarea correctamente",
              showConfirmButton: false,
              timer: 1500
            });
            this.activeModal.close(true);
          }else{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "No se ha creado la tarea correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          }
        }, error(err) {
          console.log(err)
        }, complete (){
          this.load = false;
        }
      });
  }

  createTaskToSave(){
    let user = JSON.parse(sessionStorage.getItem('user') ? sessionStorage.getItem('user') : 'null')
    let data = {
      title: this.taskForm.controls['title'].value,
      categorie: parseInt(this.taskForm.controls['categorie'].value),
      deadline: `${this.taskForm.controls['deadline'].value.day}/${this.taskForm.controls['deadline'].value.month}/${this.taskForm.controls['deadline'].value.year}`,
      user: user.id
    }
    return data;
  }
}
