export interface FlashCardSet{
    id: string;
    title: string;
    description: string;
}

export interface FlashCard{
    id: string;
    word: string;
    phonetic: string;
    partOfSpeech: string;
    meaning: string;
    example: string;
    audioUrl: string;
    imageUrl: string;
    level: string;
}