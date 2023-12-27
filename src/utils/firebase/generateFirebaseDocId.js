import { db } from '../../config/firebase/firebase';

export default function generateFirebaseDocId() {
  const newRef = db.collection('documents').doc();
  return newRef.id;
}
