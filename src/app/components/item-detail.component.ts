import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { ItemService } from '../_services/item.service'
import { AuthenticationService } from '../_services/authentication.service'
import 'rxjs/add/operator/switchMap';

import { Review } from '../_models/review.model';

@Component({
    moduleId: module.id,
    selector: 'item-detail',
    templateUrl: 'item-detail.component.html',
    styleUrls:['item-detail.component.css'],
    providers: [ItemService]
})

export class ItemDetailComponent implements OnInit{
    
    constructor(
        private itemService: ItemService,
        private route: ActivatedRoute,
        private location: Location,
        private authentication: AuthenticationService,
    ){}

    item: Item;
    reviews: Review[];
    typeOfItems: string;
    currentReview: Review = new Review;
    baseUrl: string;
    username: string;


    ngOnInit(): void {
        this.baseUrl = this.itemService.baseUrl;

        this.route.params
            .switchMap((params: Params) => this.itemService.getItem(+params['id']))
            .subscribe(item => {
                this.item = item;
                this.itemService.getReview(item.id)
                        .subscribe(reviews => this.reviews = reviews,
                                    err => console.log(err)); 
            });

        this.route.parent.data
                        .subscribe((data: { type: string}) => {
                            //console.log(data.type);
                            this.typeOfItems = data.type;
                        });
        this.username = this.authentication.username;
    }

    addText(text: string){
        if (!this.currentReview.text_1)
            this.currentReview.text_1 = text;
        else if (!this.currentReview.text_2)
            this.currentReview.text_2 = text;
        else if (!this.currentReview.text_3)
            this.currentReview.text_3 = text;
        else
            return;
    }

    addReview() {
        if (!this.currentReview.text_1 || !this.currentReview.text_2 || !this.currentReview.text_3) return;
        this.itemService.addReview(this.currentReview.text_1,this.currentReview.text_2,this.currentReview.text_3,this.item.id,this.username)
                    .subscribe(review => this.reviews.push(review),
                               err => console.log(err))
        
        this.currentReview = new Review;
    }

    goBack(): void {
        this.location.back();
    }

    changeRate(item: Item, rating: number): void {
        item.rating = rating;
        this.itemService.updateItem(item);
    }
    //@Input() item: Item;

}
