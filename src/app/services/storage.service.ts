import { Injectable } from '@angular/core';
import { ref, Storage, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public listUrl: string[] = [];

  constructor(public storage: Storage) { }

  async updateImages(user: string, files: any) {
    console.log("UpdateImage")
    console.log(files)
    console.log("Fin console Files")
    for (let index = 0; index < files.length; index++) {
      const imgRef = ref(this.storage, 'images/' + user + "/" + new Date().getTime().toString());
      const element = files[index];
      await uploadBytes(imgRef, element)
        .then(res => { console.log(res) })
        .catch(error => console.log(error));
    }
  }

  async getImages(user: string) {
    this.listUrl = [];
    const imagesRef = ref(this.storage, 'images/' + user);
    await listAll(imagesRef).then(async res => {
      console.log(res);
      for (let item of res.items) {
        await getDownloadURL(item).then(res => { console.log(res), this.listUrl.push(res); });
      }
    }).catch(error => console.log(error));
  }
}
