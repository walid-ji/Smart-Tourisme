import axios from "axios";

export const  CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/anep/upload";
export const CLOUDINARY_UPLOAD_PRESET = "rgn2qfcz"; 



 export  async function SubmitImage(file){
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    return  axios({
      url: CLOUDINARY_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: formdata,
    })
  }
