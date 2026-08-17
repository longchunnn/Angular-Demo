import { Component, OnInit } from '@angular/core';
import { DictationService } from 'src/app/features/dictation/service/dictation.service';
import { DictationService as admin} from 'src/app/admin/services/dictation.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-admin-dictation',
  templateUrl: './admin-dictation.component.html',
  styleUrls: ['./admin-dictation.component.css']
})
export class AdminDictationComponent implements OnInit {
  
  constructor(private dictationService :DictationService ,
      private admin: admin
   ) { }

  ngOnInit(): void {
  }

}
