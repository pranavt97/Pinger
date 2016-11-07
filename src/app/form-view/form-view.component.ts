import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';

import {imageModel} from '../models/imageModel';

function linkValidator(control: FormControl):{[k:string] : boolean}
{
   if(!control.value.match(/\.(jpeg|jpg|gif|gifv|png)$/))
   {
      return {'invalidLink': true};
   }
}

@Component({
  selector: 'form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css'],
  outputs: ['newImageEvent']
})
export class FormViewComponent implements OnInit {

   newImageEvent: EventEmitter<imageModel>;
   imageForm: FormGroup;

   constructor(fb: FormBuilder)
   {
      this.newImageEvent = new EventEmitter<imageModel>();
      this.imageForm = fb.group({
         'titleFormControl': ['', Validators.compose([
            Validators.required
         ])],
         'linkFormControl': ['', Validators.compose([
            Validators.required, linkValidator
         ])]
      });
   }

  addImage(form:any):void
   {

      var titleText:string = form.titleFormControl;
      var linkText:string = form.linkFormControl;

       if(!titleText || !linkText)
          return;
       if(linkText.match(/\.(jpeg|jpg|gif|gifv|png)$/) == null)
          return;

      console.log("title: " + titleText + "\nlink: " + linkText);

      this.newImageEvent.emit(new imageModel(titleText,linkText));
   }
   ngOnInit() {
   }

}
