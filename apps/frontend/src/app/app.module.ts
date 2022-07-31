import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AccountsModule } from "./pages/accounts/accounts.module";
import { DashboardModule } from "./pages/dashboard/dashboard.module";
import { IndexModule } from "./pages/index/index.module";
import { LoginModule } from "./pages/login/login.module";
import { TransactionsModule } from "./pages/transactions/transactions.module";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		IndexModule,
		DashboardModule,
		TransactionsModule,
		AccountsModule,
		LoginModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
