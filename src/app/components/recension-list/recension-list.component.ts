import { Component } from '@angular/core';
import { RecensionDetails } from '../../shared/interfaces/recension.interface';
import { Subscription } from 'rxjs';
import { RecensionService } from '../../services/recension.service';

@Component({
  selector: 'app-recension-list',
  templateUrl: './recension-list.component.html',
  styleUrl: './recension-list.component.scss'
})
export class RecensionListComponent {
  
  constructor(
    private recensionService: RecensionService
  ){}
  activePage:number = 1;
  recensions!:RecensionDetails[];
  recensionSub!:Subscription;

  ngOnInit(){
    this.recensions = this.recensionService.recensionList;
    this.recensionSub = this.recensionService.recensionListChange.subscribe(
      newValues=>this.recensions=newValues
    );
    
  }
  ngOnDestroy(){
    this.recensionSub.unsubscribe();
  }
  changePage(num:number){
    this.activePage=num;
  }
  request(){
    this.recensionService.fetchReviews(1,this.activePage,'','').subscribe(
      result=>{console.log(result)},
      error=>{console.error(error)}
    );
  }
}
