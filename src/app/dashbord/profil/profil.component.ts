import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { element } from '@angular/core/src/render3';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage'
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  ref : AngularFireStorageReference;
  task : AngularFireUploadTask;

  uploadPercent;
  downloadURL: Observable<string>;

  pwd;
  itemslist: AngularFireList<any>;
  imagelist : Observable<any>;
  imageArray = [];
  key : any;
  listKey = [];
  items =[];
  users : Observable<any>;
  imgPath: string;
  name : string;
  emailL : string;
  phone : string;
  email : string;
  user : ListItemClass;
  oldKey : string;
  constructor(private afs : AngularFireStorage, private db : AngularFireDatabase, private fire : AngularFireAuth, private root : Router) {
    this.users = db.list('User').valueChanges();
    this.itemslist = db.list('User');
    this.emailL = localStorage.getItem('user');

    this.itemslist.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y['$key'] = action.key;
        if (y['email'] === this.emailL){
          this.key = y['$key'];
          this.items.push(y as ListItemClass)
        }
      })
    }) 

    this.users.subscribe(user =>{
      user.forEach(element => {
        if (element.email == this.emailL ){
        this.name = element.name;
        this.phone = element.phone
        this.email = element.email;
        this.imgPath = element.ImgPath;
        }
      });
    })
   }
   photoP;
   photoK;
   UpdateProfil(key){
     this.items.forEach(elem => {
       this.photoK = elem.imageKey;
       this.photoP = elem.ImgPath;
     })
    let data = {
      name: this.name,
      phone : this.phone,
      email : this.email,
    }
    if (this.pwd){
      this.fire.auth.signInWithEmailAndPassword(this.emailL, this.pwd).then( (userCredential)=>{
        userCredential.user.updateEmail(data.email);
        this.itemslist.set(key, {
          name : this.name,
          phone : this.phone,
          email : this.email,
          ImgPath : this.photoP,
          imageKey : this.photoK
        })
        localStorage.setItem('user', data.email);
        this.root.navigateByUrl('dashbord/profil');
      }).catch(err => {
        alert(err)
      })
    }

  }
  
  UploadPhoto(event, key){
    
    this.items.forEach(elem => {
      this.oldKey = elem.ImgPath;
    })
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afs.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.itemslist.set(key, {
            name : this.name,
            phone : this.phone,
            email : this.email,
            ImgPath : url,
            imageKey : id
          })
          this.afs.storage.refFromURL(this.oldKey).delete();
        });
      })
    ).subscribe();
  }
  ngOnInit() {
    

    
  }
  

}


export class ListItemClass{
  $key : string;
  name : string;
  email : string;
  phone : string;
  ImgPath : string;
  imageKey: string ;

}
