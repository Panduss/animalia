import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Animal } from '../../domain/animal/model';
import { AnimalService } from '../../infrastructure/animal/service';
import {Collection} from '../../infrastructure/collection/collection';
import { AnimalPrototype } from '../../infrastructure/animal/prototype';
import { AnimalMapper } from '../../infrastructure/animal/mapper';
import {AngularFirestore} from '@angular/fire/firestore';
import { ToastProvider } from '../../infrastructure/providers/toast';

@Component({
  selector: 'app-animal-random',
  templateUrl: '../../templates/pages/randomAnimal.html'
})

class RandomAnimal implements OnInit, OnDestroy {

  public animal: Animal;
  private dataSubscription: Subscription = new Subscription();

  public constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private service: AnimalService,
    private mapper: AnimalMapper,
    private afs: AngularFirestore,
    private toast: ToastProvider
  ) {
    this.animal = this.route.snapshot.data.animal.first();
  }

  public ngOnInit() {
      this.dataSubscription = this.router.events.subscribe((e: any) => {
          if (e instanceof NavigationEnd) {
              this.service.retrieve().subscribe(
                  (animal: Collection<AnimalPrototype>) => {
                      const animalCollection = animal.convert<Animal>(this.mapper.instance.bind(this.mapper));

                      const result = animalCollection.first();

                      if (result) {
                          this.animal = result;
                      }
                  }
              );
          }
      });
  }

  public ngOnDestroy() {
      if (this.dataSubscription) {
          this.dataSubscription.unsubscribe();
      }
  }

  public addAnimalDataAsCorrect(animal: Animal): void {
      const id = animal.getCommonName().split(' ').join('_');
      const animalRef = this.afs.collection('animals').doc(id);
      animalRef.get().toPromise().then(
          (docSnapshot) => {
              if (docSnapshot.exists) {
                  this.toast.presentToastWithOptions(`${animal.getCommonName()} already exist in database`, 100000, 'warning-toast');
                  this.router.navigate([`/random-animal`]);
              } else {
                  this.afs.collection('animals').doc(id).set(Object.assign({}, animal)).then(
                      () => {
                          this.toast.presentToastWithOptions(`${animal.getCommonName()} added to database`, 3000, 'success-toast');
                      }
                  );
                  this.router.navigate([`/random-animal`]);
              }
          }
      );
  }

  public addAnimalDataAsIncorrect(animal: Animal): void {
      const id = animal.getCommonName().split(' ').join('_');
      const animalRef = this.afs.collection('incorrectAnimals').doc(id);

      const newIncorrectAnimal = {
          commonName: this.animal.getCommonName(),
          scientificName: this.animal.getScientificName(),
          description: null,
          image: null
      };

      animalRef.get().toPromise().then(
          (docSnapshot) => {
              if (docSnapshot.exists) {
                  this.toast.presentToastWithOptions(`${animal.getCommonName()} already exist in database`, 100000, 'warning-toast');
                  this.router.navigate([`/random-animal`]);
              } else {
                  this.afs.collection('incorrectAnimals').doc(id).set(Object.assign({}, newIncorrectAnimal)).then(
                      () => {
                          this.toast.presentToastWithOptions(`${animal.getCommonName()} added to database`, 3000, 'success-toast');
                      }
                  );
                  this.router.navigate([`/random-animal`]);
              }
          }
      );
  }
}

export { RandomAnimal as RandomAnimalPage };
