export type KeyLocalImages = 'images' | 'lastImagesGenerated'
export type KeysLovalValue =  | 'darkmode' | 'grayscale' | KeyLocalImages

export const enum LOCAL_STORAGE_KEYS {
    LAST_IMAGES_GENERATED = 'lastImagesGenerated',
    DARKMODE = 'darkmode',
    GRAYSCALE = 'grayscale',
    IMAGES = 'images'
}
