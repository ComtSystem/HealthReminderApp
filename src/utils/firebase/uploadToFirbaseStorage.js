import storage from '@react-native-firebase/storage';

export async function uploadToStorage({
  destinationFileName,
  sourceFileName,
  setUploadProgresses,
  uploadingItemId,
}: {
  destinationFileName: string;
  sourceFileName: string;
  setUploadProgresses?: (oldValue?: any) => void;
  uploadingItemId?: string;
}) {
  try {
    let base64Image: string = '';

    const res = await fetch(sourceFileName);
    const imageBlob = await res.blob();

    const reader = new FileReader();
    reader.onloadend = () => {
      base64Image = reader.result as string;
    };
    reader.readAsDataURL(imageBlob);

    const uploadRef = storage().ref().child(destinationFileName);
    const uploadTask = uploadRef.put(imageBlob);

    uploadTask.on(
      'state_changed',
      (snapshot: any) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );

        if (setUploadProgresses && uploadingItemId) {
          setUploadProgresses((val?: { [id: string]: number }) => {
            return { ...(val ? val : {}), [uploadingItemId]: progress };
          });
        }
      },
      error => {
        throw new Error(error.message);
      },
    );

    await uploadTask;


    await uploadRef.delete();
    console.log('Image deleted successfully');

    return base64Image;
  } catch (error) {
    console.log({ error });
  }
}