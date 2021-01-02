let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// check if all images are laoded 

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log('ready =',ready);
    }
}



// Helper function to set Attributes on DOM elements

function setAttributes(element,attributes){            //attributes is an object
  for(const key in attributes){                       //will iterate over the keys of the objects
      element.setAttribute(key,attributes[key]);
  }
}

const imageContainer = document.getElementById('image-container');
const loader =document.getElementById('loader');

let photosArray = [];

// Unsplash API

const count = 30;
const apiKey = 'O2pryxwuV7eXMUWS1BXdNDDZ5fMzwJKsQSw4K74BQI0';

const apiURL = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}&query=nature`;


// CREATE ELEMENTS FOR LINKS AND PHOTOS, ADDING THAT TO THE DOM

function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo)=>{                //iterating over our array li fiya el data mnel api,  w bikel iteration we are creating elements w nhoton bel dom 
    //   create <a> to link to Unsplash
    const item = document.createElement('a');      //creating blank <a> </a> element
    item.setAttribute('href',photo.links.html);    //adding attributes, haysir hek <a href='....'></a>
    item.setAttribute('target','_blank');          //<a href='...' target=_blank></a>   tayeftah bi new window... 
   
    // create <img> for photo
    const img = document.createElement('img');
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt',photo.alt_description);
    img.setAttribute('title',photo.alt_description);

    // Event listener, check when each is finished loadign

    img.addEventListener('load',imageLoaded);

   

    // put <img> inside <a>, and then put both inside imageContainer
     item.appendChild(img);
     imageContainer.appendChild(item);
     
    });
}

// get photos from unsplash api

const getPhotos = async ()=>{

try {
    

const res = await fetch(apiURL);
photosArray = await res.json();              //TO POPULATE DIRECTLY THE EMPTY ARRAY WITH THE DATA FROM THE API WE DO IT THAT WAY DIRECTLY


displayPhotos();




} catch (error) {
    

// CATCH ERROR






}




}

// check to see if scrolling near the bottom fetch more pictures . . .

window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// on Load getPhotos
getPhotos();












