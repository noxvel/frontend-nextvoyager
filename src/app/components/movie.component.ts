import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie.model'
import { ItemService } from '../_services/item.service'

@Component({
    moduleId: module.id,
    selector: 'movies',
    templateUrl: "movie.component.html",
    providers: [ItemService]
})
export class MovieComponent {

    items: Item[];

    constructor(private itemService: ItemService) {}


}
