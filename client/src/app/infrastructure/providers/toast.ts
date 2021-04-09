import { Injectable, NgModule } from '@angular/core';
import { ToastController } from '@ionic/angular';

@NgModule({
    providers: [
        ToastController
    ]
})
@Injectable()
class Toast {

    constructor(
        private toastController: ToastController
    ) {
    }

    public async presentToast(
        message?: string,
        duration?: number
    ): Promise<void> {
        const toast = await this.toastController.create(
            {
                message,
                duration
            });
        toast.present();
    }

    public async presentToastWithOptions(
        message?: string,
        duration?: number,
        cssClass?: string | string[],
        position?: 'top' | 'bottom' | 'middle',
        showCloseButton?: boolean,
        closeButtonText?: string
    ): Promise<void> {
        const toast = await this.toastController.create(
            {
                message: `${ message }`,
                duration,
                cssClass,
                position,
                showCloseButton,
                closeButtonText: `${ closeButtonText }`
            });
        toast.present();
    }
}

export { Toast as ToastProvider };
