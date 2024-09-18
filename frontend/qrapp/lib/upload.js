import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const storage = getStorage();

// Create the file metadata
/** @type {any} */
const metadata = {
    contentType: 'image/jpeg'
};





const upload = async (file)=>{
  
const date=new Date();
const storageRef = ref(storage, `images/${date+file}`);

const uploadTask = uploadBytesResumable(storageRef, file, metadata);

return new Promise((resolve,reject)=>{

    
uploadTask.on('state_changed',
  (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded

      
  }, 
  (error) => {
         reject(error);
},
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
       resolve(downloadURL);
    });
})
})
}

export default upload;