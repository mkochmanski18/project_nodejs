import { Component, Input } from '@angular/core';
import { RecensionDetails } from '../../shared/interfaces/recension.interface';
import { ActivatedRoute } from '@angular/router';
import { RecensionService } from '../../services/recension.service';

@Component({
  selector: 'app-recension-page',
  templateUrl: './recension-page.component.html',
  styleUrl: './recension-page.component.scss'
})
export class RecensionPageComponent {
  details!:RecensionDetails;

  constructor(
    private route: ActivatedRoute,
    private recensionService: RecensionService,
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.details = this.recensionService.getRecension(params['id']);
      }
    )
  }
  
}
