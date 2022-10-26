import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(public storage: Storage) { }

  updateImage(user: string, files: any) {
    for (let index = 0; index < files.length; index++) {
      const imgRef = ref(this.storage, 'images/' + user + "/" + new Date().getTime().toString());
      const element = files[index];
      uploadBytes(imgRef, element)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }
  }

  getImages(user: string) : string[] {
    const listUrl: string[] = [];
    const imagesRef = ref(this.storage, 'images/' + user);
    listAll(imagesRef).then(async res => {
      console.log(res);
      for (let item of res.items) {
        const url = await getDownloadURL(item);
        listUrl.push(url);
      }      
    }).catch(error => console.log(error));
    return listUrl;
  }
}
