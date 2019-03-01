
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

export interface AuthorizeUserInterface {
    username: string;
    password: string;
}

export interface AuthDataInterface extends AuthorizeUserInterface {
    client_id: string;
    client_secret: string;
    grant_type: string;
}

export interface AuthResponseInterface {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    refreshToken: string;
    scope: string;
}
