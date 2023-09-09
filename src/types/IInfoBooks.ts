export interface IInfoBooks {
    items: IBook[]
    kind: string
    totalItems: number
}

export interface IBook {
    accessInfo: {
        country: string,
        viewability: string,
        embeddable: boolean,
        publicDomain: boolean,
        textToSpeechPermission: string
    }
    etag: string
    id: string
    kind: string,
    saleInfo: {
        country: string, saleability: string, isEbook: boolean
    }
    searchInfo: {
        textSnippet: string
    }
    selfLink: string
    volumeInfo: {
        authors: string[]
        allowAnonLogging: false
        averageRating: number
        canonicalVolumeLink: string
        contentVersion: string
        imageLinks: {
            smallThumbnail: string,
            thumbnail: string
        }
        infoLink: string
        language: string
        maturityRating: string
        categories: string[]
        pageCount: number
        panelizationSummary: { containsEpubBubbles: boolean, containsImageBubbles: boolean }
        previewLink: string
        printType: string
        publisher: string
        ratingsCount: number
        readingModes: { text: boolean, image: boolean }
        title: string
    }
}