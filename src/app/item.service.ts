import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs'; 
import 'rxjs/add/operator/toPromise';
import { Review } from './models/review.model'


@Injectable()
export class ItemService{

    //private baseUrl = 'http://127.0.0.1:8000/';
    public baseUrl = 'http://35.156.228.133:8000/';
    private moviesUrl = this.baseUrl + 'item_list/movie/'; // URL to web api
    private gamesUrl = this.baseUrl +'item_list/game/'; // URL to web api
    private itemUrl = this.baseUrl + 'item/';
    private itemCreateUrl = this.baseUrl + 'item_list/game/';
    private headers = new Headers({'Content-Type': 'application/json'});


    constructor(private http: Http){ }

    private handleError (error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getItems(url: string): Promise<Item[]> {
        return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Item[])
                    .catch(this.handleError);
    }

    getItem(id: number): Promise<Item> {
        const url = `${this.itemUrl}${id}/`;
        return this.http.get(url)
                .toPromise()
                .then(response => response.json() as Item)
                .catch(this.handleError);

    }

    updateItem(item: Item): Promise<Item> { 
        const url = `${this.itemUrl}${item.id}/`; 
        return this.http
                .put(url, JSON.stringify(item), {headers:this.headers})
                .toPromise()
                .then(() => item)
                .catch(this.handleError);
    }

    createItem(title: string, rating: number, typeId: number): Promise<Item> {
        return this.http
            .post(this.itemCreateUrl, JSON.stringify({title: title, rating: rating, posterSrc: '', release_date: '2010-12-03', kind: typeId}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    deleteItem(id:number): Promise<void> {
        const url = `${this.itemUrl}${id}/`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getMovies(): Promise<Item[]> {
        return this.getItems(this.moviesUrl);
    }

    getGames(): Promise<Item[]> {
        return this.getItems(this.gamesUrl);
    }

    getReview(itemId: number): Promise<Review[]> {
        return this.http.get(`${this.itemUrl}${itemId}/review/`)
                    .toPromise()
                    .then(response => response.json().results as Review[])
                    .catch(this.handleError);   
    }

    addReview(text_1: string, text_2: string, text_3: string, itemId: number): Promise<Review> {
        return this.http
            .post(`${this.itemUrl}${itemId}/review/`, JSON.stringify({text_1: text_1, text_2: text_2, text_3: text_3, item: itemId}), {headers: this.headers})
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }
    
    // getMovies(): Promise<Item[]> {
    //     return Promise.resolve(MOVIES);
    // }

    // getMovie(id: number): Promise<Item> {
    //     return this.getMovies()
    //                 .then(movies => movies.find(item => item.id === id));
    // } 


}