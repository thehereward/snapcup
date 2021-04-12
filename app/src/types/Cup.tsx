export default interface Cup {
    isPublished: boolean;
    isOpen: boolean;
    timeCreated: Date;
    name: string;
    timePublished: Date | null;
}

export interface CupWithId extends Cup {
    id: string;
}
