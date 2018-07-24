import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Response } from "@angular/http";

@Injectable()
export class MakeService {

  constructor(private http: Http) { }

  // tslint:disable-next-line:typedef
  getMakes() {
    return this.http.get("/api/make/getall")
      .map((res: Response) => res.json());
  }

}