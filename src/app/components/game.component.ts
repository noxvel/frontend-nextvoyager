import { Component, OnInit } from '@angular/core';
import { Game } from '../_models/game.model'
import { ItemService } from '../_services/item.service'

@Component({
    moduleId: module.id,
    selector: 'games',
    templateUrl: "game.component.html",
    providers: [ItemService]
})
export class GameComponent {

    items: Item[];

    constructor(private itemService: ItemService) {}



}
