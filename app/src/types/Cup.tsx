export default interface Cup {
    isPublished: boolean;
    isOpen: boolean;
    timeCreated: Date;
    name: string;
}

export interface CupWithId extends Cup {
    id: string;
}
