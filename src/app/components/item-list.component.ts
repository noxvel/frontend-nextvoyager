import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../_services/item.service';
import { AuthGuard } from '../_guards/auth.guard';
import { ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'item-list',
    templateUrl: 'item-list.component.html',
    styleUrls: ['item-list.component.css'],
    providers: [ItemService, AuthGuard]
})

export class ItemListComponent {
    items: Item[];
    private typeOfItems: string;
    private baseUrl: string;

    constructor(private itemService: ItemService,
                private route: ActivatedRoute,
                private authGuard: AuthGuard) {}

    getItems(): void{
        if (this.typeOfItems === 'movies')
            this.itemService.getMovies()
                .subscribe(movies => this.items = movies,
                               err => console.log(err));
        else if(this.typeOfItems === 'games')    
            this.itemService.getGames()
                .subscribe(games => this.items = games,
                                err => console.log(err));
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
            .subscribe(item => {
                this.items.push(item);
            },
            error => {console.log(error);
                    this.authGuard.canActivate()});
    }

    delete(item: Item): void {
        this.itemService.deleteItem(item.id)
            .subscribe(() => {
                this.items = this.items.filter(i => i != item);
            },
            error => console.log(error))
    }


    //@Input() items: Item[];

}