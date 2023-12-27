import { ItemType } from '../../../shared/database/ItemsTable'
import { companiesItemsRef } from '../config/firebase/collections'
import useCollectionData from './useCollectionData'

export default function useProducts() {
    const [products, loading] = useCollectionData<ItemType>(companiesItemsRef, {
        addBranchIdToQuery: true,
    })

    return { products, loading }
}
