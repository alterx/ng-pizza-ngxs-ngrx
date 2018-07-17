import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from "@ngxs/store";
import {
  NgxsRouterPluginModule,
  RouterStateSerializer
} from "@ngxs/router-plugin";
import { CustomSerializer } from "./store/router.serializer";

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};

// bootstrap
import { AppComponent } from "./containers/app/app.component";

// routes
export const ROUTES: Routes = [
  { path: "", pathMatch: "full", redirectTo: "products" },
  {
    path: "products",
    loadChildren: "../products/products.module#ProductsModule"
  }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    NgxsModule.forRoot([]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })
  ],
  providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
