import { Component, OnInit } from '@angular/core';

import {DragulaModule, DragulaService} from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  constructor( private dragulaService: DragulaService ) {

    dragulaService.setOptions('bag-01', {
      removeOnSpill: true,
      copy: true
    });

    dragulaService.drag.subscribe((value) => {
      this.onDrag(value.slice(1));
      console.log("drag: el, source");
      console.log(`drag: ${value[0]}`);
      console.log(value);
    });
    dragulaService.drop.subscribe((value) => {
      this.onDrop(value.slice(1));
      console.log("drop: el, target, source, sibling");
      console.log(value);
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
      console.log("over: el, container, source");
      console.log(value);
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
      console.log("out: el, container, source");
      console.log(value);
    });
  }

  ngOnInit() {
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    let [e, el] = args;
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    let [e, el] = args;
    this.addClass(e, 'ex-moved');
  }

  private onOver(args) {
    let [e, el, container] = args;
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    let [e, el, container] = args;
    this.removeClass(el, 'ex-over');
  }

}
