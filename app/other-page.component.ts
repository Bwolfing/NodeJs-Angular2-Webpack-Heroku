import { Component, OnInit } from "@angular/core";
import { Http } from "@angular/http";

@Component({
    selector: "other-page",
    template: require("./other-page.component.html")
})
export class OtherPageComponent implements OnInit
{
    listItems: Array<string> = [];

    constructor(private http: Http)
    {
    }

    ngOnInit()
    {
        this.http.get("/api/other-page-data")
            .map(res => res.json())
            .subscribe(
                (data) => this.listItems = data,
                (error) => console.error(error)
            );
    }
}