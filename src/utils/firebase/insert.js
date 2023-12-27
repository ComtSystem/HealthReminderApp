import NetInfo from '@react-native-community/netinfo';
import { collectionReferences } from '../../config/firebase/collections';
import { db } from '../../config/firebase/firebase';
import generateFirebaseDocId from './generateFirebaseDocId';

export default async function insert<T = Record<string, any>>({
  collectionName,
  fields,
  customId,
  companyId,
}: {
  collectionName: keyof typeof collectionReferences;
  fields: T;
  customId?: string;
  companyId?: string;
}) {
  try {
    let id = customId;
    const netFetch = await NetInfo.fetch();
    const isConnected = netFetch.isConnected;

    if (!customId) {
      id = generateFirebaseDocId();
    }

    const docData = {
      ...fields,
      ...(companyId ? { companyId } : {}),
      ...((fields as any)['id'] === undefined && { id }),
      ...((fields as any)['archived'] === undefined && { archived: false }),
      ...((fields as any)['createdAt'] === undefined && {
        createdAt: new Date(),
      }),
      ...((fields as any)['date'] === undefined && { date: new Date() }),
    };

    if (!isConnected) {
      db.collection(collectionName).doc(id).set(docData, { merge: true });
      return { id, ...docData };
    } else {
      await db.collection(collectionName).doc(id).set(docData, { merge: true });

      const created = await db.collection(collectionName).doc(id).get();

      const createdDocData = { ...created.data(), id: created.id } as T;

      return createdDocData;
    }
  } catch (e) {
    console.log(e);
  }
}
