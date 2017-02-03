import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs'; 

import { Movie } from '../_models/movie.model'

@Injectable()
export class ItemSearchService {
    private mainUrl = 'http://127.0.0.1:8000/';

    constructor(private http: Http) { }

    search(term: string): Observable<Item[]> {
        return this.http
                    .get(`${this.mainUrl}movies/?title=${term}`)
                    .map((r: Response) => r.json() as Item[]);
    }

}