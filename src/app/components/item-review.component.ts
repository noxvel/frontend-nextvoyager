import { Component, OnInit, Input } from '@angular/core';
import { Review } from '../models/review.model';

@Component({
    moduleId: module.id,
    selector: 'item-review',
    templateUrl: 'item-review.component.html',
    styleUrls: ['item-review.component.css']
})
export class ItemReviewComponent implements OnInit {
    constructor() { }

    @Input() review: Review;

    ngOnInit() {

     }
}