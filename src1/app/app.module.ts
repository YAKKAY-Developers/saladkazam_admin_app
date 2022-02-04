import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { from } from 'rxjs';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './messenger/navi/sidebar/sidebar.component';
import { HeaderComponent } from './messenger/navi/header/header.component';
import { FooterComponent } from './messenger/navi/footer/footer.component';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthComponent } from './Admin/auth/auth.component';
import { LoaderService } from './shared/dataservice/loader.service';
import { LoaderInterceptor } from './shared/dataservice/loader-interceptor.service';
import { MyLoaderComponent } from './messenger/my-loader/my-loader.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';

// import { SharedModule } from './theme/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    AuthComponent,
    MyLoaderComponent,
    ConfirmationModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  imports: [
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    DropdownModule,
    MultiSelectModule,
  ],
  providers: [
    MessageService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
