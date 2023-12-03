import uniqid from "uniqid";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../libs/firebase";

export async function POST(req) {
  const data = await req.formData();
  if (data.get("file")) {
    const file = data.get("file");

    const ext = file.name.split(".").slice(-1)[0];
    const newFileName = uniqid() + "." + ext;

    const profileRef = ref(storage, `profile/${newFileName}`);
    const uploadTask = uploadBytesResumable(profileRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((response) => {
              resolve(Response.json(response));
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }
  return Response.json(true);
}
