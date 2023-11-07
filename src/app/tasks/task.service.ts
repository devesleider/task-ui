import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  readonly url = environment.api;
  private httpWithoutIntercepptor: HttpClient;
  constructor(
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.httpWithoutIntercepptor = new HttpClient(httpBackend);
   }

  getCategories(){
    return this.httpWithoutIntercepptor.get(`${this.url}Categorie`);
  }

  getTaskByUser(user: number, categorie:number){
    return this.httpWithoutIntercepptor.get(`${this.url}Task?user=${user}&categorie=${categorie}`);
  }

  postSave(task: any){
    return this.httpWithoutIntercepptor.post(`${this.url}Task`, task);
  }

  putTask(id: number, end: boolean){
    return this.httpWithoutIntercepptor.put(`${this.url}Task?id=${id}&end=${end}`, {});
  }
}
