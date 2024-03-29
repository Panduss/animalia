import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationFactory } from './factory/translation';
import { ToastProvider } from './infrastructure/providers/toast';
import { TabModule } from './components/components/tab/tab.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot(
            {
                loader: {
                    provide: TranslateLoader,
                    useClass: TranslationFactory
                }
            }),
        TabModule,
        BrowserAnimationsModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy
        },
        HttpClient,
        ToastProvider
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
