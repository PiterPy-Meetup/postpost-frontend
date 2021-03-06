
export interface PlatformPostInterface {
    id: number;
    platformType: string;
    text?: string;
    currentStatus: string;
    vkClearMarkdown?: boolean;
    telegramPictureAsLink?: boolean;
    telegramMarkdown?: boolean;
    publication: number;
}

export interface PublicationInterface {
    id: number;
    text: string;
    currentStatus: string;
    picture?: string;
    scheduledAt?: string;
    platformPosts: PlatformPostInterface[];
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponseInterface {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
