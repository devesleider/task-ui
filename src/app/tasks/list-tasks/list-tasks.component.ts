import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddTasksComponent } from '../add-tasks/add-tasks.component';
import { TaskService } from '../task.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent {

  public categories: any = [];
  public tasks: any = [];
  public load = false;
  public categorie = new FormControl("1");

  constructor(private modalService: NgbModal,
    public taskService: TaskService) {
      this.getTaskByUser(1);
      this.getCategories();
    }

  openModal() {
    const modalRef = this.modalService.open(AddTasksComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result) {
        this.getTaskByUser(this.categorie.value);
      }
    }).catch((reason) => {
      console.log(`Modal cerrado con motivo: ${reason}`);
    });
  }

  getTaskByUser(categorie){
    let user : any = JSON.parse(sessionStorage.getItem('user'));
    this.taskService.getTaskByUser(user.id,categorie).subscribe(
      {
        next:(value: any) => {
          this.tasks= value;
        }, error(err) {
          console.log(err)
        },
      }
    );
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

  updateTask(task: any, end: boolean ){
    this.load = true;
    this.taskService.putTask(task.id, end).subscribe(
      {
        next:(value: any) => {
          if(value){
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: ( end == true ? "Se ha finalizado la tarea correctamente" : "Se ha Iniiado la tarea correctamente"),
              showConfirmButton: false,
              timer: 1500
            });
          }else{
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "No se ha podido realizar la acción correctamente",
              showConfirmButton: false,
              timer: 1500
            });
          }
          this.load= false;
          this.getTaskByUser(this.categorie.value);
        }, error(err) {
          this.load= false;
          console.log(err)
        }
      });
  }
}
