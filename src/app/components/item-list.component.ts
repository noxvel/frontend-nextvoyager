import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service'
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'item-list',
    templateUrl: 'item-list.component.html',
    styleUrls: ['item-list.component.css'],
    providers: [ItemService]
})

export class ItemListComponent {
    items: Item[];
    private typeOfItems: string;
    private baseUrl: string;

    constructor(private itemService: ItemService,
                private route: ActivatedRoute) {}

    getItems(): void{
        if (this.typeOfItems === 'movies')
            this.itemService.getMovies().then(movies => this.items = movies);
        else if(this.typeOfItems === 'games')    
            this.itemService.getGames().then(games => this.items = games);
    }

    ngOnInit(){      
        this.baseUrl = this.itemService.baseUrl;
        
        this.route.parent.data
                        .subscribe((data: { type: string}) => {
                            //console.log(data.type);
                            this.typeOfItems = data.type;
                        });
        this.getItems();
        //this.itemService.getTestData().forEach((r) => console.log(r));
    } 


    add(title: string, rating: number): void {
        let type = 0;
        if (this.typeOfItems === 'movies')
            type = 1;
        else if (this.typeOfItems === 'games')
            type = 2;
        if (type === 0) return;

        title = title.trim();
        if (!title || !+rating) { return };
        this.itemService.createItem(title, rating, type)
            .then(item => {
                this.items.push(item);
            });
    }

    delete(item: Item): void {
        this.itemService
            .deleteItem(item.id)
            .then(() => {
                this.items = this.items.filter(i => i != item);
            })
    }


    //@Input() items: Item[];

}