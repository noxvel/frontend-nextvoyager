import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs'; 
import 'rxjs/add/operator/toPromise';
import { Review } from '../_models/review.model'

import { AuthenticationService } from './authentication.service';

@Injectable()
export class ItemService{

    constructor(private http: Http,
                private authenticationService: AuthenticationService){ }

    // public baseUrl = 'http://127.0.0.1:8000/';
    public baseUrl = 'http://35.156.228.133:8000/';
    private moviesUrl = this.baseUrl + 'item_list/movie/'; // URL to web api
    private gamesUrl = this.baseUrl +'item_list/game/'; // URL to web api
    private itemUrl = this.baseUrl + 'item/';
    private itemCreateUrl = this.baseUrl + 'item_list/game/';
    private headers = new Headers({'Content-Type': 'application/json',
                                    'Authorization': 'JWT ' + this.authenticationService.token });



    private handleError (error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    getItems(url: string): Observable<Item[]> {
        return this.http.get(url)
                    .map(res => res.json() as Item[])
                    .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
    }

    getItem(id: number): Observable<Item> {
        const url = `${this.itemUrl}${id}/`;
        return this.http.get(url)
                    .map(res => res.json() as Item)
                    .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
    }

    updateItem(item: Item): Observable<Item> { 
        const url = `${this.itemUrl}${item.id}/`; 
        return this.http
                .put(url, JSON.stringify(item), {headers:this.headers})
                .map(() => item)
                .catch((error: any) => Observable.throw(error.json().error) || 'Server error');

                // .toPromise()
                // .then(() => item)
                // .catch(this.handleError);
    }

    createItem(title: string, rating: number, typeId: number): Observable<Item> {
        return this.http
            .post(this.itemCreateUrl, JSON.stringify({title: title, rating: rating, posterSrc: '', release_date: '2010-12-03', kind: typeId}), {headers: this.headers})
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error) || 'Server error');

    }

    deleteItem(id:number): Observable<void> {
        const url = `${this.itemUrl}${id}/`;
        return this.http.delete(url, {headers: this.headers})
            .map(() => null)
            .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
            // .toPromise()
            // .then(() => null)
            // .catch(this.handleError);
    }

    getMovies(): Observable<Item[]> {
        return this.getItems(this.moviesUrl);
    }

    getGames(): Observable<Item[]> {
        return this.getItems(this.gamesUrl);
    }

    getReview(itemId: number): Observable<Review[]> {
        return this.http.get(`${this.itemUrl}${itemId}/review/`)
                    .map(response => response.json().results as Review[])
                    .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
 
    }

    addReview(text_1: string, text_2: string, text_3: string, itemId: number, username: string): Observable<Review> {
        return this.http
            .post(`${this.itemUrl}${itemId}/review/`, JSON.stringify({text_1: text_1, text_2: text_2, text_3: text_3, item: itemId, user: username}), {headers: this.headers})
            .map(res => res.json())
            .catch((error: any) => Observable.throw(error.json().error) || 'Server error');
    }
    
    // getMovies(): Promise<Item[]> {
    //     return Promise.resolve(MOVIES);
    // }

    // getMovie(id: number): Promise<Item> {
    //     return this.getMovies()
    //                 .then(movies => movies.find(item => item.id === id));
    // } 


}