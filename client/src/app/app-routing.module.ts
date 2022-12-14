import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';
import { HomeComponent } from './home/home/home.component';
import { ProductDetailsComponent } from './shop/product-details/product-details.component';
import { ShopComponent } from './shop/shop.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "shop", component: ShopComponent },
  { path: "shop/:id", component: ProductDetailsComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: "user/login", component: LoginComponent },
  { path: "user/register", component: RegisterComponent },
  { path: "server-error", component: ServerErrorComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "**", redirectTo: '', pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
