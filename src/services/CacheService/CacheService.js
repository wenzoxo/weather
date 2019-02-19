import { STORE_ID } from '../../config'//todo webpack parse path

export class CacheService {

    static getLocalStorageItem() {
        const storeItem = localStorage.getItem(STORE_ID) || '[]';
        return JSON.parse(storeItem);
    }

    static setLocalStorageItem(forStore) {
        let toString = (typeof forStore !== 'string')
            ? JSON.stringify(forStore)
            : forStore;

        localStorage.setItem(STORE_ID, toString);
    }

    static mutateLocalStorageItem(stringForStore) {
        const isContains = CacheService.checkContainsStorage(stringForStore);

        if (!isContains) {
            const storeItem = [
                ...CacheService.getLocalStorageItem(),
                stringForStore.toLowerCase()
            ];

            CacheService.setLocalStorageItem(storeItem);
            return storeItem;//todo save in store Redux
        }
    }

    static checkContainsStorage(stringForCheck) {
        const cities = CacheService.getLocalStorageItem();
        const isContains = cities.indexOf(stringForCheck.toLowerCase());
        return isContains >= 0
    }
}
