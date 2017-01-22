import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model'
import { ItemService } from '../item.service'

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
