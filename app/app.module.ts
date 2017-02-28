import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { OtherPageComponent } from "./other-page.component";

@NgModule({
    bootstrap: [
        AppComponent,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        OtherPageComponent,
    ],
    imports: [
        UniversalModule,
        RouterModule.forRoot([
            {
                path: "",
                children: [
                    {
                        path: "",
                        redirectTo: "home",
                        pathMatch: "full",
                    },
                    {
                        path: "home",
                        component: HomeComponent
                    },
                    {
                        path: "other-page",
                        component: OtherPageComponent,
                    },
                    {
                        path: "**",
                        redirectTo: "home",
                        pathMatch: "full",
                    }
                ]
            }
        ])
    ],
})
export class AppModule
{
}