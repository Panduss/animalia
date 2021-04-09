// import { Injectable } from '@angular/core';
// import { AnimalPrototype, WikiPageResponsePrototype, WikiResponsePrototype } from '../../entitites/animal/prototype';
// import { HttpClient } from '@angular/common/http';
// import { map } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { environment } from '../../../environments/environment';
// import { AngularFirestore } from '@angular/fire/firestore';
// import { ToastProvider } from '../providers/toast';
//
// enum UpdateType {
//     image = 'missingImage',
//     scName = 'incorrectSCname',
//     desc = 'missingDesc',
//     all = 'correct',
//     missing = 'incorrect'
// }
//
// @Injectable()
// export class DbService {
//
//     public constructor(
//         private http: HttpClient,
//         private afs: AngularFirestore,
//         private toast: ToastProvider
//     ) {
//     }
//
//     public getWikiData(animalPrototype: AnimalPrototype): Observable<AnimalPrototype> {
//         const query = `titles=${ animalPrototype.commonName.split(' ').join('_') }`;
//         return this.http.get<WikiResponsePrototype>(
//             `${ environment.wikipedia.baseUrl }${ query }${ environment.wikipedia.getThumbnail }`
//         ).pipe(map((response: WikiResponsePrototype) => {
//             const page = response.query.pages[0];
//             const data = this.sortForDatabase(animalPrototype, page);
//             this.updateDatabase(data);
//             console.log(data.animal);
//             return data.animal;
//         }));
//     }
//
//     private sortForDatabase(animal: AnimalPrototype, page: WikiPageResponsePrototype): {animal: AnimalPrototype, type: UpdateType} {
//
//         const namesAreEqual = String(animal.commonName).valueOf() === String(animal.scientificName).valueOf();
//         let updateType = UpdateType.all;
//
//         if (namesAreEqual) {
//             console.log('Before:', animal.scientificName);
//             const scientificName = page.extract.match(/\(([^)]*)\)/);
//             console.log('After => ');
//             console.log(scientificName);
//             if (scientificName && scientificName.length) {
//                 animal.scientificName = scientificName[1];
//                 updateType = UpdateType.scName;
//             }
//         }
//
//         if (page.extract) {
//             const scientificName = page.extract.match(/\(([^)]*)\)/);
//
//             if (scientificName) {
//                 const SCnamesAreNotEqual = String(scientificName[1]).valueOf() !== String(animal.scientificName).valueOf();
//                 if (SCnamesAreNotEqual) {
//                     animal.scientificName = scientificName[1];
//                     console.log('existing but incorrect sc name');
//                     updateType = UpdateType.scName;
//                 }
//             }
//         }
//
//         if (!page.thumbnail && page.extract) {
//             updateType = UpdateType.image;
//         } else if (!page.extract && page.thumbnail) {
//             updateType = UpdateType.desc;
//         } else if (!page.extract && !page.thumbnail) {
//             updateType = UpdateType.missing;
//         }
//
//         const update = {
//             animal: {
//                 commonName: animal.commonName,
//                 scientificName: animal.scientificName,
//                 classis: 'mammalia',
//                 status: 'Least concern',
//                 description: page.extract ? page.extract : null,
//                 image: page.thumbnail && page.thumbnail.source ? page.thumbnail.source : null
//             } as AnimalPrototype,
//             type: updateType
//         };
//
//         console.log('hello', update);
//         return update;
//     }
//
//     private updateDatabase(data: {animal: AnimalPrototype, type: UpdateType}): void {
//
//         switch (data.type) {
//             case UpdateType.all:
//                 this.addAnimalToDatabase(data.animal, 'mammals', data.type);
//                 break;
//             case UpdateType.scName:
//                 this.addAnimalToDatabase(data.animal, 'incorrectName', data.type);
//                 this.addAnimalToDatabase(data.animal, 'mammals', data.type);
//                 break;
//             case UpdateType.image:
//                 this.addAnimalToDatabase(data.animal, 'missingImage', data.type);
//                 break;
//             case UpdateType.desc:
//                 this.addAnimalToDatabase(data.animal, 'missingDesc', data.type);
//                 break;
//             case UpdateType.missing:
//                 this.addAnimalToDatabase(data.animal, 'missingAll', data.type);
//                 break;
//         }
//     }
//
//     private addAnimalToDatabase(animal: AnimalPrototype, path: string, updateType: UpdateType): void {
//         const id = animal.commonName.split(' ').join('_');
//         console.log('hello?', id);
//         const animalRef = this.afs.collection(path).doc(id);
//         animalRef.get().toPromise().then(
//             (docSnapshot: any) => {
//                 console.log('docSnapshot.exists', docSnapshot.exists);
//                 if (!docSnapshot.exists) {
//                     this.afs.collection(path).doc(id).set(Object.assign({}, animal)).then(
//                         () => {
//                             this.toast.presentToastWithOptions(
//                                 `${ animal.commonName } added ${ updateType } to ${ path } database`,
//                                 3000,
//                                 'success-toast',
//                                 'top'
//                             );
//                         });
//                 }
//             }
//         );
//     }
// }
